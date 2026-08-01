export const site = {
  name: 'Blip Toast',
  tagline: 'Toasts that don\u2019t interrupt \u2014 they delight.',
  description:
    'A lightweight, beautifully animated toast notification library for React Native. Five variants, promise support, six positions and a tiny TypeScript-first API.',
  url: 'https://blip-toast.vercel.app',
  repository: 'https://github.com/joao-tambue/Blip-toast',
  npm: 'https://www.npmjs.com/package/blip-toast',
  license: 'MIT',
  author: {
    name: 'Jo\u00e3o Tambue',
    github: 'https://github.com/joao-tambue',
  },
  version: '0.1.0',
} as const;

export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Playground', href: '#playground' },
  { label: 'Docs', href: '#docs' },
  { label: 'Quick start', href: '#quickstart' },
  { label: 'API', href: '#api' },
] as const;

export const installCommands: Record<'npm' | 'pnpm' | 'yarn' | 'bun', string> = {
  npm: 'npm install blip-toast',
  pnpm: 'pnpm add blip-toast',
  yarn: 'yarn add blip-toast',
  bun: 'bun add blip-toast',
};
