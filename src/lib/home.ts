import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

const homeSchema = z.object({
  eyebrow: z.string().optional(),
  byline: z.string().optional(),
  intro: z.string().optional(),
  now: z.string().optional(),
  shelfNote: z.string().optional(),
});

export type HomeData = {
  eyebrow: string;
  byline: string | undefined;
  intro: string;
  now: string | undefined;
  shelfNote: string | undefined;
};

export const DEFAULT_HOME_INTRO =
  "A quiet corner of the internet for things that took longer than an afternoon to think through — essays on ideas, films and music worth returning to, and books worth your time.";

export function getHome(): HomeData {
  const file = path.join(process.cwd(), "src/content/home.md");
  let data: z.infer<typeof homeSchema> = {};

  if (fs.existsSync(file)) {
    const raw = fs.readFileSync(file, "utf-8");
    const { data: frontmatter } = matter(raw);
    const parsed = homeSchema.safeParse(frontmatter);
    if (parsed.success) {
      data = parsed.data;
    } else {
      console.warn("home.md frontmatter parse warning:", parsed.error);
    }
  }

  const introRaw = data.intro?.trim();
  const intro =
    introRaw && introRaw.length > 0 ? introRaw : DEFAULT_HOME_INTRO;

  return {
    eyebrow: data.eyebrow?.trim() || "A reading room",
    byline: data.byline?.trim() || undefined,
    intro,
    now: data.now?.trim() || undefined,
    shelfNote: data.shelfNote?.trim() || undefined,
  };
}
