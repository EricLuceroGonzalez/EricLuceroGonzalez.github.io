"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { THEME_COLORS } from "@/app/lib/themeColors";

// Next escribe dos <meta name="theme-color">, una por cada tema del SISTEMA
// (media="(prefers-color-scheme: light|dark)"). Eso no sabe nada del botón de la web:
// con el sistema en claro y la web en oscuro, la barra seguía azul.
// Aquí ponemos en las dos el color del tema que se ve de verdad, así gana siempre.
export default function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = THEME_COLORS[resolvedTheme];
    if (!color) return;
    const metas = document.querySelectorAll('meta[name="theme-color"]');
    if (metas.length) {
      metas.forEach((meta) => meta.setAttribute("content", color));
    } else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = color;
      document.head.appendChild(meta);
    }
  }, [resolvedTheme]);

  return null;
}
