import "server-only";

import { getAllEssays } from "@/lib/essays";

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: "essay";
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
  return getAllEssays().map((essay) => ({
    id: `essay:${essay.slug}`,
    title: essay.frontmatter.title,
    description: essay.frontmatter.description ?? toExcerpt(essay.content),
    href: `/essays/${essay.slug}`,
    kind: "essay" as const,
    tags: normalizeTags(essay.frontmatter.tags),
  }));
}
