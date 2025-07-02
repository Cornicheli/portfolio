import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#0a0a0a] opacity-90 text-white p-4 sticky top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-center items-center">
        <nav>
          <ul className="flex space-x-4 justify-center">
            <li>
              <Link href="#sobre-mi" className=" hover:underline">
                Sobre mi
              </Link>
            </li>
            <li>
              <Link href="#experiencia" className=" hover:underline">
                Experiencia
              </Link>
            </li>
            <li>
              <Link href="#tecnologias" className=" hover:underline">
                Tecnologias
              </Link>
            </li>
            <li>
              <Link href="#proyectos" className=" hover:underline">
                Proyectos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
