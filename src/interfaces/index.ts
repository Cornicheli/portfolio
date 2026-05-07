import { ReactNode } from "react";

export interface TechIcon {
  src: string;
  alt: string;
}

export interface TechCategory {
  name: string;
  icons: TechIcon[];
}

export interface TechIconsSectionProps {
  categories: TechCategory[];
}

export interface Experience {
  id: string;
  company: string;
  roleKey: string;
  locationKey: string;
  date: string;
  isCurrent?: boolean;
  stack: string[];
  taskKeys: string[];
}

export interface TimelineExperienceProps {
  experiences: Experience[];
  imageAlt?: string;
  onClick?: () => void;
}

export interface CarouselProps {
  items: ReactNode[];
  dimension?: ReactNode;
  autoplay?: boolean;
  slidesPerView?: number;
}

export interface JobImage {
  src: string;
  alt: string;
  id: string;
  type: "web" | "mobile";
}
