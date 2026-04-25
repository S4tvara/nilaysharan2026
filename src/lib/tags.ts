import type { EssayFrontmatter } from "./content-schemas";

/**
 * Flattens tag frontmatter: strings, `[[book]]` nested arrays, or mixed.
 */
export function flattenTags(
  tags: EssayFrontmatter["tags"] | undefined
): string[] {
  if (tags == null || tags.length === 0) return [];

  const out: string[] = [];
  for (const item of tags) {
    if (typeof item === "string") {
      if (item.trim()) out.push(item.trim());
    } else if (Array.isArray(item)) {
      for (const t of item) {
        if (typeof t === "string" && t.trim()) out.push(t.trim());
      }
    }
  }
  return [...new Set(out)];
}
