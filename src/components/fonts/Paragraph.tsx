export default function Paragraph({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-[#F2F2F2] text-xl xl:text-2xl font-lato ${className}`}>{children}</p>
  );
}
