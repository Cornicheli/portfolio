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
