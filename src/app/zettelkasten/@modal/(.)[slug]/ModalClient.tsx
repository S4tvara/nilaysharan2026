"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Note = {
  frontmatter: { title?: string };
  content: string;
};

export default function ModalClient({ note }: { note: Note }) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

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
      className="fixed inset-0 z-50 flex items-center justify-center 
      bg-black/60 backdrop-blur-sm p-6"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[88vh]
        bg-zinc-950 border border-zinc-800 rounded-lg
        flex flex-col shadow-2xl"
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
        <div
          className="
          overflow-y-auto px-6 py-6
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-thumb]:bg-zinc-700/50
          [&::-webkit-scrollbar-track]:bg-transparent
          scrollbar-thin scrollbar-thumb-zinc-700/50
        "
        >
          <article className="prose prose-invert prose-zinc max-w-[70ch] mx-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {note.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}