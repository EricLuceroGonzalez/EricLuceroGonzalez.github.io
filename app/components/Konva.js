"use client"; // Asegura que el componente se ejecute solo en el cliente
import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Circle } from "react-konva";

const NUM_POINTS = 100; // Número de puntos en la nube
const POINT_RADIUS = 3; // Radio de cada punto
const CANVAS_WIDTH = 500; // Ancho del canvas
const CANVAS_HEIGHT = 500; // Alto del canvas
const UPDATE_INTERVAL = 100; // Intervalo de actualización en milisegundos

export default function RandomPointCloud() {
  const [points, setPoints] = useState([]);

  // Función para generar puntos aleatorios
  const generateRandomPoints = () => {
    const newPoints = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      newPoints.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`,
      });
    }
    setPoints(newPoints);
  };

  // Efecto para actualizar los puntos cada cierto tiempo
  useEffect(() => {
    generateRandomPoints(); // Genera puntos iniciales
    const interval = setInterval(generateRandomPoints, UPDATE_INTERVAL); // Actualiza los puntos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
      <Layer>
        {points.map((point, index) => (
          <Circle
            key={index}
            x={point.x}
            y={point.y}
            radius={POINT_RADIUS}
            fill={point.color}
          />
        ))}
      </Layer>
    </Stage>
  );
}
