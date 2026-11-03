import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type DataBatang = { label: string; nilai: number; warna?: string };

export const GrafikBatang: React.FC<{ judul: string; data: DataBatang[]; sumber?: string }> = ({
  judul,
  data,
  sumber,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const maks = Math.max(...data.map((d) => d.nilai), 1);

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="grafikBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b132b" />
            <stop offset="1" stopColor="#14284b" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#grafikBg)" />
        <text x="960" y="250" textAnchor="middle" fontSize="44" fontWeight="800" fill="#bfefff" fontFamily="Arial, sans-serif">
          {judul}
        </text>
        {data.map((d, i) => {
          const t = spring({ frame: frame - 12 - i * 10, fps, config: { damping: 18, stiffness: 80 } });
          const lebar = (d.nilai / maks) * 900 * t;
          const y = 330 + i * 120;
          return (
            <g key={i}>
              <text x="560" y={y + 52} textAnchor="end" fontSize="36" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">
                {d.label}
              </text>
              <rect x="590" y={y} width={lebar} height="72" rx="14" fill={d.warna ?? "#4dd0e1"} />
              <text x={590 + lebar + 18} y={y + 52} fontSize="38" fontWeight="800" fill="#fff" opacity={Math.min(1, t)} fontFamily="Arial, sans-serif">
                {String(d.nilai).replace(".", ",")}
              </text>
            </g>
          );
        })}
        {sumber ? (
          <text x="960" y="1010" textAnchor="middle" fontSize="28" fill="rgba(255,255,255,0.55)" fontFamily="Arial, sans-serif">
            {sumber}
          </text>
        ) : null}
      </svg>
    </AbsoluteFill>
  );
};
