import type { ContentItem } from "./content-engine";
import type { EssayFrontmatter } from "./content-schemas";

type Essay = ContentItem<EssayFrontmatter>;

/**
 * Picks the newest `featured: true` essay by date, or the newest overall.
 */
export function pickFeaturedEssay(essays: Essay[]): Essay | null {
  if (!essays.length) return null;

  const byDate = (a: Essay, b: Essay) =>
    new Date(b.frontmatter.date).getTime() -
    new Date(a.frontmatter.date).getTime();

  const featured = essays.filter((e) => e.frontmatter.featured === true);
  if (featured.length > 0) {
    return [...featured].sort(byDate)[0]!;
  }

  return [...essays].sort(byDate)[0]!;
}
