"use client";
import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';

interface Experience {
  company: string;
  id: string;
  roleKey: string;
  locationKey: string;
  date: string;
  isCurrent?: boolean;
  stack: string[];
  taskKeys: string[];
}

interface Props {
  experiences: Experience[];
}

export default function TimelineExperience({ experiences }: Props) {
  const { t } = useTranslation('common');
  const [activeIdx, setActiveIdx] = useState(0);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, idx: number) => {
    const el = rowRefs.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className="mt-20 border-t border-[var(--line)]"
      onMouseLeave={() => { setActiveIdx(0); setCursor(null); }}
    >
      {experiences.map((exp, idx) => {
        const isActive = activeIdx === idx;

        return (
          <article
            key={idx}
            ref={el => { rowRefs.current[idx] = el; }}
            className={`exp-row-item grid grid-cols-[180px_1fr_auto] gap-12 border-b border-[var(--line)] items-start relative overflow-hidden transition-all duration-[250ms] cursor-default py-9 ${
              isActive ? 'bg-[var(--bg-elev)] px-3' : 'bg-transparent px-0'
            }`}
            onMouseEnter={() => setActiveIdx(idx)}
            onMouseMove={e => handleMouseMove(e, idx)}
            onMouseLeave={() => setCursor(null)}
          >
            {/* Cursor spotlight */}
            {isActive && cursor && (
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(320px circle at ${cursor.x}px ${cursor.y}px, rgba(249,115,22,0.07) 0%, transparent 70%)`,
                  transition: 'background 0.05s',
                }}
              />
            )}

            {/* Left accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-[2px] z-[1] transition-colors duration-[250ms] ${isActive ? 'bg-[var(--accent)]' : 'bg-transparent'}`} />

            {/* Meta */}
            <div className="font-mono text-[11px] pt-1 relative z-[1]">
              <div className={`mb-1 ${exp.isCurrent ? 'text-[var(--accent)]' : 'text-[var(--ink-2)]'}`}>
                {exp.isCurrent ? `● ${exp.date}` : exp.date}
              </div>
              <div className="text-[var(--ink-4)]">{t(exp.locationKey)}</div>
            </div>

            {/* Content */}
            <div className="relative z-[1]">
              <h3 className="font-serif text-[28px] font-normal tracking-[-0.02em] leading-[1.1] mb-1 text-[var(--ink)]">
                {exp.company}
              </h3>
              <div className="text-[var(--ink-3)] text-sm mb-4">
                {t(exp.roleKey)}
              </div>
              <ul className="mb-4 p-0 list-none">
                {exp.taskKeys.map((key, i) => (
                  <li key={i} className="text-[var(--ink-3)] text-sm leading-[1.55] py-1 pl-5 relative">
                    <span className="absolute left-0 top-3 w-2 h-px bg-[var(--ink-5)] block" />
                    {t(key)}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {exp.stack.map((s, i) => (
                  <span key={i} className="font-mono text-[11px] text-[var(--ink-3)] py-[3px] px-[9px] border border-[var(--line-strong)] bg-[var(--bg-card)] rounded-[4px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className={`text-[20px] self-center transition-[color,transform] duration-[250ms] relative z-[1] ${
              isActive ? 'text-[var(--accent)] translate-x-1' : 'text-[var(--ink-5)] translate-x-0'
            }`}>
              ↗
            </div>
          </article>
        );
      })}
    </div>
  );
}
