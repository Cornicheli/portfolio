export default function SubTitle({
  children,
  key,
}: {
  children: React.ReactNode;
  key: string;
}) {
  return (
    <h1
      className="text-[#F2F2F2] text-1xl xl:text-xl font-nunito cursor-pointer"
      key={key}
    >
      {children}
    </h1>
  );
}
