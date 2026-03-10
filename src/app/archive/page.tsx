import { getAllArchives } from "@/lib/archives";
import Link from "next/link";

type Archive = ReturnType<typeof getAllArchives>[number];

export default function Page() {
  const archives = getAllArchives();

  const grouped: Record<string, Archive[]> = {};

  archives.forEach((item) => {
    const year = new Date(item.frontmatter.date).getFullYear().toString();
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(item);
  });

  Object.values(grouped).forEach((list) =>
    list.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    ),
  );

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="mx-auto max-w-4xl py-10">
      <header className="mb-5">
        <h1 className="text-4xl font-semibold tracking-tight mb-4 font-blackletter">
          Archives
        </h1>

        <p className="text-zinc-400 text-[15px] max-w-lg">
          Short notes, fragments, and unfinished ideas.
        </p>
      </header>

      <div className="space-y-20">
        {years.map((year) => (
          <section key={year}>
            <div className="flex items-center gap-6 mb-10">
              <h2 className="text-3xl font-semibold text-zinc-200">{year}</h2>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>

            <ul className="space-y-4">
              {grouped[year].map((item) => (
                <li key={item.slug} className="flex gap-6 text-sm">
                  <span className="w-16 text-zinc-500">
                    {new Date(item.frontmatter.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>

                  <Link
                    href={`/archive/${item.slug}`}
                    className="text-zinc-200 hover:text-white"
                  >
                    {item.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
