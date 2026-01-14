import { NextResponse } from "next/server";

const locales = ["es", "en"];
const defaultLocale = "es";

// Obtener el idioma preferido
function getLocale(request) {
  return defaultLocale;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // 1. Verificar si la URL ya tiene el locale (ej: /es/blog)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 2. Si no tiene locale (ej: /blog), calculamos cuál usar
  const locale = getLocale(request);

  // 3. Redireccionamos a la nueva URL (ej: /es/blog)
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // Usamos redirect (cambia la URL en el navegador)
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Matcher: Ignora rutas internas de Next.js, estáticos, imágenes, favicon, etc.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|\\.well-known|.*\\..*).*)",
  ],
};
