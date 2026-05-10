"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { projects, Project } from "@/data/projects";
import ProjectModal from "@/components/ui/ProjectModal";

export default function ProjectCarousel() {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setSlidesPerView(window.innerWidth > 1024 ? 3 : window.innerWidth > 640 ? 2 : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="mt-20 pb-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView={slidesPerView}
          spaceBetween={24}
          style={{ paddingBottom: 40 }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <article
                onClick={() => setSelected(project)}
                className="bg-[var(--bg-elev)] border border-[var(--line)] rounded-[14px] overflow-hidden transition-all duration-300 cursor-pointer flex flex-col h-full hover:border-[var(--accent-line)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]"
              >
                {/* Browser bar */}
                <div className="bg-[var(--bg-card)] py-2.5 px-3.5 flex items-center gap-1.5 border-b border-[var(--line)]">
                  <span className="w-[9px] h-[9px] rounded-full bg-[var(--line-strong)] inline-block" />
                  <span className="w-[9px] h-[9px] rounded-full bg-[var(--line-strong)] inline-block" />
                  <span className="w-[9px] h-[9px] rounded-full bg-[var(--line-strong)] inline-block" />
                  <span className="ml-3 font-mono text-[10.5px] text-[var(--ink-4)]">
                    {project.url}
                  </span>
                </div>

                {/* Preview image */}
                <div className="aspect-[16/10] relative overflow-hidden bg-[var(--bg)] group">
                  <Image
                    src={project.previewImages[0]}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: "var(--bg-overlay-hover)" }}>
                    <span className="font-mono text-[11px] tracking-[0.1em] uppercase flex items-center gap-2"
                      style={{ color: "var(--ink-2)" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                      Ver galería
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="py-[22px] px-6 flex-1 flex flex-col">
                  <div className="font-mono text-[10px] text-[var(--ink-5)] tracking-[0.14em]">
                    {project.num}
                  </div>
                  <h3 className="font-serif text-[26px] leading-[1.1] tracking-[-0.02em] my-1.5 text-[var(--ink)]">
                    {project.title}
                  </h3>
                  <p className="text-[var(--ink-3)] text-[13.5px] leading-[1.55] mb-4 flex-1">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-[5px]">
                    {project.stack.map((s, i) => (
                      <span key={i} className="font-mono text-[11px] text-[var(--ink-3)] py-[3px] px-[9px] border border-[var(--line-strong)] bg-[var(--bg-elev)] rounded-[4px]">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-3.5 border-t border-[var(--line)] flex justify-between items-center font-mono text-[11px] text-[var(--ink-4)]">
                    <span>{project.year} · {project.role}</span>
                    <div className="flex items-center gap-2.5">
                      {project.links?.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-[var(--ink-4)] text-[11px] font-mono border-b border-[var(--line-strong)] pb-px transition-[color,border-color] duration-150 hover:text-[var(--ink)] hover:border-[var(--ink-4)]"
                        >
                          {link.label}
                        </a>
                      ))}
                      {!project.links && (
                        <span className="text-[var(--accent)] flex items-center gap-1.5">
                          <span className="w-[5px] h-[5px] bg-[var(--accent)] rounded-full inline-block" />
                          Live
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
