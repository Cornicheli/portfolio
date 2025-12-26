# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15, React 19, and TypeScript. It showcases professional experience, technical skills, and full-stack projects with a focus on frontend development and AI-assisted development workflows.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## Architecture

### Stack
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 with PostCSS
- **Components**: Swiper.js for carousels
- **Fonts**: Geist Sans and Geist Mono (via next/font)

### Project Structure

- `src/app/` - Next.js App Router pages
  - `page.tsx` - Main portfolio page (client component)
  - `layout.tsx` - Root layout with fonts and metadata
  - `globals.css` - Global styles and Tailwind directives

- `src/components/` - Reusable React components
  - `Carousel.tsx` - Swiper-based carousel wrapper
  - `TimelineExperience.tsx` - Professional experience timeline
  - `TechIconsSection.tsx` - Technology icons display
  - `Header.tsx` - Navigation header
  - `CircleContact.tsx` / `CircleExperience.tsx` - Icon components
  - `FaviconSwitcher.tsx` - Dynamic favicon
  - `fonts/` - Typography components (Title, SubTitle, Paragraph)

- `src/interfaces/` - TypeScript type definitions shared across components

- Data files (TypeScript):
  - `experiences.ts` - Professional work history
  - `experiencieJobs.ts` - Job-specific details
  - `techCategories.ts` - Technology stack categorization
  - `projectImages.ts` - Project portfolio images

### Path Aliases

TypeScript is configured with path aliases:
- `@/*` maps to `src/*`
- `@./*` maps to root directory

Use these consistently when importing:
```typescript
import Component from "@/components/Component";
import image from "@./public/images/image.png";
```

### Key Patterns

1. **Client Components**: Main page uses `"use client"` directive for interactive features (responsive carousel, window resize handling)

2. **Responsive Design**: Components adapt based on breakpoints (mobile: <768px, tablet: 768-1024px, desktop: >1024px)

3. **Data-Driven UI**: Experience timeline, tech icons, and project carousel are rendered from TypeScript data files, making content updates straightforward

4. **Image Optimization**: Uses Next.js `<Image>` component for automatic optimization

5. **Modular Components**: Typography components (Title, SubTitle, Paragraph) centralize text styling

## TypeScript Configuration

- Strict mode enabled
- Target: ES2017
- Module resolution: bundler (Next.js optimized)
- JSX: preserve (Next.js handles transformation)

## When Modifying

- **Adding experiences**: Update `src/experiences.ts` with new work history
- **Adding technologies**: Update `src/techCategories.ts` with new tech icons
- **Adding projects**: Update `src/projectImages.ts` and add images to `public/`
- **Styling changes**: Use Tailwind classes; avoid custom CSS unless necessary
- **New components**: Follow existing patterns (TypeScript, interfaces in `src/interfaces/`)
- **Client interactivity**: Add `"use client"` directive when using hooks or browser APIs
