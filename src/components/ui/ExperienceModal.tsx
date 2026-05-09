"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ImagenesJobs } from "@/data/experienceJobs";

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
  experience: Experience | null;
  role: string;
  location: string;
  onClose: () => void;
}

export default function ExperienceModal({ experience, role, location, onClose }: Props) {
  const [current, setCurrent] = useState(0);

  const images = experience
    ? ImagenesJobs.filter((img) => img.id === experience.id)
    : [];

  const isMobile = images[current]?.type === "mobile";

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    setCurrent(0);
  }, [experience?.id]);

  useEffect(() => {
    if (!experience) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [experience, onClose, prev, next]);

  if (!experience || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(10px)", background: "rgba(10,10,10,0.82)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full flex flex-col rounded-2xl overflow-hidden"
        style={{
          maxWidth: isMobile ? 520 : 960,
          height: "min(88vh, 680px)",
          background: "var(--bg-elev)",
          border: "1px solid var(--line-strong)",
          boxShadow: "0 40px 120px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.03) inset",
          transition: "max-width 0.3s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b shrink-0"
          style={{ background: "var(--bg-card)", borderColor: "var(--line)" }}
        >
          <div className="flex items-center gap-3">
            {/* Accent dot */}
            <span
              className="w-[6px] h-[6px] rounded-full shrink-0"
              style={{ background: experience.isCurrent ? "var(--accent)" : "var(--line-strong)" }}
            />
            <div>
              <span className="font-serif text-[15px]" style={{ color: "var(--ink)" }}>
                {experience.company}
              </span>
              <span className="font-mono text-[11px] ml-3" style={{ color: "var(--ink-4)" }}>
                {role}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]" style={{ color: "var(--ink-5)" }}>
              {current + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150"
              style={{ background: "var(--bg-hover)", color: "var(--ink-4)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-4)"; }}
              aria-label="Cerrar"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Main image ── */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{ background: "var(--bg)", minHeight: 0 }}
        >
          <Image
            key={images[current]?.src}
            src={images[current]?.src}
            alt={images[current]?.alt}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, 960px"
            priority
          />

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center z-10 transition-all duration-150"
                style={{
                  background: "rgba(17,17,17,0.85)",
                  border: "1px solid var(--line-strong)",
                  color: "var(--ink-3)",
                  backdropFilter: "blur(4px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--ink-4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-3)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line-strong)";
                }}
                aria-label="Anterior"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center z-10 transition-all duration-150"
                style={{
                  background: "rgba(17,17,17,0.85)",
                  border: "1px solid var(--line-strong)",
                  color: "var(--ink-3)",
                  backdropFilter: "blur(4px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--ink-4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-3)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line-strong)";
                }}
                aria-label="Siguiente"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* ── Thumbnail strip ── */}
        {images.length > 1 && (
          <div
            className="flex gap-2 px-4 py-3 overflow-x-auto shrink-0 border-t"
            style={{ borderColor: "var(--line)", background: "var(--bg-card)" }}
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="relative shrink-0 rounded-md overflow-hidden transition-all duration-150"
                style={{
                  width: img.type === "mobile" ? 32 : 72,
                  height: 46,
                  border: i === current
                    ? "2px solid var(--accent)"
                    : "2px solid var(--line-strong)",
                  opacity: i === current ? 1 : 0.45,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </button>
            ))}
          </div>
        )}

        {/* ── Footer: stack + date + location ── */}
        <div
          className="flex items-center justify-between gap-4 px-5 py-3 shrink-0 border-t flex-wrap"
          style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}
        >
          <div className="flex flex-wrap gap-1.5">
            {experience.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[11px] py-[3px] px-[9px] rounded-[4px]"
                style={{
                  border: "1px solid var(--line-strong)",
                  background: "var(--bg-card)",
                  color: "var(--ink-3)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="font-mono text-[11px] flex items-center gap-3" style={{ color: "var(--ink-4)" }}>
            <span>{location}</span>
            <span
              className="py-[3px] px-[9px] rounded-[4px]"
              style={{
                color: experience.isCurrent ? "var(--accent)" : "var(--ink-4)",
                border: `1px solid ${experience.isCurrent ? "var(--accent-line)" : "var(--line-strong)"}`,
                background: experience.isCurrent ? "var(--accent-soft)" : "transparent",
              }}
            >
              {experience.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
