export default function Paragraph({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-gray-300 text-lg md:text-xl xl:text-xl font-lato leading-relaxed ${className}`}>{children}</p>
  );
}
