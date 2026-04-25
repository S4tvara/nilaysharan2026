import { z } from "zod";

export const essaySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  tags: z.array(z.union([z.string(), z.array(z.string())])).optional(),
  /** When set, the newest featured essay (by date) is shown as home feature. */
  featured: z.boolean().optional(),
  /** Optional one-line pull quote on the home featured block. */
  pullQuote: z.string().optional(),
});

export type EssayFrontmatter = z.infer<typeof essaySchema>;
