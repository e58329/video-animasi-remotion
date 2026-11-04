import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type Peristiwa = { tahun: string; label: string };

const klem = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const GarisWaktu: React.FC<{ judul?: string; peristiwa: Peristiwa[] }> = ({ judul, peristiwa }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = peristiwa.length;
  const x0 = 200;
  const x1 = 1720;
  const y = 560;
  const progres = interpolate(frame, [0, 20 + n * 14], [0, 1], klem);

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="waktuBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b132b" />
            <stop offset="1" stopColor="#14284b" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#waktuBg)" />
        {judul ? (
          <text x="960" y="170" textAnchor="middle" fontSize="48" fontWeight="800" fill="#bfefff" fontFamily="Arial, sans-serif">
            {judul}
          </text>
        ) : null}
        <line x1={x0} y1={y} x2={x0 + (x1 - x0) * progres} y2={y} stroke="rgba(255,255,255,0.5)" strokeWidth="6" strokeLinecap="round" />
        {peristiwa.map((p, i) => {
          const x = n > 1 ? x0 + ((x1 - x0) * i) / (n - 1) : (x0 + x1) / 2;
          const t = spring({ frame: frame - 10 - i * 14, fps, config: { damping: 14, stiffness: 120 } });
          const atas = i % 2 === 0;
          const yTahun = atas ? y - 100 : y + 105;
          const yLabel = atas ? y - 55 : y + 150;
          return (
            <g key={i} opacity={Math.min(1, t)}>
              <line x1={x} y1={y} x2={x} y2={atas ? y - 40 : y + 45} stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
              <circle cx={x} cy={y} r={16 * Math.min(1, t)} fill="#00E5FF" />
              <text x={x} y={yTahun} textAnchor="middle" fontSize="56" fontWeight="900" fill="#00E5FF" fontFamily="Arial, sans-serif">
                {p.tahun}
              </text>
              <text x={x} y={yLabel} textAnchor="middle" fontSize="30" fontWeight="600" fill="#fff" fontFamily="Arial, sans-serif">
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
