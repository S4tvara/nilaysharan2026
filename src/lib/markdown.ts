import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import type { Root, Content, PhrasingContent } from "mdast";

export type Heading = {
  id: string;
  text: string;
  depth: number;
};

export function extractHeadings(content: string): Heading[] {
  const tree = remark().use(remarkGfm).parse(content) as Root;
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  visit<Root, "heading">(tree, "heading", (node) => {
    if (node.depth < 2 || node.depth > 4) return;

    const text = getNodeText(node).trim();
    const id = slugger.slug(text || "heading");

    headings.push({ id, text, depth: node.depth });
  });

  return headings;
}

function getNodeText(node: Content | PhrasingContent | undefined): string {
  if (!node) return "";

  if ("value" in node && typeof node.value === "string") {
    return node.value;
  }

  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map((child) => getNodeText(child as Content)).join(" ");
  }

  return "";
}
