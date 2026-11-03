import React from "react";
import { AbsoluteFill } from "remotion";
import { useCurrentFrame } from "remotion";

const Panah: React.FC<{ x1: number; x2: number; y: number; label: string }> = ({ x1, x2, y, label }) => (
  <g>
    <line x1={x1} y1={y} x2={x2} y2={y} stroke="rgba(255,255,255,0.35)" strokeWidth="6" strokeDasharray="14 12" />
    <polygon points={`${x2},${y} ${x2 - 26},${y - 16} ${x2 - 26},${y + 16}`} fill="rgba(255,255,255,0.5)" />
    <text x={(x1 + x2) / 2} y={y - 40} textAnchor="middle" fontSize="40" fontWeight="800" fill="#bfefff" fontFamily="Arial, sans-serif">
      {label}
    </text>
  </g>
);

export const Koin: React.FC = () => {
  const frame = useCurrentFrame();

  const klik = [0, 1, 2].map((i) => {
    const t = ((frame * 0.012 + i / 3) % 1);
    return <circle key={i} cx={450 + t * 380} cy={520} r={11} fill="#00E5FF" opacity={Math.sin(t * Math.PI)} />;
  });
  const koin = [0, 1, 2, 3].map((i) => {
    const t = ((frame * 0.01 + i / 4) % 1);
    const x = 1070 + t * 360;
    return (
      <g key={i} opacity={Math.sin(t * Math.PI)}>
        <circle cx={x} cy={520} r={26} fill="#f5c542" stroke="#b8901f" strokeWidth="4" />
        <text x={x} y={532} textAnchor="middle" fontSize="32" fontWeight="900" fill="#7a5a00" fontFamily="Arial, sans-serif">$</text>
      </g>
    );
  });
  const denyut = 1 + Math.sin(frame / 12) * 0.03;

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="koinBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0b132b" />
            <stop offset="1" stopColor="#1c3d6e" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#koinBg)" />

        <g transform="translate(330 520)">
          <circle r="110" fill="rgba(255,255,255,0.08)" stroke="#fff" strokeWidth="4" />
          <circle cy="-26" r="26" fill="#fff" />
          <path d="M-46,52 Q0,-20 46,52 Z" fill="#fff" />
          <text y="170" textAnchor="middle" fontSize="40" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">Pengguna</text>
        </g>

        <g transform="translate(960 520)">
          <circle r="110" fill="rgba(255,255,255,0.08)" stroke="#fff" strokeWidth="4" />
          <rect x="-52" y="-10" width="104" height="62" fill="#fff" />
          <polygon points="-62,-10 62,-10 48,-52 -48,-52" fill="#ffd166" />
          <rect x="-14" y="16" width="28" height="36" fill="#0b132b" />
          <text y="170" textAnchor="middle" fontSize="40" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">Pengiklan</text>
        </g>

        <g transform={`translate(1590 520) scale(${denyut})`}>
          <circle r="110" fill="rgba(0,229,255,0.12)" stroke="#00E5FF" strokeWidth="5" />
          <circle cx="-8" cy="-8" r="38" fill="none" stroke="#00E5FF" strokeWidth="12" />
          <line x1="20" y1="20" x2="52" y2="52" stroke="#00E5FF" strokeWidth="12" strokeLinecap="round" />
          <text y="170" textAnchor="middle" fontSize="40" fontWeight="800" fill="#00E5FF" fontFamily="Arial, sans-serif">Mesin pencari</text>
        </g>

        <Panah x1={450} x2={830} y={520} label="KLIK" />
        <Panah x1={1080} x2={1460} y={520} label="BAYAR" />
        {klik}
        {koin}
      </svg>
    </AbsoluteFill>
  );
};
