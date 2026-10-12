#!/usr/bin/env node
/**
 * Generates the app icons in public/ from icons.html:
 *   - icon-512.png, icon-192.png  (web manifest; the 512 is also maskable)
 *   - apple-touch-icon.png        (180x180, opaque as iOS requires)
 *   - favicon.ico                 (16/32/48, rasterized from favicon.svg)
 * favicon.svg itself is hand-written source and is not generated.
 *
 * Run: pnpm icons  (from the demo workspace)
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { capture, root } from './lib/capture.mjs';

const out = (name) => join(root, 'public', name);

/** An ICO file whose entries are PNGs (supported by every current browser). */
function encodeIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, png } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += png.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((image) => image.png)]);
}

await capture({
  page: 'icons.html',
  width: 1200,
  height: 600,
  transparent: true,
  run: async (shoot, evaluate) => {
    const rects = await evaluate(`Object.fromEntries([...document.querySelectorAll('[data-icon]')]
      .map((el) => { const r = el.getBoundingClientRect();
        return [el.dataset.icon, { x: r.x, y: r.y, width: r.width, height: r.height }]; }))`);

    for (const name of ['icon-512', 'icon-192', 'apple-touch-icon']) {
      writeFileSync(out(`${name}.png`), await shoot(rects[name]));
      console.log(`✓ wrote public/${name}.png`);
    }

    // Rasterize favicon.svg on a canvas: screenshot clips this small come
    // back empty in headless Chromium.
    const favicons = [];
    for (const size of [16, 32, 48]) {
      const dataUrl = await evaluate(`(() => {
        const img = document.querySelector('[data-icon="favicon-${size}"]');
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = ${size};
        canvas.getContext('2d').drawImage(img, 0, 0, ${size}, ${size});
        return canvas.toDataURL('image/png');
      })()`);
      favicons.push({ size, png: Buffer.from(dataUrl.split(',')[1], 'base64') });
    }
    writeFileSync(out('favicon.ico'), encodeIco(favicons));
    console.log('✓ wrote public/favicon.ico (16, 32, 48)');
  },
});
