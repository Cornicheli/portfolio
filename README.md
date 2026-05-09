# Gabriel Cornide — Portfolio

Portfolio personal construido con Next.js 15, React 19 y TypeScript. Incluye sección de experiencia con galería de capturas por empresa, carrusel de proyectos con modal de imágenes, chatbot con IA, formulario de contacto funcional e internacionalización (ES/EN).

**Live:** [gabriel-cornide.vercel.app](https://gabriel-cornide.vercel.app)

---

## Stack

| Tecnología | Versión |
|---|---|
| Next.js (App Router) | 15 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Swiper.js | 11 |
| i18next + react-i18next | — |
| OpenRouter (Claude Haiku) | — |
| Web3Forms | — |
| Cloudinary | — |

---

## Decisiones de arquitectura

### ¿Por qué Next.js App Router y no Pages Router?

El App Router de Next.js 15 permite coexistencia granular de Server y Client Components. Las secciones estáticas (hero, stats, footer) se renderizan en servidor sin enviar JS al cliente. Los componentes interactivos (carousel, chatbot, modal) se marcan explícitamente con `"use client"`. Con Pages Router todo el árbol sería client-side por defecto.

### ¿Por qué `"use client"` en `page.tsx` si es un portfolio estático?

La página principal usa `useState` y `useEffect` para el carousel responsivo y el smooth scroll, lo que obliga a ser Client Component. Una alternativa habría sido extraer solo esas partes a componentes client y mantener `page.tsx` como Server Component — algo que haría con más tiempo, pero que requería mayor fragmentación del árbol.

### ¿Por qué dynamic imports para `ChatBot` y `Carousel`?

Ambos dependen de APIs de browser (`window`, `document`) y librerías pesadas (Swiper, lógica de chat). Con `dynamic(() => import(...), { ssr: false })` se excluyen del bundle inicial y se cargan solo en cliente, evitando errores de hidratación y reduciendo el First Load JS. El chatbot además se carga solo cuando el usuario interactúa, no al montar la página.

### ¿Por qué i18next con imports estáticos en vez de lazy loading vía `public/locales/`?

Los dos archivos de traducción pesan ~5KB cada uno (~10KB total). Moverlos a `public/` y usar `i18next-http-backend` agregaría una petición HTTP asíncrona antes de renderizar texto, más complejidad en el provider para manejar el estado de carga. El overhead de 10KB bundleados comprimidos con gzip es insignificante comparado con esa penalidad de latencia.

### ¿Por qué Cloudinary para los íconos del stack tecnológico?

Las imágenes de íconos (PNG/WebP) en `public/` aumentan el peso del repositorio y el tiempo de build. Cloudinary entrega las imágenes desde CDN con compresión automática y caché agresivo, independientemente del deployment. La desventaja es la dependencia de un servicio externo; la mitigación es que son imágenes decorativas — si Cloudinary falla, la UI degradea gracefully con el espacio vacío.

### ¿Por qué OpenRouter con Claude Haiku y no OpenAI directamente?

OpenRouter actúa como proxy unificado para múltiples modelos. Elegí Claude Haiku por su balance entre costo, velocidad y calidad en respuestas cortas conversacionales. La abstracción de OpenRouter permite cambiar el modelo (Gemini, GPT-4o, Mistral) sin modificar el código del endpoint, solo cambiando la variable de entorno `OPENROUTER_MODEL`. Con OpenAI directo habría quedado acoplado a un solo proveedor.

### ¿Por qué los datos en archivos TypeScript (`src/data/`) y no en un CMS o JSON?

Para un portfolio personal el volumen de datos es bajo y los cambios son infrecuentes. Los archivos TypeScript dan tipado end-to-end sin runtime overhead, autocompletado en el IDE y tree-shaking automático. Un CMS (Contentful, Sanity) agregaría latencia de API en build time y una dependencia de infraestructura para contenido que cambia pocas veces al año.

### ¿Por qué Swiper.js y no un carousel custom?

Swiper resuelve touchswipe en mobile, accesibilidad básica, paginación y autoplay con configuración mínima. Construir eso desde cero habría consumido tiempo desproporcionado para el valor que agrega en un portfolio. La contrapartida es el tamaño de la librería (~30KB gzip); lo mitigo cargando solo los módulos necesarios (`Autoplay`, `Pagination`) y no el bundle completo.

### ¿Por qué `backdrop-filter: blur()` en los modales y no un overlay sólido oscuro?

El blur comunica visualmente que el contenido de fondo sigue siendo la misma página, no una pantalla separada. Mantiene el contexto para el usuario. Un overlay sólido es más compatible (no todos los navegadores soportan `backdrop-filter`), pero en 2025 el soporte es >96% global. Usé `rgba(10,10,10,0.82)` como fallback de color para los casos sin soporte.

### ¿Por qué el modal de experiencias adapta su ancho según el tipo de imagen?

Las capturas de apps mobile (Modatex, Techforb) son portrait (verticales). Si se muestran en un contenedor de 960px quedan flotando con márgenes enormes. Detecto el `type: "mobile"` de la imagen actual y ajusto el `max-width` del panel a 520px, lo que da una proporción más natural sin cambiar el componente de imagen.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── api/chat/route.ts       # Endpoint del chatbot (OpenRouter)
│   ├── layout.tsx              # Metadata SEO completa (OG, Twitter, canonical)
│   ├── opengraph-image.tsx     # Imagen OG generada dinámicamente con next/og
│   ├── sitemap.ts              # Sitemap automático para indexación
│   └── robots.ts              # Reglas de crawling
├── components/
│   ├── carousels/              # Carousel.tsx, ProjectCarousel.tsx, ResponsiveProjectCarousel.tsx
│   ├── chatbot/                # ChatBot.tsx, ChatBotLoader.tsx
│   ├── layout/                 # Header.tsx, FaviconSwitcher.tsx
│   ├── providers/              # I18nProvider.tsx
│   ├── sections/               # TimelineExperience.tsx, TechIconsSection.tsx, ContactSection.tsx
│   ├── typography/             # Title.tsx, SubTitle.tsx, Paragraph.tsx
│   └── ui/                     # ProjectModal.tsx, ExperienceModal.tsx, CircleContact.tsx
├── data/                       # Fuente de verdad: experiences, projects, techCategories, images
├── hooks/                      # useJobImages.ts
├── interfaces/                 # Tipos por dominio: tech, experience, carousel, media
├── lib/                        # i18n.ts
└── locales/                    # en/common.json, es/common.json
```

---

## Lo más desafiante

Implementar los modales de galería con soporte correcto de imágenes portrait/landscape fue el punto más cuidadoso. El challenge no fue técnico sino de criterio: decidir si adaptar el contenedor al contenido (ancho dinámico según tipo de imagen) o adaptar el contenido al contenedor (forzar `object-cover` siempre). Elegí lo primero porque distorsionar capturas de interfaz pierde el detalle del diseño que se quiere mostrar.

El segundo punto complejo fue la estrategia SSR-safe del carousel: `useState` inicializa con el valor de desktop (3 slides) y `useEffect` corrige según el viewport real. El orden importa — si inicializara en `null` y esperara el efecto habría un flash de contenido vacío en el primer render.

---

## Qué haría diferente con más tiempo

- **Extraer Server Components**: fragmentar `page.tsx` para que solo las secciones interactivas sean client, reduciendo el JS enviado al navegador.
- **Migrar imágenes de jobs/projects a Cloudinary**: actualmente las ~100 capturas están en `public/`, aumentando el peso del repositorio. El pipeline sería subir a Cloudinary y referenciar desde los data files, igual que ya se hace con los íconos del stack.
- **Animaciones de entrada con Intersection Observer**: las secciones aparecen sin transición. Framer Motion está instalado; agregaría `whileInView` en los títulos y tarjetas para dar profundidad al scroll.
- **Testing**: el proyecto no tiene tests. Agregaría tests de integración con Playwright para los flujos críticos (modal abre/cierra, chatbot envía mensaje, formulario de contacto).

---

## Correr localmente

```bash
git clone https://github.com/Cornicheli/portfolio.git
cd portfolio
npm install
```

Crear `.env.local`:

```env
OPENROUTER_API_KEY=tu_api_key
WEB3FORMS_KEY=tu_access_key
```

```bash
npm run dev
```

Disponible en [http://localhost:3000](http://localhost:3000).
