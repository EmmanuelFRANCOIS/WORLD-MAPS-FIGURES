import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import i18next_data from "./i18next_data";

const languages = i18next_data.languages;

i18next
  .use( LanguageDetector )
  .use( initReactI18next )
  .init({
    resources: i18next_data.translations,
    fallbackLng: 'en',
    //lng: "ru",
    interpolation: {
      escapeValue: false,
    },
    debug: false
  });
export default i18next;

export function getTranslation (country) {
  const transCode = languages[i18next.resolvedLanguage].transCode;
  //console.log(i18next.resolvedLanguage, country.name.common, country.translations[transCode].common);
  if( transCode === 'eng') return country.name.common;
  if( country.translations[transCode] === undefined ) {
    return country.name.common;
  } else {
    return country.translations[transCode].common;
  }
}

// Countries data sorting
const tri = 'top';
export function dataSorter (a, b) {
  a = getTranslation(a).toLowerCase();
  b = getTranslation(b).toLowerCase();
  if (tri === 'top') { 
    return a.localeCompare(b); 
  } else if (tri === 'down') {
    return -a.localeCompare(b);
  }
}

export function getTransCode () {
  return languages[i18next.resolvedLanguage].transCode;
}

export function getLangDir () {
  return languages[i18next.resolvedLanguage].dir;
}