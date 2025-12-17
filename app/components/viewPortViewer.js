"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";

const IndicatorWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 9999; /* Siempre encima de todo */

  display: flex;
  align-items: center;
  gap: 0.5rem;

  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.5rem 0.8rem;

  color: #fff;
  font-family: "JetBrains Mono", "Fira Code", monospace; /* Fuente de código */
  font-size: 0.8rem;
  font-weight: 600;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  pointer-events: none; /* Permite hacer clic "a través" de él si tapa algo importante */
  user-select: none;
  transition: opacity 0.3s ease;

  /* Pequeño indicador visual del breakpoint */
  &::before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${($props) => {
      if ($props.$width < 768) return "#ff4d4f"; // Móvil (Rojo)
      if ($props.$width < 1024) return "#faad14"; // Tablet (Amarillo)
      return "#52c41a"; // Desktop (Verde)
    }};
  }
`;

const Label = styled.span`
  opacity: 0.7;
  margin-right: 4px;
`;

const ViewportSize = () => {
  // Inicializamos en 0 para evitar errores de hidratación en Next.js
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Función para actualizar estado
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Setear valor inicial
    handleResize();

    // Escuchar cambios
    window.addEventListener("resize", handleResize);

    // Limpieza
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 1. Si no está montado (SSR), no renderizar nada.
  // 2. Si quieres que SOLO se vea en modo desarrollo (localhost), descomenta la siguiente línea:
  // if (process.env.NODE_ENV !== "development") return null;

  if (!mounted) return null;

  return (
    <IndicatorWrapper $width={dimensions.width}>
      <span>
        <Label>W:</Label>
        {dimensions.width}px
      </span>
      <span style={{ margin: "0 4px", opacity: 0.3 }}>|</span>
      <span>
        <Label>H:</Label>
        {dimensions.height}px
      </span>
    </IndicatorWrapper>
  );
};

export default ViewportSize;
