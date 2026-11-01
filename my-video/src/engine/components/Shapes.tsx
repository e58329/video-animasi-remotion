import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const MorphingCircle: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const radius = interpolate(progress, [0, 1], [50, 20]);
  return <div style={{ width: 200, height: 200, backgroundColor: "#ff3366", borderRadius: `${radius}%` }} />;
};
