import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content/Zettelkasten");

export function getAllSlugs() {
  return fs.readdirSync(contentDir).map((file) => file.replace(".md", ""));
}

export function getNote(slug: string) {
  if (!slug) {
    throw new Error("Slug is undefined");
  }

  const filePath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Note not found: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data,
    content,
  };
}
