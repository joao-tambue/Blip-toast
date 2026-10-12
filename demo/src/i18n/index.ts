import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pt from './locales/pt.json';
import { site } from '../lib/site-config';

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
] as const;

export type AppLanguage = (typeof LANGUAGES)[number]['code'];

const RESOURCES = { en: { translation: en }, pt: { translation: pt } } as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: RESOURCES,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt'],
    load: 'languageOnly',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'blip-toast-lang',
      caches: ['localStorage'],
    },
  });

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
    };
  }
}

type Page = 'home' | 'docs';

const SITE_URL = site.url.replace(/\/$/, '');
const LOCALES: Record<string, string> = { en: 'en_US', pt: 'pt_PT' };
const PAGE_PATH: Record<Page, string> = { home: '/', docs: '/docs/' };

const currentPage = (): Page => (document.body.dataset.page === 'docs' ? 'docs' : 'home');

const setMeta = (selector: string, content: string) =>
  document.querySelector(selector)?.setAttribute('content', content);

const syncDocumentMeta = (lng: string) => {
  const base = lng.split('-')[0];
  const page = currentPage();
  const url = `${SITE_URL}${PAGE_PATH[page]}`;
  document.documentElement.lang = base;
  document.title = i18n.t(`meta.${page}.title`);
  const description = i18n.t(`meta.${page}.description`);
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', document.title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[property="og:locale"]', LOCALES[base] ?? 'en_US');
  setMeta('meta[property="og:locale:alternate"]', LOCALES[base === 'pt' ? 'en' : 'pt']);
  setMeta('meta[name="twitter:title"]', document.title);
  setMeta('meta[name="twitter:description"]', description);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
};

i18n.on('languageChanged', syncDocumentMeta);
if (i18n.language) syncDocumentMeta(i18n.language);

export default i18n;
