"use client";
import { useState } from "react";
import { ArrowRight, Download, Send, CheckCircle2 } from "lucide-react";

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 17.34H5.67V9.67h2.67v7.67zM7 8.33a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.34 9H15.67v-3.74c0-.89-.02-2.04-1.24-2.04-1.24 0-1.43.97-1.43 1.97v3.81H10.34V9.67h2.55v1.05h.04c.36-.67 1.22-1.38 2.51-1.38 2.69 0 3.18 1.77 3.18 4.07v3.93z" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.35.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.97 10.97 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: `Nuevo mensaje de ${formData.name} — Portfolio`,
        botcheck: "",
      }),
    });

    const result = await response.json();

    if (result.success) {
      setFormStatus("success");
      setTimeout(() => {
        setFormStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    } else {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  return (
    <section id="contacto" className="section border-b-0">
      <div className="container">
        {/* Badge */}
        <div className="flex justify-center mb-16">
          <span className="section-label">
            <span className="dot" />
            04 / Contacto
          </span>
        </div>

        {/* Main card */}
        <div className="relative border border-[var(--line-strong)] bg-[var(--bg-blur-contact)] backdrop-blur-xl rounded-[32px] p-20 overflow-hidden contact-card-responsive">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[radial-gradient(ellipse,rgba(249,115,22,0.05)_0%,transparent_70%)] pointer-events-none z-0" />

          <div className="relative z-10 grid grid-cols-2 gap-24 items-center contact-grid-responsive">
            {/* ── Left column ── */}
            <div className="flex flex-col justify-center">
              <h2 className="font-serif font-normal text-[clamp(36px,4vw,58px)] leading-[1.1] tracking-[-0.03em] text-[var(--ink)] mb-7">
                En busca de nuevas experiencias. <br />
                <em className="italic text-[var(--ink-3)]">
                  Abierto a aprendizaje continuo.
                </em>
              </h2>

              <p className="text-[17px] leading-[1.65] text-[var(--ink-4)] mb-2.5 max-w-[440px]">
                Abierto a roles{" "}
                <strong className="text-[var(--ink-2)] font-medium">
                  Semi-Sr / Sr Frontend
                </strong>
                . Remoto o Buenos Aires. Especializado en React, Next.js,
                Typescript e IA.
              </p>
              <p className="text-[15px] text-[var(--ink-4)] mb-10">
                Respuesta garantizada en menos de 24 horas.
              </p>

              {/* CTAs */}
              <div className="flex gap-3 flex-wrap mb-12">
                <a
                  href="mailto:gabrielcornide@gmail.com"
                  className="bg-[var(--ink)] text-[var(--bg)] py-[14px] px-[22px] text-sm font-medium rounded-[10px] inline-flex items-center gap-2.5 no-underline transition-colors duration-200 whitespace-nowrap hover:bg-[var(--ink-2)]"
                >
                  gabrielcornide@gmail.com
                  <ArrowRight size={16} />
                </a>
                <a
                  href="/Gabriel_Cornide_Frontend_CV.pdf"
                  download
                  className="bg-transparent text-[var(--ink-2)] border border-[var(--line-strong)] py-[14px] px-[22px] text-sm font-medium rounded-[10px] inline-flex items-center gap-2.5 no-underline transition duration-200 whitespace-nowrap hover:border-[var(--ink-4)] hover:text-[var(--ink)]"
                >
                  Descargar CV
                  <Download size={16} />
                </a>
              </div>

              {/* Socials */}
              <div className="pt-7 border-t border-[var(--line)]">
                <p className="font-mono text-[10px] text-[var(--ink-5)] tracking-[0.2em] uppercase mb-4">
                  También en
                </p>
                <div className="flex gap-2.5">
                  {[
                    {
                      href: "https://www.linkedin.com/in/gabriel-cornide-99624923b/",
                      icon: <LinkedinIcon />,
                      label: "LinkedIn",
                    },
                    {
                      href: "https://github.com/Cornicheli",
                      icon: <GithubIcon />,
                      label: "GitHub",
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-[42px] h-[42px] rounded-full border border-[var(--line-strong)] bg-transparent flex items-center justify-center text-[var(--ink-4)] transition-all duration-200 hover:bg-[var(--bg-hover)] hover:text-[var(--ink)] hover:border-[var(--ink-5)]"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right column: Form ── */}
            <div>
              <div className="bg-[var(--bg-elev)] border border-[var(--line)] rounded-3xl p-10">
                <h3 className="text-[22px] font-medium text-[var(--ink)] mb-8">
                  Envíame un mensaje
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <input type="checkbox" name="botcheck" className="hidden" />
                  {/* Name + Email row */}
                  <div className="grid grid-cols-2 gap-4 form-grid-responsive">
                    {[
                      {
                        id: "name",
                        label: "Nombre",
                        type: "text",
                        placeholder: "Tu nombre",
                      },
                      {
                        id: "email",
                        label: "Email",
                        type: "email",
                        placeholder: "tu@email.com",
                      },
                    ].map((field) => (
                      <div key={field.id} className="flex flex-col gap-2">
                        <label
                          htmlFor={field.id}
                          className="font-mono text-[11px] text-[var(--ink-4)] tracking-[0.06em] uppercase"
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          required
                          placeholder={field.placeholder}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={handleChange}
                          className="bg-[var(--bg-card)] border border-[var(--line-strong)] rounded-[10px] py-3 px-4 text-[var(--ink)] text-sm outline-none transition-colors duration-200 w-full focus:border-[var(--ink-4)] placeholder:text-[var(--ink-5)]"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="font-mono text-[11px] text-[var(--ink-4)] tracking-[0.06em] uppercase"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Háblame sobre tu proyecto, oferta o idea..."
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-[var(--bg-card)] border border-[var(--line-strong)] rounded-[10px] py-3 px-4 text-[var(--ink)] text-sm outline-none resize-none transition-colors duration-200 w-full focus:border-[var(--ink-4)] placeholder:text-[var(--ink-5)]"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formStatus !== "idle"}
                    className={[
                      "w-full rounded-[10px] py-[15px] px-6 text-sm font-medium flex items-center justify-center gap-2.5 transition-all duration-200",
                      formStatus === "success"
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-not-allowed"
                        : formStatus === "error"
                          ? "bg-red-500/10 border border-red-500/30 text-red-400 cursor-not-allowed"
                          : formStatus === "submitting"
                            ? "bg-[var(--bg-hover)] border border-[var(--line-strong)] text-[var(--ink)] cursor-not-allowed opacity-70"
                            : "bg-[var(--bg-hover)] border border-[var(--line-strong)] text-[var(--ink)] cursor-pointer hover:bg-[var(--bg-card)]",
                    ].join(" ")}
                  >
                    {formStatus === "idle" && (
                      <>
                        Enviar mensaje <Send size={16} />
                      </>
                    )}
                    {formStatus === "submitting" && (
                      <>
                        <svg
                          className="animate-spin w-[18px] h-[18px]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Enviando...
                      </>
                    )}
                    {formStatus === "success" && (
                      <>
                        Mensaje enviado <CheckCircle2 size={16} />
                      </>
                    )}
                    {formStatus === "error" && (
                      <>
                        Error al enviar. Intenta de nuevo.
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
