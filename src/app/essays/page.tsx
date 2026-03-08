  import Link from "next/link";
  import { getAllEssays } from "@/lib/essays";

  type Essay = ReturnType<typeof getAllEssays>[number];

  export default function Page() {
    const essays = getAllEssays();

    const grouped: Record<string, Essay[]> = {};

    essays.forEach((essay) => {
      const tags = Array.isArray(essay.frontmatter.tags)
        ? essay.frontmatter.tags
        : [essay.frontmatter.tags ?? "general"];

      tags.forEach((tag: string) => {
        if (!grouped[tag]) grouped[tag] = [];
        grouped[tag].push(essay);
      });
    });

    Object.values(grouped).forEach((list) =>
      list.sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
      )
    );

    const tags = Object.keys(grouped);

    /* distribute tags across columns */
    const columns: string[][] = [[], [], []];
    tags.forEach((tag, i) => {
      columns[i % 3].push(tag);
    });

    return (
      <main className="mx-auto max-w-7xl px-8 py-10">
        {/* Header */}
        <header className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-100 mb-4 font-blackletter">
            Essays
          </h1>

          <p className="text-zinc-400 text-[15px] leading-relaxed">
            {essays.length} ideas which took more than an evening to explore.  
          </p>

          <div className="mt-6 h-px w-24 bg-zinc-800" />
        </header>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20">
          {columns.map((col, idx) => (
            <div key={idx} className="space-y-20">
              {col.map((tag) => (
                <section key={tag}>
                  <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-10">
                    {tag}
                  </h2>

                  <div className="space-y-10">
                    {grouped[tag].map((essay) => (
                      <article key={essay.slug}>
                        <Link
                          href={`/essays/${essay.slug}`}
                          className="block text-lg font-medium leading-snug hover:underline"
                        >
                          {essay.frontmatter.title}
                        </Link>

                        {essay.frontmatter.description && (
                          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                            {essay.frontmatter.description}
                          </p>
                        )}

                        {essay.frontmatter.date && (
                          <p className="text-xs text-zinc-500 mt-3">
                            {new Date(
                              essay.frontmatter.date
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ))}
        </div>
      </main>
    );
  }