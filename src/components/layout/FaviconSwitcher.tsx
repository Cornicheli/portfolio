"use client";
import { useEffect } from "react";

function createGCFavicon(color: string): string {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;

  // Background transparent
  ctx.clearRect(0, 0, 64, 64);

  // Draw "gc"
  ctx.fillStyle = color;
  ctx.font = "italic 700 44px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("gc", 32, 34);

  return canvas.toDataURL("image/png");
}

function setFaviconHref(href: string) {
  let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
  if (!favicon) {
    favicon = document.createElement("link") as HTMLLinkElement;
    favicon.rel = "icon";
    document.head.appendChild(favicon);
  }
  favicon.href = href;
}

export default function FaviconSwitcher() {
  useEffect(() => {
    const BLACK = "#0a0a0a";
    const ORANGE = "#f97316";

    let heroVisible = true;
    let windowFocused = true;

    const update = () => {
      const isActive = heroVisible && windowFocused && !document.hidden;
      setFaviconHref(createGCFavicon(isActive ? BLACK : ORANGE));
    };

    // Initial render
    update();

    const handleVisibilityChange = () => update();
    const handleFocus = () => { windowFocused = true; update(); };
    const handleBlur = () => { windowFocused = false; update(); };

    const target = document.getElementById("hero-avatar");
    let observer: IntersectionObserver | null = null;
    if (target) {
      observer = new IntersectionObserver(
        ([entry]) => { heroVisible = entry.isIntersecting; update(); },
        { threshold: 0.1 }
      );
      observer.observe(target);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      observer?.disconnect();
    };
  }, []);

  return null;
}
