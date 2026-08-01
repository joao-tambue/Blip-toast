#!/usr/bin/env node
/**
 * Generates public/og-image.png — a 1200x630 brand banner with the
 * violet→blue Blip gradient, a floating toast card and the wordmark dot.
 * Pure Node (zlib) — no external dependencies.
 *
 * Run: pnpm og  (from the demo workspace)
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const W = 1200;
const H = 630;

const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];
const VIOLET = hex('#8B5CF6');
const DEEP = hex('#7C3AED');
const BLUE = hex('#3B82F6');
const SKY = hex('#38BDF8');

/* ---------------- PNG encoding ---------------- */
const crcTable = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePng(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ---------------- drawing helpers ---------------- */
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function mixColor(c1, c2, t) {
  return [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t)),
  ];
}
function blend(dst, i, color, alpha) {
  const inv = 1 - alpha;
  dst[i] = Math.round(color[0] * alpha + dst[i] * inv);
  dst[i + 1] = Math.round(color[1] * alpha + dst[i + 1] * inv);
  dst[i + 2] = Math.round(color[2] * alpha + dst[i + 2] * inv);
  dst[i + 3] = Math.max(dst[i + 3], Math.round(alpha * 255));
}
function distToRoundedRect(x, y, cx, cy, halfW, halfH, r) {
  const dx = Math.abs(x - cx) - (halfW - r);
  const dy = Math.abs(y - cy) - (halfH - r);
  const ox = Math.max(dx, 0);
  const oy = Math.max(dy, 0);
  const inside = dx < 0 && dy < 0;
  const corner = Math.hypot(Math.max(dx, 0), Math.max(dy, 0)) - r;
  return inside ? -Math.min(-dx, -dy) : corner;
}
function softStep(edge, width, d) {
  const t = (d - edge) / width;
  return 1 - Math.min(1, Math.max(0, t));
}

/* ---------------- render ---------------- */
const px = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const t = (x / W + y / H) / 2; // diagonal gradient
    const base = mixColor(VIOLET, BLUE, Math.min(1, t));
    // radial glow toward the top-left (the "light" behind the icon)
    const gx = W * 0.28;
    const gy = H * 0.22;
    const gd = Math.hypot(x - gx, y - gy) / (W * 0.55);
    const glow = mixColor(SKY, VIOLET, Math.min(1, gd));
    const glowA = 0.35 * Math.max(0, 1 - gd);
    blend(px, i, glow, glowA);
    px[i] = base[0];
    px[i + 1] = base[1];
    px[i + 2] = base[2];
    px[i + 3] = 255;
  }
}

// Toast card (center)
const cardCX = W * 0.5;
const cardCY = H * 0.5;
const cardHalfW = 300;
const cardHalfH = 96;
const cardR = 44;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const d = distToRoundedRect(x, y, cardCX, cardCY, cardHalfW, cardHalfH, cardR);
    const body = softStep(0, 2.5, d); // hard edge
    const border = softStep(1.5, 2, d); // thin border band
    if (body > 0) {
      blend(px, i, [255, 255, 255], body * 0.14);
    }
    if (border > 0) {
      blend(px, i, [255, 255, 255], border * 0.5);
    }
  }
}

// Wordmark dot (the "i" of Blip) + text bars inside the card
const dotCX = cardCX - cardHalfW + 74;
const dotCY = cardCY - 34;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    // gradient dot
    const dd = Math.hypot(x - dotCX, y - dotCY);
    if (dd < 30) {
      const t = (x - (dotCX - 30)) / 60;
      blend(px, i, mixColor(SKY, VIOLET, t), softStep(30, 2, dd) * 0.95);
    }
    // title bar
    const barY = cardCY + 6;
    if (Math.abs(x - (dotCX + 60)) < 120 && Math.abs(y - barY) < 12) {
      blend(px, i, [255, 255, 255], 0.75);
    }
    // sub bar
    const subY = cardCY + 44;
    if (Math.abs(x - (dotCX + 60)) < 80 && Math.abs(y - subY) < 9) {
      blend(px, i, [255, 255, 255], 0.42);
    }
  }
}

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og-image.png');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, encodePng(W, H, px));
console.log(`✓ wrote ${out}`);
