import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { rnd } from "./util";

const KODE = ["AB101", "CD220", "EF305", "GH740", "IJ962", "KL809", "MN357", "OP710", "QR856"];
const CX = 960;
const CY = 540;
const R = 430;

const titikBusur = (derajat: number) => {
  const a = (derajat * Math.PI) / 180;
  return [CX + R * Math.cos(a), CY + R * Math.sin(a)];
};

export const Radar: React.FC = () => {
  const frame = useCurrentFrame();
  const sapuan = (frame * 3) % 360;

  const jejak = Array.from({ length: 36 }, (_, k) => {
    const [x1, y1] = titikBusur(sapuan - (k + 1) * 2);
    const [x2, y2] = titikBusur(sapuan - k * 2);
    return (
      <path
        key={k}
        d={`M${CX},${CY} L${x1},${y1} A${R},${R} 0 0 1 ${x2},${y2} Z`}
        fill={`rgba(57,255,136,${0.28 * (1 - k / 36)})`}
      />
    );
  });

  const pesawat = KODE.map((kode, i) => {
    const r = (0.25 + rnd(i) * 0.65) * R + Math.sin(frame / 160 + i) * 14;
    const th = rnd(i + 20) * 360 + frame * (0.06 + rnd(i + 40) * 0.1) * (i % 2 ? 1 : -1);
    const rad = (th * Math.PI) / 180;
    const x = CX + r * Math.cos(rad);
    const y = CY + r * Math.sin(rad);
    const sejak = (((sapuan - (((th % 360) + 360) % 360)) % 360) + 360) % 360;
    const o = Math.max(0.2, 1 - sejak / 200);
    return (
      <g key={i} opacity={o}>
        <circle cx={x} cy={y} r={7} fill="#baffd6" />
        <circle cx={x} cy={y} r={20} fill="none" stroke="#39ff88" strokeWidth={2} />
        <text x={x + 28} y={y + 8} fontSize="24" fill="#9dffc4" fontFamily="Arial, sans-serif">
          {kode}
        </text>
      </g>
    );
  });

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="radarBg" cx="0.5" cy="0.5" r="0.7">
            <stop offset="0" stopColor="#06301c" />
            <stop offset="1" stopColor="#010a06" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#radarBg)" />
        {[0.25, 0.5, 0.75, 1].map((s) => (
          <circle key={s} cx={CX} cy={CY} r={R * s} fill="none" stroke="rgba(57,255,136,0.35)" strokeWidth={s === 1 ? 4 : 2} />
        ))}
        <line x1={CX - R} y1={CY} x2={CX + R} y2={CY} stroke="rgba(57,255,136,0.25)" strokeWidth="2" />
        <line x1={CX} y1={CY - R} x2={CX} y2={CY + R} stroke="rgba(57,255,136,0.25)" strokeWidth="2" />
        {jejak}
        {pesawat}
      </svg>
    </AbsoluteFill>
  );
};
