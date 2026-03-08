"use client";

import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Note = {
  frontmatter: { title?: string };
  content: string;
};

export default function ModalClient({ note }: { note: Note }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h1 className="text-xl font-semibold text-zinc-100">
            {note.frontmatter.title}
          </h1>

          <button
            onClick={() => router.back()}
            className="text-zinc-400 hover:text-zinc-100 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 py-6">
          <article className="prose prose-invert prose-zinc max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {note.content}
            </ReactMarkdown>
          </article>
        </div>

      </div>
    </div>
  );
} 