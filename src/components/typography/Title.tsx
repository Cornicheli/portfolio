export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-[var(--ink)] text-4xl md:text-5xl xl:text-6xl font-nunito font-bold leading-tight tracking-tight">
      {children}
    </h1>
  );
}
