import { getContent } from "./content-engine";
import { essaySchema } from "./content-schemas";

export function getAllEssays() {
  return getContent("essays", essaySchema);
}

export function getEssay(slug: string) {
  const essays = getContent("essays", essaySchema);
  const essay = essays.find((e) => e.slug === slug);

  if (!essay) {
    throw new Error(`Essay not found: ${slug}`);
  }

  return essay;
}

export function getEssaySlugs() {
  return getContent("essays", essaySchema).map((e) => e.slug);
}