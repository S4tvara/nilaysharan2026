import Link from "next/link";
import { getAllEssays } from "@/lib/essays";
import { books } from "@/data/recommendations";
import { getHome } from "@/lib/home";
import { pickFeaturedEssay } from "@/lib/featured-essay";
import { flattenTags } from "@/lib/tags";
import { resolvePullQuote } from "@/lib/excerpt";
import { focusLinkClass } from "@/lib/focus-link";
import { cn } from "@/lib/utils";

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const shelfTilt = [
  "motion-safe:-rotate-[0.9deg]",
  "motion-safe:-rotate-[0.3deg]",
  "motion-safe:rotate-[0.3deg]",
  "motion-safe:rotate-[0.9deg]",
] as const;

export default function Page() {
  const home = getHome();
  const allEssays = getAllEssays();

  const sorted = [...allEssays].sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

  const featured = pickFeaturedEssay(sorted);
  const moreEssays = featured
    ? sorted.filter((e) => e.slug !== featured.slug).slice(0, 3)
    : sorted.slice(0, 3);
  const featuredBooks = books.slice(0, 4);
  const tagLabels = featured ? flattenTags(featured.frontmatter.tags) : [];
  const pullQuote = featured ? resolvePullQuote(featured) : null;

  const sectionLink = cn(
    "text-[11px] uppercase tracking-[0.2em] text-zinc-500 no-underline",
    "hover:text-[var(--accent)] focus-visible:text-zinc-200 transition-colors duration-200",
    focusLinkClass
  );
  const ctaClass = cn(
    "mt-6 inline-flex items-center text-xs uppercase tracking-[0.2em] no-underline",
    "text-zinc-500 group-hover:text-[var(--accent)] group-focus-visible:text-zinc-200 transition-colors",
    focusLinkClass
  );

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-12 text-zinc-300">
      {/* Hero */}
      <section className="border-b border-zinc-900/80 pb-12 mb-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 mb-5">
          {home.eyebrow}
        </p>

        <h1 className="font-blackletter text-zinc-100 leading-[0.95] mb-4 text-[clamp(3.5rem,9vw,6.5rem)]">
          s4tvara
        </h1>

        {home.byline && (
          <p className="mb-5 max-w-xl text-[15px] leading-relaxed text-zinc-300">
            {home.byline}
          </p>
        )}

        <p className="max-w-xl text-[16px] leading-relaxed text-zinc-400">
          {home.intro}
        </p>

        {home.now && (
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-500 font-mono">
            {home.now}
          </p>
        )}
      </section>

      {featured && (
        <section className="mb-20">
          <div className="grid gap-x-12 gap-y-6 md:grid-cols-[10rem_minmax(0,1fr)]">
            <div className="md:pt-2">
              <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                {featured.frontmatter.featured
                  ? "Featured essay"
                  : "Latest essay"}
              </p>
              <p className="mt-2 text-xs text-zinc-600 tabular-nums">
                {formatDate(new Date(featured.frontmatter.date))}
              </p>
            </div>

            <Link
              href={`/essays/${featured.slug}`}
              className={cn(
                "group block border-l border-zinc-800 pl-6 no-underline -ml-0 md:ml-0",
                focusLinkClass
              )}
            >
              <h2 className="font-serif text-zinc-100 leading-[1.15] tracking-tight text-[clamp(1.75rem,3.5vw,2.75rem)] group-hover:text-white transition-colors">
                {featured.frontmatter.title}
              </h2>

              {tagLabels.length > 0 && (
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Tagged: {tagLabels.join(" · ")}
                </p>
              )}

              {pullQuote && (
                <blockquote className="mt-5 max-w-2xl border-l-2 border-zinc-700 pl-4 text-[16px] leading-relaxed text-zinc-300 font-serif italic">
                  {pullQuote}
                </blockquote>
              )}

              {featured.frontmatter.description && (
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
                  {featured.frontmatter.description}
                </p>
              )}

              <span className={ctaClass}>
                Read essay
                <span aria-hidden className="ml-2">
                  &rarr;
                </span>
              </span>
            </Link>
          </div>
        </section>
      )}

      <section className="grid gap-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] mb-12">
        {moreEssays.length > 0 && (
          <div>
            <SectionHeader
              title="More writing"
              href="/essays"
              linkLabel="Archive"
              linkClassName={sectionLink}
            />

            <ol className="space-y-6">
              {moreEssays.map((essay) => {
                const date = new Date(essay.frontmatter.date);
                return (
                  <li key={essay.slug}>
                    <Link
                      href={`/essays/${essay.slug}`}
                      className={cn(
                        "group flex flex-col gap-1 no-underline",
                        focusLinkClass
                      )}
                    >
                      <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-600 tabular-nums">
                        {formatDate(date)}
                      </p>
                      <p className="text-[17px] leading-snug text-zinc-200 group-hover:text-zinc-50 transition-colors">
                        {essay.frontmatter.title}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {featuredBooks.length > 0 && (
          <div>
            <SectionHeader
              title="On the shelf"
              href="/recommendations"
              linkLabel="All picks"
              linkClassName={sectionLink}
            />

            <ul className="home-shelf grid grid-cols-4 gap-x-3">
              {featuredBooks.map((book, i) => (
                <li
                  key={book.title}
                  className={cn("group", shelfTilt[i] ?? "motion-safe:rotate-0")}
                >
                  <div
                    className={cn(
                      "relative aspect-[2/3] w-full overflow-hidden rounded-[3px]",
                      "bg-zinc-900 ring-1 ring-zinc-800/80",
                      "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)]",
                      "transition-transform duration-300 ease-out",
                      "motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:rotate-0"
                    )}
                  >
                    <img
                      src={book.cover}
                      alt={`Cover of ${book.title}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-[6px] bg-gradient-to-r from-black/40 via-black/15 to-transparent"
                    />
                  </div>
                </li>
              ))}
            </ul>

            {home.shelfNote && (
              <p className="mt-6 text-xs text-zinc-500 leading-relaxed">
                {home.shelfNote}
              </p>
            )}
          </div>
        )}
      </section>

      <p className="text-center text-xs text-zinc-600 border-t border-zinc-900/60 pt-10">
        IBM Plex Serif · <span className="font-blackletter">UnifrakturCook</span>{" "}
        · Next.js
      </p>
    </main>
  );
}

function SectionHeader({
  title,
  href,
  linkLabel,
  linkClassName,
}: {
  title: string;
  href: string;
  linkLabel: string;
  linkClassName: string;
}) {
  return (
    <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-zinc-900/80">
      <h2 className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
        {title}
      </h2>
      <Link href={href} className={linkClassName}>
        {linkLabel} &rarr;
      </Link>
    </div>
  );
}
