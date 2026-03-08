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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 p-8 rounded">

        <button
          onClick={() => router.back()}
          className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-100"
        >
          ✕
        </button>

        <h1 className="text-2xl font-semibold mb-6">
          {note.frontmatter.title}
        </h1>

        <article className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </article>

      </div>
    </div>
  );
}