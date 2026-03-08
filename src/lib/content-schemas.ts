import { z } from "zod";

export const essaySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  tags: z.array(z.union([z.string(), z.array(z.string())])).optional(),
});

export const archiveSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).optional(),
});

export const zettelSchema = z.object({
  title: z.string(),
  themes: z.array(z.string()).optional(),
  topics: z.array(z.string()).optional(),
  links: z.array(z.string()).optional(),
});

export type EssayFrontmatter = z.infer<typeof essaySchema>;
export type ArchiveFrontmatter = z.infer<typeof archiveSchema>;
export type ZettelFrontmatter = z.infer<typeof zettelSchema>;
