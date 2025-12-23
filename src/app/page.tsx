"use client";
import { useEffect, useState } from "react";
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
        className="flex-col px-6 flex lg:flex-col xl:p-0 bg-[#181818] my-1"
      >
        <div className="flex min-h-screen flex-col bg-[#181818] justify-around items-center xl:flex-row">
          <div className="flex flex-col justify-center my-1.5 items-start gap-4 w-full lg:w-2xl">
            <Title>Gabriel Cornide</Title>
            <Paragraph>
              Dev Front-End con 3 años de experiencia especializado en React y
              React Native.
            </Paragraph>
            <Paragraph>
              Desarrollo mediante el uso de IA (Cursor y Claude) y la
              automatización, logrando entregas más ágiles y código escalable.
            </Paragraph>
            <Paragraph>
              Me enfoco en una arquitectura sólida en TypeScript, siempre
              orientado a resolver problemas complejos en entornos de startups y
              equipos remotos.
            </Paragraph>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Image
              className=" rounded"
              src={fullstack}
              alt="Gabriel Cornide"
              width={240}
              height={340}
            />
            <div className="items-center justify-center flex gap-6 my-3">
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
              href="/CV_Gabriel_Cornide_FrontEnd_IA.pdf"
              download
              className="bg-[#F2F2F2] rounded opacity-80 text-black py-2 text-1xl w-32 flex items-center justify-center cursor-pointer my-1.5"
            >
              Descarga CV
            </a>
          </div>
        </div>

        <div id="experiencia" className="scroll-mt-20">
          <TimelineExperience experiences={experiences} />
        </div>

        <div
          className="flex flex-col gap-8 xl:pl-28 mt-10 scroll-mt-20"
          id="tecnologias"
        >
          <h3 className="text-white text-xl font-semibold">Front-end</h3>
          <TechIconsSection categories={techCategories} />
          <h3 className="text-white text-xl font-semibold" id="proyectos">
            Proyectos Full-Stack
          </h3>
          <div
            className={`transition-all duration-700 ease-in-out mt-10 h-[250px] lg:h-[350px]`}
          >
            <Carousel
              items={projectImages.map((img) => (
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={550}
                  height={550}
                  className={`rounded my-1`}
                  key={img.src}
                />
              ))}
              autoplay={true}
              slidesPerView={widthDimension}
            />
          </div>
        </div>
      </section>
    </>
  );
}
