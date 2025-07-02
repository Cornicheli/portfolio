export default function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#F2F2F2] text-1xl xl:text-2xl font-lato">{children}</p>
  );
}
