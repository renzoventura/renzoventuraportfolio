# Portfolio Project Memory

## Project Overview
- Next.js 16.1.6, React 19, TypeScript, Tailwind CSS v4
- Deployed on Vercel at www.renzoventura.com
- Uses App Router (`app/` directory)
- Single-page portfolio with scroll-based animations
- Git repo: `renzoventura/renzoventuraportfolio` (GitHub)
- Vercel account: log in via GitHub (renzoventura), NOT Gmail

## Key Files
- `app/layout.tsx` — root layout, metadata, fonts
- `app/page.tsx` — home page (also renders photo gallery on photo subdomain via host header check)
- `app/photo/page.tsx` — photography gallery page
- `app/photo/layout.tsx` — photo subdomain metadata
- `app/photo/about/page.tsx` — about page
- `app/icon.svg` — custom favicon (white square, black border)
- `src/components/` — all React components
- `src/components/photo/` — photo-nav, photo-gallery, photo-card, photo-lightbox, album-page-content, photo-about-content
- `src/data/profile.ts` — profile info and social links
- `src/data/projects.ts` — project definitions
- `src/data/albums.ts` — Album type, albums array (japan23, eu22, daylesford, eu25)
- `src/data/photos.ts` — Photo type with `{id, title, location, year, src, alt, category, width, height, featured?}`
- `public/about/portrait.JPG` — portrait photo (1741×2150)
- `public/japan23/THUMBNAIL.JPEG` — used as OG image for photo subdomain

## Subdomain Architecture
- `photo.renzoventura.com` → same Vercel project as www
- `app/page.tsx` checks `host` header: if `photo.renzoventura.com` → renders `AlbumPageContent` + overrides OG metadata
- `next.config.ts` redirects `/photo/*` on www → `photo.renzoventura.com/photo/*`
- `next.config.ts` rewrites `photo.renzoventura.com/` → `/photo` (for direct nav)
- Middleware does NOT work on Vercel Edge for this setup — use serverless (page-level) host checks instead
- `app/globals.css` has `scrollbar-gutter: stable` to prevent layout shift on lightbox open

## Photography Gallery Architecture
- Albums: japan23, eu22, daylesford, eu25 (in that order)
- CSS Grid masonry: `gridAutoRows: 4px`, JS-computed `gridRowEnd: span N`
- Three-orientation shuffle: portrait/landscape/square (ratio 0.85-1.15 = square)
- Featured photos (featured: true) appear first
- Column stagger: col1=24px, col3=32px top padding
- `lightboxOpen` ref guards `computeSpans` from firing during lightbox open
- Lightbox: `document.documentElement.style.overflow = 'hidden'` (no position:fixed — avoids scroll jump)
- Gallery visible through lightbox backdrop (no invisible class)
- Image quality: 65 gallery, 85 lightbox

## Photo Nav
- `src/components/photo/photo-nav.tsx`
- Links: "work" (left) + "about" (left), theme toggle removed
- Font: `text-base font-light tracking-tight`
- Active state via `usePathname()`

## About Page
- Portrait: `public/about/portrait.JPG` (1741×2150, committed to git)
- Bio: "Renzo Ventura is a photographer based in Melbourne, Australia..."
- Email: renzoventura96@gmail.com
- Layout: portrait left (lg:w-1/3), bio right with max-w-[63ch] on desktop
- Mobile: stacked, gap-4 sm:gap-8

## Header Styles (all photo pages)
- Mobile: `text-2xl font-light tracking-tight pt-[59px] pb-4`
- Desktop: `sm:text-5xl sm:pt-32 sm:pb-8`
- Pattern: "Renzo Ventura | [section]" with dimmed span

## OG / Link Previews
- Photo subdomain OG image: `/japan23/THUMBNAIL.JPEG` (absolute URL)
- Twitter card: `summary_large_image`
- Title: "Renzo Ventura | work"
- Root layout has portfolio OG image — overridden in `app/page.tsx` via `generateMetadata`

## AGENTS.md Rules (always follow)
- Functional components only with hooks
- Kebab-case for files/folders, PascalCase for components, camelCase for functions/hooks
- Explicit TypeScript types on all function inputs/outputs
- Tailwind CSS only — no inline styles unless dynamic
- Keep functions under 50 lines; favor early returns

## Run Command
`npm run dev` → http://localhost:3000
`npm run reset` → kills port 3000, clears .next, restarts dev server
