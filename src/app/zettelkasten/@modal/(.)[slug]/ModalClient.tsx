"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import HighlightLayer from "@/components/HighlightLayer";
import { extractHeadings } from "@/lib/markdown";

type Note = {
  slug: string;
  frontmatter: { title?: string };
  content: string;
};

export default function ModalClient({ note }: { note: Note }) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const headings = extractHeadings(note.content);

  /* ESC close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  /* lock background scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* click outside close */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      router.back();
    }
  };

  return (
    <div
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[88vh] bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col shadow-2xl"
      >
        {/* Title */}
        <div className="px-6 pt-6 pb-4 border-b border-zinc-800">
          <div className="flex items-start justify-between">
            <h1 className="text-lg font-semibold text-zinc-100 tracking-tight">
              {note.frontmatter.title}
            </h1>

            <button
              onClick={() => router.back()}
              className="text-zinc-500 hover:text-zinc-200 text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-3 py-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-700/50 [&::-webkit-scrollbar-track]:bg-transparent scrollbar-thin scrollbar-thumb-zinc-700/50">
          <HighlightLayer
            slug={note.slug}
            content={note.content}
            title={note.frontmatter.title}
            headings={headings}
            showToc={false}
            className="max-w-none px-2 py-0"
          />
        </div>
      </div>
    </div>
  );
}
