import { Composition } from "remotion";
import { ParticleAnimation } from "./ParticleAnimation";

export const RemotionRoot = () => {
  return (
    <Composition
      id="ParticleAnimation"
      component={ParticleAnimation}
      durationInFrames={300}
      fps={30}
      width={800}
      height={600}
    />
  );
};
