"use client";

import { useEffect, useMemo, useState } from "react";
import { Highlight, loadHighlights, persistHighlights, removeHighlight, parseHash } from "@/lib/highlights";

function uuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `hl-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useHighlights(slug: string) {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [flashId, setFlashId] = useState<string | null>(null);
  const [pendingNoteFor, setPendingNoteFor] = useState<string | null>(null);

  useEffect(() => {
    setHighlights(loadHighlights(slug));
  }, [slug]);

  useEffect(() => {
    const parsed = parseHash(window.location.hash);
    if (!parsed) return;

    const existing = loadHighlights(slug).find((h) => h.id === parsed.id);
    if (existing) {
      setFlashId(existing.id);
      return;
    }

    if (parsed.payload?.blockId && parsed.payload?.text) {
      const transient: Highlight = {
        id: parsed.id,
        slug,
        blockId: parsed.payload.blockId,
        text: parsed.payload.text,
        createdAt: new Date().toISOString(),
        transient: true,
      };
      setHighlights((prev) => [...prev, transient]);
      setFlashId(transient.id);
    }
  }, [slug]);

  const highlightedBlocks = useMemo(() => new Set(highlights.map((h) => h.blockId)), [highlights]);

  const addHighlight = (blockId: string, text: string, note?: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newHighlight: Highlight = {
      id: uuid(),
      slug,
      blockId,
      text: trimmed,
      note: note?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    setHighlights((prev) => {
      const next = [...prev, newHighlight];
      persistHighlights(slug, next);
      return next;
    });
    setFlashId(newHighlight.id);
    return newHighlight;
  };

  const deleteHighlight = (id: string) => {
    setHighlights((prev) => prev.filter((h) => h.id !== id));
    removeHighlight(slug, id);
  };

  const updateNote = (id: string, note: string) => {
    setHighlights((prev) => {
      const next = prev.map((h) => (h.id === id ? { ...h, note } : h));
      persistHighlights(slug, next);
      return next;
    });
  };

  return {
    highlights,
    highlightedBlocks,
    flashId,
    setFlashId,
    addHighlight,
    deleteHighlight,
    updateNote,
    pendingNoteFor,
    setPendingNoteFor,
  };
}
