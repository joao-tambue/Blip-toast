/**
 * Renders a dev-server page and screenshots parts of it with a local
 * Chromium browser (Chrome, Edge or Chromium) over the DevTools protocol.
 * Shared by generate-og.mjs and generate-icons.mjs. No extra dependencies:
 * it uses Vite (already a dev dependency) and Node's built-in WebSocket.
 *
 * Set CHROME_PATH to point at a specific browser binary.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

export const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'),
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Minimal DevTools protocol client. */
function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(wsUrl);
    const pending = new Map();
    let nextId = 0;
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      const entry = pending.get(message.id);
      if (!entry) return;
      pending.delete(message.id);
      if (message.error) entry.reject(new Error(message.error.message));
      else entry.resolve(message.result);
    });
    socket.addEventListener('error', reject);
    socket.addEventListener('open', () =>
      resolve({
        send(method, params = {}) {
          const id = ++nextId;
          socket.send(JSON.stringify({ id, method, params }));
          return new Promise((res, rej) => pending.set(id, { resolve: res, reject: rej }));
        },
        close: () => socket.close(),
      })
    );
  });
}

function launchBrowser(browserPath, profileDir, width, height) {
  const child = spawn(
    browserPath,
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${profileDir}`,
      `--window-size=${width},${height}`,
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  );
  const endpoint = new Promise((resolve, reject) => {
    let log = '';
    child.stderr.on('data', (data) => {
      log += data;
      const match = /DevTools listening on (ws:\/\/\S+)/.exec(log);
      if (match) resolve(match[1]);
    });
    child.on('exit', (code) => reject(new Error(`Browser exited early (${code}).\n${log}`)));
  });
  return { child, endpoint };
}

/**
 * Open `page` (relative to the demo root) at width×height, wait until
 * `document.body.dataset.ready === 'true'` and every bot canvas is drawn,
 * then call `shoot(clip)` callers use to capture regions as PNG buffers.
 *
 * @param {{ page: string, width: number, height: number, transparent?: boolean,
 *   settleMs?: number, run: (shoot: (clip: {x:number,y:number,width:number,height:number}) => Promise<Buffer>,
 *   evaluate: (expression: string) => Promise<unknown>) => Promise<void> }} options
 */
export async function capture({ page, width, height, transparent = false, settleMs = 2500, run }) {
  const browserPath = CANDIDATES.find((path) => existsSync(path));
  if (!browserPath) {
    throw new Error('No Chromium-based browser found. Set CHROME_PATH and run again.');
  }

  const server = await createServer({ root, logLevel: 'error', server: { port: 5198 } });
  const profileDir = mkdtempSync(join(tmpdir(), 'blip-capture-'));
  let browser;

  try {
    await server.listen();
    const url = new URL(page, server.resolvedUrls.local[0]).href;

    browser = launchBrowser(browserPath, profileDir, width, height);
    const wsUrl = await browser.endpoint;
    const { port } = new URL(wsUrl);
    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const cdp = await connect(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);

    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    if (transparent) {
      await cdp.send('Emulation.setDefaultBackgroundColorOverride', {
        color: { r: 0, g: 0, b: 0, a: 0 },
      });
    }
    await cdp.send('Page.navigate', { url });

    const evaluate = async (expression) => {
      const { result } = await cdp.send('Runtime.evaluate', { expression, returnByValue: true });
      return result.value;
    };

    // The dev server may reload once while it optimizes dependencies, so poll.
    const deadline = Date.now() + 60_000;
    for (;;) {
      const ready = await evaluate(`document.body?.dataset.ready === 'true' &&
        [...document.querySelectorAll('canvas')].every((c) => getComputedStyle(c).opacity === '1')`);
      if (ready) break;
      if (Date.now() > deadline) throw new Error(`Timed out waiting for ${page} to render.`);
      await sleep(250);
    }
    // Let bot bakes and entrance springs settle.
    await sleep(settleMs);

    const shoot = async (clip) => {
      const { data } = await cdp.send('Page.captureScreenshot', {
        format: 'png',
        clip: { ...clip, scale: 1 },
      });
      return Buffer.from(data, 'base64');
    };

    await run(shoot, evaluate);
    cdp.close();
  } finally {
    browser?.child.kill();
    await server.close();
    // The browser can hold the profile for a moment after exit.
    await sleep(500);
    rmSync(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
}
