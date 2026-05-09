import { ReactNode } from "react";

export interface CarouselProps {
  items: ReactNode[];
  dimension?: ReactNode;
  autoplay?: boolean;
  slidesPerView?: number;
}
