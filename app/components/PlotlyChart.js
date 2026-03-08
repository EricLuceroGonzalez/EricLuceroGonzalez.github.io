"use client";
// components/ChartViewer.jsx
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

//. Importación dinámica APAGANDO el Server-Side Rendering (SSR)
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function ChartViewer({ jsonPath }) {
  const [chartData, setChartData] = useState(null);
  console.log("here in ChartViewer");

  //. Cargamos el JSON que generó Python
  useEffect(() => {
    fetch(jsonPath)
      .then((res) => res.json())
      .then((data) => setChartData(data));
  }, [jsonPath]);

  if (!chartData) return <div>Cargando gráfico interactivo...</div>;

  //. Renderizamos el gráfico nativamente
  return (
    // <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <div style={{ width: "100%", aspectRatio: "16/10", minHeight: "400px" }}>
      <Plot
        data={chartData.data}
        layout={{
          ...chartData.layout,
          // Hacemos que sea responsive al contenedor del blog
          autosize: true,
          margin: { t: 40, b: 40, l: 40, r: 40 },
          width: undefined,
          height: undefined,
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
        config={{ responsive: true, displayModeBar: true }}
      />
    </div>
  );
}
