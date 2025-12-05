"use client";
import React, { useState } from "react";
import Canvas from "./Canvas";

const CircleFollow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    setMousePos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <Canvas
      draw={draw}
      width={800}
      height={400}
      onMouseMove={handleMouseMove}
      style={{ border: "1px solid black" }}
    />
  );
};

export default CircleFollow;
