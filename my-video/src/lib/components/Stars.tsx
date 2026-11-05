import React, { useMemo } from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { PALETTE } from '../theme';
import { mulberry32 } from '../utils';
import type { StarData } from '../types';

const COUNT = 160;

export const Stars: React.FC<{ frame: number; intensity?: number; seed?: number; color?: string }> = ({
  frame, intensity = 1, seed = 1337, color = PALETTE.star,
}) => {
  const { width, height, fps } = useVideoConfig();
  const stars = useMemo<StarData[]>(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: COUNT }, () => ({
      x: rand() * width, y: rand() * height, r: rand() * 1.6 + 0.4,
      tw: rand() * Math.PI * 2, sp: rand() * 0.8 + 0.4,
    }));
  }, [width, height, seed]);
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {stars.map((s, i) => {
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(s.tw + t * s.sp));
        return (
          <div key={i} style={{ position: 'absolute', left: s.x, top: s.y, width: s.r * 2, height: s.r * 2, borderRadius: '50%', background: color, opacity: twinkle * intensity }} />
        );
      })}
    </AbsoluteFill>
  );
};
