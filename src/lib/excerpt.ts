import type { ContentItem } from "./content-engine";
import type { EssayFrontmatter } from "./content-schemas";

const MAX_LEN = 280;

type Essay = ContentItem<EssayFrontmatter>;

/**
 * Strips a small subset of markdown for display; keeps sentence flow.
 */
function stripInlineMd(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Heuristic: first non-heading paragraph from markdown body.
 */
function firstParagraphHeuristic(content: string): string | null {
  const lines = content.split(/\n/);
  const blocks: string[] = [];
  let current = "";

  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      if (current) {
        blocks.push(current);
        current = "";
      }
      continue;
    }
    if (/^#{1,6}\s/.test(t)) {
      if (current) {
        blocks.push(current);
        current = "";
      }
      continue;
    }
    if (t.startsWith("```")) continue;
    current += (current ? " " : "") + t;
  }
  if (current) blocks.push(current);

  const first = blocks.find((b) => {
    const s = b.trim();
    if (!s) return false;
    if (s.startsWith("---")) return false;
    return true;
  });

  if (!first) return null;
  const stripped = stripInlineMd(first);
  if (stripped.length > MAX_LEN) {
    return stripped.slice(0, MAX_LEN - 1).replace(/\s+\S*$/, "") + "…";
  }
  return stripped;
}

/**
 * `pullQuote` frontmatter, else first body paragraph, else `description`.
 */
export function resolvePullQuote(essay: Essay): string | null {
  if (essay.frontmatter.pullQuote?.trim()) {
    return essay.frontmatter.pullQuote.trim();
  }
  const fromBody = firstParagraphHeuristic(essay.content);
  if (fromBody) return fromBody;
  if (essay.frontmatter.description?.trim()) {
    return essay.frontmatter.description.trim();
  }
  return null;
}
