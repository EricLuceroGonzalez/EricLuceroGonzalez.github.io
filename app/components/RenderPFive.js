"use client"; // Asegura que este componente se ejecute solo en el cliente
import { useEffect, useRef } from "react";
import P5 from "p5";

const P5Sketch = ({ width, height }) => {
  const sketchRef = useRef(null);

  useEffect(() => {
    // Verifica si estamos en el cliente antes de acceder a `window`
    if (typeof window !== "undefined") {
      const sketch = (p5) => {
        p5.setup = () => {
          p5.createCanvas(width, height);
        };

        p5.draw = () => {
          p5.background(220);
          p5.fill(255, 0, 0);
          p5.ellipse(p5.width / 2, p5.height / 2, 40, 40);
        };
      };

      // Crea una nueva instancia de p5 y la monta en el contenedor
      const p5Instance = new P5(sketch, sketchRef.current);

      // Limpia el sketch cuando el componente se desmonte
      return () => {
        p5Instance.remove();
      };
    }
  }, [width, height]);

  return (
    <div
      ref={sketchRef}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></div>
  );
};

export default P5Sketch;
