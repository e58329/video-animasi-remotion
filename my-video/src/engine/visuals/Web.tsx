import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const klem = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const HALAMAN = [
  { x: 960, y: 540, judul: "info.cern.ch" },
  { x: 560, y: 330 },
  { x: 1360, y: 340 },
  { x: 380, y: 640 },
  { x: 1540, y: 650 },
  { x: 720, y: 820 },
  { x: 1220, y: 840 },
  { x: 960, y: 220 },
] as { x: number; y: number; judul?: string }[];
const TAUTAN: [number, number][] = [[0, 1], [0, 2], [0, 7], [1, 3], [2, 4], [0, 5], [0, 6], [3, 5], [4, 6], [1, 7], [2, 7]];

export const Web: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="webBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0b132b" />
            <stop offset="1" stopColor="#1c3d6e" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#webBg)" />
        {TAUTAN.map(([a, b], k) => {
          const p = interpolate(frame, [40 + k * 10, 70 + k * 10], [0, 1], klem);
          const A = HALAMAN[a];
          const B = HALAMAN[b];
          return (
            <line
              key={k}
              x1={A.x}
              y1={A.y}
              x2={A.x + (B.x - A.x) * p}
              y2={A.y + (B.y - A.y) * p}
              stroke="#00E5FF"
              strokeWidth="4"
              strokeDasharray="12 8"
              opacity={0.8}
            />
          );
        })}
        {HALAMAN.map((h, i) => {
          const t = Math.min(1, spring({ frame: frame - 8 - i * 8, fps, config: { damping: 14, stiffness: 120 } }));
          return (
            <g key={i} transform={`translate(${h.x} ${h.y}) scale(${t})`} opacity={t}>
              <rect x="-100" y="-70" width="200" height="140" rx="14" fill="#f2f6ff" />
              <rect x="-100" y="-70" width="200" height="34" rx="14" fill={i === 0 ? "#00E5FF" : "#7aa2d6"} />
              <rect x="-80" y="-14" width="160" height="12" rx="6" fill="#9fb3d1" />
              <rect x="-80" y="12" width="120" height="12" rx="6" fill="#c3d0e6" />
              <rect x="-80" y="38" width="140" height="12" rx="6" fill="#c3d0e6" />
              {h.judul ? (
                <text x="0" y="-45" textAnchor="middle" fontSize="22" fontWeight="800" fill="#06223a" fontFamily="Arial, sans-serif">
                  {h.judul}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
