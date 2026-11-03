import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { rnd } from "./util";

export const Angkasa: React.FC = () => {
  const frame = useCurrentFrame();

  const bintang = Array.from({ length: 120 }, (_, i) => {
    const x = ((rnd(i) * 1920 - frame * (0.2 + rnd(i + 300) * 0.6)) % 1920 + 1920) % 1920;
    const y = rnd(i + 60) * 1080;
    const r = 0.8 + rnd(i + 120) * 2.2;
    const o = 0.4 + 0.6 * Math.abs(Math.sin(frame / (20 + rnd(i + 200) * 40) + i));
    return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={o} />;
  });

  const m = frame % 150;
  const p = m / 30;
  const meteor =
    m < 30 ? (
      <line
        x1={1500 - p * 900}
        y1={100 + p * 400}
        x2={1500 - p * 900 + 140}
        y2={100 + p * 400 - 56}
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={1 - p * 0.6}
      />
    ) : null;

  const naikTurun = Math.sin(frame / 80) * 12;

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="langit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#02030a" />
            <stop offset="1" stopColor="#0b1233" />
          </linearGradient>
          <radialGradient id="planet" cx="0.3" cy="0.3" r="0.85">
            <stop offset="0" stopColor="#4aa3ff" />
            <stop offset="0.6" stopColor="#1b4f9c" />
            <stop offset="1" stopColor="#06122e" />
          </radialGradient>
          <radialGradient id="nebula" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="rgba(140,80,255,0.35)" />
            <stop offset="1" stopColor="rgba(140,80,255,0)" />
          </radialGradient>
          <filter id="kabut">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
        <rect width="1920" height="1080" fill="url(#langit)" />
        <ellipse cx={500 + Math.sin(frame / 120) * 40} cy="300" rx="520" ry="300" fill="url(#nebula)" />
        {bintang}
        {meteor}
        <circle cx="1450" cy={950 + naikTurun} r="560" fill="#4aa3ff" opacity="0.35" filter="url(#kabut)" />
        <circle cx="1450" cy={950 + naikTurun} r="520" fill="url(#planet)" />
      </svg>
    </AbsoluteFill>
  );
};
