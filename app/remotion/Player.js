"use client";

import { Player } from "@remotion/player";
import { ParticleAnimation } from "./ParticleAnimation";

export default function RemotionPlayer() {
  return (
    <Player
      component={ParticleAnimation}
      durationInFrames={300}
      fps={30}
      compositionWidth={800}
      compositionHeight={600}
      style={{ width: "800px", height: "600px" }}
      controls
    />
  );
}
