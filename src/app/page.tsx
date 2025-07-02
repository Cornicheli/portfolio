"use client";
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
import { useEffect, useState } from "react";

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
        className="flex-col px-6 flex lg:flex-col xl:p-0 bg-[#181818]"
      >
        <div className="flex min-h-screen flex-col  bg-[#181818] justify-around items-center xl:flex-row">
          <div className="flex flex-col justify-center items-start gap-4 w-full lg:w-2xl">
            <Title>Gabriel Cornide</Title>
            <Paragraph>
              Desarrollador Frontend Web & Mobile con +3 años de experiencia en
              interfaces modernas, escalables y accesibles.
            </Paragraph>
            <Paragraph>
              Especializado en React, React Native, TypeScript y Tailwind CSS.
              Gran dominio de diseño UI/UX con Figma y metodologías ágiles como
              Scrum. He trabajado en proyectos de e-commerce, apps híbridas y
              sitios web responsivos para empresas de Argentina, Chile y EE.UU.
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

            <button className="bg-[#F2F2F2] rounded opacity-80 text-black  py-2 text-1xl  w-32">
              Descarga CV
            </button>
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
