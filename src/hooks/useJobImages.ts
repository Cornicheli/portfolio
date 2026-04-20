"use client";
import { useState, useCallback } from "react";
import { JobImage } from "@/interfaces";
import { ImagenesJobs } from "@/experiencieJobs";

export function useJobImages() {
  const [imagenesCarrusel, setImagenesCarrusel] =
    useState<JobImage[]>(ImagenesJobs);

  const selectImagesByJobId = useCallback((id: string) => {
    const imgs = ImagenesJobs.filter(
      (img) => img.id.toLowerCase() === id.toLowerCase()
    );
    setImagenesCarrusel(imgs);
  }, []);

  const getImageDimension = () => {
    if (imagenesCarrusel.length > 0 && imagenesCarrusel[0].type === "mobile") {
      return "w-full h-[450px] lg:w-[650px] lg:h-[450px]";
    }
    return "w-full h-[450px] lg:w-[650px] lg:h-[450px]";
  };

  return {
    imagenesCarrusel,
    selectImagesByJobId,
    imageDimension: getImageDimension(),
  };
}
