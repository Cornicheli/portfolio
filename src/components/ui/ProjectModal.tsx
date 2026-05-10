"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { projectImages } from "@/data/projectImages";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const [current, setCurrent] = useState(0);

  const images = project
    ? (() => {
        const fromData = projectImages.filter(
          (img) => img.id === project.id
        );
        return fromData.length > 0
          ? fromData.map((img) => img.src)
          : project.previewImages;
      })()
    : [];

  const prev = useCallback(() =>
    setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  const next = useCallback(() =>
    setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    setCurrent(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
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
  }, [project, onClose, prev, next]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(10px)", background: "var(--bg-overlay)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[960px] flex flex-col rounded-2xl overflow-hidden"
        style={{
          height: "min(88vh, 680px)",
          background: "var(--bg-elev)",
          border: "1px solid var(--line-strong)",
          boxShadow: "0 40px 120px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.03) inset",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header bar ── */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b shrink-0"
          style={{ background: "var(--bg-card)", borderColor: "var(--line)" }}
        >
          {/* Browser dots + URL */}
          <div className="flex items-center gap-1.5">
            <span className="w-[9px] h-[9px] rounded-full inline-block" style={{ background: "var(--line-strong)" }} />
            <span className="w-[9px] h-[9px] rounded-full inline-block" style={{ background: "var(--line-strong)" }} />
            <span className="w-[9px] h-[9px] rounded-full inline-block" style={{ background: "var(--line-strong)" }} />
            <span className="ml-3 font-mono text-[11px]" style={{ color: "var(--ink-4)" }}>
              {project.url}
            </span>
          </div>

          {/* Title + counter + close */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]" style={{ color: "var(--ink-5)" }}>
              {current + 1} / {images.length}
            </span>
            <span className="font-serif text-[15px]" style={{ color: "var(--ink-2)" }}>
              {project.title}
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150"
              style={{ background: "var(--bg-hover)", color: "var(--ink-4)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-4)";
              }}
              aria-label="Cerrar"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Main image ── */}
        <div className="relative flex-1 min-h-0 overflow-hidden" style={{ background: "var(--bg)", minHeight: 0 }}>
          <Image
            key={images[current]}
            src={images[current]}
            alt={`${project.title} ${current + 1}`}
            fill
            className="object-contain"
            sizes="960px"
            priority
          />

          {/* Prev arrow */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 z-10"
                style={{
                  background: "var(--bg-nav-btn)",
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

              {/* Next arrow */}
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 z-10"
                style={{
                  background: "var(--bg-nav-btn)",
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
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="relative shrink-0 w-[72px] h-[46px] rounded-md overflow-hidden transition-all duration-150"
                style={{
                  border: i === current
                    ? "2px solid var(--accent)"
                    : "2px solid var(--line-strong)",
                  opacity: i === current ? 1 : 0.45,
                }}
              >
                <Image
                  src={src}
                  alt={`thumb ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </button>
            ))}
          </div>
        )}

        {/* ── Footer: stack + links ── */}
        <div
          className="flex items-center justify-between gap-4 px-5 py-3 shrink-0 border-t flex-wrap"
          style={{ borderColor: "var(--line)", background: "var(--bg-elev)" }}
        >
          {/* Stack tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
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

          {/* Year · role + links */}
          <div className="flex items-center gap-4 font-mono text-[11px]" style={{ color: "var(--ink-4)" }}>
            <span>{project.year} · {project.role}</span>
            {project.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-150"
                style={{ color: "var(--ink-4)", borderBottom: "1px solid var(--line-strong)", paddingBottom: "1px" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "var(--ink-4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-4)";
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "var(--line-strong)";
                }}
              >
                {link.label}
              </a>
            ))}
            {!project.links && (
              <span style={{ color: "var(--accent)" }} className="flex items-center gap-1.5">
                <span className="w-[5px] h-[5px] rounded-full inline-block" style={{ background: "var(--accent)" }} />
                Live
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
