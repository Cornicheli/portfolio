"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CarouselProps } from "@/interfaces";

export default function Carousel({
  items,
  autoplay = false,
  slidesPerView,
}: CarouselProps) {
  return (
    <Swiper
      className="h-[250px] lg:h-[350px]"
      modules={[Pagination, ...(autoplay ? [Autoplay] : [])]}
      pagination={{ clickable: true }}
      autoplay={autoplay ? { delay: 2000, disableOnInteraction: false } : false}
      slidesPerView={slidesPerView}
      spaceBetween={24}
    >
      {items.map((item, idx) => (
        <SwiperSlide key={idx}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
}
