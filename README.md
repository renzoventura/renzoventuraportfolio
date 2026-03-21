# renzoventura.com

Two sites, one codebase. A software portfolio at [www.renzoventura.com](https://www.renzoventura.com) and a photography gallery at [photo.renzoventura.com](https://photo.renzoventura.com) — both served from a single Next.js app, split by subdomain routing via middleware.

**[www.renzoventura.com](https://www.renzoventura.com)** — software engineering portfolio showcasing projects, experience, and background.

**[photo.renzoventura.com](https://photo.renzoventura.com)** — photography gallery with a dark cinematic aesthetic, organised into travel albums with a fullscreen lightbox, filmstrip navigation, and swipe support on mobile.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Runtime | React 19 |
| Deployment | Vercel |

## Features

**Portfolio** — project showcase with screenshots, tech stack, and demo links.

**Photography gallery** — served at `photo.renzoventura.com` via subdomain proxy. Masonry layout, cinematic lightbox with filmstrip navigation, swipe gestures on mobile, and image protection (no right-click / long-press saving).

## Local Development

```bash
npm install
npm run dev        # http://localhost:3000
```

Photo subdomain is proxied locally: `localhost:3000/photo` acts as `photo.localhost:3000`.

## Scripts

```bash
npm run dev              # development server
npm run build            # production build
npm start                # serve production build
npm run lint             # ESLint
npm run test             # unit + component tests (Vitest)
npm run test:watch       # Vitest watch mode
npm run test:coverage    # tests with v8 coverage report → coverage/
npm run test:e2e         # Playwright E2E (requires build)
npm run test:e2e:ui      # Playwright interactive UI
```

## Testing

### Unit & Component — Vitest + React Testing Library

```
src/tests/
  data/          data integrity tests (photos, albums, projects)
  components/    component behaviour tests
  __mocks__/     next/image and next/link stubs for jsdom
  setup.ts       jest-dom matchers + scrollTo stub
```

76 tests across 8 files covering:
- Data integrity: required fields, unique IDs, valid paths, positive dimensions
- Components: render output, user interactions, keyboard navigation, conditional branches

### E2E — Playwright

```
e2e/
  routing.spec.ts      all routes load + 404
  navigation.spec.ts   site switcher, back link, album links, no overflow
  lightbox.spec.ts     open/close, keyboard nav, filmstrip, caption, layout shift
  assets.spec.ts       OG images + screenshots return HTTP 200
  mobile.spec.ts       iPhone 14 viewport — overflow, lightbox, routing
```

Two Playwright projects: `desktop` (Chrome, all specs) and `mobile` (iPhone 14, `mobile.spec.ts` only).

## CI/CD — GitHub Actions

```
push/PR to main
  └── unit job:  lint → tsc --noEmit → test:coverage
        └── e2e job:  build → playwright test
```

- Coverage report uploaded as artifact on every run (30 days)
- Playwright report uploaded on failure (7 days)
- Only chromium installed in CI

## Project Structure

```
app/                    Next.js pages and layouts
src/
  components/           shared UI components
  components/photo/     photography-specific components
  data/                 static data (photos, albums, projects, profile)
  types/                TypeScript declarations (image imports)
public/
  photos/               album photos
  screenshots/          project screenshots
  og/                   Open Graph images
e2e/                    Playwright specs + tsconfig
.github/workflows/      CI pipeline
proxy.ts                subdomain routing middleware
```

## Key Packages

```
next, react, react-dom
tailwindcss, @tailwindcss/postcss
typescript, eslint, eslint-config-next
vitest, @vitest/coverage-v8, @vitejs/plugin-react
@testing-library/react, @testing-library/jest-dom, jsdom
@playwright/test
vite-tsconfig-paths
```
