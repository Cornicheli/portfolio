"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { CarouselProps } from "@/interfaces";

export default function CarrouselJobs({
  items,
  dimension,
  autoplay = false,
}: CarouselProps) {
  return (
    <Swiper
      className={dimension as string}
      modules={[...(autoplay ? [Autoplay] : [])]}
      autoplay={autoplay ? { delay: 2000, disableOnInteraction: false } : false}
    >
      {items.map((item, idx) => (
        <SwiperSlide key={idx}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
}
