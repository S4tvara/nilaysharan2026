"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import type { HTMLAttributes } from "react";

export type MarkdownProps = {
  content: string;
  className?: string;
  highlightable?: boolean;
  highlights?: { id: string; blockId: string }[];
  highlightedBlocks?: Set<string>;
  flashHighlightId?: string | null;
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

export default function Markdown({
  content,
  className,
  highlightable = false,
  highlights = [],
  highlightedBlocks,
  flashHighlightId,
}: MarkdownProps) {
  let blockCounter = 0;

  const renderBlock = (Tag: keyof JSX.IntrinsicElements) =>
    function Block(props: HTMLAttributes<HTMLElement> & { node?: unknown }) {
      blockCounter += 1;
      const blockId = `b-${blockCounter}`;
      const isHighlighted = highlightedBlocks?.has(blockId);
      const highlightId = highlights.find((h) => h.blockId === blockId)?.id;

      const cls = [
        props.className,
        highlightable && isHighlighted ? "highlight-block" : "",
        highlightable && flashHighlightId === highlightId ? "highlight-flash" : "",
      ]
        .filter(Boolean)
        .join(" ");

      return (
        <Tag
          {...props}
          className={cls || undefined}
          data-block-id={blockId}
          data-highlight-id={highlightId}
        >
          {props.children}
        </Tag>
      );
    };

  return (
    <div className={className ?? "prose prose-invert max-w-none"}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkSlug]}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, anchorOptions], rehypePrism]}
        components={
          highlightable
            ? {
                p: renderBlock("p"),
                li: renderBlock("li"),
                h1: renderBlock("h1"),
                h2: renderBlock("h2"),
                h3: renderBlock("h3"),
                h4: renderBlock("h4"),
                blockquote: renderBlock("blockquote"),
              }
            : undefined
        }
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
