import { getEssay, getAllEssaySlugs } from "@/lib/essays";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function generateStaticParams() {
  return getAllEssaySlugs().map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;

  const essay = getEssay(slug);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold mb-10">
        {essay.frontmatter.title}
      </h1>

      <article className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {essay.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}