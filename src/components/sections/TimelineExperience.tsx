"use client";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { ImagenesJobs } from "@/data/experienceJobs";
import ExperienceModal from "@/components/ui/ExperienceModal";

interface Experience {
  company: string;
  id: string;
  roleKey: string;
  locationKey: string;
  date: string;
  isCurrent?: boolean;
  isFreelance?: boolean;
  stack: string[];
  taskKeys: string[];
}

interface Props {
  experiences: Experience[];
}

export default function TimelineExperience({ experiences }: Props) {
  const { t } = useTranslation("common");
  const [activeIdx, setActiveIdx] = useState(0);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [selected, setSelected] = useState<Experience | null>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);

  const hasImages = (id: string) => ImagenesJobs.some((img) => img.id === id);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, idx: number) => {
    const el = rowRefs.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const selectedExp = selected ?? null;

  return (
    <>
      <div
        className="mt-20 border-t border-[var(--line)]"
        onMouseLeave={() => {
          setActiveIdx(0);
          setCursor(null);
        }}
      >
        {experiences.map((exp, idx) => {
          const isActive = activeIdx === idx;
          const clickable = hasImages(exp.id);
          const isFirstProfessional = idx === 0;
          const isFirstFreelance =
            exp.isFreelance && !experiences[idx - 1]?.isFreelance;

          return (
            <div key={idx}>
              {isFirstProfessional && (
                <div className="border-b border-[var(--line)] py-6 grid grid-cols-[180px_1fr_auto] gap-12">
                  <div />
                  <div>
                    <span className="font-mono text-[13px] tracking-[0.06em] text-[var(--ink-3)]">
                      Relación de dependencia
                    </span>
                  </div>
                </div>
              )}
              {isFirstFreelance && (
                <div className="border-b border-[var(--line)] py-6 grid grid-cols-[180px_1fr_auto] gap-12">
                  <div />
                  <div>
                    <span className="font-mono text-[13px] tracking-[0.06em] text-[var(--ink-3)]">
                      Freelance
                    </span>
                  </div>
                </div>
              )}
              <article
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                className={`exp-row-item grid grid-cols-[180px_1fr_auto] gap-12 border-b border-[var(--line)] items-start relative overflow-hidden transition-all duration-[250ms] py-9 ${
                  isActive ? "bg-[var(--bg-elev)] px-3" : "bg-transparent px-0"
                } ${clickable ? "cursor-pointer" : "cursor-default"}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => setCursor(null)}
                onClick={() => clickable && setSelected(exp)}
              >
                {/* Cursor spotlight */}
                {isActive && cursor && (
                  <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                      background: `radial-gradient(320px circle at ${cursor.x}px ${cursor.y}px, rgba(249,115,22,0.07) 0%, transparent 70%)`,
                      transition: "background 0.05s",
                    }}
                  />
                )}

                {/* Left accent bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] z-[1] transition-colors duration-[250ms] ${isActive ? "bg-[var(--accent)]" : "bg-transparent"}`}
                />

                {/* Meta */}
                <div className="font-mono text-[11px] pt-1 relative z-[1]">
                  <div
                    className={`mb-1 ${exp.isCurrent ? "text-[var(--accent)]" : "text-[var(--ink-2)]"}`}
                  >
                    {exp.isCurrent ? `● ${exp.date}` : exp.date}
                  </div>
                  <div className="text-[var(--ink-4)]">
                    {t(exp.locationKey)}
                  </div>
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
                      <li
                        key={i}
                        className="text-[var(--ink-3)] text-sm leading-[1.55] py-1 pl-5 relative"
                      >
                        <span className="absolute left-0 top-3 w-2 h-px bg-[var(--ink-5)] block" />
                        {t(key)}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {exp.stack.map((s, i) => (
                      <span
                        key={i}
                        className="font-mono text-[11px] text-[var(--ink-3)] py-[3px] px-[9px] border border-[var(--line-strong)] bg-[var(--bg-card)] rounded-[4px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right indicator */}
                <div
                  className={`self-center relative z-[1] transition-all duration-[250ms] ${isActive ? "opacity-100" : "opacity-0"}`}
                >
                  {clickable ? (
                    <div
                      className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em]"
                      style={{ color: "var(--accent)" }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 21V9" />
                      </svg>
                      Ver fotos
                    </div>
                  ) : (
                    <span style={{ color: "var(--ink-5)", fontSize: 20 }}>
                      ↗
                    </span>
                  )}
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <ExperienceModal
        experience={selectedExp}
        role={selectedExp ? t(selectedExp.roleKey) : ""}
        location={selectedExp ? t(selectedExp.locationKey) : ""}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
