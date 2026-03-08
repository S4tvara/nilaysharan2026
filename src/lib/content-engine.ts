import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

export type ContentItem<T> = {
  slug: string;
  frontmatter: T;
  content: string;
};

export function getContent<T>(
  folder: string,
  schema: z.ZodType<T>
): ContentItem<T>[] {

  const contentDir = path.join(process.cwd(), "src/content", folder);

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".md"));

  const items = files.map(file => {

    const slug = file.replace(".md", "");

    const raw = fs.readFileSync(
      path.join(contentDir, file),
      "utf-8"
    );

    const { data, content } = matter(raw);

    const frontmatter = schema.parse(data);

    return {
      slug,
      frontmatter,
      content
    };
  });

  return items;
}