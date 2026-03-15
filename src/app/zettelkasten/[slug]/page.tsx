import { getNote, getAllSlugs } from "@/lib/content";
import HighlightLayer from "@/components/HighlightLayer";
import { extractHeadings } from "@/lib/markdown";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  const note = getNote(slug);
  const headings = extractHeadings(note.content);

  return (
    <HighlightLayer
      slug={note.slug}
      content={note.content}
      title={note.frontmatter.title ?? slug}
      headings={headings}
    />
  );
}
