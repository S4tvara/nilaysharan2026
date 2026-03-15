"use client";

import { cn } from "@/lib/utils";

interface Props {
  rect: DOMRect | null;
  onHighlight: () => void;
  onHighlightWithNote: () => void;
  onCancel: () => void;
}

export default function SelectionToolbar({ rect, onHighlight, onHighlightWithNote, onCancel }: Props) {
  if (!rect) return null;

  const top = Math.max(8, rect.top + window.scrollY - 40);
  const left = rect.left + window.scrollX + rect.width / 2;

  return (
    <div
      className={cn(
        "fixed z-40 -translate-x-1/2 rounded-full border border-zinc-800 bg-zinc-950/90 px-2 py-1 shadow-lg backdrop-blur",
        "flex items-center gap-2 text-xs text-zinc-100"
      )}
      style={{ top, left }}
    >
      <button className="px-2 py-1 hover:text-green-300" onClick={onHighlight}>
        Highlight
      </button>
      <button className="px-2 py-1 hover:text-sky-300" onClick={onHighlightWithNote}>
        Add note
      </button>
      <button className="px-2 py-1 text-zinc-400 hover:text-zinc-200" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}
