import Image, { StaticImageData } from "next/image";

interface CircleProps {
  src: StaticImageData;
  href: string;
}

export default function CircleContact({ src, href }: CircleProps) {
  return (
    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#181818] p-1.5">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Image className="w-8 h-8" src={src} alt="logo" />
      </a>
    </div>
  );
}
