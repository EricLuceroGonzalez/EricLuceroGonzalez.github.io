import { useState, useEffect } from "react";

const getRandomVelocity = () => (Math.random() - 0.5) * 4; // Movimiento aleatorio

export const Particle = ({ width, height }) => {
  const [position, setPosition] = useState({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: getRandomVelocity(),
    vy: getRandomVelocity(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + prev.vx;
        let newY = prev.y + prev.vy;

        if (newX < 0 || newX > width) prev.vx *= -1;
        if (newY < 0 || newY > height) prev.vy *= -1;

        return { ...prev, x: newX, y: newY };
      });
    }, 33);

    return () => clearInterval(interval);
  }, [width, height]);

  return <circle cx={position.x} cy={position.y} r="3" fill="white" />;
};
