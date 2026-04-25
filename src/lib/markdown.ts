import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";

export type Heading = {
  id: string;
  text: string;
  depth: number;
};

type AnyNode = {
  type: string;
  value?: string;
  depth?: number;
  children?: AnyNode[];
};

export function extractHeadings(content: string): Heading[] {
  const tree = remark().use(remarkGfm).parse(content) as unknown as AnyNode;
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  visit(tree as never, "heading", (node: AnyNode) => {
    const depth = node.depth ?? 0;
    if (depth < 2 || depth > 4) return;

    const text = getNodeText(node).trim();
    const id = slugger.slug(text || "heading");

    headings.push({ id, text, depth });
  });

  return headings;
}

function getNodeText(node: AnyNode | undefined): string {
  if (!node) return "";

  if (typeof node.value === "string") {
    return node.value;
  }

  if (Array.isArray(node.children)) {
    return node.children.map((child) => getNodeText(child)).join(" ");
  }

  return "";
}
