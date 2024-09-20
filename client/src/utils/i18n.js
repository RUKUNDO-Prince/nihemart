import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../trans/en.json';
import rw from '../trans/rw.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      rw: { translation: rw },
    },
    lng: 'rw', // Default language
    fallbackLng: 'rw', // Fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
