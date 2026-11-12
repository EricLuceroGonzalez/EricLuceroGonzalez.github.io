import { getAllPosts } from "./api";

export const LOCALES = ["es", "en"];

// Páginas fijas que se contabilizan (sin el prefijo de idioma).
const STATIC_PATHS = new Set([
  "",
  "/blog",
  "/latex",
  "/latex/curso",
  "/about",
  "/about/this-page",
  "/about/terminos-legales",
  "/about/license",
  "/artemis",
  "/chuchu",
]);

// Posts públicos por idioma: { es: Set("/blog/x", "/latex/y"), en: … }.
// Se calcula una vez por instancia del servidor.
let postPaths = null;
function getPostPaths() {
  if (postPaths) return postPaths;
  postPaths = Object.fromEntries(
    LOCALES.map((locale) => [
      locale,
      new Set(
        getAllPosts([], locale)
          .filter((p) => p.doctype?.[0])
          .map((p) => `/${p.doctype[0]}/${p.slug}`),
      ),
    ]),
  );
  return postPaths;
}

// "/es/blog/sorteo-mundial?x=1#a" → { locale: "es", path: "/blog/sorteo-mundial" }
// Devuelve null si no es una página real del sitio.
export function parseSitePath(raw) {
  if (typeof raw !== "string" || raw.length > 200) return null;
  const clean = raw.split(/[?#]/)[0].replace(/\/+$/, "");
  const match = clean.match(/^\/(es|en)(\/[a-z0-9\-/]*)?$/);
  if (!match) return null;
  const locale = match[1];
  const path = match[2] ?? "";
  if (STATIC_PATHS.has(path) || getPostPaths()[locale].has(path)) {
    return { locale, path };
  }
  return null;
}

// ¿Existe este slug como post público en algún idioma?
export function isPostSlug(slug) {
  if (typeof slug !== "string" || !/^[a-z0-9-]{1,100}$/.test(slug)) return false;
  const paths = getPostPaths();
  return LOCALES.some((l) => paths[l].has(`/blog/${slug}`) || paths[l].has(`/latex/${slug}`));
}
