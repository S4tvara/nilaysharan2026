import { ImageResponse } from "next/og";
import { getEssay, getEssaySlugs } from "@/lib/essays";

export const alt = "Essay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getEssaySlugs().map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const essay = getEssay(slug);
  const title = essay.frontmatter.title;
  const date = new Date(essay.frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(165deg, #09090b 0%, #18181b 45%, #09090b 100%)",
          color: "#fafafa",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#71717a",
          }}
        >
          s4tvara
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxHeight: 280,
              overflow: "hidden",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 22, color: "#a1a1aa" }}>{date}</div>
        </div>

        <div style={{ fontSize: 16, color: "#52525b" }}>Essay</div>
      </div>
    ),
    { ...size }
  );
}
