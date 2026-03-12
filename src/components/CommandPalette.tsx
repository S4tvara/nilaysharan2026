"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { SearchItem } from "@/lib/search-index";

type CommandPaletteProps = {
  items: SearchItem[];
};

const kindStyles: Record<SearchItem["kind"], string> = {
  essay: "text-emerald-300 border-emerald-500/30",
  archive: "text-sky-300 border-sky-500/30",
  zettel: "text-fuchsia-300 border-fuchsia-500/30"
};

const CommandPalette = ({ items }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return items.slice(0, 8);
    }

    return items
      .map((item) => {
        const haystack = `${item.title} ${item.description} ${item.tags.join(" ")} ${item.kind}`.toLowerCase();
        const score = haystack.includes(search) ? 1 : 0;

        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .map((entry) => entry.item)
      .slice(0, 10);
  }, [items, query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-zinc-700 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
        aria-label="Open command palette"
      >
        Search ⌘K
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm px-4 pt-20" onClick={() => setOpen(false)}>
          <div
            className="mx-auto max-w-2xl rounded-2xl border border-zinc-700 bg-zinc-950/95 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-zinc-800 p-4">
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Teleport through essays, archives, and zettels..."
                className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
              />
            </div>

            <ul className="max-h-[60vh] overflow-y-auto p-3">
              {filtered.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-zinc-500">No matching idea found.</li>
              ) : (
                filtered.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 no-underline transition hover:bg-zinc-900"
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] ${kindStyles[item.kind]}`}>
                          {item.kind}
                        </span>
                        <p className="text-sm font-medium text-zinc-100">{item.title}</p>
                      </div>

                      <p className="text-xs text-zinc-400">{item.description}</p>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CommandPalette;
