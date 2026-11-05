import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';

export const Earth: React.FC<{ cxPct: number; cyPct: number; radiusPct: number; frame: number; opacity?: number }> = ({
  cxPct, cyPct, radiusPct, frame, opacity = 1
}) => {
  const { width, height, fps } = useVideoConfig();
  const cx = width * cxPct;
  const cy = height * cyPct;
  const radius = height * radiusPct;
  const t = frame / fps;
  const offset = (t * 12) % (radius * 2);
  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{ position: 'absolute', left: cx - radius, top: cy - radius, width: radius * 2, height: radius * 2, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #3a7abf 0%, #1a4a7a 65%, #0a1a30 100%)', boxShadow: `0 0 ${radius * 0.9}px rgba(74,144,217,0.35)`, overflow: 'hidden' }}>
        {Array.from({ length: 6 }).map((_, i) => {
          const bx = -radius + ((i * radius * 0.6 + offset) % (radius * 2));
          return (
            <div key={i} style={{ position: 'absolute', left: bx, top: radius - radius * 0.2 + i * (radius * 0.05), width: radius * 0.16, height: radius * 0.1, borderRadius: '50%', background: 'rgba(60,120,80,0.55)', transform: `rotate(${i * 0.6}rad)` }} />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
