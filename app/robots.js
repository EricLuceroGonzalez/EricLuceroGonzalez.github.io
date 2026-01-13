export default function robots() {
  const baseUrl = "https://eric-lucero-gonzalez.vercel.app";

  return {
    rules: {
      userAgent: "*", // Aplica a todos los robots (Google, Bing, etc.)
      allow: "/", // Permite entrar a todo...
      disallow: [
        // ...excepto a estas rutas:
        "/api/", // No indexar endpoints de API
        "/private/", // carpetas privadas
        "/_next/", // Archivos internos de Next.js
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
