# Project Map

## Stack

- Astro 7 project with typed content collections in `src/content.config.ts`.
- Svelte 5 is available for islands, but current core pages are Astro-first.
- Tailwind CSS v4 is wired through `@tailwindcss/vite` in `astro.config.mjs`.
- Biome owns linting and formatting.
- Vitest owns unit tests in `tests/*.test.ts`.
- Playwright owns browser tests in `tests/*.spec.ts`.

## Source Boundaries

- `src/pages/`: routes and page composition.
- `src/layouts/BaseLayout.astro`: shared document shell and navigation.
- `src/components/`: reusable Astro components.
- `src/styles/global.css`: global Tailwind and site styles.
- `src/lib/content.ts`: content helper functions such as filtering, sorting, and date formatting.
- `src/site.config.ts`: site-level metadata and navigation data.
- `src/content/**`: Markdown and MDX entries for blog, projects, notes, and books.
- `public/`: static assets served as-is.

## Generated Or External Directories

Do not edit these as source:

- `dist/`
- `.astro/`
- `node_modules/`
- `playwright-report/`
- `test-results/`

## Verification Matrix

- Type or Astro integration changes: `pnpm check`.
- Formatting or lint changes: `pnpm check:code`.
- Helper logic changes: `pnpm test`.
- Route, layout, collection, or build pipeline changes: `pnpm build`.
- Navigation or viewport behavior changes: `pnpm test:e2e`.
- Codex harness changes under `AGENTS.md`, `.codex/**`, or `.agents/**`: `pnpm verify:codex`.
