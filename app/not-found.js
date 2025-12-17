// app/not-found.js
"use client";

// No podemos usar Link de i18n aquí porque no sabemos el idioma
import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#0d0d0d", // Un fondo oscuro neutro
          color: "#ffffff",
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h1
            style={{
              fontSize: "4rem",
              margin: "0 0 20px 0",
              color: "#4d62ffff", // Un rojo o tu color de acento
            }}
          >
            404
          </h1>
          <h2 style={{ marginBottom: "20px" }}>
            Page Not Found / Página No Encontrada
          </h2>
          <p
            style={{
              color: "#888",
              marginBottom: "40px",
              maxWidth: "400px",
              margin: "0 auto 40px auto",
            }}
          >
            La ruta a la que intentas acceder no existe en la raíz del sitio.
          </p>

          {/* Botón manual para ir al inicio seguro (Español por defecto) */}
          <Link
            href="/es"
            style={{
              padding: "12px 24px",
              backgroundColor: "#fff",
              color: "#000",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Volver al Inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
