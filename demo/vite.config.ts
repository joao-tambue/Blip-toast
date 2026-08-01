import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const rnWeb = fileURLToPath(new URL('./node_modules/react-native-web', import.meta.url));
const svgStub = fileURLToPath(new URL('./src/lib/rn-svg-stub.tsx', import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // blip-toast is a React Native library. On the web we render it
      // through react-native-web so the live demos are 100% real.
      'react-native': rnWeb,
      'react-native-web': rnWeb,
      // react-native-svg's Fabric build is not web-compatible, so the demo
      // uses a tiny DOM-SVG shim (only the primitives blip-toast needs).
      'react-native-svg': svgStub,
    },
  },
  optimizeDeps: {
    include: ['react-native-web', 'shiki'],
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/framer-motion') ||
            id.includes('node_modules/lucide-react') ||
            id.includes('node_modules/blip-toast') ||
            id.includes('node_modules/react-native')
          ) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/shiki') || id.includes('node_modules/@shikijs')) {
            return 'shiki';
          }
        },
      },
    },
  },
});
