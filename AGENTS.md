# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Route files (e.g., `index.astro`, `blog.astro`, `rss.xml.ts`, `og/[page].png.ts`).
- `src/components/`: Reusable UI; components in PascalCase (e.g., `Header.astro`, `ui/*`).
- `src/layouts/`: Page wrappers (`BaseLayout.astro`, `BlogLayout.astro`, `Foundation.astro`).
- `src/content/`: Markdown posts and schema (`config.ts`, `posts/*` with frontmatter).
- `src/styles/`: Global styles (`global.css`) with Tailwind v4 utilities.
- `public/`: Static assets (`favicon.png`, `robots.txt`).
- `astro.config.mjs`: Site config (fonts, sitemap, static output).

## Build, Test, and Development Commands
- Install: `pnpm install`
- Develop: `pnpm dev` – start Astro dev server with HMR.
- Build: `pnpm build` – output static site to `dist/`.
- Preview: `pnpm preview` – serve the built site locally.
- Type/Content checks: `pnpm astro check` – validate content collections, links, and types.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; ESM modules; `.astro` components preferred for UI.
- Naming: Components/Layout files in PascalCase; pages in kebab/lowercase; content folders in kebab-case.
- Tailwind: Use utilities over inline styles; prefer existing tokens and the `focus-ring` utility for a11y.
- Content frontmatter must match `src/content/config.ts`: `title`, `published` (Date), `draft`, `category`, `tags`, `description`, `language`.

## Testing Guidelines
- No formal test suite. Use:
  - `pnpm astro check` for schema/link issues.
  - `pnpm preview` to manually verify routes, RSS (`/rss.xml`), and OG images (`/og/[page].png`).
- Keep changes scoped and test across light/dark preferences if styling is affected.

## Documentation & Research
- Use the Context7 MCP tool to search up-to-date documentation whenever looking up docs can help clarify APIs, libraries, or best practices.

## Commit & Pull Request Guidelines
- Use Conventional Commits (seen in history): `feat:`, `fix:`, `chore:`, `style:`.
- PRs should include: clear description, linked issues, and screenshots/GIFs for visual changes.
- Before opening a PR: run `pnpm build` and `pnpm astro check`; ensure `dist/` builds cleanly and no unnecessary assets are added to `public/`.
- Keep PRs small and focused; update docs when user-facing behavior changes.
