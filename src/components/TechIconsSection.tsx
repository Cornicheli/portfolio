import { TechIconsSectionProps } from "@/interfaces";
import Image from "next/image";

export default function TechIconsSection({
  categories,
}: TechIconsSectionProps) {
  return (
    <section className="flex flex-col xl:flex-row xl:items-center">
      <div className="flex flex-col w-full xl:w-auto justify-center">
        {categories.map((cat, idx) => (
          <div key={idx}>
            <div className=" flex flex-wrap gap-8 my-4 xl:my-4">
              {cat.icons.map((icon, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between items-center p-3 rounded-xl bg-neutral-800 hover:scale-105 transition-transform duration-300 w-18 h-22 xl:h-auto xl:w-26"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                  <p className="text-white text-xs mt-2">{icon.alt}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
