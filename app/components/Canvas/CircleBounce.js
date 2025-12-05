// CircleBounce.js;
"use client";
import React, { useState, useEffect } from "react";
import Canvas from "./Canvas";

const CircleBounce = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ vx: 0.5, vy: 0.2 });
  const radius = 10;

  const draw = (ctx) => {
    const { width, height } = ctx.canvas;
    let { x, y } = position;
    let { vx, vy } = velocity;

    // Actualizar posición
    x += vx;
    y += vy;

    // Rebote en los bordes horizontales
    if (x - radius <= 0 || x + radius >= width) vx *= -1;
    // Rebote en los bordes verticales
    if (y - radius <= 0 || y + radius >= height) vy *= -1;

    // Guardar la nueva posición y velocidad
    setPosition({ x, y });
    setVelocity({ vx, vy });

    // Limpiar el canvas
    ctx.clearRect(0, 0, width, height);

    // Dibujar el círculo
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  return <Canvas draw={draw} width={800} height={400} />;
};

export default CircleBounce;
