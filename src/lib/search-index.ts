import "server-only";

import { getAllEssays } from "@/lib/essays";
import { getAllArchives } from "@/lib/archives";
import { getContent } from "@/lib/content-engine";
import { zettelSchema } from "@/lib/content-schemas";

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: "essay" | "archive" | "zettel";
  tags: string[];
};

function normalizeTags(input?: (string | string[])[]): string[] {
  return (input ?? []).flatMap((value) =>
    Array.isArray(value) ? value : [value]
  );
}

function toExcerpt(content: string): string {
  const excerpt = content.replace(/\s+/g, " ").trim().slice(0, 140);
  return excerpt.length === 140 ? `${excerpt}…` : excerpt;
}

export function getSearchIndex(): SearchItem[] {
  const essays = getAllEssays().map((essay) => ({
    id: `essay:${essay.slug}`,
    title: essay.frontmatter.title,
    description: essay.frontmatter.description ?? toExcerpt(essay.content),
    href: `/essays/${essay.slug}`,
    kind: "essay" as const,
    tags: normalizeTags(essay.frontmatter.tags)
  }));

  const archives = getAllArchives().map((archive) => ({
    id: `archive:${archive.slug}`,
    title: archive.frontmatter.title,
    description: toExcerpt(archive.content),
    href: `/archive/${archive.slug}`,
    kind: "archive" as const,
    tags: archive.frontmatter.tags ?? []
  }));

  const zettels = getContent("zettelkasten", zettelSchema).map((zettel) => ({
    id: `zettel:${zettel.slug}`,
    title: zettel.frontmatter.title,
    description: toExcerpt(zettel.content),
    href: `/zettelkasten/${zettel.slug}`,
    kind: "zettel" as const,
    tags: [...(zettel.frontmatter.themes ?? []), ...(zettel.frontmatter.topics ?? [])]
  }));

  return [...essays, ...archives, ...zettels];
}
