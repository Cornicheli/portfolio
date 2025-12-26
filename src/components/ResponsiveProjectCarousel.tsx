"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { projectImages } from "@/projectImages";

const Carousel = dynamic(() => import("@/components/Carousel"), {
  loading: () => (
    <div className="h-[250px] lg:h-[350px] flex items-center justify-center">
      <div className="animate-pulse text-white">Cargando proyectos...</div>
    </div>
  ),
  ssr: false,
});

export default function ResponsiveProjectCarousel() {
  // SSR-safe: inicializar con default desktop (3 slides)
  const [widthDimension, setWidthDimension] = useState(3);

  useEffect(() => {
    const getSlideCount = () => {
      return window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    };

    // Establecer valor inicial en el cliente
    setWidthDimension(getSlideCount());

    // Manejar resize
    const handleResize = () => {
      setWidthDimension(getSlideCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="transition-all duration-700 ease-in-out mt-10 h-[250px] lg:h-[350px]">
      <Carousel
        items={projectImages.map((img) => (
          <Image
            src={img.src}
            alt={img.alt}
            width={550}
            height={550}
            className="rounded my-1"
            key={img.src}
          />
        ))}
        autoplay={true}
        slidesPerView={widthDimension}
      />
    </div>
  );
}
