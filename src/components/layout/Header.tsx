"use client";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Header() {
  const { t, i18n } = useTranslation('common');
  const { theme, toggleTheme } = useTheme();
  const [currentLang, setCurrentLang] = useState('es');
  const [activeSection, setActiveSection] = useState('sobre-mi');

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    const sections = ['sobre-mi', 'experiencia', 'stack', 'proyectos', 'contacto']
      .map(id => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'sobre-mi', label: t('nav.about') },
    { id: 'experiencia', label: t('nav.experience') },
    { id: 'stack', label: t('nav.technologies') },
    { id: 'proyectos', label: t('nav.projects') },
    { id: 'contacto', label: t('sections.contactNav') },
  ];

  return (
    <header className="sticky top-0 z-[100] backdrop-blur-[20px] saturate-[140%] bg-[var(--bg-blur-header)] border-b border-[var(--line)]">
      <div className="header-inner">
        {/* Logo */}
        <a
          href="#sobre-mi"
          onClick={(e) => handleScroll(e, 'sobre-mi')}
          className="flex items-center gap-2.5 font-medium text-[var(--ink)] shrink-0"
        >
          <span className="w-7 h-7 bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center font-serif text-base italic rounded-[6px] shrink-0">
            G
          </span>
          <span className="text-sm">Gabriel Cornide</span>
          <span className="font-mono header-tagline text-[11px] text-[var(--ink-4)] ml-1.5">/ frontend</span>
        </a>

        {/* Nav — solo en lg+ */}
        <nav className="header-nav">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              className={`py-2 px-3.5 text-[13px] rounded-[6px] transition-[color,background] duration-150 hover:text-[var(--ink)] hover:bg-[var(--bg-hover)] ${
                activeSection === item.id ? 'text-[var(--ink)]' : 'text-[var(--ink-3)]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleLanguage}
            className="w-[34px] h-[34px] bg-transparent border border-[var(--line-strong)] rounded-[6px] text-[var(--ink-2)] flex items-center justify-center cursor-pointer text-[11px] font-mono tracking-[0.06em]"
          >
            {currentLang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-[34px] h-[34px] bg-transparent border border-[var(--line-strong)] rounded-[6px] text-[var(--ink-2)] flex items-center justify-center cursor-pointer transition-colors duration-150 hover:text-[var(--ink)] hover:border-[var(--ink-4)]"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href={currentLang === 'en' ? '/cvEn/Gabriel_Cornide_Frontend_CV.pdf' : '/cvEs/Gabriel_Cornide_Frontend_CV.pdf'}
            download
            className="header-cv-btn bg-[var(--ink)] text-[var(--bg)] py-2 px-4 text-[13px] font-medium rounded-[6px] flex items-center gap-2 whitespace-nowrap"
          >
            <span className="header-cv-text">{t('sections.downloadCV')}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16"/></svg>
          </a>
        </div>
      </div>
    </header>
  );
}
