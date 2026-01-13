// app/sitemap.js

import { getAllPosts } from "./lib/api";

export default async function sitemap() {
  const baseUrl = "https://eric-lucero-gonzalez.vercel.app";

  // rutas estáticas (Home, Blog, About, etc.)
  const routes = ["", "/blog", "/latex", "/about"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8, // Home es prioridad 1
  }));

  // rutas dinámicas (Los Posts)
  const posts = getAllPosts(["slug", "doctype"]);

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "weekly", // Los posts viejos cambian poco
    priority: 0.7,
  }));

  // Fusionar todo
  return [...routes, ...blogUrls];
}
