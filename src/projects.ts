export interface Project {
  id: string;
  num: string;
  title: string;
  url: string;
  desc: string;
  stack: string[];
  year: string;
  role: string;
  previewImages: string[];
  gradientColor?: string;
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: "adtech",
    num: "№ 01",
    title: "AdTech CRM",
    url: "cms-dooh.netlify.app",
    desc: "CRM para gestión de campañas DOOH — dashboard analítico y monitoreo de pantallas activas en tiempo real.",
    stack: ["Angular 21", "TypeScript", "Tailwind"],
    year: "2025",
    role: "Full-Stack",
    previewImages: [
      "/images/projects/AdTech-01.png",
      "/images/projects/AdTech-02.png",
      "/images/projects/AdTech-03.png",
    ],
    gradientColor: "#3b82f6",
    links: [
      { label: "Frontend", href: "https://cms-dooh.netlify.app/login" },
      { label: "Backend", href: "https://back-cms-4ag6.onrender.com/health" },
      { label: "GitHub", href: "https://github.com/Cornicheli/front-CMS" },
    ],
  },
  {
    id: "aura",
    num: "№ 02",
    title: "Aura",
    url: "aura-web.vercel.app",
    desc: "Web3 de inversión blockchain — activos digitales, portafolio en tiempo real y agente IA inversor 24/7 que informa, recomienda y calcula rendimientos.",
    stack: ["React", "TypeScript", "Tailwind", "LangChain", "OpenRouter"],
    year: "2024",
    role: "Full-Stack",
    previewImages: [
      "/images/projects/aura-01.png",
      "/images/projects/aura-02.png",
      "/images/projects/aura-03.png",
    ],
    gradientColor: "#f97316",
  },
  {
    id: "mytinerary",
    num: "№ 03",
    title: "MyTinerary",
    url: "mytinerary.vercel.app",
    desc: "App de itinerarios de viaje — exploración de ciudades, actividades y rutas personalizadas.",
    stack: ["React", "Node.js", "MongoDB", "Redux"],
    year: "2023",
    role: "Frontend",
    previewImages: [
      "/images/projects/my-tinerary-1.png",
      "/images/projects/my-tinerary-2.png",
      "/images/projects/my-tinerary-3.png",
    ],
    gradientColor: "#10b981",
  },
  {
    id: "gamecenter",
    num: "№ 04",
    title: "GameCenter",
    url: "gamecenter.vercel.app",
    desc: "E-commerce de videojuegos — catálogo, carrito, checkout y panel de administración.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Redux"],
    year: "2024",
    role: "Full-Stack",
    previewImages: [
      "/images/projects/gamecenter-web-1.png",
      "/images/projects/gamecenter-web-2.png",
      "/images/projects/gamecenter-web-3.png",
    ],
    gradientColor: "#6366f1",
  },
];
