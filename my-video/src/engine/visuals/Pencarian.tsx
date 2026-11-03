import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { rnd } from "./util";

const QUERY = ["sepatu lari murah", "servis ac terdekat", "tiket pesawat ke bali"];
const klem = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Pencarian: React.FC = () => {
  const frame = useCurrentFrame();
  const q = QUERY[Math.floor(frame / 180) % QUERY.length];
  const f = frame % 180;
  const huruf = Math.floor(interpolate(f, [10, 70], [0, q.length], klem));
  const kursor = Math.floor(frame / 15) % 2 === 0 ? "|" : " ";

  const bola = Array.from({ length: 10 }, (_, i) => (
    <circle
      key={i}
      cx={rnd(i) * 1920 + Math.sin(frame / 70 + i) * 50}
      cy={rnd(i + 30) * 1080 + Math.cos(frame / 80 + i) * 40}
      r={50 + rnd(i + 60) * 120}
      fill="rgba(0,229,255,0.06)"
    />
  ));

  const kartu = [0, 1, 2].map((i) => {
    const t = interpolate(f, [85 + i * 10, 105 + i * 10], [0, 1], klem);
    const x = 360 + i * 410;
    return (
      <g key={i} opacity={t} transform={`translate(${x} ${470 + (1 - t) * 40})`}>
        <rect width="380" height="200" rx="22" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <rect x="20" y="20" width="76" height="34" rx="10" fill="#00E5FF" />
        <text x="58" y="44" textAnchor="middle" fontSize="22" fontWeight="800" fill="#06223a" fontFamily="Arial, sans-serif">
          Iklan
        </text>
        <rect x="20" y="86" width="300" height="16" rx="8" fill="rgba(255,255,255,0.55)" />
        <rect x="20" y="118" width="240" height="12" rx="6" fill="rgba(255,255,255,0.3)" />
        <rect x="20" y="144" width="200" height="12" rx="6" fill="rgba(255,255,255,0.3)" />
      </g>
    );
  });

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="pencarianBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0b132b" />
            <stop offset="1" stopColor="#1c3d6e" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#pencarianBg)" />
        {bola}
        <rect x="360" y="260" width="1200" height="120" rx="60" fill="rgba(255,255,255,0.96)" />
        <circle cx="430" cy="318" r="22" fill="none" stroke="#5f6368" strokeWidth="7" />
        <line x1="446" y1="334" x2="466" y2="354" stroke="#5f6368" strokeWidth="7" strokeLinecap="round" />
        <text x="500" y="336" fontSize="52" fill="#202124" fontFamily="Arial, sans-serif">
          {q.slice(0, huruf) + kursor}
        </text>
        {kartu}
      </svg>
    </AbsoluteFill>
  );
};
