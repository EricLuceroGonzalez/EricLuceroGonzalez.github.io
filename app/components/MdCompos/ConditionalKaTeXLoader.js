// components/ConditionalKaTeXLoader.jsx
"use client";
import { useEffect } from "react";

export default function ConditionalKaTeXLoader({ needsKaTeX }) {
  useEffect(() => {
    if (needsKaTeX) {
      import("katex/dist/katex.min.css");
    }
  }, [needsKaTeX]);

  return null;
}
