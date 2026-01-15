// app/sitemap.js

import { getAllPosts } from "./lib/api";

export default async function sitemap() {
  const baseUrl = "https://ericlucero.dev";
  const locales = ["es", "en"];
  const defaultLocale = "es";

  // rutas estáticas (Home, Blog, About, etc.)
  const staticRoutes = ["", "/blog", "/latex", "/about"].flatMap((route) => {
    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    }));
  });

  // rutas dinámicas (Los Posts)
  const posts = getAllPosts(["slug", "doctype"]);
  // GENERAR RUTAS DE POSTS
  const postRoutes = posts.flatMap((post) => {
    let dateObj = new Date(post.date.iso);
    if (isNaN(dateObj.getTime())) {
      console.warn(
        `⚠️ Fecha inválida en post: ${post.slug}. Usando fecha actual.`
      );
      dateObj = new Date();
    }

    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: dateObj.toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  });

  // UNIR TODO
  return [...staticRoutes, ...postRoutes];
}
