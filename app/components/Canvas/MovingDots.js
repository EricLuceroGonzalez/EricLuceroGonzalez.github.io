// MovingDots.js;
"use client";
import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { useTheme } from "next-themes";

const MovingDots = ({ numDots = 50, width = 450, height = 400, speed = 1 }) => {
  const [dots, setDots] = useState([]);
  const [dotColor, setDotColor] = useState("0, 0, 0"); // Default negro en RGB
  const { theme } = useTheme();

  useEffect(() => {
    // Obtener el color CSS definido en :root
    // const rootStyles = getComputedStyle(document.documentElement);
    // const fgColor = rootStyles.getPropertyValue("--fg").trim();

    // Convertir a formato RGB
    // const rgb = fgColor.startsWith("#") ? hexToRgb(fgColor) : fgColor;
    // if (rgb) setDotColor(rgb);
    const generateDot = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      opacity: 0, // Comienzan invisibles
      life: Math.random() * 400 + 50, // Duración de vida
      vx: (Math.random() - 0.5) * speed * 2, // Velocidad en x
      vy: (Math.random() - 0.5) * speed * 2, // Velocidad en y
    });

    setDots(Array.from({ length: numDots }, generateDot));

    const interval = setInterval(() => {
      setDots(
        (prevDots) =>
          prevDots
            .map((dot) => {
              let { x, y, vx, vy, opacity, life } = dot;

              // Actualizar posición
              x += vx;
              y += vy;

              // Rebote en los bordes
              if (x <= 0 || x >= width) vx *= -1;
              if (y <= 0 || y >= height) vy *= -1;

              return {
                x,
                y,
                vx,
                vy,
                opacity: Math.min(1, opacity + 0.05), // Aparecen gradualmente
                life: life - 1, // Reducir vida
              };
            })
            .filter((dot) => dot.life > 0) // Eliminar puntos cuando terminan su vida
      );
    }, 50); // Se actualizan cada 50ms

    return () => clearInterval(interval);
  }, [numDots, width, height, speed]);

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    dots.forEach(({ x, y, opacity }) => {
      //   ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`; // Color con opacidad
      if (theme == "dark") {
        ctx.fillStyle = `rgba(250,250,250, ${opacity})`; // Color CSS con opacidad dinámica
      } else {
        ctx.fillStyle = `rgba(0,0,0, ${opacity})`; // Color CSS con opacidad dinámica
      }
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  return <Canvas draw={draw} width={width} height={height} />;
};

export default MovingDots;

// "use client";
// import React, { useEffect, useState } from "react";
// import Canvas from "./Canvas";

// const MovingDots = ({ numDots = 50, width = 800, height = 400, speed = 1 }) => {
//   const [dots, setDots] = useState([]);

//   useEffect(() => {
//     const generateDot = () => ({
//       x: Math.random() * width,
//       y: Math.random() * height,
//       opacity: 0, // Comienzan invisibles
//       life: Math.random() * 800 + 50, // Duración de vida
//       vx: (Math.random() - 0.5) * speed, // Velocidad en x
//       vy: (Math.random() - 0.5) * speed, // Velocidad en y
//     });

//     setDots(Array.from({ length: numDots }, generateDot));

//     const interval = setInterval(() => {
//       setDots(
//         (prevDots) =>
//           prevDots
//             .map((dot) => ({
//               ...dot,
//               x: dot.x + dot.vx,
//               y: dot.y + dot.vy,
//               opacity: Math.min(1, dot.opacity + 0.05), // Aparecen gradualmente
//               life: dot.life - 1, // Reducir vida
//             }))
//             .filter((dot) => dot.life > 0) // Eliminar puntos cuando terminan su vida
//       );
//     }, 50); // Se actualizan cada 50ms

//     return () => clearInterval(interval);
//   }, [numDots, width, height, speed]);

//   const draw = (ctx) => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     dots.forEach(({ x, y, opacity }) => {
//       ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`; // Color con opacidad
//       ctx.beginPath();
//       ctx.arc(x, y, 3, 0, Math.PI * 2);
//       ctx.fill();
//     });
//   };

//   return <Canvas draw={draw} width={width} height={height} />;
// };

// export default MovingDots;
