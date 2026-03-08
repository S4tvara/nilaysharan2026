/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

export function buildZettelkastenGraph() {
  const files = fs.readdirSync(contentDir);

  const nodes: any[] = [];
  const links: any[] = [];

  files.forEach((file) => {
    const slug = file.replace(".md", "");
    const filePath = path.join(contentDir, file);

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const title = data.title || slug;

    nodes.push({
      id: slug,
      label: title
    });

    const matches = [...content.matchAll(/\[\[(.*?)\]\]/g)];

    matches.forEach((match) => {
      links.push({
        source: slug,
        target: match[1]
      });
    });
  });

  return { nodes, links };
}