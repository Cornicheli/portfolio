"use client";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function Header() {
  const { t, i18n } = useTranslation('common');
  const [currentLang, setCurrentLang] = useState('es');

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  return (
    <header className="bg-[#0a0a0a] opacity-90 text-white p-4 sticky top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <nav>
          <ul className="flex space-x-4 justify-center">
            <li>
              <Link href="#sobre-mi" className="hover:underline">
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link href="#experiencia" className="hover:underline">
                {t('nav.experience')}
              </Link>
            </li>
            <li>
              <Link href="#tecnologias" className="hover:underline">
                {t('nav.technologies')}
              </Link>
            </li>
            <li>
              <Link href="#proyectos" className="hover:underline">
                {t('nav.projects')}
              </Link>
            </li>
          </ul>
        </nav>

        <button
          onClick={toggleLanguage}
          className="ml-4 px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
          aria-label="Toggle language"
        >
          {currentLang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </header>
  );
}
