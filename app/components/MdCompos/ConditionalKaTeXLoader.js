// components/ConditionalKaTeXLoader.jsx
"use client";
import { useEffect } from "react";

export default function ConditionalKaTeXLoader({ needsKaTeX }) {
  useEffect(() => {
    if (needsKaTeX) {
      // Solo carga KaTeX si el post lo necesita
      import("katex/dist/katex.min.css");
    }
  }, [needsKaTeX]);

  return null; // Este componente no renderiza nada
}
