"use client";

import { useMemo, useState } from "react";
import type { Highlight } from "@/lib/highlights";
import { encodeShareHash } from "@/lib/highlights";

interface Props {
  slug: string;
  highlights: Highlight[];
  onJump: (blockId: string, highlightId?: string) => void;
  onDelete: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
}

export default function HighlightsPanel({ slug, highlights, onJump, onDelete, onUpdateNote }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const list = useMemo(
    () => highlights.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [highlights]
  );

  if (!list.length) return null;

  return (
    <aside className="border border-zinc-800/60 bg-zinc-950/60 rounded-lg p-4 text-sm text-zinc-300 backdrop-blur">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">Highlights</p>
        <span className="text-[11px] text-zinc-500">{list.length}</span>
      </div>

      <div className="space-y-3">
        {list.map((hl) => (
          <div
            key={hl.id}
            className="rounded-md border border-zinc-800/70 bg-zinc-900/60 px-3 py-2"
          >
            <button
              onClick={() => onJump(hl.blockId, hl.id)}
              className="text-left w-full text-zinc-200 hover:text-white"
            >
              <div className="text-xs text-zinc-400 mb-1 truncate">{slug} · {hl.blockId}</div>
              <div className="text-sm leading-snug line-clamp-3">{hl.text}</div>
            </button>

            {editingId === hl.id ? (
              <div className="mt-2 space-y-2">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="w-full rounded bg-zinc-950 border border-zinc-800 px-2 py-1 text-sm text-zinc-100"
                  rows={2}
                />
                <div className="flex gap-2 text-xs text-zinc-400">
                  <button
                    className="px-2 py-1 rounded bg-zinc-800 text-zinc-100"
                    onClick={() => {
                      onUpdateNote(hl.id, draft.trim());
                      setEditingId(null);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="px-2 py-1 rounded bg-zinc-900"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                <div className="space-y-1">
                  {hl.note && <p className="text-zinc-300">{hl.note}</p>}
                  <p>{new Date(hl.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="hover:text-zinc-200"
                    onClick={() => {
                      setEditingId(hl.id);
                      setDraft(hl.note ?? "");
                    }}
                  >
                    Note
                  </button>
                  <button
                    className="hover:text-zinc-200"
                    onClick={async () => {
                      const hash = encodeShareHash(hl);
                      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${hash}`);
                    }}
                  >
                    Copy
                  </button>
                  <button
                    className="text-rose-300 hover:text-rose-200"
                    onClick={() => onDelete(hl.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
