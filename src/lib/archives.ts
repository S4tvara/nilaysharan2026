import { getContent } from "./content-engine";
import { archiveSchema } from "./content-schemas";

export function getAllArchives() {
  return getContent("archives", archiveSchema);
}

export function getArchive(slug: string) {
  const archives = getContent("archives", archiveSchema);
  const archive = archives.find((a) => a.slug === slug);

  if (!archive) {
    throw new Error(`Archive not found: ${slug}`);
  }

  return archive;
}

export function getArchiveSlugs() {
  const archives = getContent("archives", archiveSchema);
  return archives.map((a) => a.slug);
}