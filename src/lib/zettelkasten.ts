import { getContent } from "./content-engine";
import { zettelSchema } from "./content-schemas";

export type ZettelNode = {
  id: string;
  label: string;
  themes: string[];
  topics: string[];
  group: string;
};

export type ZettelLink = {
  source: string;
  target: string;
};

export type ZettelGraph = {
  nodes: ZettelNode[];
  links: ZettelLink[];
};

export function buildZettelkastenGraph(): ZettelGraph {

  const items = getContent("zettelkasten", zettelSchema);

  const nodes: ZettelNode[] = [];
  const links: ZettelLink[] = [];

  const nodeSet = new Set<string>();
  const frontmatters: Record<string, typeof items[number]["frontmatter"]> = {};

  items.forEach((item) => {
    const slug = item.slug;
    const fm = item.frontmatter;

    nodeSet.add(slug);
    frontmatters[slug] = fm;

    nodes.push({
      id: slug,
      label: fm.title ?? slug,
      themes: fm.themes ?? [],
      topics: fm.topics ?? [],
      group: fm.themes?.[0] ?? "general"
    });
  });

  Object.entries(frontmatters).forEach(([slug, fm]) => {
    fm.links?.forEach((target) => {
      if (nodeSet.has(target)) {
        links.push({
          source: slug,
          target
        });
      }
    });
  });

  return { nodes, links };
}