"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "@/components/Markdown";
import TableOfContents from "@/components/TableOfContents";
import HighlightsPanel from "@/components/HighlightsPanel";
import SelectionToolbar from "@/components/SelectionToolbar";
import { useHighlights } from "@/hooks/useHighlights";
import type { Heading } from "@/lib/markdown";
import { cn } from "@/lib/utils";

interface Props {
  slug: string;
  content: string;
  title?: string;
  headings?: Heading[];
  showToc?: boolean;
  className?: string;
}

export default function HighlightLayer({ slug, content, title, headings = [], showToc = true, className }: Props) {
  const articleRef = useRef<HTMLDivElement | null>(null);
  const [selectionRect, setSelectionRect] = useState<DOMRect | null>(null);
  const [pendingNote, setPendingNote] = useState<string | null>(null);
  const pendingSelection = useRef<{ blockId: string; text: string } | null>(null);

  const {
    highlights,
    highlightedBlocks,
    flashId,
    setFlashId,
    addHighlight,
    deleteHighlight,
    updateNote,
  } = useHighlights(slug);

  const handleSelection = () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      setSelectionRect(null);
      return;
    }

    const range = sel.getRangeAt(0);
    const common = range.commonAncestorContainer as HTMLElement;
    const block = common.nodeType === 1
      ? (common as HTMLElement).closest("[data-block-id]")
      : (common.parentElement?.closest("[data-block-id]") ?? null);

    if (!block) {
      setSelectionRect(null);
      return;
    }

    const blockId = block.getAttribute("data-block-id");
    if (!blockId) {
      setSelectionRect(null);
      return;
    }

    const text = sel.toString();
    if (!text.trim()) {
      setSelectionRect(null);
      return;
    }

    const rect = range.getBoundingClientRect();
    setSelectionRect(rect);

    pendingSelection.current = { blockId, text };
  };

  const clearSelection = () => {
    setSelectionRect(null);
    const sel = window.getSelection();
    sel?.removeAllRanges();
  };

  const saveHighlight = (withNote: boolean) => {
    const pending = pendingSelection.current;
    if (!pending) return;
    if (withNote) {
      const created = addHighlight(pending.blockId, pending.text, pendingNote || undefined);
      if (created) setPendingNoteFor(created.id);
    } else {
      addHighlight(pending.blockId, pending.text);
    }
    setPendingNote(null);
    pendingSelection.current = null;
    clearSelection();
  };

  useEffect(() => {
    const onMouseUp = () => setTimeout(handleSelection, 0);
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Enter") setTimeout(handleSelection, 0);
    };

    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!flashId) return;
    const el = articleRef.current?.querySelector(`[data-highlight-id="${flashId}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("highlight-flash");
      setTimeout(() => el.classList.remove("highlight-flash"), 1600);
    }
  }, [flashId]);

  const layoutClass = showToc
    ? "grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(220px,0.9fr)]"
    : "flex flex-col";

  return (
    <div className={cn("mx-auto max-w-6xl px-6 py-14", className)} ref={articleRef}>
      <div className={layoutClass}>
        <div>
          {title && <h1 className="text-3xl font-semibold mb-8">{title}</h1>}
          <Markdown
            content={content}
            highlightable
            highlights={highlights}
            highlightedBlocks={highlightedBlocks}
            flashHighlightId={flashId}
          />
        </div>

        <div className="space-y-6">
          {showToc && headings?.length ? <TableOfContents headings={headings} /> : null}
          <HighlightsPanel
            slug={slug}
            highlights={highlights}
            onJump={(blockId, id) => {
              const el = articleRef.current?.querySelector(`[data-block-id="${blockId}"]`);
              if (el) {
                if (id) setFlashId(id);
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            onDelete={deleteHighlight}
            onUpdateNote={updateNote}
          />
        </div>
      </div>

      <SelectionToolbar
        rect={selectionRect}
        onHighlight={() => saveHighlight(false)}
        onHighlightWithNote={() => saveHighlight(true)}
        onCancel={clearSelection}
      />
    </div>
  );
}
