import { getAllPosts } from "@/app/lib/api";

export const dynamic = "force-static";

const BASE = "https://ericlucero.dev";
const esc = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  // getAllPosts ya filtra isPublic y ordena por fecha
  const posts = getAllPosts([], "es").slice(0, 30);

  const items = posts
    .map((p) => {
      const url = `${BASE}/es/${p.doctype[0]}/${p.slug}`;
      return `<item>
  <title>${esc(p.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${new Date(p.date.iso).toUTCString()}</pubDate>
  <description>${esc(p.excerpt)}</description>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Eric Lucero González</title>
  <link>${BASE}/es</link>
  <description>IA, algoritmos, datos y LaTeX.</description>
  <language>es</language>
  <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}