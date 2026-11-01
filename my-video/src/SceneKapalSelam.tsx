import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export const SceneKapalSelam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dive = spring({ frame: frame - 60, fps, config: { damping: 40, stiffness: 20, mass: 3 } });
  const subY = 330 + dive * 330 + Math.sin(frame / 25) * 8;
  const subX = 960 + Math.sin(frame / 90) * 40;
  const tilt = Math.sin(frame / 40) * 1.5 + dive * (1 - dive) * 24;

  const rays = [0, 1, 2, 3, 4].map((i) => {
    const x = 200 + i * 380;
    const o = (0.1 + 0.06 * Math.sin(frame / 30 + i * 2)) * (1 - dive * 0.7);
    return (
      <polygon
        key={i}
        points={`${x},0 ${x + 120},0 ${x + 420},1080 ${x - 100},1080`}
        fill={`rgba(180,230,255,${o})`}
      />
    );
  });

  const bubbles = Array.from({ length: 40 }, (_, i) => {
    const speed = 1.5 + rnd(i) * 3;
    const y = 1180 - ((frame * speed + rnd(i + 50) * 1200) % 1300);
    const x = rnd(i + 100) * 1920 + Math.sin(frame / 20 + i) * 15;
    const r = 3 + rnd(i + 150) * 9;
    return <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} />;
  });

  const weeds = Array.from({ length: 12 }, (_, i) => {
    const x = 80 + i * 165;
    const sway = Math.sin(frame / 22 + i) * 25;
    return (
      <path
        key={i}
        d={`M${x},1080 Q${x + sway},980 ${x},900 T${x + sway / 2},780`}
        stroke="#1f7a4d"
        strokeWidth={14}
        fill="none"
        strokeLinecap="round"
      />
    );
  });

  const ballastH = dive * 75;

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b6ca8" />
            <stop offset="1" stopColor="#031a30" />
          </linearGradient>
          <clipPath id="hullClip">
            <ellipse cx="0" cy="0" rx="300" ry="75" />
          </clipPath>
        </defs>

        <rect width="1920" height="1080" fill="url(#water)" />
        {rays}
        {bubbles}
        <path d="M0,1080 L0,960 Q300,900 600,960 T1200,950 T1920,940 L1920,1080 Z" fill="#0b2a3a" />
        {weeds}

        <g transform={`translate(${subX} ${subY}) rotate(${tilt})`}>
          <polygon points="-290,0 -360,-70 -330,0 -360,70" fill="#b8901f" />
          <rect x="20" y="-175" width="8" height="45" fill="#333" />
          <rect x="20" y="-175" width="30" height="8" fill="#333" />
          <rect x="-60" y="-135" width="120" height="70" rx="16" fill="#d4a72c" />
          <ellipse cx="0" cy="0" rx="300" ry="75" fill="#d4a72c" />
          <g clipPath="url(#hullClip)">
            <rect x="-300" y={75 - ballastH} width="600" height={ballastH} fill="rgba(0,150,255,0.55)" />
          </g>
          {[-150, -70, 10, 90, 170].map((cx) => (
            <circle key={cx} cx={cx} cy={-8} r={20} fill="#0a2a44" stroke="#eee" strokeWidth={4} />
          ))}
          <g transform={`translate(315 0) rotate(${frame * 18})`}>
            <ellipse rx="7" ry="48" fill="#555" />
            <ellipse rx="48" ry="7" fill="#555" />
          </g>
        </g>

        <rect width="1920" height="1080" fill={`rgba(0,0,0,${dive * 0.45})`} />
        <text x="60" y="90" fontSize="40" fontWeight="800" fill="#bfefff" fontFamily="Arial, sans-serif">
          {`KEDALAMAN ${Math.round(dive * 200)} M`}
        </text>
      </svg>
    </AbsoluteFill>
  );
};
