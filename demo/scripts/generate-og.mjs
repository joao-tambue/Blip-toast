#!/usr/bin/env node
/**
 * Generates public/og-image.png (1200x630) by rendering og.html — built from
 * the site's real fonts, tokens, Blip bot and a real ToastItem — and
 * capturing it with a local Chromium browser (Chrome, Edge or Chromium)
 * over the DevTools protocol. No extra dependencies.
 *
 * Run: pnpm og  (from the demo workspace)
 * Set CHROME_PATH to point at a specific browser binary.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const W = 1200;
const H = 630;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'og-image.png');

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

const browserPath = CANDIDATES.find((path) => existsSync(path));
if (!browserPath) {
  console.error('✗ No Chromium-based browser found. Set CHROME_PATH and run again.');
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Minimal DevTools protocol client over Node's built-in WebSocket. */
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

function launchBrowser(profileDir) {
  const child = spawn(
    browserPath,
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${profileDir}`,
      `--window-size=${W},${H}`,
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

const server = await createServer({ root, logLevel: 'error', server: { port: 5198 } });
const profileDir = mkdtempSync(join(tmpdir(), 'blip-og-'));
let browser;

try {
  await server.listen();
  const url = new URL('og.html', server.resolvedUrls.local[0]).href;

  browser = launchBrowser(profileDir);
  const wsUrl = await browser.endpoint;
  const { port } = new URL(wsUrl);
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = await connect(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);

  await page.send('Emulation.setDeviceMetricsOverride', {
    width: W,
    height: H,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await page.send('Page.navigate', { url });

  // Wait for fonts (data-ready) and a drawn bot canvas. The dev server may
  // reload once while it optimizes dependencies, so keep polling.
  const deadline = Date.now() + 60_000;
  for (;;) {
    const { result } = await page.send('Runtime.evaluate', {
      expression: `document.body?.dataset.ready === 'true' &&
        getComputedStyle(document.querySelector('canvas') ?? document.body).opacity === '1' &&
        !!document.querySelector('canvas')`,
      returnByValue: true,
    });
    if (result.value) break;
    if (Date.now() > deadline) throw new Error('Timed out waiting for og.html to render.');
    await sleep(250);
  }
  // Let the bot's bake and the toast's entrance spring settle.
  await sleep(2500);

  const { data } = await page.send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: W, height: H, scale: 1 },
  });
  writeFileSync(out, Buffer.from(data, 'base64'));
  page.close();
  console.log(`✓ wrote ${out}`);
} finally {
  browser?.child.kill();
  await server.close();
  // The browser can hold the profile for a moment after exit.
  await sleep(500);
  rmSync(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
