// app/sitemap.js

export default function sitemap() {
  const baseUrl = "https://eric-lucero-gonzalez.vercel.app";

  // Definimos tus rutas estáticas principales
  const routes = [
    "", // Home
    "/about",
    "/blog",
    "/papers",
    "/legal", // Aunque tenga noindex, es bueno tenerla mapeada
  ];

  // Generamos las entradas para Español e Inglés
  const sitemapEntries = routes.flatMap((route) => {
    return [
      {
        url: `${baseUrl}/es${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8, // Home tiene más prioridad
      },
      {
        url: `${baseUrl}/en${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8,
      },
    ];
  });

  return sitemapEntries;
}
