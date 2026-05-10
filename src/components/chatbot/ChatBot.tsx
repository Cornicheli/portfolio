"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const { t, i18n } = useTranslation();

  const suggestions: string[] = t("chatbot.suggestions", { returnObjects: true }) as string[];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t("chatbot.welcome") },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const popupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show greeting popup after 2s on mount
  useEffect(() => {
    const show = setTimeout(() => setShowPopup(true), 2000);
    return () => clearTimeout(show);
  }, []);

  // Auto-hide popup after 6s of being visible
  useEffect(() => {
    if (showPopup) {
      popupTimerRef.current = setTimeout(() => setShowPopup(false), 6000);
    }
    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, [showPopup]);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages((prev) => {
      const rest = prev.slice(1);
      return [{ role: "assistant", content: t("chatbot.welcome") }, ...rest];
    });
  }, [i18n.language, t]);

  // Auto-scroll on new messages or when suggestions appear
  useEffect(() => {
    if (!isOpen) return;
    // Small delay so suggestions have time to render before scrolling
    const t = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => clearTimeout(t);
  }, [messages, isLoading, isOpen]);

  function openChat() {
    setShowPopup(false);
    setIsOpen(true);
  }

  async function handleSubmit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      const reply = data.reply ?? (i18n.language === "es" ? "No pude obtener una respuesta." : "Sorry, I couldn't get a response.");

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      const errMsg = i18n.language === "es"
        ? "Algo salió mal. Intentá de nuevo."
        : "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: errMsg }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 200 }}>
      {/* Chat Panel */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "68px",
            right: 0,
            width: "340px",
            background: "var(--bg-blur-panel)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid var(--line-strong)",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            animation: "chatSlideUp 0.2s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 16px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-instrument-serif), Georgia, serif",
                fontStyle: "italic",
                fontSize: "16px",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              gc
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)" }}>
                {t("chatbot.title")}
              </div>
              <div style={{ fontSize: "11px", color: "var(--ink-4)", fontFamily: "var(--font-geist-mono), monospace" }}>
                {t("chatbot.subtitle")}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--ink-4)",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-4)")}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              maxHeight: "320px",
              overflowY: "auto",
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "8px 12px",
                    borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: msg.role === "user" ? "var(--accent)" : "var(--bg-elev)",
                    border: msg.role === "user" ? "none" : "1px solid var(--line)",
                    color: msg.role === "user" ? "#fff" : "var(--ink-2)",
                    fontSize: "13px",
                    lineHeight: "1.5",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "14px 14px 14px 4px",
                    background: "var(--bg-elev)",
                    border: "1px solid var(--line)",
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--ink-4)",
                        animation: `typingBounce 1.2s ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Suggestion pills */}
            {messages.length === 1 && !isLoading && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSubmit(s)}
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "11px",
                      padding: "4px 9px",
                      border: "1px solid var(--line-strong)",
                      borderRadius: "4px",
                      background: "transparent",
                      color: "var(--ink-3)",
                      cursor: "pointer",
                      transition: "border-color 0.15s, color 0.15s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent-line)";
                      e.currentTarget.style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--line-strong)";
                      e.currentTarget.style.color = "var(--ink-3)";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(input);
            }}
            style={{
              padding: "10px 14px 14px",
              borderTop: "1px solid var(--line)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chatbot.placeholder")}
              disabled={isLoading}
              style={{
                flex: 1,
                background: "var(--bg-card)",
                border: "1px solid var(--line-strong)",
                borderRadius: "8px",
                padding: "8px 12px",
                color: "var(--ink)",
                fontSize: "13px",
                outline: "none",
                fontFamily: "inherit",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-line)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line-strong)")}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                border: "none",
                background: input.trim() && !isLoading ? "var(--accent)" : "var(--bg-hover)",
                color: input.trim() && !isLoading ? "#fff" : "var(--ink-5)",
                cursor: input.trim() && !isLoading ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Greeting popup */}
      {showPopup && !isOpen && (
        <div
          onClick={openChat}
          style={{
            position: "absolute",
            bottom: "68px",
            right: 0,
            width: "260px",
            background: "var(--bg-blur-panel)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid var(--line-strong)",
            borderRadius: "16px",
            padding: "14px 16px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            cursor: "pointer",
            animation: "chatSlideUp 0.3s ease-out",
          }}
        >
          {/* Tail pointing to button */}
          <div
            style={{
              position: "absolute",
              bottom: "-7px",
              right: "20px",
              width: "14px",
              height: "14px",
              background: "var(--bg-blur-panel)",
              border: "1px solid var(--line-strong)",
              borderTop: "none",
              borderLeft: "none",
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-instrument-serif), Georgia, serif",
                fontStyle: "italic",
                fontSize: "14px",
                color: "#fff",
                flexShrink: 0,
                marginTop: "1px",
              }}
            >
              gc
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--ink)", marginBottom: "4px" }}>
                {t("chatbot.title")}
                <span
                  style={{
                    marginLeft: "6px",
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "10px",
                    color: "var(--ink-4)",
                    fontWeight: 400,
                  }}
                >
                  {t("chatbot.subtitle")}
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "var(--ink-3)", lineHeight: "1.5" }}>
                {t("chatbot.welcome")}
              </div>
            </div>
          </div>
          {/* Dismiss button */}
          <button
            onClick={(e) => { e.stopPropagation(); setShowPopup(false); }}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--ink-5)",
              padding: "2px",
              display: "flex",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-5)")}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Float button */}
      <button
        onClick={() => {
          setShowPopup(false);
          setIsOpen((v) => !v);
        }}
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          border: "none",
          background: "var(--accent)",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 0 rgba(249,115,22,0.4), 0 8px 24px rgba(249,115,22,0.3)",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 0 0 6px rgba(249,115,22,0.15), 0 8px 24px rgba(249,115,22,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 0 0 0 rgba(249,115,22,0.4), 0 8px 24px rgba(249,115,22,0.3)";
        }}
        aria-label={t("chatbot.ariaLabel")}
      >
        {isOpen ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 6h14M3 10h10M3 14h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
