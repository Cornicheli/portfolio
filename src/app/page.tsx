import Image from "next/image";
import Header from "@/components/Header";
import CircleContact from "@/components/CircleContact";
import Title from "@/components/fonts/Title";
import Paragraph from "@/components/fonts/Paragraph";
import TimelineExperience from "@/components/TimelineExperience";
import TechIconsSection from "@/components/TechIconsSection";
import ResponsiveProjectCarousel from "@/components/ResponsiveProjectCarousel";

import fullstack from "@./public/images/fullstack.webp";
import githubW from "@./public/icons/githubW.png";
import emailW from "@./public/icons/emailW.png";
import linkedinW from "@./public/icons/linkedinW.png";

import { experiences } from "@/experiences";
import { techCategories } from "@/techCategories";

export default function Home() {
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
              Dev Front-End IA con 3 años de experiencia especializado en React
              y React Native.
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
          <h3 className="text-white text-xl font-semibold">Front-End IA</h3>
          <TechIconsSection categories={techCategories} />
          <h3 className="text-white text-xl font-semibold" id="proyectos">
            Proyectos Full-Stack
          </h3>
          <ResponsiveProjectCarousel />
        </div>
      </section>
    </>
  );
}
