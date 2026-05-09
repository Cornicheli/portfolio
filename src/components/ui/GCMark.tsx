"use client";
import { useEffect, useState } from "react";

export default function GCMark() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [windowFocused, setWindowFocused] = useState(true);

  useEffect(() => {
    const target = document.getElementById("hero-avatar");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(target);

    const onFocus = () => setWindowFocused(true);
    const onBlur = () => setWindowFocused(false);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      observer.disconnect();
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  const isActive = heroVisible && windowFocused;

  return (
    <div
      className="fixed bottom-8 right-8 z-50 pointer-events-none select-none"
      style={{
        color: isActive ? "var(--ink)" : "var(--accent)",
        transition: "color 0.4s ease",
        opacity: 0.85,
      }}
    >
      <span className="font-serif italic text-[48px] leading-none tracking-[-0.04em]">
        gc
      </span>
    </div>
  );
}
