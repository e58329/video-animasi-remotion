import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { MorphingCircle } from "../engine/components/Shapes";
import { useSpringValue } from "../engine/animations/Spring";

export const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springVal = useSpringValue(frame, fps);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${springVal})` }}>
        <MorphingCircle />
      </div>
    </AbsoluteFill>
  );
};
