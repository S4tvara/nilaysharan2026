import { getArchive, getArchiveSlugs } from "@/lib/archives";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

  if (!archive) {
    return <div>Not found</div>;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold mb-10">
        {archive.frontmatter.title}
      </h1>

      <article className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {archive.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
