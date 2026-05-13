// components/algorithms/SmartRockets/Chart.js
import React from "react";

export const ConvergenceChart = ({ data }) => {
  // <--- Usamos export nombrado
  if (!data || data.length < 2) {
    return (
      <div style={{ fontSize: "10px", color: "#94a3b8" }}>
        ESPERANDO DATOS DE EVOLUCIÓN...
      </div>
    );
  }
  console.log("Datos de convergencia recibidos:", data[data.length - 1]);
  const width = 600;
  const height = 80;
  const max = Math.max(...data);

  const points = data
    .map((f, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (f / max) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      style={{
        marginTop: "15px",
        paddingTop: "10px",
        borderTop: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "#38bdf8",
          marginBottom: "8px",
          letterSpacing: "1px",
        }}
      >
        HISTORIAL DE CONVERGENCIA (FITNESS MÁXIMO)
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: "100%",
          height: "80px",
          background: "rgba(2, 6, 23, 0.5)",
          borderRadius: "4px",
        }}
      >
        <polyline
          points={points}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
