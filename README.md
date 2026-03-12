# Satvara (nilaysharan2026)

A personal knowledge-garden style website built with Next.js, TypeScript, Tailwind, and Markdown content collections.

## Tech stack

- Next.js App Router (`src/app`)
- React 19 + TypeScript
- Tailwind CSS v4
- Markdown content rendered with `react-markdown` + `remark-gfm`
- Interactive zettelkasten graph (`react-force-graph-2d`)

## Project structure

- `src/app` — route segments and page-level UI
- `src/components` — reusable client/server components
- `src/content` — markdown content for essays and zettelkasten notes
- `src/style` — global styles

## Development

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000`.

## Quality checks

```bash
pnpm lint
pnpm build
```

## How to make this project better

I added a practical roadmap with prioritized improvements in:

- [`docs/project-improvement-roadmap.md`](docs/project-improvement-roadmap.md)

It covers the highest-impact opportunities in:

- Content and metadata consistency
- Accessibility and UX polish
- Performance and bundle/runtime health
- Testing and CI reliability
- Observability and maintenance workflows
