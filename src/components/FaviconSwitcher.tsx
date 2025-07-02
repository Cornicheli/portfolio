"use client";
import { useEffect } from "react";

export default function FaviconSwitcher() {
  useEffect(() => {
    const originalFavicon = "/faviconBlack.ico";
    const redFavicon = "/faviconRed.ico";
    const handleVisibilityChange = () => {
      let favicon = document.querySelector(
        "link[rel='icon']"
      ) as HTMLLinkElement | null;
      if (!favicon) {
        favicon = document.createElement("link") as HTMLLinkElement;
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
      favicon.href = document.hidden ? redFavicon : originalFavicon;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return null;
}
