"use client";
import React, { useRef, useEffect, useState } from "react";

const Canvas = ({ draw, width = "100%", height = "100%", ...rest }) => {
  const canvasRef = useRef(null);
  const [size, setSize] = useState({ width: 300, height: 150 }); // Valores iniciales

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        setSize({ width: parent.clientWidth, height: parent.clientHeight });
      }
    };

    resizeCanvas(); // Ajustar al montar
    window.addEventListener("resize", resizeCanvas); // Ajustar en redimensionamiento

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    const render = () => {
      draw(context);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [draw, size]); // Redibujar cuando cambie el tamaño

  return (
    <canvas ref={canvasRef} width={size.width} height={size.height} {...rest} />
  );
};

export default Canvas;

// "use client";
// import React, { useRef, useEffect, useState } from "react";

// const Canvas = ({ draw, ...rest }) => {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);
//   const [dimensions, setDimensions] = useState({ width: 300, height: 150 });

//   useEffect(() => {
//     const updateSize = () => {
//       if (containerRef.current) {
//         const width = containerRef.current.clientWidth;
//         const height = containerRef.current.clientHeight;
//         setDimensions({ width, height });
//       }
//     };

//     updateSize(); // Ajuste inicial

//     const observer = new ResizeObserver(updateSize); // Observa cambios de tamaño
//     if (containerRef.current) observer.observe(containerRef.current);

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     if (!canvas || !context) return;

//     const { width, height } = dimensions;
//     const scale = window.devicePixelRatio || 1; // Ajuste para pantallas de alta resolución

//     // Ajustar resolución real del canvas
//     canvas.width = width * scale;
//     canvas.height = height * scale;
//     context.scale(scale, scale); // Evita la distorsión al dibujar

//     let animationFrameId;
//     const render = () => {
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       draw(context);
//       animationFrameId = requestAnimationFrame(render);
//     };
//     render();

//     return () => cancelAnimationFrame(animationFrameId);
//   }, [draw, dimensions]);

//   return (
//     <div
//       ref={containerRef}
//       style={{ width: "100%", height: "100%", position: "relative" }}
//     >
//       <canvas
//         ref={canvasRef}
//         {...rest}
//         style={{
//           width: dimensions.width, // Asegura que el tamaño visual sea correcto
//           height: dimensions.height,
//         }}
//       />
//     </div>
//   );
// };

// export default Canvas;
