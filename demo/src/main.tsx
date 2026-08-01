import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Fallback shim: react-native-web's vendored Animated JS driver references
// `global` (e.g. global.requestAnimationFrame). Vite rewrites the identifier
// via `define`, but keep a runtime fallback for any leftover reference in
// pre-bundled deps. Using property access keeps this out of `define`'s reach.
const g = window as unknown as { global?: unknown };
if (g.global === undefined) {
  g.global = window;
}

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

createRoot(rootEl).render(<App />);
