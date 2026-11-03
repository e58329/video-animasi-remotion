import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { rnd } from "./util";

export const Abstrak: React.FC = () => {
  const frame = useCurrentFrame();

  const bola = Array.from({ length: 14 }, (_, i) => {
    const x = rnd(i) * 1920 + Math.sin(frame / (60 + rnd(i + 20) * 60) + i) * 70;
    const y = rnd(i + 40) * 1080 + Math.cos(frame / (70 + rnd(i + 60) * 60) + i) * 60;
    const r = 60 + rnd(i + 80) * 160;
    return <circle key={i} cx={x} cy={y} r={r} fill="rgba(0,229,255,0.07)" />;
  });

  const garis = Array.from({ length: 12 }, (_, i) => {
    const x = ((i * 180 - frame * 0.6) % 2160 + 2160) % 2160 - 120;
    return <line key={i} x1={x} y1="0" x2={x} y2="1080" stroke="rgba(255,255,255,0.05)" strokeWidth={2} />;
  });

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="abstrakBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0b132b" />
            <stop offset="0.5" stopColor="#1c2541" />
            <stop offset="1" stopColor="#3a506b" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#abstrakBg)" />
        {garis}
        {bola}
      </svg>
    </AbsoluteFill>
  );
};
