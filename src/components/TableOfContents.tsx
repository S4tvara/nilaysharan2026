"use client";

import { useMemo, useState } from "react";
import type { Heading } from "@/lib/markdown";
import { cn } from "@/lib/utils";

type Props = {
  headings: Heading[];
};

export default function TableOfContents({ headings }: Props) {
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () => headings.filter((h) => h.depth >= 2 && h.depth <= 4),
    [headings]
  );

  if (!items.length) return null;

  return (
    <aside className="border border-zinc-800/60 bg-zinc-950/60 rounded-lg p-4 text-sm text-zinc-300 backdrop-blur">
      <div className="flex items-center justify-between gap-2 md:mb-3">
        <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
          On this page
        </p>
        <button
          className="md:hidden text-[12px] text-zinc-400 hover:text-zinc-200"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      <nav
        className={cn(
          "space-y-2 transition-all duration-200 overflow-hidden md:overflow-visible",
          open
            ? "max-h-[420px] opacity-100"
            : "max-h-0 opacity-0 md:max-h-none md:opacity-100",
          "md:max-h-none md:opacity-100 md:block"
        )}
      >
        <ul className="space-y-1">
          {items.map((heading) => (
            <li key={heading.id}
              className={cn(
                "leading-tight",
                heading.depth === 3 && "pl-3 text-zinc-400",
                heading.depth === 4 && "pl-6 text-zinc-500 text-xs"
              )}
            >
              <a
                href={`#${heading.id}`}
                className="no-underline text-inherit hover:text-zinc-100"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
