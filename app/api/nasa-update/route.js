import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  const NASA_URL =
    "https://www.nasa.gov/blogs/missions/2026/04/01/live-artemis-ii-launch-day-updates/";

  try {
    const response = await fetch(NASA_URL, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error("No se pudo contactar a la NASA");

    const html = await response.text();
    const $ = cheerio.load(html);

    const contentContainer = $("article").first().length
      ? $("article").first()
      : $(".entry-content").first();

    let latestTime = null;
    let updateParagraphs = [];
    let isCapturing = false;

    // Convertimos la búsqueda a un Array para iterarlo de forma más controlada
    const paragraphs = contentContainer.find("p").toArray();

    for (let el of paragraphs) {
      const p = $(el);
      const text = p.text().trim();

      // 1. Filtramos texto vacío o el boilerplate de la NASA
      if (
        !text ||
        text.includes("Live updates") ||
        text.includes("All times are Eastern")
      ) {
        continue;
      }

      // 2. DETECCIÓN ESTRICTA DE HORA:
      // Tiene que tener <strong>, ser corto, Y contener explícitamente "a.m." o "p.m."
      const hasStrong = p.find("strong").length > 0;
      const isShort = text.length < 30; // Subimos un poco el límite por si acaso
      const hasTimePattern = /a\.m\.|p\.m\./i.test(text);

      const isTimeHeader = hasStrong && isShort && hasTimePattern;

      if (isTimeHeader) {
        if (!isCapturing && !latestTime) {
          // Encontramos la PRIMERA hora (encendemos el motor de captura)
          latestTime = text;
          isCapturing = true;
        } else if (isCapturing) {
          // Encontramos la SEGUNDA hora. Apagamos y rompemos el bucle.
          break;
        }
      } else {
        // Si estamos en modo captura, guardamos el párrafo
        if (isCapturing) {
          // Verificación de seguridad para evitar duplicados si hay <p> anidados accidentalmente en el HTML
          if (!updateParagraphs.includes(text)) {
            updateParagraphs.push(text);
          }
        }
      }
    }

    // Unimos los párrafos recolectados respetando los saltos de línea
    const latestUpdate = updateParagraphs.join("\n\n");

    if (!latestUpdate) {
      throw new Error("No se pudo parsear el contenido");
    }

    return NextResponse.json({
      time: latestTime || "Última Hora",
      update: latestUpdate,
      source: NASA_URL,
    });
  } catch (error) {
    console.error("Error scraping NASA:", error);
    return NextResponse.json(
      { error: "Error obteniendo actualización de la NASA" },
      { status: 500 },
    );
  }
}
