export type Highlight = {
  id: string;
  slug: string;
  blockId: string;
  text: string;
  note?: string;
  createdAt: string;
  transient?: boolean;
};

const STORAGE_KEY = "highlights:v1";

function isBrowser() {
  return typeof window !== "undefined";
}

function loadAll(): Highlight[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Highlight[];
  } catch (err) {
    console.error("Failed to load highlights", err);
    return [];
  }
}

function saveAll(next: Highlight[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (err) {
    console.error("Failed to save highlights", err);
  }
}

export function loadHighlights(slug: string): Highlight[] {
  return loadAll().filter((h) => h.slug === slug);
}

export function persistHighlights(slug: string, highlights: Highlight[]) {
  const others = loadAll().filter((h) => h.slug !== slug);
  saveAll([...others, ...highlights]);
}

export function removeHighlight(slug: string, id: string) {
  const next = loadHighlights(slug).filter((h) => h.id !== id);
  persistHighlights(slug, next);
  return next;
}

export function upsertHighlight(highlight: Highlight) {
  const existing = loadHighlights(highlight.slug).filter((h) => h.id !== highlight.id);
  const next = [...existing, highlight];
  persistHighlights(highlight.slug, next);
  return next;
}

export function parseHash(hash: string | undefined | null) {
  if (!hash) return null;
  const cleaned = hash.replace(/^#/, "");
  if (!cleaned.startsWith("hl-")) return null;
  const rest = cleaned.slice(3);
  const [id, payload] = rest.split(":");
  if (!id) return null;

  let decoded: { blockId?: string; text?: string } | null = null;
  if (payload) {
    try {
      decoded = JSON.parse(atob(payload));
    } catch {
      decoded = null;
    }
  }

  return { id, payload: decoded };
}

export function encodeShareHash(highlight: Highlight) {
  const payload = btoa(
    JSON.stringify({ blockId: highlight.blockId, text: highlight.text.slice(0, 400) })
  );
  return `hl-${highlight.id}:${payload}`;
}
