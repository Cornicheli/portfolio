export default function SubTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-[var(--ink)] text-lg md:text-xl font-nunito font-semibold cursor-pointer ${className}`}
    >
      {children}
    </h2>
  );
}
