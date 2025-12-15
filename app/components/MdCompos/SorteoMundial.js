"use client";
import React, { useState } from "react";
import styled from "styled-components";
import SpinnerLoad from "../SpinnerLoad";
import { SiFifa } from "react-icons/si";

// ==========================================
// STYLED COMPONENTS
// ==========================================

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; */
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: x-large;
  font-weight: bold;
  color: var(--accent);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
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
  border: 2px solid ${(props) => (props.valid ? "#9ae6b4" : "#fbd38d")};
  background: ${(props) => (props.valid ? "#f0fff4" : "#fffaf0")};
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${(props) => (props.valid ? "#22543d" : "#744210")};
`;

const GruposContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ItinerarioSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  border: 2px solid ${(props) => props.borderColor};
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

const EquiposList = styled.div`
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
  font-size: 0.75rem;
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

  equipos.push(new Equipo("México", "CONCACAF", 1, "A"));
  equipos.push(new Equipo("Canadá", "CONCACAF", 1, "B"));
  equipos.push(new Equipo("USA", "CONCACAF", 1, "D"));

  equipos.push(new Equipo("España", "UEFA", 1, null, 1));
  equipos.push(new Equipo("Argentina", "CONMEBOL", 1, null, 2));
  equipos.push(new Equipo("Francia", "UEFA", 1, null, 3));
  equipos.push(new Equipo("Inglaterra", "UEFA", 1, null, 4));

  const extrasB1 = [
    ["Brasil", "CONMEBOL"],
    ["Bélgica", "UEFA"],
    ["Portugal", "UEFA"],
    ["Países Bajos", "UEFA"],
    ["Alemania", "UEFA"],
  ];
  extrasB1.forEach(([nom, conf]) => equipos.push(new Equipo(nom, conf, 1)));

  const configRestante = [
    ["Uruguay", "CONMEBOL", 2],
    ["Colombia", "CONMEBOL", 2],
    ["Croacia", "UEFA", 2],
    ["Marruecos", "CAF", 2],
    ["Japón", "AFC", 2],
    ["Suiza", "UEFA", 2],
    ["Senegal", "CAF", 2],
    ["Irán", "CAF", 2],
    ["Corea del Sur", "AFC", 2],
    ["Ecuador", "CONMEBOL", 2],
    ["Austria", "UEFA", 2],
    ["Australia", "OFC", 2],
    ["Noruega", "UEFA", 3],
    ["Panamá", "CONCACAF", 3],
    ["Egipto", "CAF", 3],
    ["Argelia", "CAF", 3],
    ["Escocia", "UEFA", 3],
    ["Paraguay", "CONMEBOL", 3],
    ["Túnez", "CAF", 3],
    ["Costa de Marfil", "CAF", 3],
    ["Uzbekistán", "AFC", 3],
    ["Catar", "AFC", 3],
    ["Arabia Saudita", "AFC", 3],
    ["Sudáfrica", "CAF", 3],
    ["Jordania", "AFC", 4],
    ["Cabo Verde", "CAF", 4],
    ["Ghana", "CAF", 4],
    ["Curazao", "CONCACAF", 4],
    ["Haití", "CONCACAF", 4],
    ["Nueva Zelanda", "OFC", 4],
    ["Repesca IC-A", "MIX", 4],
    ["Repesca IC-B", "MIX", 4],
    ["Repesca UEFA-A", "UEFA", 4],
    ["Repesca UEFA-B", "UEFA", 4],
    ["Repesca UEFA-C", "UEFA", 4],
    ["Repesca UEFA-D", "UEFA", 4],
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

  for (let i = 0; i < sorteo.length; i++) {
    const grupo = sorteo[i];
    const conteoConfs = {};

    for (const equipo of grupo) {
      if (equipo.rankingTop) ubicacionTops[equipo.rankingTop] = i;
      const conf = equipo.confederacion;
      conteoConfs[conf] = (conteoConfs[conf] || 0) + 1;
    }

    for (const [conf, cant] of Object.entries(conteoConfs)) {
      if (conf === "UEFA") {
        if (cant > 2) penalizacion += 100;
      } else {
        if (cant > 1) penalizacion += 100;
      }
    }
  }

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

function seleccion_ruleta(evaluados) {
  const totalFitness = evaluados.reduce(
    (sum, [fit, _]) => sum + 1 / (fit + 1),
    0
  );
  const rand = Math.random() * totalFitness;
  let acumulado = 0;

  for (const [fit, ind] of evaluados) {
    acumulado += 1 / (fit + 1);
    if (acumulado >= rand) {
      return ind;
    }
  }

  return evaluados[evaluados.length - 1][1];
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

    const nuevaPoblacion = [evaluados[0][1]];

    while (nuevaPoblacion.length < POBLACION_TAM) {
      const candidatos = [];
      for (let i = 0; i < 4; i++) {
        candidatos.push(
          evaluados[Math.floor(Math.random() * evaluados.length)]
        );
      }
      candidatos.sort((a, b) => a[0] - b[0]);

      let [hijo1, hijo2] =
        Math.random() < PROB_CROSSOVER
          ? cruzar(candidatos[0][1], candidatos[1][1])
          : [
              candidatos[0][1].map((g) => [...g]),
              candidatos[1][1].map((g) => [...g]),
            ];

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
  console.log("Rendering SorteoMundialGA component");
  const [sorteo, setSorteo] = useState(null);
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
        <ResultBox valid={resultado.costo === 0}>
          {resultado.costo === 0
            ? `✅ ${t.validDraw}: ${resultado.generacion}  -  ${t.executionTime}: ${tiempoTotal} ${t.seconds}`
            : `⚠️ Mejor aproximación - Costo: ${resultado.costo}`}
        </ResultBox>
      )}

      {sorteo && (
        <GruposContainer>
          <ItinerarioSection>
            <ItinerarioHeader color="var(--accent)">
              🌎 {t.itinerary} 1
            </ItinerarioHeader>
            {gruposItin1.map(({ idx, grupo }) => (
              <GrupoCard key={idx} borderColor="var(--accent)">
                <GrupoHeader>
                  <GrupoLetra color="var(--accent)">{letras[idx]}</GrupoLetra>
                  {t.group} {letras[idx]}
                </GrupoHeader>
                <EquiposList>
                  {grupo.map((equipo, eIdx) => {
                    const colors = getConfColors(equipo.confederacion);
                    return (
                      <EquipoRow key={eIdx}>
                        <BomboTag>B{equipo.bombo}</BomboTag>
                        <EquipoNombre>{equipo.nombre}</EquipoNombre>
                        <ConfTag bg={colors.bg} color={colors.color}>
                          {equipo.confederacion}
                        </ConfTag>
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
          <ItinerarioSection>
            <ItinerarioHeader color="var(--primary)">
              🌍 {t.itinerary} 2
            </ItinerarioHeader>
            {gruposItin2.map(({ idx, grupo }) => (
              <GrupoCard key={idx} borderColor="var(--primary)">
                <GrupoHeader>
                  <GrupoLetra color="var(--primary)">{letras[idx]}</GrupoLetra>
                  {t.group} {letras[idx]}
                </GrupoHeader>
                <EquiposList>
                  {grupo.map((equipo, eIdx) => {
                    const colors = getConfColors(equipo.confederacion);
                    return (
                      <EquipoRow key={eIdx}>
                        <BomboTag>B{equipo.bombo}</BomboTag>
                        <EquipoNombre>{equipo.nombre}</EquipoNombre>
                        <ConfTag bg={colors.bg} color={colors.color}>
                          {equipo.confederacion}
                        </ConfTag>
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
