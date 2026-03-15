import { getArchive, getArchiveSlugs } from "@/lib/archives";
import HighlightLayer from "@/components/HighlightLayer";
import { extractHeadings } from "@/lib/markdown";

export function generateStaticParams() {
  return getArchiveSlugs().map((slug) => ({
    slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const archive = getArchive(slug);
  const headings = extractHeadings(archive.content);

  if (!archive) {
    return <div>Not found</div>;
  }

  return (
    <HighlightLayer
      slug={archive.slug}
      content={archive.content}
      title={archive.frontmatter.title}
      headings={headings}
    />
  );
}
