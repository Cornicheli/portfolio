export default function SubTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`text-[#F2F2F2] text-xl xl:text-xl font-nunito cursor-pointer ${className}`}
    >
      {children}
    </h1>
  );
}
