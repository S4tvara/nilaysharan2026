import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const essaysDir = path.join(process.cwd(), "src/content/essays");

export function getAllEssaySlugs() {
  return fs
    .readdirSync(essaysDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getEssay(slug: string) {
  const filePath = path.join(essaysDir, `${slug}.md`);

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data,
    content,
  };
}

export function getAllEssays() {
  return getAllEssaySlugs().map(getEssay);
}