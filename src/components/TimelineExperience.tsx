"use client";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import SubTitle from "./fonts/SubTitle";
import { JobImage, TimelineExperienceProps } from "@/interfaces";
import { ImagenesJobs } from "@/experiencieJobs";
import { useState } from "react";
import CarrouselJobs from "./CarrouselJobs";
import CircleExperience from "./CircleExperience";

export default function TimelineExperience({
  experiences,
}: TimelineExperienceProps) {
  const { t } = useTranslation('common');
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
      ? "w-full h-[500px] md:h-[550px] xl:w-full xl:h-[600px]"
      : "w-full h-[450px] md:h-[500px] xl:w-full xl:h-[550px]";

  return (
    <div className="w-full bg-[#0a0a0a]">
      <div className="flex flex-col xl:flex-row justify-between items-start gap-16 xl:gap-20 py-8 sm:py-12 xl:py-20 px-4 sm:px-6 md:px-8 xl:px-12 max-w-[1600px] mx-auto">
        {/* Timeline Column */}
        <div className="relative w-full xl:w-[58%]">
          <div
            className="absolute left-3 sm:left-4 md:left-6 top-0 bottom-0 w-[3px] bg-gradient-to-b from-white/40 via-white/20 to-white/10 rounded-full z-0"
            style={{ zIndex: 0 }}
          />
          <ul className="space-y-8 sm:space-y-12 relative z-10 pl-2">
            {experiences.map((exp, idx) => (
              <li key={idx} className="flex items-start gap-3 sm:gap-6 md:gap-8">
                <CircleExperience />
                <div
                  className={`rounded-2xl p-4 sm:p-6 md:p-8 xl:p-10 flex-1 transition-all duration-300 hover:bg-white/5 shadow-sm ${
                    idx % 2 === 0 ? 'bg-[#0a0a0a]' : 'bg-[#1a1a1a]'
                  }`}
                >
                  <button
                    id={exp.company}
                    className="cursor-pointer text-left w-full"
                    onClick={() => onClickImg(exp.id!)}
                  >
                    <SubTitle className="mb-2 sm:mb-4">
                      {exp.company}
                    </SubTitle>
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                      {`${t(exp.roleKey)} · ${t(exp.locationKey)}`}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm md:text-base mb-4 sm:mb-6">
                      {exp.date}
                    </p>
                  </button>
                  <ul className="space-y-3 sm:space-y-4 mt-3 sm:mt-5">
                    {exp.taskKeys.map((taskKey, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <span className="text-gray-400 mt-1">•</span>
                        <p className="text-gray-300 text-sm sm:text-base md:text-lg font-lato leading-relaxed flex-1">
                          {t(taskKey)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Carousel Column — hidden on very small screens */}
        <div className="hidden sm:block w-full xl:w-[40%] xl:sticky xl:top-24 self-start">
          <div className={`${dimension} transition-all duration-700 ease-in-out`}>
            <CarrouselJobs
              dimension={dimension}
              items={imagenesCarrusel.map((map) => (
                <Image
                  src={map.src}
                  alt={map.alt}
                  className={`${dimension} rounded-xl object-contain shadow-md`}
                  key={map.src}
                  fill={true}
                />
              ))}
              autoplay={true}
              slidesPerView={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
