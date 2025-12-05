// RandomDots.js;
"use client";
import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";

const RandomDots = ({ numDots = 100, width = 800, height = 400 }) => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Genera una lista de puntos aleatorios
    const newDots = Array.from({ length: numDots }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
    }));
    setDots(newDots);
  }, [numDots, width, height]); // Se ejecuta una sola vez al montar el componente

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black"; // Color de los puntos
    dots.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  return <Canvas draw={draw} width={width} height={height} />;
};

export default RandomDots;
