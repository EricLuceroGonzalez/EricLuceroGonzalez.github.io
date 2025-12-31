"use client";
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { MermaidContainer } from "@/app/ui/MarkDownComponents";

// Configuración inicial (puedes adaptarla a tu tema dark/light)
mermaid.initialize({
  startOnLoad: false,
  theme: "default", // opciones: 'default', 'dark', 'forest', 'neutral'
  securityLevel: "loose",
});

const Mermaid = ({ chart }) => {
  const ref = useRef(null);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    if (chart && ref.current) {
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      mermaid.render(id, chart).then(({ svg }) => {
        setSvg(svg);
      });
    }
  }, [chart]);

  // Si no hay chart, no renderizamos nada
  if (!chart) return null;

  return (
    <MermaidContainer ref={ref} dangerouslySetInnerHTML={{ __html: svg }} />
  );
};

export default Mermaid;
