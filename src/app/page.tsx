"use client";
import Header from "@/components/layout/Header";
import TimelineExperience from "@/components/sections/TimelineExperience";
import TechIconsSection from "@/components/sections/TechIconsSection";
import ProjectCarousel from "@/components/carousels/ProjectCarousel";
import ContactSection from "@/components/sections/ContactSection";
import { experiences } from "@/data/experiences";
import { techCategories } from "@/data/techCategories";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ── HERO ── */}
        <section
          id="sobre-mi"
          className="pt-[120px] pb-[100px] relative overflow-hidden"
        >
          {/* Accent radial glow */}
          <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] pointer-events-none bg-[radial-gradient(circle,rgba(249,115,22,0.12)_0%,transparent_60%)] z-0" />

          <div className="container relative z-[2]">
            <div className="grid grid-cols-[1.4fr_1fr] gap-20 items-center hero-grid-responsive">
              {/* Left */}
              <div>
                {/* Availability badge */}
                <div className="inline-flex items-center gap-2 py-1.5 px-3 bg-[var(--bg-elev)] border border-[var(--line-strong)] rounded-full font-mono text-[11px] text-[var(--ink-3)] tracking-[0.04em] mb-7">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-[pulse-green_2s_infinite]" />
                  Disponible para nuevas oportunidades · Buenos Aires, AR
                </div>

                <h1 className="font-serif font-normal leading-[0.95] tracking-[-0.04em] mb-7 text-[clamp(60px,8vw,104px)] text-[var(--ink)]">
                  Gabriel
                  <br />
                  <em className="italic text-[var(--ink-3)]">Cornide.</em>
                </h1>

                <p className="text-[18px] leading-[1.6] text-[var(--ink-2)] max-w-[560px] mb-[18px]">
                  Desarrollador{" "}
                  <strong className="text-[var(--ink)] font-medium">
                    Frontend Semi-Senior
                  </strong>{" "}
                  especializado en React, Next.js y TypeScript, construyendo
                  interfaces escalables, performantes y responsivas.
                </p>
                <p className="text-[15px] leading-[1.65] text-[var(--ink-4)] max-w-[540px] mb-9">
                  Complemento el stack con conocimiento en{" "}
                  <strong className="text-[var(--ink-2)] font-medium">
                    Back-End
                  </strong>{" "}
                  (Node.js, MongoDB) e integración de{" "}
                  <strong className="text-[var(--ink-2)] font-medium">
                    React Native
                  </strong>{" "}
                  para mobile.
                </p>

                <div className="flex gap-2.5 items-center mb-12 flex-wrap">
                  <a
                    href="#proyectos"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("proyectos")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-[var(--ink)] text-[var(--bg)] py-[14px] px-[22px] text-sm font-medium rounded-lg inline-flex items-center gap-2.5 no-underline"
                  >
                    Ver proyectos
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                  </a>
                  <a
                    href="#contacto"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("contacto")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-transparent text-[var(--ink-2)] border border-[var(--line-strong)] py-[14px] px-[22px] text-sm rounded-lg no-underline"
                  >
                    Contactar
                  </a>
                </div>

                {/* Socials */}
                <div className="flex gap-2">
                  {[
                    {
                      href: "https://github.com/Cornicheli",
                      label: "GitHub",
                      icon: (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.35.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.97 10.97 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://www.linkedin.com/in/gabriel-cornide-99624923b/",
                      label: "LinkedIn",
                      icon: (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 17.34H5.67V9.67h2.67v7.67zM7 8.33a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.34 9H15.67v-3.74c0-.89-.02-2.04-1.24-2.04-1.24 0-1.43.97-1.43 1.97v3.81H10.34V9.67h2.55v1.05h.04c.36-.67 1.22-1.38 2.51-1.38 2.69 0 3.18 1.77 3.18 4.07v3.93z" />
                        </svg>
                      ),
                    },
                    {
                      href: "mailto:gabrielcornide@gmail.com",
                      label: "Email",
                      icon: (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M4 6h16v12H4z" />
                          <path d="M4 7l8 6 8-6" />
                        </svg>
                      ),
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-[38px] h-[38px] bg-[var(--bg-elev)] border border-[var(--line-strong)] rounded-lg flex items-center justify-center text-[var(--ink-3)] transition-all duration-200 hover:text-[var(--ink)] hover:border-[var(--ink-4)] hover:-translate-y-0.5"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: ID Card */}
              <div className="relative">
                <div className="bg-[linear-gradient(180deg,var(--bg-elev)_0%,var(--bg-card)_100%)] border border-[var(--line-strong)] rounded-2xl p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.02)_inset]">
                  <div className="flex justify-between items-center pb-[18px] mb-5 border-b border-dashed border-[var(--line-strong)]">
                    <span className="font-mono text-[10px] text-[var(--ink-4)] tracking-[0.14em] uppercase">
                      {"// IDENTITY"}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.14em]">
                      ● LIVE
                    </span>
                  </div>

                  {/* Avatar */}
                  <div id="hero-avatar" className="w-full aspect-[1.05] bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.18),transparent_50%),linear-gradient(135deg,#1a1a1a_0%,#0a0a0a_100%)] border border-[var(--line-strong)] rounded-[10px] mb-[18px] flex items-center justify-center overflow-hidden relative">
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                          "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                        opacity: 0.4,
                        maskImage:
                          "radial-gradient(circle at center, black 20%, transparent 70%)",
                        WebkitMaskImage:
                          "radial-gradient(circle at center, black 20%, transparent 70%)",
                      }}
                    />
                    <span className="font-serif italic text-[120px] leading-none text-[#fafafa] relative z-[1] tracking-[-0.04em]">
                      gc
                    </span>
                  </div>

                  {/* Rows */}
                  {[
                    { k: "name", v: "Gabriel Cornide" },
                    { k: "role", v: "Frontend Semi-Sr" },
                    { k: "focus", v: "React · Next · IA · TS" },
                    { k: "based", v: "Buenos Aires, AR · UTC−03" },
                    { k: "status", v: "● open to work", accent: true },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="grid grid-cols-[70px_1fr] py-[9px] border-b border-[var(--line)] font-mono text-[11px]"
                    >
                      <span className="text-[var(--ink-4)] tracking-[0.04em]">
                        {row.k}
                      </span>
                      <span
                        className={
                          row.accent
                            ? "text-[var(--accent)]"
                            : "text-[var(--ink-2)]"
                        }
                      >
                        {row.v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-4 border border-[var(--line)] bg-[var(--bg-elev)] rounded-xl overflow-hidden stats-grid-responsive">
              {[
                { num: "3", suffix: "+", label: "Años shipping" },
                { num: "4", suffix: "", label: "Empresas" },
                { num: "12", suffix: "", label: "Apps en producción" },
                {
                  num: "2",
                  suffix: "",
                  label: "Industrias · Fintech / Retail",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`py-[26px] px-7 stat-item-responsive ${i < 3 ? "border-r border-[var(--line)]" : ""}`}
                >
                  <div className="font-serif text-[48px] font-normal tracking-[-0.03em] leading-none text-[var(--ink)]">
                    {stat.num}
                    <em className="italic text-[var(--accent)]">
                      {stat.suffix}
                    </em>
                  </div>
                  <div className="font-mono text-[10px] text-[var(--ink-4)] tracking-[0.14em] uppercase mt-3">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experiencia" className="section">
          <div className="container">
            <div className="flex justify-between items-end flex-wrap gap-6">
              <div>
                <span className="section-label">
                  <span className="dot" />
                  &nbsp;01 / Experiencia
                </span>
                <h2 className="section-title">
                  Trayectoria <em>profesional.</em>
                </h2>
                <p className="section-sub">
                  Cuatro empresas. Fintech, retail y e-commerce. Producción
                  siempre, no demos.
                </p>
              </div>
              <div className="font-mono text-[11px] text-[var(--ink-4)] tracking-[0.06em]">
                2023 → presente · 7 roles
              </div>
            </div>
            <TimelineExperience experiences={experiences} />
          </div>
        </section>

        {/* ── STACK ── */}
        <section id="stack" className="section">
          <div className="container">
            <span className="section-label">
              <span className="dot" />
              &nbsp;02 / Stack
            </span>
            <h2 className="section-title">
              Stack <em>tecnológico.</em>
            </h2>
            <p className="section-sub">
              Herramientas elegidas con propósito. Probadas en producción, no
              checklist de CV.
            </p>
            <TechIconsSection categories={techCategories} />
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="proyectos" className="section">
          <div className="container">
            <span className="section-label">
              <span className="dot" />
              &nbsp;03 / Proyectos
            </span>
            <h2 className="section-title">
              Proyectos <em>full-stack.</em>
            </h2>
            <p className="section-sub">
              Construcciones recientes. Diseño + ingeniería de extremo a
              extremo.
            </p>
            <ProjectCarousel />
          </div>
        </section>

        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="py-7 border-t border-[var(--line)]">
        <div className="max-w-[1200px] mx-auto px-12 flex justify-between items-center font-mono text-[11px] text-[var(--ink-5)] tracking-[0.06em] flex-wrap gap-2">
          <span>© 2026 — Gabriel Cornide</span>
          <span>Buenos Aires, AR · Crafted with care</span>
        </div>
      </footer>
    </>
  );
}
