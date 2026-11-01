import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const AnimatedText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const chars = Math.floor(interpolate(frame - delay, [0, 30], [0, text.length], { extrapolateRight: "clamp" }));
  return <h1 style={{ color: "white", fontFamily: "monospace", fontSize: 80 }}>{text.substring(0, Math.max(0, chars))}</h1>;
};
