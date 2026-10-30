export const SITE_URL = "https://ericlucero.dev";
export const SITE_NAME = "Eric Lucero González";
export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";

export const pageUrl = (locale, path = "") => `${SITE_URL}/${locale}${path}`;

// canonical + hreflang (con x-default) + enlace al RSS del idioma.
// Next reemplaza `alternates` entero cuando una página lo define, así que
// el enlace al RSS tiene que ir aquí y no solo en el layout.
export function alternatesFor(locale, path = "", available = LOCALES) {
  const languages = Object.fromEntries(available.map((l) => [l, pageUrl(l, path)]));
  if (available.includes(DEFAULT_LOCALE)) {
    languages["x-default"] = pageUrl(DEFAULT_LOCALE, path);
  }
  return {
    canonical: pageUrl(locale, path),
    languages,
    types: {
      "application/rss+xml": [{ url: `${SITE_URL}/${locale}/feed.xml`, title: SITE_NAME }],
    },
  };
}
