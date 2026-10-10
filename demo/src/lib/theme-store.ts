import { useSyncExternalStore } from 'react';

export type SiteTheme = 'light' | 'dark';

const STORAGE_KEY = 'blip-toast-theme';
const THEME_COLOR: Record<SiteTheme, string> = { light: '#E8ECEF', dark: '#0E1114' };

const listeners = new Set<() => void>();

function readInitial(): SiteTheme {
  // The inline script in each HTML page has already set the class before
  // first paint; read it back so React agrees with what is on screen.
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

let current: SiteTheme = readInitial();

function apply(theme: SiteTheme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies.
  }
}

export function setTheme(theme: SiteTheme) {
  current = theme;
  apply(theme);
  listeners.forEach((listener) => listener());
}

export function toggleTheme() {
  setTheme(current === 'dark' ? 'light' : 'dark');
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSiteTheme(): SiteTheme {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => 'light'
  );
}
