"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Heading } from "@/lib/markdown";
import { cn } from "@/lib/utils";

type Props = {
  headings: Heading[];
};

export default function TableOfContents({ headings }: Props) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const linksRef = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const items = useMemo(
    () => headings.filter((h) => h.depth >= 2 && h.depth <= 4),
    [headings]
  );

  // Normalise depth so the shallowest visible heading sits flush against the rail.
  const minDepth = useMemo(
    () => items.reduce((min, h) => Math.min(min, h.depth), 6),
    [items]
  );

  useEffect(() => {
    if (!items.length) return;

    const elements = items
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Pick the topmost visible heading; otherwise fall back to the last
        // heading scrolled past so the marker still feels anchored.
        if (visible.size > 0) {
          const firstVisible = items.find((h) => visible.has(h.id));
          if (firstVisible) setActiveId(firstVisible.id);
          return;
        }

        const scrollY = window.scrollY;
        let lastPassed: string | null = null;
        for (const el of elements) {
          if (el.getBoundingClientRect().top + scrollY <= scrollY + 120) {
            lastPassed = el.id;
          }
        }
        setActiveId(lastPassed ?? items[0].id);
      },
      {
        rootMargin: "-80px 0px -65% 0px",
        threshold: 0,
      }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  const handleClick =
    (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
      setActiveId(id);
    };

  return (
    <div className="text-sm text-zinc-400">
      <div className="flex items-center justify-between gap-2 md:mb-4">
        <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
          On this page
        </p>
        <button
          type="button"
          className="md:hidden text-[12px] text-zinc-400 hover:text-zinc-200"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      <nav
        className={cn(
          "transition-all duration-200 overflow-hidden md:overflow-visible",
          open
            ? "max-h-[60vh] opacity-100"
            : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
        )}
      >
        <ul className="relative border-l border-zinc-800/80">
          {items.map((heading) => {
            const isActive = activeId === heading.id;
            const indent = Math.max(0, heading.depth - minDepth);

            return (
              <li key={heading.id} className="relative">
                <a
                  ref={(node) => {
                    if (node) linksRef.current.set(heading.id, node);
                    else linksRef.current.delete(heading.id);
                  }}
                  href={`#${heading.id}`}
                  onClick={handleClick(heading.id)}
                  className={cn(
                    "group block py-1.5 pr-2 leading-snug no-underline transition-colors duration-150",
                    "border-l-2 -ml-px",
                    isActive
                      ? "border-zinc-100 text-zinc-100"
                      : "border-transparent text-zinc-500 hover:text-zinc-200 hover:border-zinc-600",
                    indent === 0 && "pl-4",
                    indent === 1 && "pl-7 text-[0.9em]",
                    indent === 2 && "pl-10 text-[0.85em]"
                  )}
                  style={{
                    fontWeight: isActive && indent === 0 ? 500 : 400,
                  }}
                >
                  <span className="block truncate">{heading.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
