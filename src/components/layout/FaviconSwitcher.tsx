"use client";
import { useEffect } from "react";

export default function FaviconSwitcher() {
  useEffect(() => {
    const originalFavicon = "/faviconBlack.ico";
    const redFavicon = "/faviconRed.ico";

    let heroVisible = true;
    let windowFocused = true;

    const setFavicon = () => {
      let favicon = document.querySelector(
        "link[rel='icon']"
      ) as HTMLLinkElement | null;
      if (!favicon) {
        favicon = document.createElement("link") as HTMLLinkElement;
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
      const isActive = heroVisible && windowFocused && !document.hidden;
      favicon.href = isActive ? originalFavicon : redFavicon;
    };

    const handleVisibilityChange = () => setFavicon();
    const handleFocus = () => { windowFocused = true; setFavicon(); };
    const handleBlur = () => { windowFocused = false; setFavicon(); };

    const target = document.getElementById("hero-avatar");
    let observer: IntersectionObserver | null = null;
    if (target) {
      observer = new IntersectionObserver(
        ([entry]) => { heroVisible = entry.isIntersecting; setFavicon(); },
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
