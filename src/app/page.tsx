"use client";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import Header from "@/components/Header";
import CircleContact from "@/components/CircleContact";
import Title from "@/components/fonts/Title";
import Paragraph from "@/components/fonts/Paragraph";
import TimelineExperience from "@/components/TimelineExperience";
import TechIconsSection from "@/components/TechIconsSection";
import Carousel from "@/components/Carousel";

import fullstack from "@./public/images/fullstack.webp";
import githubW from "@./public/icons/githubW.png";
import emailW from "@./public/icons/emailW.png";
import linkedinW from "@./public/icons/linkedinW.png";

import { experiences } from "@/experiences";
import { techCategories } from "@/techCategories";
import { projectImages } from "@/projectImages";

export default function Home() {
  const { t } = useTranslation('common');
  const [widthDimension, setWidthDimension] = useState(
    typeof window !== "undefined"
      ? window.innerWidth > 1024
        ? 3
        : window.innerWidth > 768
        ? 2
        : 1
      : 3
  );

  useEffect(() => {
    const handleResize = () => {
      setWidthDimension(
        window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      <section
        id="sobre-mi"
        className="flex-col flex lg:flex-col hero-gradient my-1"
      >
        <div className="flex min-h-screen flex-col justify-center items-center xl:flex-row xl:justify-between xl:gap-16 max-w-7xl mx-auto py-20 px-6 xl:px-16">
          <div className="flex flex-col justify-center items-start gap-6 w-full xl:w-1/2 xl:max-w-2xl">
            <Title>{t('hero.name')}</Title>
            <div className="flex flex-col gap-5 mt-2">
              <Paragraph>
                {t('hero.description1')}
              </Paragraph>
              <Paragraph>
                {t('hero.description2')}
              </Paragraph>
              <Paragraph>
                {t('hero.description3')}
              </Paragraph>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-8 mt-12 xl:mt-0">
            <div className="relative">
              <Image
                className="rounded-2xl shadow-md"
                src={fullstack}
                alt="Gabriel Cornide"
                width={280}
                height={380}
                priority
              />
            </div>
            <div className="items-center justify-center flex gap-6">
              <CircleContact
                href="https://github.com/Cornicheli"
                src={githubW}
              />
              <CircleContact
                href="mailto:gabrielcornide@gmail.com"
                src={emailW}
              />
              <CircleContact
                href="https://www.linkedin.com/in/gabriel-cornide-99624923b/"
                src={linkedinW}
              />
            </div>

            <a
              href="/Gabriel-Cornide-FrontEnd-Developer.pdf"
              download
              className="glass-effect rounded-lg text-white py-3 px-8 text-base font-semibold flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-105"
            >
              {t('hero.downloadCV')}
            </a>
          </div>
        </div>

        <div id="experiencia" className="scroll-mt-20 bg-[#0a0a0a] w-full">
          <div className="px-6 md:px-8 xl:px-12 pt-16 max-w-[1600px] mx-auto">
            <h2 className="text-white text-3xl md:text-4xl xl:text-5xl font-nunito font-bold mb-8">
              {t('nav.experience')}
            </h2>
          </div>
          <TimelineExperience experiences={experiences} />
        </div>

        <div className="w-full bg-[#181818]">
          <div
            className="flex flex-col gap-10 px-6 md:px-8 xl:px-12 py-16 xl:py-20 scroll-mt-20 max-w-[1600px] mx-auto w-full"
            id="tecnologias"
          >
            <h2 className="text-white text-4xl md:text-4xl xl:text-5xl font-nunito font-bold">
              {t('hero.frontendTitle')}
            </h2>
            <TechIconsSection categories={techCategories} />
          </div>
        </div>

        <div className="w-full bg-[#0a0a0a]">
          <div
            className="flex flex-col gap-10 px-6 md:px-8 xl:px-12 py-16 xl:py-20 scroll-mt-20 max-w-[1600px] mx-auto w-full"
            id="proyectos"
          >
            <h2 className="text-white text-4xl md:text-4xl xl:text-5xl font-nunito font-bold">
              {t('hero.projectsTitle')}
            </h2>
            <div
              className={`transition-all duration-700 ease-in-out h-[250px] lg:h-[350px]`}
            >
              <Carousel
                items={projectImages.map((img) => (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={550}
                    height={550}
                    className={`rounded-xl my-1`}
                    key={img.src}
                  />
                ))}
                autoplay={true}
                slidesPerView={widthDimension}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
