import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Kamera: React.FC<{ dur: number; indeks: number; children: React.ReactNode }> = ({
  dur,
  indeks,
  children,
}) => {
  const frame = useCurrentFrame();
  const arah = indeks % 2 === 0 ? 1 : -1;
  const zoom = interpolate(frame, [0, dur], [1.05, 1.13], { extrapolateRight: "clamp" });
  const x = interpolate(frame, [0, dur], [-25 * arah, 25 * arah], { extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ transform: `scale(${zoom}) translateX(${x}px)` }}>{children}</AbsoluteFill>;
};
