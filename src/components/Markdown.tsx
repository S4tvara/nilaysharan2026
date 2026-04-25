"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";

export type MarkdownProps = {
  content: string;
  className?: string;
};

const anchorOptions = {
  behavior: "append" as const,
  properties: { className: ["anchor-link"] },
  content: [
    {
      type: "text",
      value: "#",
    },
  ],
};

export default function Markdown({ content, className }: MarkdownProps) {
  return (
    <div className={className ?? "prose prose-invert prose-zinc prose-lg mx-auto"}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, anchorOptions],
          rehypePrism,
        ]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
