// Next lo sirve en /manifest.webmanifest y añade el <link rel="manifest"> solo.
export default function manifest() {
  return {
    name: "Eric Lucero González",
    short_name: "Eric Lucero",
    description: "IA, algoritmos, datos y LaTeX, explicados con experimentos.",
    start_url: "/es",
    scope: "/",
    display: "standalone",
    background_color: "#F8F9FA",
    theme_color: "#0077FF",
    lang: "es",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
