import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { rnd } from "./util";

export const Laut: React.FC<{ kedalaman?: number; depan?: React.ReactNode }> = ({
  kedalaman = 0.3,
  depan,
}) => {
  const frame = useCurrentFrame();
  const k = kedalaman;

  const sinar = [0, 1, 2, 3, 4].map((i) => {
    const x = 200 + i * 380;
    const o = (0.1 + 0.06 * Math.sin(frame / 30 + i * 2)) * (1 - k * 0.7);
    return (
      <polygon
        key={i}
        points={`${x},0 ${x + 120},0 ${x + 420},1080 ${x - 100},1080`}
        fill={`rgba(180,230,255,${o})`}
      />
    );
  });

  const gelembung = Array.from({ length: 40 }, (_, i) => {
    const kecepatan = 1.5 + rnd(i) * 3;
    const y = 1180 - ((frame * kecepatan + rnd(i + 50) * 1200) % 1300);
    const x = rnd(i + 100) * 1920 + Math.sin(frame / 20 + i) * 15;
    const r = 3 + rnd(i + 150) * 9;
    return <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} />;
  });

  const rumput = Array.from({ length: 12 }, (_, i) => {
    const x = ((80 + i * 165 - frame * 1.5) % 1980 + 1980) % 1980 - 40;
    const goyang = Math.sin(frame / 22 + i) * 25;
    return (
      <path
        key={i}
        d={`M${x},1080 Q${x + goyang},980 ${x},900 T${x + goyang / 2},780`}
        stroke="#1f7a4d"
        strokeWidth={14}
        fill="none"
        strokeLinecap="round"
      />
    );
  });

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="air" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b6ca8" />
            <stop offset="1" stopColor="#031a30" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#air)" />
        {sinar}
        {gelembung}
        <path d="M0,1080 L0,960 Q300,900 600,960 T1200,950 T1920,940 L1920,1080 Z" fill="#0b2a3a" />
        {rumput}
        {depan}
        <rect width="1920" height="1080" fill={`rgba(0,0,0,${k * 0.45})`} />
      </svg>
    </AbsoluteFill>
  );
};
