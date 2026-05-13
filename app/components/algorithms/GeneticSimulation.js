"use client";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { DNA, Vector } from "./SmartRocketLogic";
import { ConvergenceChart } from "./GA_convergence";

const CanvasContainer = styled.div`
  background: var(--bg);
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 20px;
  color: #f1f5f9;
  font-family: "JetBrains Mono", monospace;
`;

const Controls = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  font-size: 12px;
`;

// Configuración de la simulación
const config = {
  popSize: 10,
  lifespan: 200,
  mutationRate: 0.01,
  target: { x: 300, y: 60 },
  obstacle: { x: 150, y: 200, w: 230, h: 20 },
};
export default function GeneticSimulation() {
  const canvasRef = useRef(null);
  const [gen, setGen] = useState(0);
  const [stats, setStats] = useState({ bestFitness: 0 });
  const [fitnessHistory, setFitnessHistory] = useState([]); // Para el gráfico
  const [bestEveryGen, setBestEveryGen] = useState(null); // El "Elite" actual

  const [stagnationCounter, setStagnationCounter] = useState(0);
  const [lastBestFitness, setLastBestFitness] = useState(0);
  const [currentMutation, setCurrentMutation] = useState(config.mutationRate);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let iteration = 0;

    // Inicializar población
    let population = Array.from({ length: config.popSize }, () => ({
      pos: new Vector(300, 380),
      vel: new Vector(0, 0),
      acc: new Vector(0, 0),
      dna: new DNA(config.lifespan),
      fitness: 0,
      completed: false,
      crashed: false,
    }));

    const update = () => {
      population.forEach((rocket) => {
        if (!rocket.dna || !rocket.dna.genes[iteration]) return; // Evita el crash si algo falla
        if (rocket.completed || rocket.crashed) return;

        // Aplicar fuerza del ADN según el frame actual
        rocket.acc.add(rocket.dna.genes[iteration]);
        rocket.vel.add(rocket.acc);
        rocket.pos.add(rocket.vel);
        rocket.acc.multiply(0.75);

        // Verificar colisión con objetivo
        const d = Math.hypot(
          rocket.pos.x - config.target.x,
          rocket.pos.y - config.target.y,
        );
        if (d < 10) rocket.completed = true;

        // Verificar colisión con bordes y obstáculos
        if (
          rocket.pos.x < 0 ||
          rocket.pos.x > 600 ||
          rocket.pos.y < 0 ||
          rocket.pos.y > 400
        )
          rocket.crashed = true;
        if (
          rocket.pos.x > config.obstacle.x &&
          rocket.pos.x < config.obstacle.x + config.obstacle.w &&
          rocket.pos.y > config.obstacle.y &&
          rocket.pos.y < config.obstacle.y + config.obstacle.h
        )
          rocket.crashed = true;
      });

      iteration++;

      // Fin de la generación
      if (iteration === config.lifespan) {
        evolve();
        iteration = 0;
        setGen((g) => g + 1);
      }

      draw();
      frame = requestAnimationFrame(update);
    };
    const evolve = () => {
      let maxFit = 0;
      let bestDNA = null;
      let eliteRocket = null;

      // 1. Encontrar al mejor de esta generación
      population.forEach((r) => {
        const d = Math.hypot(
          r.pos.x - config.target.x,
          r.pos.y - config.target.y,
        );
        r.fitness = 1 / (d + 1);

        if (r.completed) r.fitness *= 50;
        if (r.crashed) r.fitness /= 20;

        if (r.fitness > maxFit) {
          maxFit = r.fitness;
          bestDNA = r.dna;
          eliteRocket = r; // Guardamos una referencia al campeón
        }
      });
      const sortedPop = [...population].sort((a, b) => b.fitness - a.fitness);
      const currentMaxFit = sortedPop[0].fitness;
      let nextMutation = config.mutationRate;
      if (currentMaxFit <= lastBestFitness) {
        console.log(`mejor fit: ${currentMaxFit}, last: ${lastBestFitness}`);

        // No hubo mejora: aumentamos el contador
        const newStagnation = stagnationCounter + 1;
        setStagnationCounter(newStagnation);

        if (newStagnation >= 4) {
          // ¡ALERTA DE ESTANCAMIENTO!
          // Subimos la mutación drásticamente (ej. al 10%) para "agitar" los genes
          nextMutation = 0.1;
          console.log(
            "🚀 Estancamiento detectado. Aplicando choque mutacional (10%)",
          );
        }
      } else {
        // ¡Hubo mejora!: Reiniciamos contador y actualizamos el mejor fitness
        setStagnationCounter(0);
        setLastBestFitness(currentMaxFit);
        nextMutation = config.mutationRate; // Volvemos a la mutación normal
      }

      setCurrentMutation(nextMutation);
      // 2. Guardar en el historial para el gráfico
      setFitnessHistory((prev) => [...prev, maxFit.toFixed(4)]);
      setBestEveryGen(eliteRocket.dna);
      // const currentMaxFit = sortedPop[0].fitness;

      // 3. Normalización y Mating Pool
      population.forEach((r) => (r.fitness /= maxFit));
      const matingPool = [];
      population.forEach((r) => {
        const n = Math.floor(r.fitness * 100);

        for (let i = 0; i < n; i++) matingPool.push(r);
      });

      if (matingPool.length === 0) matingPool.push(...population);
      const newPopulation = [];
      const elitismCount = 5;
      // 4. Reproducción con ELITISMO
      for (let i = 0; i < config.popSize; i++) {
        // ELITISMO: El primero de la nueva gen es una copia exacta del mejor anterior
        if (i < elitismCount) {
          // CLONACIÓN: Los N mejores pasan sin cambios
          newPopulation.push(createNewRocket(sortedPop[i].dna));
        } else {
          // SELECCIÓN POR TORNEO: Elegimos 4 al azar y el mejor gana
          const parentA = tournamentSelect(population, 4).dna;
          const parentB = tournamentSelect(population, 4).dna;
          // // SELECCIÓN POR RULETA
          // const parentA =
          //   matingPool[Math.floor(Math.random() * matingPool.length)].dna;
          // const parentB =
          //   matingPool[Math.floor(Math.random() * matingPool.length)].dna;
          // CRUCE
          const childDNA = parentA.crossover(parentB);
          // MUTACIÓN ADAPTATIVA: Si vamos por la gen 50, mutamos menos para refinar

          childDNA.mutate(currentMutation);
          // childDNA.mutate(config.mutationRate);
          newPopulation.push(createNewRocket(childDNA));
        }

        population = newPopulation;
      }
    };
    // Función de Torneo: Rápida y sin arrays gigantes
    const tournamentSelect = (pop, k) => {
      let best = null;
      for (let i = 0; i < k; i++) {
        const ind = pop[Math.floor(Math.random() * pop.length)];
        if (!best || ind.fitness > best.fitness) best = ind;
      }
      return best;
    };
    // Función auxiliar para resetear cohetes
    const createNewRocket = (dna) => ({
      pos: new Vector(300, 380),
      vel: new Vector(0, 0),
      acc: new Vector(0, 0),
      dna: dna,
      fitness: 0,
      completed: false,
      crashed: false,
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar Objetivo
      ctx.fillStyle = "#0077FF";
      ctx.beginPath();
      ctx.arc(config.target.x, config.target.y, 10, 0, Math.PI * 2);
      ctx.fill();

      // Dibujar Obstáculo
      ctx.fillStyle = "#334155";
      ctx.fillRect(
        config.obstacle.x,
        config.obstacle.y,
        config.obstacle.w,
        config.obstacle.h,
      );

      // Dibujar Cohetes
      population.forEach((r) => {
        ctx.save();
        ctx.translate(r.pos.x, r.pos.y);
        ctx.rotate(Math.atan2(r.vel.y, r.vel.x));
        ctx.fillStyle = r.completed ? "#00cc66" : "#ff3366";
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-5, 5);
        ctx.lineTo(-5, -5);
        ctx.fill();
        ctx.restore();
      });
    };

    update();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <CanvasContainer>
      <Controls>
        <span>GENERACIÓN: {gen}</span>
        <span>
          Mejor fitness:{" "}
          {fitnessHistory[fitnessHistory.length - 1]
            ? fitnessHistory[fitnessHistory.length - 1]
            : 0}
        </span>

        <span
          style={{ color: stagnationCounter >= 10 ? "#ef4444" : "#38bdf8" }}
        >
          MUTACIÓN: {(currentMutation * 100).toFixed(1)}%{" "}
          {stagnationCounter >= 10 ? "(MODO CHOQUE)" : ""}
        </span>
        {/* <span style={{ color: "#38bdf8" }}>SISTEMA: GENETIC_ALGO_V1</span> */}
      </Controls>
      <canvas
        ref={canvasRef}
        width="600"
        height="400"
        style={{ width: "100%", height: "auto" }}
      />
      {/* <div>{fitnessHistory}</div> */}
      {/* <div>{bestEveryGen}</div> */}

      <ConvergenceChart data={fitnessHistory} />
    </CanvasContainer>
  );
}
