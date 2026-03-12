# Project Improvement Roadmap

This roadmap is designed to turn Satvara from a good personal site into a maintainable, measurable, and highly polished product.

## 1) Quick wins (high impact, low effort)

### 1.1 Improve copy quality and consistency
- Fix typos and grammar in landing-page content (e.g., “commanility”).
- Standardize naming conventions (`Satvara` vs `s4tvara`) where intentional branding isn't required.
- Add an editorial checklist for new essays/notes (title casing, summary, tags, date, slug).

**Success metric**: no obvious copy errors on core pages; consistent naming across nav + title + metadata.

### 1.2 Add baseline SEO metadata
- Ensure each top-level page exports metadata (`title`, `description`, canonical where useful).
- Add Open Graph/Twitter card defaults in layout metadata.
- Add sitemap and robots policy if not already present.

**Success metric**: social previews render correctly and each route has meaningful `<title>` + `<meta description>`.

### 1.3 Accessibility pass on navigation and graph
- Verify keyboard navigation and focus states for `Navbar`, mobile nav, and links.
- Add accessible labels/instructions around the zettelkasten graph interaction.
- Test contrast ratios for muted zinc text and hover states.

**Success metric**: Lighthouse accessibility score > 95 and keyboard-only navigation works for core flows.

## 2) Medium-term engineering improvements

### 2.1 Content schema hardening
- Introduce strict frontmatter schemas using `zod` for essays, archive notes, and zettelkasten entries.
- Fail builds on invalid or missing frontmatter.
- Add linting for markdown link integrity (internal slug checks).

**Success metric**: malformed content is caught at build time before deployment.

### 2.2 Component and rendering performance
- Profile the zettelkasten graph for large node counts (CPU + memory).
- Memoize expensive derived structures and isolate redraw hotspots.
- Consider progressive loading or filtering controls when node count grows.

**Success metric**: graph interaction remains smooth (>50 FPS target for typical dataset).

### 2.3 Add automated tests
- Unit tests for slug generation/content parsing utilities.
- Route-level smoke tests (e.g., top pages render, markdown pages resolve).
- Basic Playwright e2e happy-path test (home → essays → zettelkasten note).

**Success metric**: CI runs and blocks regressions on critical content paths.

## 3) Operational maturity

### 3.1 CI pipeline
- Add GitHub Actions for `pnpm lint` + `pnpm build` + tests.
- Cache dependencies and Next build cache to keep CI fast.

**Success metric**: every PR runs green checks under predictable runtime.

### 3.2 Error visibility and analytics
- Add lightweight analytics (privacy-aware) for page-level usage.
- Add client/server error reporting (Sentry or equivalent).

**Success metric**: clear visibility into broken routes, JS errors, and most-read content.

### 3.3 Contributor documentation
- Add `CONTRIBUTING.md` with content conventions and local workflow.
- Document markdown frontmatter requirements with examples.

**Success metric**: new contributors can ship content/features without reverse engineering the codebase.

---

## Suggested execution order

1. Copy + SEO + accessibility quick pass
2. Content schema validation
3. Test harness + CI
4. Graph optimization and observability

This order gives maximum quality improvement quickly while reducing long-term maintenance risk.
