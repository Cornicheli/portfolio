export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-[#F2F2F2] text-2xl xl:text-5xl font-nunito font-semibold">
      {children}
    </h1>
  );
}
