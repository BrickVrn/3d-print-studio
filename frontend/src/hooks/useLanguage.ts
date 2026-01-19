'use client';

import { useState, useEffect } from 'react';

type Language = 'ru' | 'en';

interface Translations {
  [key: string]: {
    ru: string;
    en: string;
  };
}

const translations: Translations = {
  nav: {
    ru: 'Навигация',
    en: 'Navigation',
  },
  home: {
    ru: 'Главная',
    en: 'Home',
  },
  plastics: {
    ru: 'Пластики',
    en: 'Plastics',
  },
  quiz: {
    ru: 'Квиз',
    en: 'Quiz',
  },
  contact: {
    ru: 'Контакты',
    en: 'Contact',
  },
  admin: {
    ru: 'Админ',
    en: 'Admin',
  },
  orderNow: {
    ru: 'Заказать',
    en: 'Order Now',
  },
  theme: {
    ru: 'Тема',
    en: 'Theme',
  },
};

export function useLanguage() {
  const [lang, setLang] = useState<Language>('ru');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language | null;
    if (saved) setLang(saved);
  }, []);

  const toggle = () => {
    const next = lang === 'ru' ? 'en' : 'ru';
    setLang(next);
    localStorage.setItem('lang', next);
  };

  const t = (key: string) => translations[key]?.[lang] || key;

  return { lang, toggle, t };
}