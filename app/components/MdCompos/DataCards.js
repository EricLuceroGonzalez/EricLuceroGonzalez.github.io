"use client";
import styled from "styled-components";
import { useState, useEffect } from "react";

const GridContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  width: 90%;
  margin: 2rem auto;
  /* Define la matriz de máximo 3 columnas */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatCard = styled.div`
  background: var(--bg);
  border: 2px solid var(--accent);
  color: var(--accent);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 8px 5px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    transform: translateY(-5px);
    background-color: var(--accent);
    color: var(--bg);
  }
`;

const StatValue = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -1px;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: var(--quote-fg);
  margin: 0.5rem 0 0 0;
  font-weight: 500;
  &:hover {
    color: var(--bg);
  }
`;

// --- Componente de Animación ---
const CountUp = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 1. Limpiamos el string para convertirlo en número (ej: "24,177" -> 24177)
    // Si el valor tiene letras (como 1.2M), lo tratamos diferente
    const isSpecial = /[a-zA-Z]/.test(target);
    if (isSpecial) {
      setCount(target);
      return;
    }

    const endValue = parseInt(target.replace(/,/g, ""), 10);
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Aplicamos una curva de "easeOut" para que desacelere al llegar al final
      const currentCount = Math.floor(progress * endValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  // Si no es un número puro, devolvemos el target original
  if (typeof count === "string") return count;

  // Formateamos con comas para que se vea bien (ej: 24177 -> 24,177)
  return count.toLocaleString();
};
const DataCards = ({ data }) => {
  return (
    <GridContainer>
      {data.map((item, index) => (
        <StatCard key={index}>
          <StatValue>
            <CountUp target={item.value} />
          </StatValue>

          <StatLabel>{item.label}</StatLabel>
        </StatCard>
      ))}
    </GridContainer>
  );
};

export default DataCards;
