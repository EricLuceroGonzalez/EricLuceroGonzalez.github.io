import { getRequestConfig } from "next-intl/server";
// import { routing } from './routing'; // Si usas routing, sino ignora esto

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. Intentamos obtener el locale que pasamos desde el Layout
  let locale = await requestLocale;

  // 2. IMPORTANTE: Validamos si existe.
  // Si es undefined, FORZAMOS 'es'.
  // Al hacer esto, evitamos que next-intl intente buscar en headers()
  if (!locale || !["es", "en"].includes(locale)) {
    locale = "es";
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
