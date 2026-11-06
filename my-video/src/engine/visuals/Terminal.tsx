import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

const MONO = '"Courier New", monospace';

export const Terminal: React.FC = () => {
  const frame = useCurrentFrame();
  const f = frame % 270;
  const diketik = (f >= 30 ? "L" : "") + (f >= 70 ? "O" : "") + (f >= 110 ? "G" : "");
  const diterima = (f >= 45 ? "L" : "") + (f >= 85 ? "O" : "");
  const mati = f >= 130;
  const kedip = Math.floor(frame / 15) % 2 === 0;
  const kilat = mati && f < 140 ? 0.25 : 0;

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="terminalBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#050a1f" />
            <stop offset="1" stopColor="#10295a" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#terminalBg)" />
        <rect x="320" y="230" width="1280" height="620" rx="28" fill="#0a0f1d" stroke="rgba(0,229,255,0.5)" strokeWidth="3" />
        <rect x="320" y="230" width="1280" height="76" rx="28" fill="#141c33" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={376 + i * 44} cy={268} r={13} fill={["#ff5f56", "#ffbd2e", "#27c93f"][i]} />
        ))}
        <text x="960" y="281" textAnchor="middle" fontSize="30" fill="rgba(255,255,255,0.7)" fontFamily="Arial, sans-serif">
          UCLA ke SRI, 29 Okt 1969, 22.30
        </text>

        <text x="380" y="440" fontSize="62" fill="#00E5FF" fontFamily={MONO}>
          {"> " + diketik + (!mati && kedip ? "_" : "")}
        </text>
        <text x="380" y="560" fontSize="44" fill="rgba(255,255,255,0.7)" fontFamily={MONO}>
          {"SRI menerima: " + diterima}
        </text>
        <text x="380" y="640" fontSize="36" fill="rgba(255,255,255,0.4)" fontFamily={MONO}>
          {"(yang ingin dikirim: LOGIN)"}
        </text>

        {mati ? (
          <g opacity={Math.floor(frame / 10) % 2 === 0 ? 1 : 0.55}>
            <rect x="380" y="700" width="1160" height="96" rx="16" fill="rgba(255,77,77,0.18)" stroke="#ff4d4d" strokeWidth="4" />
            <text x="960" y="766" textAnchor="middle" fontSize="54" fontWeight="900" fill="#ff4d4d" fontFamily="Arial, sans-serif">
              SAMBUNGAN PUTUS
            </text>
          </g>
        ) : null}
        <rect width="1920" height="1080" fill="#ffffff" opacity={kilat} />
      </svg>
    </AbsoluteFill>
  );
};
