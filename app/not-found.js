"use client";

// Como no tenemos contexto de idioma, hacemos un diseño agnóstico
// o forzamos el español por defecto.
import Link from "next/link";
import { useEffect } from "react";

export default function GlobalNotFound() {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        style={{
          margin: 0,
          fontFamily: "sans-serif",
          backgroundColor: "#002332",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "5rem", margin: 0, color: "#FF3366" }}>404</h1>
          <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
            Página no encontrada / Page Not Found
          </p>

          <div style={{ display: "flex", gap: "20px" }}>
            {/* Ofrecemos volver al inicio en ambos idiomas */}
            <a href="/es" style={btnStyle}>
              Volver al Inicio
            </a>
            <a href="/en" style={btnStyle}>
              Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

const btnStyle = {
  padding: "10px 20px",
  backgroundColor: "#0077FF",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
  fontWeight: "bold",
};
