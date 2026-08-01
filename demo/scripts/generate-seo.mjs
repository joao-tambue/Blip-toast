#!/usr/bin/env node
/**
 * Generates static SEO artifacts into public/:
 *   - public/robots.txt
 *   - public/sitemap.xml   (with en/pt hreflang alternates)
 *   - public/site.webmanifest
 *
 * The single-page demo lives at one URL; the locale variants are served
 * through the `?lang=` querystring, so each gets its own sitemap entry.
 *
 * Run: pnpm seo  (from the demo workspace) — also runs on `pnpm build`.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Keep in sync with site.url in demo/src/lib/site-config.ts
const SITE_URL = 'https://blip-toast.vercel.app';
const LAST_MOD = new Date().toISOString().slice(0, 10);

const out = (name) => join(dirname(fileURLToPath(import.meta.url)), '..', 'public', name);

const langUrl = (lang) => `${SITE_URL}/?lang=${lang}`;

/* ---------------- robots.txt ---------------- */
const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap.xml`].join('\n');

/* ---------------- sitemap.xml ---------------- */
const alternateLinks = (hrefs) =>
  hrefs
    .map(
      ([hreflang, href]) =>
        `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`
    )
    .join('\n');

const urlEntry = (loc, hrefs, priority) =>
  [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${LAST_MOD}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    `    <priority>${priority}</priority>`,
    alternateLinks(hrefs),
    '  </url>',
  ].join('\n');

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  urlEntry(
    `${SITE_URL}/`,
    [
      ['en', langUrl('en')],
      ['pt', langUrl('pt')],
      ['x-default', `${SITE_URL}/`],
    ],
    '1.0'
  ),
  urlEntry(
    langUrl('en'),
    [
      ['en', langUrl('en')],
      ['pt', langUrl('pt')],
      ['x-default', `${SITE_URL}/`],
    ],
    '0.9'
  ),
  urlEntry(
    langUrl('pt'),
    [
      ['en', langUrl('en')],
      ['pt', langUrl('pt')],
      ['x-default', `${SITE_URL}/`],
    ],
    '0.9'
  ),
  '</urlset>',
  '',
].join('\n');

/* ---------------- site.webmanifest ---------------- */
const manifest = {
  name: 'Blip Toast',
  short_name: 'Blip Toast',
  description:
    'A lightweight, beautifully animated toast notification library for React Native. Five variants, promise support, six positions and a tiny TypeScript-first API.',
  start_url: '/',
  display: 'standalone',
  background_color: '#0B0C14',
  theme_color: '#0B0C14',
  icons: [{ src: '/favicon.png', sizes: 'any', type: 'image/png' }],
};

mkdirSync(dirname(out('robots.txt')), { recursive: true });
writeFileSync(out('robots.txt'), robots);
writeFileSync(out('sitemap.xml'), sitemap);
writeFileSync(out('site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log('✓ wrote public/robots.txt');
console.log('✓ wrote public/sitemap.xml');
console.log('✓ wrote public/site.webmanifest');
