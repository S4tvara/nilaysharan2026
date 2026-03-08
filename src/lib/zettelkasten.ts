import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content/Zettelkasten");

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

type Frontmatter = {
  title?: string;
  links?: string[];
  themes?: string[];
  topics?: string[];
};

export function buildZettelkastenGraph(): ZettelGraph {
  const files = fs.readdirSync(contentDir);

  const nodes: ZettelNode[] = [];
  const links: ZettelLink[] = [];

  const nodeSet = new Set<string>();
  const frontmatters: Record<string, Frontmatter> = {};

  files.forEach((file) => {
    if (!file.endsWith(".md")) return;

    const slug = file.replace(".md", "");
    const filePath = path.join(contentDir, file);

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    const fm = data as Frontmatter;

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