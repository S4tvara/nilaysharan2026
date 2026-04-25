import { getAllEssays } from "@/lib/essays";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://example.com";

export function GET() {
  const essays = [...getAllEssays()].sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

  const items = essays
    .map((essay) => {
      const url = `${siteUrl}/essays/${essay.slug}`;
      const pub = new Date(essay.frontmatter.date);
      const desc = essay.frontmatter.description
        ? `<description>${escapeXml(essay.frontmatter.description)}</description>`
        : "";
      return `
    <item>
      <title>${escapeXml(essay.frontmatter.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${pub.toUTCString()}</pubDate>
      ${desc}
    </item>`;
    })
    .join("");

  const lastBuild = essays[0]
    ? new Date(essays[0].frontmatter.date).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>s4tvara — Essays</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>Essays and recommendations.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${escapeXml(siteUrl)}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
