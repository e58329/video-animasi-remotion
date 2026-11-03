import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const klem = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const PESERTA = [
  { nama: "Toko A", bid: 9, kualitas: 0.4, warna: "#ff6b6b" },
  { nama: "Toko B", bid: 5, kualitas: 0.9, warna: "#4dd0e1" },
  { nama: "Toko C", bid: 7, kualitas: 0.6, warna: "#ffd166" },
  { nama: "Toko D", bid: 4, kualitas: 0.5, warna: "#a78bfa" },
];
const SKALA = 60;

export const Lelang: React.FC = () => {
  const frame = useCurrentFrame();
  const f = frame % 300;
  const keluar = interpolate(f, [270, 300], [1, 0], klem);
  const fase1 = interpolate(f, [10, 70], [0, 1], klem);
  const fase2 = interpolate(f, [90, 130], [0, 1], klem);
  const fase3 = interpolate(f, [150, 220], [0, 1], klem);
  const menang = PESERTA.reduce((a, p, i) => (p.bid * p.kualitas > PESERTA[a].bid * PESERTA[a].kualitas ? i : a), 0);

  const baris = PESERTA.map((p, i) => {
    const y = 340 + i * 150;
    const rank = p.bid * p.kualitas;
    const sorot = i === menang && f > 225;
    return (
      <g key={i} transform={`translate(0 ${y})`}>
        <text x="300" y="46" textAnchor="end" fontSize="42" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">
          {p.nama}
        </text>
        <rect x="330" y="10" width={p.bid * SKALA * fase1} height="44" rx="10" fill={p.warna} opacity="0.9" />
        <text x={330 + p.bid * SKALA * fase1 + 14} y="44" fontSize="30" fill="#fff" opacity={fase1} fontFamily="Arial, sans-serif">
          {"tawaran " + p.bid}
        </text>
        <text x="990" y="46" fontSize="40" fontWeight="800" fill="#bfefff" opacity={fase2} fontFamily="Arial, sans-serif">
          {"× " + String(p.kualitas).replace(".", ",")}
        </text>
        <rect x="1110" y="10" width={rank * SKALA * 1.2 * fase3} height="44" rx="10" fill={sorot ? "#00E5FF" : p.warna} opacity={sorot ? 1 : 0.55} />
        <text x={1110 + rank * SKALA * 1.2 * fase3 + 14} y="46" fontSize="34" fontWeight="800" fill={sorot ? "#00E5FF" : "#fff"} opacity={fase3} fontFamily="Arial, sans-serif">
          {sorot ? "MENANG" : "= " + rank.toFixed(1).replace(".", ",")}
        </text>
      </g>
    );
  });

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="lelangBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b132b" />
            <stop offset="1" stopColor="#14284b" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#lelangBg)" />
        <g opacity={keluar}>
          <text x="330" y="260" fontSize="34" fill="rgba(255,255,255,0.7)" fontFamily="Arial, sans-serif">TAWARAN</text>
          <text x="990" y="260" fontSize="34" fill="rgba(255,255,255,0.7)" fontFamily="Arial, sans-serif">× KUALITAS</text>
          <text x="1110" y="300" fontSize="34" fill="rgba(255,255,255,0.7)" fontFamily="Arial, sans-serif">= PERINGKAT IKLAN</text>
          {baris}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
