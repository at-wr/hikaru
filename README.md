# Hikaru

Personal portfolio and blog built with Astro 5, Tailwind v4, and static output.

## Develop
- Install: `pnpm install`
- Start: `pnpm dev`
- Type/Content check: `pnpm check`
- Build: `pnpm build`
- Preview: `pnpm preview`

## Content Schema
Posts live in `src/content/posts` and must match `src/content/config.ts`:
- title: string
- published: Date
- draft: boolean (default false)
- category: string
- tags: string[]
- description: string
- language: string (default `en`)

Add a post by creating a Markdown file with frontmatter matching the schema.

## Notes
- RSS available at `/rss.xml` and linked in `<head>`.
- OG images are generated per page/post/tag/category.
- Accessibility: global focus styles, skip link, and semantic markup.
