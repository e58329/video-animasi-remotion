import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { rnd } from "./util";

const N = 70;
const TETAP = [
  { x: 560, y: 450 },
  { x: 980, y: 300 },
  { x: 980, y: 700 },
  { x: 1380, y: 500 },
];
const NAMA = ["UCLA", "SRI", "UCSB", "UTAH"];
const titik = Array.from({ length: N }, (_, i) =>
  i < 4 ? TETAP[i] : { x: 140 + rnd(i) * 1640, y: 140 + rnd(i + 70) * 800 }
);
const sambungan: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3]];
for (let i = 4; i < N; i++) {
  const jarak = Array.from({ length: i }, (_, j) => ({
    j,
    d: Math.hypot(titik[i].x - titik[j].x, titik[i].y - titik[j].y),
  })).sort((a, b) => a.d - b.d);
  sambungan.push([i, jarak[0].j]);
  if (i % 3 === 0) sambungan.push([i, jarak[1].j]);
}

export const JaringanTumbuh: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.min(N, 4 + Math.floor(Math.max(0, frame - 30) / 5));
  const garis = sambungan.filter(([a, b]) => a < n && b < n);

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="tumbuhBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#050a1f" />
            <stop offset="1" stopColor="#10295a" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#tumbuhBg)" />
        {garis.map(([a, b], k) => (
          <line key={k} x1={titik[a].x} y1={titik[a].y} x2={titik[b].x} y2={titik[b].y} stroke="rgba(0,229,255,0.25)" strokeWidth="2.5" />
        ))}
        {garis.map(([a, b], k) => {
          const t = (frame * 0.015 + rnd(k)) % 1;
          return (
            <circle
              key={"p" + k}
              cx={titik[a].x + (titik[b].x - titik[a].x) * t}
              cy={titik[a].y + (titik[b].y - titik[a].y) * t}
              r={5}
              fill="#00E5FF"
            />
          );
        })}
        {titik.slice(0, n).map((p, i) => (
          <circle key={"n" + i} cx={p.x} cy={p.y} r={i < 4 ? 20 : 10 + Math.sin(frame / 15 + i) * 2} fill={i < 4 ? "#ffd166" : "#bfefff"} />
        ))}
        {NAMA.map((nama, i) =>
          i < n ? (
            <text key={nama} x={TETAP[i].x} y={TETAP[i].y - 38} textAnchor="middle" fontSize="34" fontWeight="800" fill="#ffd166" fontFamily="Arial, sans-serif">
              {nama}
            </text>
          ) : null
        )}
      </svg>
    </AbsoluteFill>
  );
};
