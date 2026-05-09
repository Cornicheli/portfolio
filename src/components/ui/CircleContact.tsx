import Image, { StaticImageData } from "next/image";

interface CircleProps {
  src: StaticImageData;
  href: string;
}

export default function CircleContact({ src, href }: CircleProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-full flex items-center justify-center glass-effect p-2 transition-all duration-300 hover:scale-110 hover:bg-white/10"
    >
      <Image className="w-8 h-8" src={src} alt="logo" width={32} height={32} />
    </a>
  );
}
