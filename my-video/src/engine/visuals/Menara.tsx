import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { rnd } from "./util";
import { Pesawat } from "./Pesawat";

export const Menara: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (frame % 420) / 420;
  const px = 1750 - t * 1150;
  const py = 180 + t * 600;
  const arah = (Math.atan2(600, -1150) * 180) / Math.PI + 90;
  const sorot = frame * 2;

  const bintang = Array.from({ length: 70 }, (_, i) => (
    <circle
      key={i}
      cx={rnd(i) * 1920}
      cy={rnd(i + 50) * 700}
      r={0.8 + rnd(i + 90) * 1.8}
      fill="#fff"
      opacity={0.35 + 0.65 * Math.abs(Math.sin(frame / (25 + rnd(i + 130) * 40) + i))}
    />
  ));

  const lampu = Array.from({ length: 8 }, (_, i) => {
    const f = i / 7;
    const yy = 980 - f * 120;
    const kiri = 500 + f * 200;
    const kanan = 1500 - f * 200;
    const o = Math.sin(frame / 6 - i) > 0 ? 1 : 0.3;
    return (
      <g key={i} opacity={o}>
        <circle cx={kiri} cy={yy} r={7 - f * 3} fill="#ffd166" />
        <circle cx={kanan} cy={yy} r={7 - f * 3} fill="#ffd166" />
      </g>
    );
  });

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="malamBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#030615" />
            <stop offset="1" stopColor="#14284b" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#malamBg)" />
        {bintang}

        <g transform={`rotate(${sorot} 300 300)`}>
          <polygon points="300,300 1100,255 1100,345" fill="rgba(255,244,180,0.22)" />
        </g>

        <rect x="0" y="980" width="1920" height="100" fill="#0b0f1a" />
        <polygon points="500,1000 1500,1000 1300,860 700,860" fill="#1a1f2e" />
        <line x1="1000" y1="990" x2="1000" y2="870" stroke="#cfd8e6" strokeWidth="6" strokeDasharray="22 18" />
        {lampu}

        <rect x="270" y="420" width="60" height="560" fill="#1b2640" />
        <rect x="240" y="340" width="120" height="14" fill="#0e1626" />
        <polygon points="230,420 370,420 345,354 255,354" fill="#26355a" />
        <rect x="256" y="364" width="88" height="42" fill="#ffd166" opacity="0.85" />
        <line x1="300" y1="340" x2="300" y2="300" stroke="#26355a" strokeWidth="6" />
        <circle cx="300" cy="300" r={10 + Math.sin(frame / 8) * 3} fill="#ff4d4d" />

        <circle cx={px} cy={py} r="46" fill="rgba(255,244,180,0.12)" />
        <Pesawat x={px} y={py} rotasi={arah} skala={1.1 - t * 0.3} />
      </svg>
    </AbsoluteFill>
  );
};
