"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const BackgroundDots = ({ numDots = 50, speed = 0.5 }) => {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const linesRef = useRef([]);
  const requestRef = useRef(null);

  // 1. Hook de next-themes
  const { resolvedTheme } = useTheme();

  // 2. Estado para evitar errores de hidratación
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createDot = (width, height, existingDot = null) => {
    const dot = existingDot || {};
    dot.x = Math.random() * width;
    dot.y = Math.random() * height;
    dot.vx = (Math.random() - 0.5) * speed;
    dot.vy = (Math.random() - 0.5) * speed;
    dot.life = Math.random() * 300 + 100;
    dot.maxLife = dot.life;
    dot.opacity = 0;
    return dot;
  };

  useEffect(() => {
    // Si no está montado aún, no hacemos nada (evita flash incorrecto)
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    // 3. DEFINIR COLORES RGB SEGÚN EL TEMA
    // Si es dark, usamos Blanco (255,255,255). Si es light, usamos Gris Oscuro (20,20,20)
    const isDark = resolvedTheme === "dark";
    const r = isDark ? 255 : 20;
    const g = isDark ? 255 : 20;
    const b = isDark ? 255 : 20;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      dotsRef.current = Array.from({ length: numDots }, () =>
        createDot(width, height)
      );
      linesRef.current = [];
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // --- DIBUJAR PUNTOS ---
      dotsRef.current.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.life--;

        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        if (dot.life > dot.maxLife - 50)
          dot.opacity = Math.min(1, dot.opacity + 0.02);
        else if (dot.life < 50) dot.opacity = Math.max(0, dot.opacity - 0.02);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
        // Usamos las variables r, g, b dinámicas
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dot.opacity * 0.5})`;
        ctx.fill();

        if (dot.life <= 0) createDot(width, height, dot);
      });

      // --- DIBUJAR LÍNEAS ---
      if (Math.random() < 0.03 && dotsRef.current.length > 2) {
        const idx1 = Math.floor(Math.random() * dotsRef.current.length);
        let idx2 = Math.floor(Math.random() * dotsRef.current.length);
        while (idx1 === idx2) {
          idx2 = Math.floor(Math.random() * dotsRef.current.length);
        }
        linesRef.current.push({
          dot1: dotsRef.current[idx1],
          dot2: dotsRef.current[idx2],
          life: 80,
          maxLife: 90,
        });
      }

      for (let i = linesRef.current.length - 1; i >= 0; i--) {
        const line = linesRef.current[i];
        const dx = line.dot1.x - line.dot2.x;
        const dy = line.dot1.y - line.dot2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 300) {
          const opacity = (line.life / line.maxLife) * 0.4;
          ctx.beginPath();
          ctx.moveTo(line.dot1.x, line.dot1.y);
          ctx.lineTo(line.dot2.x, line.dot2.y);
          // Usamos las mismas variables r, g, b para las líneas
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        line.life--;
        if (line.life <= 0) linesRef.current.splice(i, 1);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(requestRef.current);
    };
    // 4. AGREGAMOS resolvedTheme A LAS DEPENDENCIAS
    // Esto hace que el canvas se reinicie con nuevos colores cuando cambias el tema
  }, [numDots, speed, resolvedTheme, mounted]);

  // Si no está montado, devolvemos null para evitar parpadeos
  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default BackgroundDots;
