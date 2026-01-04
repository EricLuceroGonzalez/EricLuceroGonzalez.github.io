"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SiFifa } from "react-icons/si";
import { motion } from "framer-motion";

// ==========================================
// STYLED COMPONENTS
// ==========================================

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 2rem auto;
  padding: 2rem 5%;
  border-top: 1px dotted var(--gray-light);
  border-bottom: 1px dotted var(--gray-light);
  background-color: var(--emphasis-bg);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: x-large;
  font-weight: bold;
  color: var(--primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #718096;
  font-size: 1rem;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: ${(props) =>
    props.disabled ? "#cbd5e0" : "var(--primary-btn-bg)"};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;

  &:hover {
    background: ${(props) => (props.disabled ? "#cbd5e0" : "var(--accent)")};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const ProgressBox = styled.div`
  background: #ebf8ff;
  border: 2px solid #90cdf4;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  color: #2c5282;
  margin-bottom: 2rem;
`;

const ResultBox = styled.div`
  border: 2px solid ${(props) => (props.$valid ? "#9ae6b4" : "#fbd38d")};
  background: ${(props) => (props.$valid ? "#f0fff4" : "#fffaf0")};
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${(props) => (props.$valid ? "#22543d" : "#744210")};
`;

const GruposContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  @media (min-width: 660px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ItinerarioSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* width: 90%; */
`;

const ItinerarioHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  background: ${(props) => props.color};
  color: white;
  padding: 0.875rem;
  border-radius: 0.5rem;
  margin: 0;
`;

const GrupoCard = styled.div`
  background: white;
  border: 2px solid ${(props) => props.$borderColor};
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: var(--accent);
`;

const GrupoHeader = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1rem 0;
`;

const GrupoLetra = styled.span`
  background: ${(props) => props.color};
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
`;

const EquiposList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const EquipoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #f7fafc;
  border-radius: 0.375rem;
  font-size: small;
`;

const BomboTag = styled.span`
  font-family: monospace;
  font-size: 0.75rem;
  background: #e2e8f0;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const EquipoNombre = styled.span`
  font-weight: 600;
  flex: 1;
`;

const ConfTag = styled.span`
  font-size: xx-small;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
`;

const RankTag = styled.span`
  font-size: 0.75rem;
  background: #e53e3e;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #a0aec0;
  padding: 3rem 0;

  svg {
    width: 4rem;
    height: 4rem;
    margin: 0 auto 1rem;
    opacity: 0.3;
  }
`;

const Spinner = styled.svg`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
// animaciones

// Configuración para el contenedor padre
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // delay automático entre hijos
      delayChildren: 0.1, // delay inicial
    },
  },
};

// Configuración para cada ítem (LogosBox)
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50, // Empieza un poco más abajo
    scale: 0.2, // Empieza un poco más pequeño
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring", // Mantenemos tu efecto rebote
      stiffness: 100,
      damping: 10,
      visualDuration: 0.3,
      bounce: 0.5,
    },
  },
};
// ==========================================
// ICONOS SVG
// ==========================================

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const RefreshIcon = () => (
  <Spinner
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
  </Spinner>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ==========================================
// CLASES Y DATOS
// ==========================================

class Equipo {
  constructor(
    nombre,
    confederacion,
    bombo,
    grupoFijo = null,
    rankingTop = null
  ) {
    this.nombre = nombre;
    this.confederacion = confederacion;
    this.bombo = bombo;
    this.grupoFijo = grupoFijo;
    this.rankingTop = rankingTop;
  }
}

function generarDatosEquipos() {
  const equipos = [];

  equipos.push(new Equipo("México", ["CONCACAF"], 1, "A"));
  equipos.push(new Equipo("Canadá", ["CONCACAF"], 1, "B"));
  equipos.push(new Equipo("USA", ["CONCACAF"], 1, "D"));

  equipos.push(new Equipo("España", ["UEFA"], 1, null, 1));
  equipos.push(new Equipo("Argentina", ["CONMEBOL"], 1, null, 2));
  equipos.push(new Equipo("Francia", ["UEFA"], 1, null, 3));
  equipos.push(new Equipo("Inglaterra", ["UEFA"], 1, null, 4));

  const extrasB1 = [
    ["Brasil", ["CONMEBOL"]],
    ["Bélgica", ["UEFA"]],
    ["Portugal", ["UEFA"]],
    ["Países Bajos", ["UEFA"]],
    ["Alemania", ["UEFA"]],
  ];
  extrasB1.forEach(([nom, conf]) => equipos.push(new Equipo(nom, conf, 1)));

  const configRestante = [
    ["Uruguay", ["CONMEBOL"], 2],
    ["Colombia", ["CONMEBOL"], 2],
    ["Croacia", ["UEFA"], 2],
    ["Marruecos", ["CAF"], 2],
    ["Japón", ["AFC"], 2],
    ["Suiza", ["UEFA"], 2],
    ["Senegal", ["CAF"], 2],
    ["Irán", ["AFC"], 2],
    ["Corea del Sur", ["AFC"], 2],
    ["Ecuador", ["CONMEBOL"], 2],
    ["Austria", ["UEFA"], 2],
    ["Australia", ["AFC"], 2],
    ["Noruega", ["UEFA"], 3],
    ["Panamá", ["CONCACAF"], 3],
    ["Egipto", ["CAF"], 3],
    ["Argelia", ["CAF"], 3],
    ["Escocia", ["UEFA"], 3],
    ["Paraguay", ["CONMEBOL"], 3],
    ["Túnez", ["CAF"], 3],
    ["Costa de Marfil", ["CAF"], 3],
    ["Uzbekistán", ["AFC"], 3],
    ["Catar", ["AFC"], 3],
    ["Arabia Saudita", ["AFC"], 3],
    ["Sudáfrica", ["CAF"], 3],
    ["Jordania", ["AFC"], 4],
    ["Cabo Verde", ["CAF"], 4],
    ["Ghana", ["CAF"], 4],
    ["Curazao", ["CONCACAF"], 4],
    ["Haití", ["CONCACAF"], 4],
    ["Nueva Zelanda", ["OFC"], 4],
    ["Repesca IC-A", ["CAF", "CONCACAF", "OFC"], 4],
    ["Repesca IC-B", ["CONMEBOL", "CONCACAF", "AFC"], 4],
    ["Repesca UEFA-A", ["UEFA"], 4],
    ["Repesca UEFA-B", ["UEFA"], 4],
    ["Repesca UEFA-C", ["UEFA"], 4],
    ["Repesca UEFA-D", ["UEFA"], 4],
  ];

  configRestante.forEach(([nombre, conf, bombo]) =>
    equipos.push(new Equipo(nombre, conf, bombo))
  );

  return equipos;
}

// ==========================================
// ALGORITMO GENÉTICO
// ==========================================

function obtenerItinerario(indiceGrupo) {
  const itin1Indices = new Set([3, 4, 5, 6, 7, 8]);
  return itin1Indices.has(indiceGrupo) ? 1 : 2;
}

function calcularFitness(sorteo) {
  let penalizacion = 0;
  const ubicacionTops = {};

  // Función auxiliar para determinar lado del cuadro (A-F vs G-L)
  const obtenerItinerario = (idx) => (idx < 6 ? 0 : 1);

  for (let i = 0; i < sorteo.length; i++) {
    const grupo = sorteo[i];
    const conteoConfs = {};

    for (const equipo of grupo) {
      // 1. Rastrear Tops (Igual que antes)
      if (equipo.rankingTop) ubicacionTops[equipo.rankingTop] = i;

      // 2. Contar Confederaciones (ADAPTADO)
      // Como 'equipo.confederacion' es un array, recorremos cada una.
      // Si es una Repesca con 3 opciones, sumará +1 a las 3 opciones.
      equipo.confederacion.forEach((conf) => {
        conteoConfs[conf] = (conteoConfs[conf] || 0) + 1;
      });
    }

    // 3. Evaluar Penalizaciones (Exactamente igual que tu código)
    for (const [conf, cant] of Object.entries(conteoConfs)) {
      if (conf === "UEFA") {
        if (cant > 2) penalizacion += 100;
      } else {
        // Aquí atrapamos el error:
        // Si hay un equipo de CONCACAF y entra una Repesca con opción CONCACAF,
        // el contador será 2 -> Penalización.
        if (cant > 1) penalizacion += 100;
      }
    }
  }

  // --- Lógica de Itinerario (Exactamente igual que tu código) ---

  if (ubicacionTops[1] !== undefined && ubicacionTops[2] !== undefined) {
    if (
      obtenerItinerario(ubicacionTops[1]) ===
      obtenerItinerario(ubicacionTops[2])
    ) {
      penalizacion += 500;
    }
  }

  if (ubicacionTops[3] !== undefined && ubicacionTops[4] !== undefined) {
    if (
      obtenerItinerario(ubicacionTops[3]) ===
      obtenerItinerario(ubicacionTops[4])
    ) {
      penalizacion += 500;
    }
  }

  return penalizacion;
}

function crearIndividuo(listaEquipos) {
  // Crear un individuo (sorteo) válido inicial recibiendo la lista de equipos
  // Creamos los bombos vacíos
  const bombos = { 1: [], 2: [], 3: [], 4: [] };
  // Distribuir equipos en cada bombo
  listaEquipos.forEach((eq) => bombos[eq.bombo].push(eq));
  // Creamos 12 grupos vacíos
  const grupos = Array.from({ length: 12 }, () => []);

  // Asignar equipos a grupos bombo por bombo
  for (let b = 1; b <= 4; b++) {
    const equipos = [...bombos[b]];
    equipos.sort(() => Math.random() - 0.5);

    // Array para los que no tienen grupo fijo
    const pendientes = [];
    for (const eq of equipos) {
      if (eq.grupoFijo) {
        // Convierte la letra del grupo a índice numérico
        const idx = eq.grupoFijo.charCodeAt(0) - 65;
        grupos[idx].push(eq);
      } else {
        pendientes.push(eq);
      }
    }
    // Asignar los equipos pendientes a los grupos que faltan de este bombo b
    let idxP = 0;
    for (let gIdx = 0; gIdx < 12; gIdx++) {
      if (grupos[gIdx].length < b) {
        grupos[gIdx].push(pendientes[idxP]);
        idxP++;
      }
    }
  }

  return grupos;
}

function seleccion_torneo(evaluados, k = 4) {
  const candidatos = [];
  for (let i = 0; i < k; i++) {
    candidatos.push(evaluados[Math.floor(Math.random() * evaluados.length)]);
  }
  candidatos.sort((a, b) => a[0] - b[0]);
  return candidatos[0][1];
}
function seleccionarPorRuleta(evaluados) {
  // 1. Calculamos la suma total de las "inversas" de los puntajes
  // Sumamos 1 al score para evitar división por cero si el score es 0 (perfecto)
  let totalWeight = 0;
  const weights = evaluados.map((item) => {
    const score = item[0];
    // Usamos 1/(score+1). Si score es 0, peso es 1. Si score es 1000, peso es 0.0009
    const weight = 1 / (score + 1);
    totalWeight += weight;
    return weight;
  });

  // 2. Tiramos la bolita en la ruleta
  let random = Math.random() * totalWeight;

  // 3. Buscamos dónde cayó
  for (let i = 0; i < evaluados.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return evaluados[i]; // Retornamos [score, individuo]
    }
  }

  // Fallback por errores de redondeo (retorna el último o el mejor)
  return evaluados[evaluados.length - 1];
}
function cruzar(padre1, padre2) {
  const hijo1 = Array.from({ length: 12 }, () => []);
  const hijo2 = Array.from({ length: 12 }, () => []);

  for (let bomboIdx = 0; bomboIdx < 4; bomboIdx++) {
    const [donante1, donante2] =
      Math.random() < 0.5 ? [padre1, padre2] : [padre2, padre1];
    for (let gIdx = 0; gIdx < 12; gIdx++) {
      hijo1[gIdx].push(donante1[gIdx][bomboIdx]);
      hijo2[gIdx].push(donante2[gIdx][bomboIdx]);
    }
  }

  return [hijo1, hijo2];
}

function mutar(individuo, probMutacion) {
  if (Math.random() > probMutacion) return individuo;

  const nuevo = individuo.map((g) => [...g]);
  const idxG1 = Math.floor(Math.random() * 12);
  const idxG2 = Math.floor(Math.random() * 12);
  const bomboIdx = Math.floor(Math.random() * 4);

  const e1 = nuevo[idxG1][bomboIdx];
  const e2 = nuevo[idxG2][bomboIdx];

  if (!e1.grupoFijo && !e2.grupoFijo) {
    [nuevo[idxG1][bomboIdx], nuevo[idxG2][bomboIdx]] = [
      nuevo[idxG2][bomboIdx],
      nuevo[idxG1][bomboIdx],
    ];
  }

  return nuevo;
}

function ejecutarGA(onProgress) {
  const POBLACION_TAM = 100;
  const GENERACIONES = 1000;
  const PROB_CROSSOVER = 0.8;
  const PROB_MUTACION = 0.2;

  const datos = generarDatosEquipos();
  let poblacion = Array.from({ length: POBLACION_TAM }, () =>
    crearIndividuo(datos)
  );

  for (let gen = 0; gen < GENERACIONES; gen++) {
    let evaluados = poblacion.map((ind) => [calcularFitness(ind), ind]);
    evaluados.sort((a, b) => a[0] - b[0]);

    const bestScore = evaluados[0][0];

    if (gen % 100 === 0 || bestScore === 0) {
      onProgress(gen, bestScore);
    }

    if (bestScore === 0) {
      return { sorteo: evaluados[0][1], generacion: gen, costo: bestScore };
    }
    // Elitismo
    // const nuevaPoblacion = [evaluados[0][1]];
    const nuevaPoblacion = [];
    while (nuevaPoblacion.length < POBLACION_TAM) {
      // Seleccionamos dos padres independientemente
      const padreA = seleccionarPorRuleta(evaluados);
      const padreB = seleccionarPorRuleta(evaluados);

      let [hijo1, hijo2] =
        Math.random() < PROB_CROSSOVER
          ? cruzar(padreA[1], padreB[1])
          : [padreA[1].map((g) => [...g]), padreB[1].map((g) => [...g])];

      hijo1 = mutar(hijo1, PROB_MUTACION);
      hijo2 = mutar(hijo2, PROB_MUTACION);

      nuevaPoblacion.push(hijo1);
      if (nuevaPoblacion.length < POBLACION_TAM) nuevaPoblacion.push(hijo2);
    }

    poblacion = nuevaPoblacion;
  }

  const evaluadosFinal = poblacion.map((ind) => [calcularFitness(ind), ind]);
  evaluadosFinal.sort((a, b) => a[0] - b[0]);

  return {
    sorteo: evaluadosFinal[0][1],
    generacion: GENERACIONES,
    costo: evaluadosFinal[0][0],
  };
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function SorteoMundialGA(props) {
  const [sorteo, setSorteo] = useState(false);
  const [ejecutando, setEjecutando] = useState(false);
  const [progreso, setProgreso] = useState({ gen: 0, costo: 0 });
  const [resultado, setResultado] = useState(null);
  const [tiempoTotal, setTiempoTotal] = useState(null);

  const letras = "ABCDEFGHIJKL";
  const t = props.translations;

  const ejecutarSorteo = () => {
    setEjecutando(true);
    setSorteo(null);
    setResultado(null);
    const tiempoInicio = performance.now();

    setTimeout(() => {
      const res = ejecutarGA((gen, costo) => {
        setProgreso({ gen, costo });
      });

      setSorteo(res.sorteo);
      setResultado(res);
      setEjecutando(false);
      const tiempoTotal = performance.now();
      setTiempoTotal(((tiempoTotal - tiempoInicio) / 1000).toFixed(2));
    }, 100);
  };
  useEffect(() => {
    console.log(`resultado: ${resultado}`);

    // return () => {
    //   setResultado(null);
    // };
  }, [sorteo, resultado]);

  const getConfColors = (conf) => {
    const colors = {
      UEFA: { bg: "#dbeafe", color: "#1e40af" },
      CONMEBOL: { bg: "#fef3c7", color: "#92400e" },
      CAF: { bg: "#fed7aa", color: "#9a3412" },
      AFC: { bg: "#fecaca", color: "#991b1b" },
      CONCACAF: { bg: "#d1fae5", color: "#065f46" },
      OFC: { bg: "#e9d5ff", color: "#6b21a8" },
      MIX: { bg: "#e5e7eb", color: "#374151" },
    };
    return colors[conf] || colors["MIX"];
  };

  const gruposItin1 = sorteo
    ? sorteo
        .map((g, i) => ({ idx: i, grupo: g }))
        .filter((x) => obtenerItinerario(x.idx) === 1)
    : [];
  const gruposItin2 = sorteo
    ? sorteo
        .map((g, i) => ({ idx: i, grupo: g }))
        .filter((x) => obtenerItinerario(x.idx) === 2)
    : [];

  return (
    <Container>
      <Header>
        <Title>
          {t.title}
          <SiFifa style={{ fontSize: "65px" }} />
        </Title>
        <Subtitle>{t.subtitle}</Subtitle>
      </Header>
      <Controls>
        <Button onClick={ejecutarSorteo} disabled={ejecutando}>
          {ejecutando ? <RefreshIcon /> : <PlayIcon />}
          {ejecutando ? t.buttonExecuting : t.buttonGenerate}
        </Button>
      </Controls>
      {ejecutando && (
        <ProgressBox>
          {t.generation}: <strong>{progreso.gen}</strong> | {t.cost}:{" "}
          <strong>{progreso.costo}</strong>
        </ProgressBox>
      )}
      {resultado && (
        <ResultBox $valid={resultado.costo === 0}>
          {resultado.costo === 0
            ? `✅ ${t.validDraw}: ${resultado.generacion}  -  ${t.executionTime}: ${tiempoTotal} ${t.seconds}`
            : `⚠️ Mejor aproximación - Costo: ${resultado.costo}`}
        </ResultBox>
      )}
      {sorteo && (
        <GruposContainer>
          <ItinerarioSection
            initial={{ opacity: 0, scale: 0, y: 10, x: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            transition={{
              type: "spring", // Mantenemos tu efecto rebote
              // stiffness: 20,
              // damping: 5,
              visualDuration: 0.5,
              bounce: 0.4,
            }}
          >
            <ItinerarioHeader color="var(--accent)">
              🌎 {t.itinerary} 1
            </ItinerarioHeader>
            {gruposItin1.map(({ idx, grupo }) => (
              <GrupoCard key={idx} $borderColor="var(--accent)">
                <GrupoHeader>
                  {t.group}
                  <GrupoLetra color="var(--accent)">{letras[idx]}</GrupoLetra>
                </GrupoHeader>
                <EquiposList
                  // 1. Estado inicial: Desplazado a la izquierda (-50px) e invisible
                  initial={{ x: -40, opacity: 0 }}
                  // 2. Estado final: En su sitio (0) y visible
                  animate={{ x: 0, opacity: 1 }}
                  // 3. La magia del rebote
                  transition={{
                    type: "spring",
                    stiffness: 300, // Qué tan "tenso" es el resorte (más alto = más rápido)
                    damping: 15, // Qué tanta fricción tiene (más bajo = más rebota/se pasa)
                    delay: idx * 0.1, // ⚡️ Extra: Hace que salgan en cascada (uno tras otro)
                  }}
                >
                  {grupo.map((equipo, eIdx) => {
                    const colors = getConfColors(equipo.confederacion);
                    return (
                      <EquipoRow key={eIdx}>
                        <BomboTag>
                          {letras[idx]}
                          {equipo.bombo}
                        </BomboTag>
                        <EquipoNombre>{equipo.nombre}</EquipoNombre>

                        <div
                          style={{
                            display: "flex",
                            gap: "4px",
                            flexWrap: "wrap",
                          }}
                        >
                          {equipo.confederacion.map((confName, cIdx) => {
                            // Obtenemos el color individual para CADA confederación
                            const colors = getConfColors(confName);

                            return (
                              <ConfTag
                                key={cIdx}
                                bg={colors.bg}
                                color={colors.color}
                                style={{
                                  fontSize:
                                    equipo.confederacion.length > 1
                                      ? "x-small"
                                      : "inherit",
                                }}
                              >
                                {confName}
                              </ConfTag>
                            );
                          })}
                        </div>
                        {equipo.rankingTop && (
                          <RankTag>★ #{equipo.rankingTop}</RankTag>
                        )}
                        {equipo.grupoFijo && <MapPinIcon />}
                      </EquipoRow>
                    );
                  })}
                </EquiposList>
              </GrupoCard>
            ))}
          </ItinerarioSection>
          <ItinerarioSection
            initial={{ opacity: 0, scale: 0, y: -10, x: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            transition={{
              type: "spring", // Mantenemos tu efecto rebote
              // stiffness: 20,
              // damping: 5,
              visualDuration: 0.35,
              bounce: 0.24,
            }}
          >
            <ItinerarioHeader color="var(--primary)">
              🌍 {t.itinerary} 2
            </ItinerarioHeader>
            {gruposItin2.map(({ idx, grupo }) => (
              <GrupoCard key={idx} $borderColor="var(--primary)">
                <GrupoHeader>
                  <GrupoLetra color="var(--primary)">{letras[idx]}</GrupoLetra>
                  {t.group} {letras[idx]}
                </GrupoHeader>
                <EquiposList
                  // 1. Estado inicial: Desplazado a la izquierda (-50px) e invisible
                  initial={{ x: -60, opacity: 0 }}
                  // 2. Estado final: En su sitio (0) y visible
                  animate={{ x: 0, opacity: 1 }}
                  // 3. La magia del rebote
                  transition={{
                    type: "spring",
                    stiffness: 400, // Qué tan "tenso" es el resorte (más alto = más rápido)
                    damping: 15, // Qué tanta fricción tiene (más bajo = más rebota/se pasa)
                    delay: idx * 0.25, // ⚡️ Extra: Hace que salgan en cascada (uno tras otro)
                  }}
                >
                  {grupo.map((equipo, eIdx) => {
                    const colors = getConfColors(equipo.confederacion);
                    return (
                      <EquipoRow key={eIdx}>
                        <BomboTag>
                          {letras[idx]}
                          {equipo.bombo}
                        </BomboTag>
                        <EquipoNombre>{equipo.nombre}</EquipoNombre>
                        <div style={{ display: "flex", gap: "4px" }}>
                          {equipo.confederacion.map((confName, cIdx) => {
                            // Obtenemos el color individual para CADA confederación
                            const colors = getConfColors(confName);

                            return (
                              <ConfTag
                                key={cIdx}
                                bg={colors.bg}
                                color={colors.color}
                                style={{
                                  fontSize:
                                    equipo.confederacion.length > 1
                                      ? "x-small"
                                      : "inherit",
                                }}
                              >
                                {confName}
                              </ConfTag>
                            );
                          })}
                        </div>
                        {equipo.rankingTop && (
                          <RankTag>★ #{equipo.rankingTop}</RankTag>
                        )}
                        {equipo.grupoFijo && <MapPinIcon />}
                      </EquipoRow>
                    );
                  })}
                </EquiposList>
              </GrupoCard>
            ))}
          </ItinerarioSection>
        </GruposContainer>
      )}
      {!sorteo && !ejecutando && (
        <EmptyState>
          <TrophyIcon />
          <p>{t.emptyState}</p>
        </EmptyState>
      )}
    </Container>
  );
}
