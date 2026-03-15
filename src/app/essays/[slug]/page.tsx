import { getEssay, getEssaySlugs } from "@/lib/essays";
import HighlightLayer from "@/components/HighlightLayer";
import { extractHeadings } from "@/lib/markdown";

export function generateStaticParams() {
  return getEssaySlugs().map((slug) => ({
    slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const essay = getEssay(slug);
  const headings = extractHeadings(essay.content);

  return (
    <HighlightLayer
      slug={essay.slug}
      content={essay.content}
      title={essay.frontmatter.title}
      headings={headings}
    />
  );
}
