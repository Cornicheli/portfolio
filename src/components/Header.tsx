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

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="bg-[#0a0a0a]/95 backdrop-blur-md text-white py-4 px-6 sticky top-0 left-0 w-full z-50 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <nav>
          <ul className="flex space-x-8 justify-center">
            <li>
              <Link
                href="#sobre-mi"
                onClick={(e) => handleSmoothScroll(e, '#sobre-mi')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link
                href="#experiencia"
                onClick={(e) => handleSmoothScroll(e, '#experiencia')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {t('nav.experience')}
              </Link>
            </li>
            <li>
              <Link
                href="#tecnologias"
                onClick={(e) => handleSmoothScroll(e, '#tecnologias')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {t('nav.technologies')}
              </Link>
            </li>
            <li>
              <Link
                href="#proyectos"
                onClick={(e) => handleSmoothScroll(e, '#proyectos')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {t('nav.projects')}
              </Link>
            </li>
          </ul>
        </nav>

        <button
          onClick={toggleLanguage}
          className="ml-4 px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-all duration-200 text-sm font-semibold"
          aria-label="Toggle language"
        >
          {currentLang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </header>
  );
}
