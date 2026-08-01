import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pt from './locales/pt.json';

export const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
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

const syncDocumentMeta = (lng: string) => {
  const base = lng.split('-')[0];
  document.documentElement.lang = base;
  document.title = i18n.t('meta.title');
  const description = i18n.t('meta.description');
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
};

i18n.on('languageChanged', syncDocumentMeta);
if (i18n.language) syncDocumentMeta(i18n.language);

export default i18n;
