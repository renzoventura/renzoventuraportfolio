Agents.md — Agentic AI Best Practices

1. Coding Philosophy
	•	Maintainable & readable code: Write code that is easy to read, understand, and extend. Favor clarity over cleverness.
	•	Modular design: Break code into small, reusable, testable modules.
	•	Consistency: Follow a single style guide across the project (e.g., Prettier/ESLint for JS/TS).
	•	Type safety: Prefer TypeScript where possible. Always type function inputs/outputs explicitly.
	•	Single source of truth: Centralize state management and avoid scattered local state for shared data.

⸻

2. State Management Best Practices

2.1. Local vs Global State
	•	Local state (useState): For component-specific data (UI toggles, input values, ephemeral state).
	•	Global state (Redux, Zustand, Jotai, Recoil): For data shared across multiple components or pages (user session, cart, theme, API cache).

2.2. Redux / Redux Toolkit
	•	Use Redux Toolkit over vanilla Redux to reduce boilerplate.
	•	Organize state as slices: one slice per domain/feature.
	•	Keep reducers pure: no side effects inside reducers.
	•	Use selectors to read state instead of direct access.
	•	Normalize complex data structures to reduce nested updates.

2.3. Async State / Data Fetching
	•	Prefer RTK Query, SWR, or React Query for API interactions.
	•	Keep API and UI state separate (avoid directly mutating API responses in UI).
	•	Handle loading, error, and success states explicitly.

2.4. Derived State
	•	Use selectors or computed state instead of storing redundant state.
	•	Avoid duplicating data across slices/components.

⸻

3. Component Design Best Practices
	•	Functional components only, with hooks.
	•	Separation of concerns:
	•	UI components: purely visual, no side effects.
	•	Container components: handle logic, state, and side effects.
	•	Prop drilling: avoid via context or global state.
	•	Composition over inheritance: use slots, children, and hooks.
	•	Reusability: extract repeated UI into shared components.

⸻

4. File Structure Guidelines

/src
  /components   # UI components
  /features     # Domain-specific slices/modules
  /hooks        # Custom hooks
  /services     # API calls, utility functions
  /store        # Redux or global state
  /utils        # Shared utility functions
  /styles       # Global and reusable styles
  /pages        # Next.js pages

	•	Each feature folder contains:
	•	Slice (Redux Toolkit) or state module
	•	Feature-specific components
	•	Hooks related to that feature

⸻

5. Performance Best Practices
	•	Memoize components with React.memo where props are stable.
	•	Memoize expensive computations with useMemo.
	•	Use useCallback for stable functions passed to children.
	•	Lazy load components with dynamic() in Next.js.
	•	Avoid unnecessary re-renders by proper state slicing and selectors.
	•	Prefer immutable state updates for predictability.

⸻

6. API / Service Layer Guidelines
	•	Centralize API logic in service modules.
	•	Handle errors with try/catch and provide user-friendly messages.
	•	Use Axios interceptors or fetch wrappers for token refresh, logging, and error handling.
	•	Abstract API endpoints into constants for maintainability.

⸻

7. Styling & Theming
	•	Use CSS Modules, Tailwind CSS, or styled-components consistently.
	•	Keep theme constants in a central file (colors, spacing, fonts).
	•	Avoid inline styles unless dynamic values are required.

⸻

8. Security & Environment
	•	Store sensitive keys in environment variables (.env.local in Next.js).
	•	Never commit secrets to Git.
	•	Use Next.js API routes to hide server-side logic from the client.

⸻

9. Versioning & Dependency Management
	•	Lock package versions with package-lock.json or pnpm.lock.
	•	Run npm audit regularly to check for vulnerabilities.
	•	Keep dependencies minimal and well-scoped.

⸻

10. Cursor / Agentic AI Usage Guidelines
	•	Follow coding standards strictly: maintain structure, naming, and typing conventions.
	•	Always optimize for clarity and maintainability.
	•	Avoid side effects in places where it could cause unpredictable state updates.
	•	Suggest modular, reusable, and feature-based code snippets.
	•	When generating code:
	•	Always use async/await for async operations.
	•	Use Redux Toolkit or Context API for shared state.
	•	Prefer hooks and functional components over class components.
	•	Include comments only where clarity is needed, not redundant explanations.
	•	Skip test cases if instructed, but maintain hooks for future unit testing.

⸻

11. Naming Conventions
	•	Files/folders: kebab-case
	•	Components: PascalCase
	•	Functions/hooks: camelCase
	•	Redux slices: featureSlice
	•	Constants: UPPER_SNAKE_CASE

⸻

12. Logging & Debugging
	•	Use Redux DevTools for state tracking.
	•	Use console.debug for temporary dev logs; remove before production.
	•	Prefer structured logs over ad-hoc console statements.

⸻

13. Miscellaneous Best Practices
	•	Keep functions < 50 lines; prefer composition.
	•	Avoid deeply nested ternaries; favor early returns.
	•	Always clean up side effects in useEffect.
	•	Use optional chaining (?.) to avoid runtime errors.
	•	Centralize constants and enums for shared values.
	•	Prefer descriptive variable names over single-letter variables.

⸻

✅ Outcome: Following this agents.md, your Agentic AI (Cursor + Codex) will generate clean, maintainable, and scalable code that adheres to modern React/Next.js best practices, especially around state management and modular design.

