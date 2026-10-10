#!/usr/bin/env node
/**
 * Generates public/og-image.png (1200x630) by rendering og.html — built from
 * the site's real fonts, tokens, Blip bot and a real ToastItem — and
 * capturing it with a local Chromium browser.
 *
 * Run: pnpm og  (from the demo workspace)
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { capture, root } from './lib/capture.mjs';

const W = 1200;
const H = 630;
const out = join(root, 'public', 'og-image.png');

await capture({
  page: 'og.html',
  width: W,
  height: H,
  run: async (shoot) => {
    writeFileSync(out, await shoot({ x: 0, y: 0, width: W, height: H }));
    console.log(`✓ wrote ${out}`);
  },
});
