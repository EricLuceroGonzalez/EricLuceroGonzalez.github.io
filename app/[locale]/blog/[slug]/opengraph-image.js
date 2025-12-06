import { getPostBySlug } from "@/app/lib/api";
import { ImageResponse } from "next/og";

// 1. Configuración de la imagen
export const runtime = "edge";
export const alt = "Blog Post Thumbnail";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// 2. Generación dinámica
export default async function Image({ params }) {
  // Esperar a los params (Next.js 15)
  const { slug, locale } = await params;

  // 3. Buscar los datos reales del post usando el slug
  // Nota: Al estar en Edge, asegúrate de que tu función getPostBySlug sea compatible,
  // si no, puedes pasar el título por query params o simplemente usar el slug formateado.
  const post = getPostBySlug(slug, ["title", "date", "author"], locale);

  // Fallback si no encuentra el post (por seguridad)
  const title = post?.title || "Artículo Técnico";
  const date = post?.date || "Eric Lucero";

  // 4. Renderizar el diseño (Esto es HTML/CSS estándar)
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0F172A", // Fondo oscuro moderno
          backgroundImage: "linear-gradient(135deg, #001133 0%, #000000 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Elemento Decorativo: Línea de Gradiente Superior */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "10px",
            background: "linear-gradient(90deg, #0077FF, #FF3366)",
          }}
        />

        {/* Tag / Categoría */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 20px",
            backgroundColor: "rgba(0, 119, 255, 0.1)",
            border: "1px solid #0077FF",
            borderRadius: "50px",
            color: "#0077FF",
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 40,
          }}
        >
          Blog & Tutoriales
        </div>

        {/* Título Dinámico */}
        <div
          style={{
            fontSize: 70,
            fontWeight: 900,
            color: "white",
            lineHeight: 1.1,
            marginBottom: 40,
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            background: "linear-gradient(to right, #fff, #cbd5e1)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </div>

        {/* Footer: Autor y Fecha */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Avatar Simulado (Círculo de color) */}
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0077FF, #FF3366)",
                marginRight: 20,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "white", fontSize: 24, fontWeight: 700 }}>
                Eric Lucero
              </span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>
                Doctorando en IA
              </span>
            </div>
          </div>

          {/* Fecha */}
          <div style={{ color: "#FF3366", fontSize: 24, fontWeight: 600 }}>
            {date}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      // Opcional: Fuentes personalizadas (ver punto 3)
    }
  );
}
