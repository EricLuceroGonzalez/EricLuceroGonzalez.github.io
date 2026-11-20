"use client";
import styled from "styled-components";
import { useState, useEffect } from "react";

// 1. Exportamos el contenedor (La grilla)
export const DataGrid = styled.div`
  display: grid;
  gap: 1.25rem;
  width: 99%;
  margin: 2rem auto;
  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
  grid-template-columns: repeat(2, 1fr);
  @media (min-width: 660px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatLabel = styled.p`
  font-size: var(--text-small);
  color: var(--quote-fg);
  margin: 0.5rem 0 0 0;
  font-weight: 500;
  text-align: left;
`;

// Lista de cápsulas: una por oración
const PillList = styled.ul`
  list-style: none;
  margin: 0.75rem 0 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Pill = styled.li`
  margin: 0;
  padding: 0.2rem 0.65rem;
  border: 1px solid currentColor;
  border-radius: 12px;
  font-size: var(--text-small);
  font-weight: 100;
  line-height: 1.25;
  color: var(--quote-fg);
`;

const StatCard = styled.div`
  background: var(--bg);
  border: 2px solid var(--accent);
  color: var(--accent);
  padding: 1rem;
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

  /* Al pasar por la tarjeta, el texto y las cápsulas también cambian de color */
  &:hover ${StatLabel}, &:hover ${Pill} {
    color: var(--bg);
  }
`;

const StatValue = styled.h2`
  font-weight: 900;
  margin: 0;
  letter-spacing: -1px;
  font-size: var(--text-h1);
`;

// Solo para lectores de pantalla: leen el valor final, no cada paso de la animación
const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

// Separa "$1,250.50 USD" en prefijo ("$"), número (1250.5) y sufijo (" USD"), y recuerda
// cómo estaba escrito el número para animarlo con el mismo formato:
//   "$1,250.50"  "1.234,56 €"  "€3.5M"  "+24M"  "45%"  "US$ 2,000"  "4,323,660"
// Un separador que aparece una vez seguido de 3 cifras se toma como de miles ("1,200",
// "1.234"); con otra cantidad de cifras, como decimal ("3.5", "2,75").
// Devuelve null si no hay número que animar ("N/A", "∞").
export function parseValue(raw) {
  const s = String(raw).trim();
  // Prefijo sin cifras · número (empieza y acaba en cifra) · todo lo demás
  const m = s.match(/^(\D*)(\d(?:[\d.,]*\d)?)(.*)$/);
  if (!m) return null;
  const [, prefix, num, suffix] = m;

  const commas = (num.match(/,/g) || []).length;
  const dots = (num.match(/\./g) || []).length;
  let dec = null;
  let thou = null;
  if (commas && dots) {
    dec = num.lastIndexOf(",") > num.lastIndexOf(".") ? "," : ".";
    thou = dec === "," ? "." : ",";
  } else if (commas || dots) {
    const sep = commas ? "," : ".";
    const count = commas || dots;
    const after = num.length - num.lastIndexOf(sep) - 1;
    if (count > 1 || after === 3) thou = sep;
    else dec = sep;
  }

  let clean = num;
  if (thou) clean = clean.split(thou).join("");
  if (dec) clean = clean.replace(dec, ".");
  const value = parseFloat(clean);
  if (!Number.isFinite(value)) return null;
  const decimals = dec ? num.length - num.lastIndexOf(dec) - 1 : 0;

  return { prefix, suffix, value, decimals, dec: dec || ".", thou };
}

// Escribe n con el formato del original (separadores y número de decimales)
function formatLike(n, p) {
  const [int, frac] = n.toFixed(p.decimals).split(".");
  const grouped = p.thou ? int.replace(/\B(?=(\d{3})+(?!\d))/g, p.thou) : int;
  return p.prefix + grouped + (frac ? p.dec + frac : "") + p.suffix;
}

// Cuenta desde 0 hasta el número de `target`, conservando moneda, signos y sufijos.
// Al terminar muestra `target` tal cual lo escribiste.
const CountUp = ({ target, duration = 2000 }) => {
  const parsed = parseValue(target);
  const [text, setText] = useState(() =>
    parsed ? formatLike(0, parsed) : String(target),
  );

  useEffect(() => {
    const p = parseValue(target);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!p || reduce || duration <= 0) {
      setText(String(target));
      return;
    }

    let frame;
    let startTime = null;
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      if (progress < 1) {
        // Redondeo hacia abajo a los decimales del original, para no pasarse del final
        const step = 10 ** p.decimals;
        setText(formatLike(Math.floor(progress * p.value * step) / step, p));
        frame = requestAnimationFrame(animate);
      } else {
        setText(String(target));
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return text;
};

// 2. Exportamos la tarjeta individual.
//   value: "1,250", "$1,250.50", "1.234,56 €", "45%", "+24M"…
//   label: un texto, o una lista de oraciones que se muestran como cápsulas:
//          label={["Primera oración", "Segunda oración"]}
export const DataCard = ({ value, label, duration = 2000 }) => {
  if (value === undefined || value === null || value === "") return null; // Seguridad anti-crashes

  const labels = Array.isArray(label) ? label.filter(Boolean) : null;

  return (
    <StatCard>
      <StatValue>
        <SrOnly>{String(value)}</SrOnly>
        <span aria-hidden="true">
          <CountUp target={value} duration={duration} />
        </span>
      </StatValue>
      {labels ? (
        labels.length > 0 && (
          <PillList>
            {labels.map((text, i) => (
              <Pill key={i}>{text}</Pill>
            ))}
          </PillList>
        )
      ) : (
        label && <StatLabel>{label}</StatLabel>
      )}
    </StatCard>
  );
};