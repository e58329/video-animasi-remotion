import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { rnd } from "./util";
import { Pesawat } from "./Pesawat";

const klem = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const JALUR = [220, 380, 700, 860];

export const LangitPesawat: React.FC = () => {
  const frame = useCurrentFrame();
  const f = frame % 360;

  const ax = 200 + (1520 * f) / 360;
  const ay = 540;
  const geser = interpolate(f, [150, 210], [0, 150], klem);
  const bx = 1720 - (1520 * f) / 360;
  const by = 540 - geser;
  const bahaya = Math.hypot(ax - bx, ay - by) < 230 && Math.abs(ay - by) < 110;
  const warna = bahaya ? "#ff4d4d" : "#00E5FF";
  const kedip = bahaya ? (Math.floor(frame / 8) % 2 === 0 ? 1 : 0.4) : 1;

  const lain = JALUR.map((y, i) => {
    const x = (((frame * (1.2 + rnd(i) * 1.5) + rnd(i + 9) * 2000) % 2200) + 2200) % 2200 - 150;
    return <Pesawat key={i} x={x} y={y} rotasi={90} skala={0.8} warna="rgba(255,255,255,0.75)" />;
  });

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="langitBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a1a3d" />
            <stop offset="1" stopColor="#1d4a86" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#langitBg)" />
        {[220, 380, 540, 700, 860].map((y) => (
          <line key={y} x1="0" y1={y} x2="1920" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="18 16" />
        ))}
        {lain}

        <circle cx={ax} cy={ay} r="80" fill="none" stroke={warna} strokeWidth="3" strokeDasharray="10 8" opacity={kedip} />
        <circle cx={bx} cy={by} r="80" fill="none" stroke={warna} strokeWidth="3" strokeDasharray="10 8" opacity={kedip} />
        <Pesawat x={ax} y={ay} rotasi={90} skala={1} />
        <Pesawat x={bx} y={by} rotasi={270} skala={1} />

        <text
          x="960"
          y="130"
          textAnchor="middle"
          fontSize="52"
          fontWeight="900"
          fill={warna}
          opacity={kedip}
          fontFamily="Arial, sans-serif"
        >
          {bahaya ? "PERINGATAN: JALUR BERTEMU" : "JARAK AMAN"}
        </text>
      </svg>
    </AbsoluteFill>
  );
};
