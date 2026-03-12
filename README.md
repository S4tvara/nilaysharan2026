# nilaysharan2026

A personal Next.js 16 site for publishing essays, archive entries, and a connected zettelkasten graph.

## Tech stack

- Next.js App Router + TypeScript
- Tailwind CSS 4
- Markdown content loaded from `src/content/*`
- `zod`-validated content frontmatter

## Project structure

- `src/app/*`: routes and page-level UI
- `src/components/*`: shared UI and zettelkasten graph components
- `src/lib/*`: content loading, parsing, and schema utilities
- `src/content/*`: markdown sources for essays, archives, and zettels

## Local development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Scripts

- `pnpm dev`: run local dev server
- `pnpm build`: create production build
- `pnpm start`: run production server
- `pnpm lint`: run ESLint checks
- `pnpm clear-run`: clear `.next` and start dev server

## Content workflow

1. Add markdown files into one of:
   - `src/content/essays`
   - `src/content/archives`
   - `src/content/zettelkasten`
2. Ensure frontmatter matches the schema in `src/lib/content-schemas.ts`.
3. Run `pnpm lint` and `pnpm build` to verify all routes render.

## SEO configuration

Set the canonical base URL for metadata generation:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

If omitted, metadata defaults to `https://example.com`.
