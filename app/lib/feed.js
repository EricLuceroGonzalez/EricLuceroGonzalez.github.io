// Reúne los datos del sitio y genera la respuesta del feed de un idioma.
import { getAllPosts } from "@/app/lib/api";
import manifest from "@/app/lib/latex-manifest.json";
import es from "@/messages/es.json";
import en from "@/messages/en.json";
import { buildFeed, RSS_HEADERS } from "@/app/lib/rss";

const MESSAGES = { es, en };

export function feedResponse(locale) {
  const xml = buildFeed({
    locale,
    posts: getAllPosts([], locale),
    templates: manifest.templates,
    topics: MESSAGES[locale].HomePage.topics,
  });
  return new Response(xml, { headers: RSS_HEADERS });
}
