import Image from "next/image";

interface Icon {
  src: string;
  alt: string;
}
interface Category {
  name: string;
  icons: Icon[];
}
interface Props {
  categories: Category[];
}

export default function TechIconsSection({ categories }: Props) {
  return (
    <div>
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[220px_1fr] gap-12 py-8 border-t border-[var(--line)] stack-block-responsive"
        >
          <div className="font-serif text-[28px] tracking-[-0.02em] text-[var(--ink)]">
            {cat.name}
            <span className="block font-mono text-[11px] text-[var(--ink-4)] tracking-[0.14em] mt-1.5 uppercase">
              {cat.icons.length} ITEMS
            </span>
          </div>
          <div className="grid grid-cols-6 gap-2 stack-grid-responsive">
            {cat.icons.map((icon, i) => (
              <div
                key={i}
                className="aspect-square bg-[var(--bg-elev)] border border-[var(--line)] rounded-[10px] flex flex-col items-center justify-center gap-2 p-2.5 transition-all duration-200 cursor-default relative overflow-hidden hover:bg-[var(--bg-card)] hover:border-[var(--ink-5)] hover:-translate-y-[3px]"
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={32}
                  height={32}
                  style={{ width: 32, height: "auto" }}
                  className="object-contain"
                />
                <span className="text-[10.5px] text-[var(--ink-3)] text-center leading-[1.2]">
                  {icon.alt}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
