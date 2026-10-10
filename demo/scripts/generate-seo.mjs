#!/usr/bin/env node
/**
 * Generates static SEO artifacts into public/:
 *   - public/robots.txt
 *   - public/sitemap.xml   (with en/pt hreflang alternates)
 *   - public/site.webmanifest
 *
 * The site has two pages (home and docs); the locale variants are served
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

const PAGES = [
  { path: '/', priority: '1.0' },
  { path: '/docs/', priority: '0.9' },
];

const langUrl = (path, lang) => `${SITE_URL}${path}?lang=${lang}`;

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
  ...PAGES.flatMap(({ path, priority }) => {
    const alternates = [
      ['en', langUrl(path, 'en')],
      ['pt', langUrl(path, 'pt')],
      ['x-default', `${SITE_URL}${path}`],
    ];
    return [
      urlEntry(`${SITE_URL}${path}`, alternates, priority),
      urlEntry(langUrl(path, 'en'), alternates, priority),
      urlEntry(langUrl(path, 'pt'), alternates, priority),
    ];
  }),
  '</urlset>',
  '',
].join('\n');

/* ---------------- site.webmanifest ---------------- */
const manifest = {
  name: 'Blip Toast',
  short_name: 'Blip Toast',
  description: 'Toast notifications for React Native: five variants, promise states and custom layouts.',
  start_url: '/',
  display: 'standalone',
  background_color: '#E8ECEF',
  theme_color: '#E8ECEF',
  icons: [
    { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
  ],
};

mkdirSync(dirname(out('robots.txt')), { recursive: true });
writeFileSync(out('robots.txt'), robots);
writeFileSync(out('sitemap.xml'), sitemap);
writeFileSync(out('site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log('✓ wrote public/robots.txt');
console.log('✓ wrote public/sitemap.xml');
console.log('✓ wrote public/site.webmanifest');
