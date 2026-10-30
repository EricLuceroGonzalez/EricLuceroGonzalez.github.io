import { getAllPosts } from "./lib/api";
import { LOCALES, DEFAULT_LOCALE, pageUrl } from "./lib/seo";

const STATIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/latex", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
];

const languagesFor = (path, locales) => {
  const languages = Object.fromEntries(locales.map((l) => [l, pageUrl(l, path)]));
  if (locales.includes(DEFAULT_LOCALE)) languages["x-default"] = pageUrl(DEFAULT_LOCALE, path);
  return languages;
};

const validDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? undefined : d;
};

export default function sitemap() {
  // Posts públicos por idioma (getAllPosts ya filtra isPublic)
  const byLocale = Object.fromEntries(LOCALES.map((l) => [l, getAllPosts([], l)]));

  // Fecha del post más reciente de cada sección, para las páginas de listado
  const newest = (filter) =>
    LOCALES.flatMap((l) => byLocale[l])
      .filter(filter)
      .map((p) => validDate(p.date?.iso))
      .filter(Boolean)
      .sort((a, b) => b - a)[0];
  const lastBySection = {
    "": newest(() => true),
    "/blog": newest((p) => p.doctype?.[0] === "blog"),
    "/latex": newest((p) => p.doctype?.[0] === "latex"),
  };

  const staticEntries = STATIC_ROUTES.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: pageUrl(locale, path),
      lastModified: lastBySection[path],
      changeFrequency,
      priority,
      alternates: { languages: languagesFor(path, LOCALES) },
    })),
  );

  const postEntries = LOCALES.flatMap((locale) =>
    byLocale[locale]
      .filter((post) => post.doctype?.[0])
      .map((post) => {
        const path = `/${post.doctype[0]}/${post.slug}`;
        // hreflang solo hacia idiomas donde el post también es público
        const locales = LOCALES.filter((l) =>
          byLocale[l].some((p) => p.slug === post.slug),
        );
        return {
          url: pageUrl(locale, path),
          lastModified: validDate(post.updatedAt ?? post.date?.iso),
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: { languages: languagesFor(path, locales) },
        };
      }),
  );

  return [...staticEntries, ...postEntries];
}
