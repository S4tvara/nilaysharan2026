import type { Metadata } from "next";
import { getEssay, getEssaySlugs } from "@/lib/essays";
import Markdown from "@/components/Markdown";
import TableOfContents from "@/components/TableOfContents";
import { extractHeadings } from "@/lib/markdown";

export function generateStaticParams() {
  return getEssaySlugs().map((slug) => ({
    slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);
  const title = essay.frontmatter.title;
  const description = essay.frontmatter.description;
  const published = new Date(essay.frontmatter.date);
  const path = `/essays/${slug}`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description: description ?? undefined,
      publishedTime: published.toISOString(),
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description ?? undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const essay = getEssay(slug);
  const headings = extractHeadings(essay.content);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(220px,18rem)]">
        <article className="prose prose-invert prose-zinc prose-lg max-w-none">
          <h1>{essay.frontmatter.title}</h1>
          <Markdown content={essay.content} className="contents" />
        </article>

        {headings.length > 0 && (
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <TableOfContents headings={headings} />
          </aside>
        )}
      </div>
    </div>
  );
}
