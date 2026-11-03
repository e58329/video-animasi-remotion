import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { rnd } from "./util";

const N = 28;
const titik = Array.from({ length: N }, (_, i) => ({ x: 120 + rnd(i) * 1680, y: 120 + rnd(i + 40) * 840 }));
const garis: [number, number][] = [];
for (let a = 0; a < N; a++) {
  for (let b = a + 1; b < N; b++) {
    if (Math.hypot(titik[a].x - titik[b].x, titik[a].y - titik[b].y) < 340) garis.push([a, b]);
  }
}

export const Jaringan: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="jaringanBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#050a1f" />
            <stop offset="1" stopColor="#10295a" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#jaringanBg)" />
        {garis.map(([a, b], k) => (
          <line key={k} x1={titik[a].x} y1={titik[a].y} x2={titik[b].x} y2={titik[b].y} stroke="rgba(0,229,255,0.18)" strokeWidth="2" />
        ))}
        {garis.map(([a, b], k) => {
          const t = (frame * 0.012 + rnd(k)) % 1;
          return (
            <circle
              key={"p" + k}
              cx={titik[a].x + (titik[b].x - titik[a].x) * t}
              cy={titik[a].y + (titik[b].y - titik[a].y) * t}
              r={5}
              fill="#00E5FF"
              opacity={0.85}
            />
          );
        })}
        {titik.map((p, i) => (
          <circle key={"n" + i} cx={p.x} cy={p.y} r={9 + Math.sin(frame / 15 + i) * 3} fill="#bfefff" opacity={0.9} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
