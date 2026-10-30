// Construye el XML de un feed RSS 2.0. Función pura: no lee archivos.

const BASE = "https://ericlucero.dev";

const CHANNEL = {
  es: {
    title: "Eric Lucero González",
    description: "IA, algoritmos, datos y LaTeX, explicados con experimentos.",
    templatePrefix: "Nueva plantilla LaTeX",
  },
  en: {
    title: "Eric Lucero González",
    description: "AI, algorithms, data and LaTeX, explained through experiments.",
    templatePrefix: "New LaTeX template",
  },
};

const MAX_ITEMS = 30;

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toDate = (value) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

function postItems(posts, locale, topics) {
  return posts.map((p) => {
    const link = `${BASE}/${locale}/${p.doctype[0]}/${p.slug}`;
    return {
      title: p.title,
      link,
      guid: link,
      permalink: true,
      date: toDate(p.date?.iso),
      description: p.excerpt,
      category: topics[p.topic] ?? null,
    };
  });
}

// Cada plantilla publicada aparece una vez. El guid no cambia al republicarla,
// así que los lectores RSS no la muestran como nueva cada vez.
function templateItems(templates, locale) {
  const prefix = CHANNEL[locale].templatePrefix;
  return templates
    .filter((t) => t.source && t.updatedAt)
    .map((t) => ({
      title: `${prefix}: ${t.title[locale] ?? t.title.es}`,
      link: `${BASE}/${locale}/latex#plantillas`,
      guid: `${BASE}/latex/${t.id}`,
      permalink: false,
      date: toDate(t.updatedAt),
      description: t.description[locale] ?? t.description.es,
      category: "LaTeX",
    }));
}

function itemXml(it) {
  return [
    "  <item>",
    `    <title>${esc(it.title)}</title>`,
    `    <link>${esc(it.link)}</link>`,
    `    <guid isPermaLink="${it.permalink}">${esc(it.guid)}</guid>`,
    it.date ? `    <pubDate>${it.date.toUTCString()}</pubDate>` : null,
    it.category ? `    <category>${esc(it.category)}</category>` : null,
    `    <description>${esc(it.description)}</description>`,
    "  </item>",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildFeed({ locale, posts = [], templates = [], topics = {} }) {
  const channel = CHANNEL[locale] ?? CHANNEL.es;
  const selfUrl = `${BASE}/${locale}/feed.xml`;

  const items = [...postItems(posts, locale, topics), ...templateItems(templates, locale)]
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))
    .slice(0, MAX_ITEMS);

  const newest = items.find((it) => it.date)?.date;

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(channel.title)}</title>
  <link>${BASE}/${locale}</link>
  <description>${esc(channel.description)}</description>
  <language>${locale}</language>${newest ? `\n  <lastBuildDate>${newest.toUTCString()}</lastBuildDate>` : ""}
  <atom:link href="${selfUrl}" rel="self" type="application/rss+xml"/>
${items.map(itemXml).join("\n")}
</channel>
</rss>
`;
}

export const RSS_HEADERS = { "Content-Type": "application/rss+xml; charset=utf-8" };
