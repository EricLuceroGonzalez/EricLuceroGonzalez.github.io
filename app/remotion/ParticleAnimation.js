import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Particle } from "./Particle";

const PARTICLE_COUNT = 50;
const WIDTH = 800;
const HEIGHT = 600;

export const ParticleAnimation = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg width={WIDTH} height={HEIGHT}>
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <Particle key={i} width={WIDTH} height={HEIGHT} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
