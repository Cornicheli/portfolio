"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import SubTitle from "./fonts/SubTitle";
import { JobImage, TimelineExperienceProps } from "@/interfaces";
import { ImagenesJobs } from "@/experiencieJobs";
import { useState } from "react";
import CircleExperience from "./CircleExperience";

const CarrouselJobs = dynamic(() => import("./CarrouselJobs"), {
  loading: () => (
    <div className="w-full h-[450px] lg:w-[650px] lg:h-[450px] flex items-center justify-center">
      <div className="animate-pulse text-white">Cargando experiencia...</div>
    </div>
  ),
  ssr: false,
});

export default function TimelineExperience({
  experiences,
}: TimelineExperienceProps) {
  const [imagenesCarrusel, setImagenesCarrusel] =
    useState<JobImage[]>(ImagenesJobs);

  const getImagesById = (id: string) => {
    return ImagenesJobs.filter(
      (img) => img.id.toLowerCase() === id.toLowerCase()
    );
  };

  const onClickImg = (id: string) => {
    const imgs = getImagesById(id);
    setImagenesCarrusel(imgs);
  };

  const dimension =
    imagenesCarrusel.length > 0 && imagenesCarrusel[0].type === "mobile"
      ? "w-full h-[450px] lg:w-[650px] lg:h-[450px]"
      : "w-full h-[450px] lg:w-[650px] lg:h-[450px]";

  return (
    <div className="flex flex-col md:flex-col xl:flex-row bg-[#181818] justify-around transition-all duration-200 lg:flex-col items-center">
      <div className="relative">
        <div
          className="absolute left-4 top-0 bottom-0 w-1 bg-white rounded-full z-0 mt-2"
          style={{ zIndex: 0 }}
        />
        <ul className="space-y-8 relative z-10 flex-2 h-auto">
          {experiences.map((exp, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <CircleExperience />
              <div>
                <div className="flex items-center gap-2">
                  <button
                    id={exp.company}
                    className="cursor-pointer"
                    onClick={() => onClickImg(exp.id!)}
                  >
                    <SubTitle key={exp.id}>
                      {`${exp.company} · ${exp.role} · ${exp.location} · ${exp.date}`}
                    </SubTitle>
                  </button>
                </div>
                <ul className="list-disc ml-6 mt-2">
                  {exp.tasks.map((task, i) => (
                    <li key={i}>
                      <p className="text-[#F2F2F2] xl:text-lg font-lato">
                        {task}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`${dimension} transition-all duration-700 ease-in-out mt-10`}
      >
        <CarrouselJobs
          dimension={dimension}
          items={imagenesCarrusel.map((map) => (
            <div key={map.src} className={`${dimension} relative`}>
              <Image
                src={map.src}
                alt={map.alt}
                className="rounded object-contain"
                fill={true}
                sizes="(max-width: 768px) 100vw, 650px"
              />
            </div>
          ))}
          autoplay={true}
          slidesPerView={1}
        />
      </div>
    </div>
  );
}
