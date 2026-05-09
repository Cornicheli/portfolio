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
