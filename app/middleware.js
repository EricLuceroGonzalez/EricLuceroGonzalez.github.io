import { NextResponse } from "next/server";

// Define tus idiomas soportados
const locales = ["es", "en"];
const defaultLocale = "es";

// Función simple para obtener el idioma preferido (puedes mejorarla con librerías)
function getLocale(request) {
  // Aquí podrías leer headers 'accept-language' si quisieras
  return defaultLocale;
}

export function middleware(request) {
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

  // IMPORTANTE: Usamos redirect (cambia la URL en el navegador)
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Matcher: Ignora rutas internas de Next.js, estáticos, imágenes, favicon, etc.
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) and specific paths, OR run on everything except static files
    // Regex negativo para excluir archivos con extensión (ej: .svg, .png)
    "/((?!api|static|.*\\..*|_next).*)",
  ],
};
