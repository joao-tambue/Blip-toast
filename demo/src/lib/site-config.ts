import pkg from 'blip-toast/package.json';

export const site = {
  name: 'Blip Toast',
  url: 'https://blip-toast.vercel.app',
  repository: 'https://github.com/joao-tambue/Blip-toast',
  changelog:
    'https://github.com/joao-tambue/Blip-toast/blob/main/packages/blip-toast/CHANGELOG.md',
  npm: 'https://www.npmjs.com/package/blip-toast',
  license: 'MIT',
  author: {
    name: 'João Tambue',
    github: 'https://github.com/joao-tambue',
  },
  /** Read from the library itself so the site never drifts from the package. */
  version: pkg.version,
} as const;

export const routes = {
  home: '/',
  docs: '/docs/',
} as const;

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export const installCommands: Record<PackageManager, string> = {
  npm: 'npm install blip-toast react-native-svg',
  pnpm: 'pnpm add blip-toast react-native-svg',
  yarn: 'yarn add blip-toast react-native-svg',
  bun: 'bun add blip-toast react-native-svg',
};
