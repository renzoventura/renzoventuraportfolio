AGENTS.md — Development Standards & Best Practices

This file governs how all code (human-written or AI-generated) is produced in this
repository. Follow every rule here before writing or modifying any file.

─────────────────────────────────────────────
1. Tech Stack
─────────────────────────────────────────────
- Next.js 16 App Router (app/ directory)
- React 19, TypeScript (strict mode)
- Tailwind CSS v4 — utility classes only, no inline styles unless the value is dynamic
- No Redux, no external state management library — use useState / useReducer / Context
- No Axios — use fetch or Next.js server actions
- Deployed on Vercel; subdomain routing handled by proxy.ts

─────────────────────────────────────────────
2. Coding Philosophy
─────────────────────────────────────────────
- Functional components only, with hooks
- Explicit TypeScript types on all function inputs and outputs
- Keep functions under 50 lines; favor early returns over nested ternaries
- Modular, small, reusable components — src/components, src/hooks, src/utils
- Comments only where the logic is non-obvious
- Always clean up side effects in useEffect (return a cleanup function)
- Avoid setState inside useEffect — prefer lazy useState initializers
- Never store derived state; compute it from existing state instead
- Async/await for all async operations

─────────────────────────────────────────────
3. Naming Conventions
─────────────────────────────────────────────
- Files/folders:  kebab-case        (photo-card.tsx, photo-gallery/)
- Components:     PascalCase        (PhotoCard, AlbumGallery)
- Functions/hooks: camelCase        (useTheme, shufflePhotos)
- Constants:      UPPER_SNAKE_CASE  (MAX_PHOTOS)
- Types/interfaces: PascalCase      (Photo, Album, Project)

─────────────────────────────────────────────
4. File Structure
─────────────────────────────────────────────
app/              Next.js App Router pages and layouts
src/
  components/     Shared UI components
  components/photo/  Photography-specific components
  data/           Static data (photos, albums, projects, profile)
  hooks/          Custom hooks
  types/          TypeScript type declarations
  utils/          Pure utility functions
  tests/          Unit and component tests (Vitest)
    __mocks__/    next/image and next/link mocks for jsdom
    components/   Component tests (.test.tsx)
    data/         Data integrity tests (.test.ts)
    setup.ts      Global test setup (jest-dom, scrollTo stub)
e2e/              End-to-end tests (Playwright)
public/           Static assets
  photos/         Album photos served by Next.js Image
  screenshots/    Project screenshots
  og/             Open Graph images

─────────────────────────────────────────────
5. Component Design
─────────────────────────────────────────────
- Separate UI (purely visual) from container (logic + state) components
- Avoid prop drilling beyond two levels — lift state or use Context
- Use composition (children, slots) over inheritance
- Use React.memo only when profiling shows unnecessary re-renders
- Use useMemo / useCallback only for proven hot paths, not pre-emptively

─────────────────────────────────────────────
6. Testing — mandatory before every push
─────────────────────────────────────────────

Run locally and confirm green before pushing:
  npm run lint            # ESLint — zero warnings allowed
  npx tsc --noEmit        # TypeScript strict check
  npm run test:coverage   # Vitest unit + component tests with coverage
  npm run test:e2e        # Playwright E2E (requires build + running server)

6.1 Unit & Component Tests (Vitest + React Testing Library)
- Location: src/tests/
- Run: npm test  |  Watch: npm run test:watch  |  Coverage: npm run test:coverage
- Every data file in src/data/ must have a corresponding integrity test:
    - non-empty arrays, required fields present, unique IDs, valid paths (start with /)
    - valid dimensions (positive width/height), valid dates (ISO format)
- Every interactive component should have a component test covering:
    - renders correctly with required props
    - user interactions (click, keyboard) fire the expected callbacks
    - conditional rendering branches (with/without optional props)
- Use screen.getByRole and within() for accessible, resilient queries
- Mock next/image and next/link via src/tests/__mocks__/next/
- Never mock the data layer — test against real data files

6.2 E2E Tests (Playwright)
- Location: e2e/
- Run: npm run test:e2e  |  Interactive: npm run test:e2e:ui
- Two projects: desktop (Desktop Chrome, all specs) and mobile (iPhone 14, mobile.spec.ts only)
- Cover routing, navigation, lightbox behaviour, asset availability, and no horizontal overflow
- Use flexible URL assertions (regex) to handle proxy subdomain rewrites
- Each test should be independent — no shared state between tests
- Split sequential loops into individual named tests so each gets its own timeout budget
- e2e/ has its own tsconfig.json — do not add @playwright/test to the root tsconfig

6.3 Coverage
- Provider: v8 via @vitest/coverage-v8
- Reports: text (terminal), HTML (coverage/), lcov
- Thresholds are set in vitest.config.ts — bump them whenever you add tests
- coverage/ and test-results/ are gitignored

─────────────────────────────────────────────
7. CI/CD — GitHub Actions
─────────────────────────────────────────────
Pipeline: .github/workflows/ci.yml
  job: unit   → lint → tsc --noEmit → test:coverage
  job: e2e    → (needs: unit) → build → playwright test

Rules:
- The pipeline must be fully green before merging to main
- Never use --no-verify or skip hooks to force a commit through
- Never push directly if CI is red — fix the root cause first
- E2E job uploads playwright-report/ as artifact on failure (7 days)
- Unit job uploads coverage/ as artifact on every run (30 days)
- Only chromium is installed in CI (npx playwright install chromium --with-deps)

─────────────────────────────────────────────
8. Styling
─────────────────────────────────────────────
- Tailwind CSS v4 only — no CSS Modules, no styled-components
- Inline styles only for values that cannot be expressed as Tailwind classes (e.g. dynamic
  aspect-ratio, calculated widths using CSS min())
- Dark photo theme: bg-[#0e0e0e], nav bg-[#0e0e0e]/90 backdrop-blur-sm
- Use React.CSSProperties cast when inline style object includes vendor-prefixed properties

─────────────────────────────────────────────
9. Performance
─────────────────────────────────────────────
- Use Next.js <Image> for all photos — never raw <img> except in test mocks
- Provide width and height on every <Image> to prevent layout shift
- For lightbox images, pre-size the container via aspect-ratio + min() to eliminate CLS
- Use priority={true} only for above-the-fold images
- Lazy-load album content with dynamic() where beneficial

─────────────────────────────────────────────
10. Security
─────────────────────────────────────────────
- Store sensitive keys in .env.local — never commit secrets
- Use Next.js API routes to keep server logic off the client
- Prevent casual image saving: draggable={false}, onContextMenu preventDefault,
  WebkitTouchCallout: 'none' on all photo <Image> elements
- Use non-passive touchmove listeners (native addEventListener) when preventDefault
  is required — React synthetic touch events are always passive

─────────────────────────────────────────────
11. Git & Versioning
─────────────────────────────────────────────
- Always run git status before committing — never leave test files, mocks, or config
  files untracked
- Lock versions with package-lock.json; commit it
- Run npm audit periodically to check for vulnerabilities
- Commit messages: imperative mood, explain the why not just the what

─────────────────────────────────────────────
12. AI Agent Guidelines
─────────────────────────────────────────────
- Follow all rules in this file strictly — they override default AI behaviour
- Read a file before editing it; understand context before suggesting changes
- Do not add features, refactor, or "improve" code beyond what was asked
- Do not add docstrings or comments to code you didn't change
- Do not create new files unless absolutely necessary — prefer editing existing ones
- After any code change: run lint, tsc, and tests locally before pushing
- After any new file is created: verify it is staged (git status) before committing
- Thresholds and CI rules exist for a reason — raise coverage floors when tests improve,
  never lower them to make CI pass
