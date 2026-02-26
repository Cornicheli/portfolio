import { TechIconsSectionProps } from "@/interfaces";
import Image from "next/image";

export default function TechIconsSection({
  categories,
}: TechIconsSectionProps) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col">
            <h3 className="text-gray-400 text-[14px] font-semibold uppercase tracking-wider mb-6 border-b border-white/10 pb-3">
              {cat.name}
            </h3>
            <div className="flex flex-wrap gap-4">
              {cat.icons.map((icon, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-center items-center p-4 rounded-lg bg-[#1a1a1a] hover:bg-[#222] transition-all duration-300 w-24 h-24 group border border-white/5 hover:border-white/20"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={45}
                    height={45}
                    className="object-contain mb-2 group-hover:scale-110 transition-transform duration-300"
                  />
                  <p className="text-gray-400 text-[12px] text-center font-medium leading-tight">
                    {icon.alt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
