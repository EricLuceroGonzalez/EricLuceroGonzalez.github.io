"use client";
// components/ChartViewer.jsx
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import styled from "styled-components";
//. Importación dinámica APAGANDO el Server-Side Rendering (SSR)
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const Figure = styled.figure`
  margin: 2.5rem 0;
  width: 100%;
`;
const ChartContainer = styled.div`
  width: 100%;
  /* Proporción por defecto para Desktop (Panorámica) */
  aspect-ratio: 16 / 9;
  min-height: 450px;

  /* Magia para Móviles: Cuando la pantalla es pequeña, lo hacemos más alto */
  @media (max-width: 768px) {
    aspect-ratio: 1 / 1.1; Un poco más alto que un cuadrado perfecto
    min-height: 500px;
  }
`;
const Caption = styled.figcaption`
  font-size: 0.9rem;
  color: var(--accent, #6b7280);
  margin-top: 1rem;
  font-style: italic;
  line-height: 1.5;
  padding: 0.33rem 0;
`;
export default function ChartViewer({ jsonPath, caption, number }) {
  const [chartData, setChartData] = useState(null);
  // console.log("here in ChartViewer");

  //. Cargamos el JSON que generó Python
  useEffect(() => {
    fetch(jsonPath)
      .then((res) => res.json())
      .then((data) => setChartData(data))
      .catch((err) => console.error("Error cargando el JSON:", err));
  }, [jsonPath]);

  if (!chartData) return <div>Cargando gráfico interactivo...</div>;
  // Detectar si la gráfica es un mapa revisando el tipo de datos
  const isMap = chartData.data.some(
    (trace) => trace.type === "choropleth" || trace.type === "scattergeo",
  );
  //. Renderizamos el gráfico nativamente
  return (
    // <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <Figure>
      {caption && (
        <Caption>
          {number ? `Figura ${number}: ` : ""}
          {caption}
        </Caption>
      )}
      <ChartContainer>
        <Plot
          data={chartData.data}
          layout={{
            ...chartData.layout,
            // Hacemos que sea responsive al contenedor del blog
            autosize: true,
            width: undefined,
            height: undefined,
            // margin: { t: 40, b: 40, l: 40, r: 40 },
            // Márgenes dinámicos: Sin márgenes para mapas, márgenes reducidos para gráficas normales
            margin: isMap
              ? { t: 40, b: 20, l: 0, r: 0 }
              : { t: 40, b: 20, l: 30, r: 10 },
            // Forzar la leyenda abajo: Esto salva la vida en pantallas de móviles
            legend: {
              orientation: "h",
              yanchor: "top",
              y: -0.15, // La empuja por debajo del Eje X
              xanchor: "center",
              x: 0.5,
            },
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          config={{ responsive: true, displayModeBar: true }}
        />
      </ChartContainer>
    </Figure>
  );
}
