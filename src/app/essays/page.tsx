import Link from "next/link";
import { getAllEssays } from "@/lib/essays";

export default function Page() {
  const essays = getAllEssays();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold mb-10">Essays</h1>

      <div className="space-y-8">
        {essays.map((essay) => (
          <article key={essay.slug}>
            <Link
              href={`/essays/${essay.slug}`}
              className="text-lg font-medium hover:underline"
            >
              {essay.frontmatter.title}
            </Link>

            {essay.frontmatter.description && (
              <p className="text-zinc-400 mt-1">
                {essay.frontmatter.description}
              </p>
            )}

            {essay.frontmatter.date && (
              <p className="text-xs text-zinc-500 mt-2">
                {new Date(essay.frontmatter.date).toLocaleDateString()}
              </p>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
