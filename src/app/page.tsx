"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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
  const { t } = useTranslation("common");
  const [widthDimension, setWidthDimension] = useState(
    typeof window !== "undefined"
      ? window.innerWidth > 1024
        ? 3
        : window.innerWidth > 768
          ? 2
          : 1
      : 3,
  );

  useEffect(() => {
    const handleResize = () => {
      setWidthDimension(
        window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1,
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants for sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Header />
      <main>
        <section
          id="sobre-mi"
          className="flex-col flex lg:flex-col hero-gradient min-h-screen"
        >
          <div className="flex min-h-screen flex-col justify-center items-center xl:flex-row xl:justify-between xl:gap-16 max-w-7xl mx-auto py-20 px-6 xl:px-16">
            <div className="flex flex-col justify-center items-start gap-6 w-full xl:w-1/2 xl:max-w-2xl">
              <Title>{t("hero.name")}</Title>
              <div className="flex flex-col gap-5 mt-2">
                <Paragraph>{t("hero.description1")}</Paragraph>
                <Paragraph>{t("hero.description2")}</Paragraph>
                <Paragraph>{t("hero.description3")}</Paragraph>
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
                href="/Gabriel_Cornide_Frontend_CV.pdf"
                download
                className="glass-effect rounded-lg text-white py-3 px-8 text-base font-semibold flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-105"
              >
                {t("hero.downloadCV")}
              </a>
            </div>
          </div>
        </section>

        <motion.section
          id="experiencia"
          className="bg-[#0a0a0a] w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className="px-6 md:px-8 xl:px-12 pt-16 max-w-[1600px] mx-auto">
            <motion.h2
              className="text-white text-3xl md:text-4xl xl:text-5xl font-nunito font-bold mb-8"
              variants={fadeInUp}
            >
              {t("nav.experience")}
            </motion.h2>
          </div>
          <TimelineExperience experiences={experiences} />
        </motion.section>

        <motion.section
          id="tecnologias"
          className="w-full bg-[#181818]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="flex flex-col gap-10 px-6 md:px-8 xl:px-12 py-16 xl:py-20 max-w-[1600px] mx-auto w-full">
            <motion.h2
              className="text-white text-4xl md:text-4xl xl:text-5xl font-nunito font-bold"
              variants={fadeInUp}
            >
              {t("hero.frontendTitle")}
            </motion.h2>
            <motion.div variants={staggerContainer}>
              <TechIconsSection categories={techCategories} />
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="proyectos"
          className="w-full bg-[#0a0a0a]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="flex flex-col gap-10 px-6 md:px-8 xl:px-12 py-16 xl:py-20 max-w-[1600px] mx-auto w-full">
            <motion.h2
              className="text-white text-4xl md:text-4xl xl:text-5xl font-nunito font-bold"
              variants={fadeInUp}
            >
              {t("hero.projectsTitle")}
            </motion.h2>
            <motion.div
              className={`transition-all duration-700 ease-in-out h-[250px] lg:h-[350px]`}
              variants={fadeInUp}
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
            </motion.div>
          </div>
        </motion.section>
      </main>
    </>
  );
}
