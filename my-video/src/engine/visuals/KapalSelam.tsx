import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Laut } from "./Laut";

export const KapalSelam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const selam = spring({ frame: frame - 30, fps, config: { damping: 40, stiffness: 20, mass: 3 } });
  const y = 330 + selam * 330 + Math.sin(frame / 25) * 8;
  const x = 960 + Math.sin(frame / 90) * 40;
  const miring = Math.sin(frame / 40) * 1.5 + selam * (1 - selam) * 24;
  const isiBallast = selam * 75;

  const depan = (
    <>
      <defs>
        <clipPath id="badanKapal">
          <ellipse cx="0" cy="0" rx="300" ry="75" />
        </clipPath>
      </defs>
      <g transform={`translate(${x} ${y}) rotate(${miring})`}>
        <polygon points="-290,0 -360,-70 -330,0 -360,70" fill="#b8901f" />
        <rect x="20" y="-175" width="8" height="45" fill="#333" />
        <rect x="20" y="-175" width="30" height="8" fill="#333" />
        <rect x="-60" y="-135" width="120" height="70" rx="16" fill="#d4a72c" />
        <ellipse cx="0" cy="0" rx="300" ry="75" fill="#d4a72c" />
        <g clipPath="url(#badanKapal)">
          <rect x="-300" y={75 - isiBallast} width="600" height={isiBallast} fill="rgba(0,150,255,0.55)" />
        </g>
        {[-150, -70, 10, 90, 170].map((cx) => (
          <circle key={cx} cx={cx} cy={-8} r={20} fill="#0a2a44" stroke="#eee" strokeWidth={4} />
        ))}
        <g transform={`translate(315 0) rotate(${frame * 18})`}>
          <ellipse rx="7" ry="48" fill="#555" />
          <ellipse rx="48" ry="7" fill="#555" />
        </g>
      </g>
      <text x="60" y="90" fontSize="40" fontWeight="800" fill="#bfefff" fontFamily="Arial, sans-serif">
        {`KEDALAMAN ${Math.round(selam * 200)} M`}
      </text>
    </>
  );

  return <Laut kedalaman={selam * 0.8} depan={depan} />;
};
