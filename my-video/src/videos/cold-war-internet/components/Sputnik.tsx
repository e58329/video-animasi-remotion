import React from 'react';
import { useVideoConfig } from 'remotion';

export const Sputnik: React.FC<{ cx: number; cy: number; scalePct?: number; frame: number; showTrail?: boolean }> = ({
  cx, cy, scalePct = 0.045, frame, showTrail = true
}) => {
  const { height, fps } = useVideoConfig();
  const t = frame / fps;
  const blink = 0.5 + 0.5 * Math.sin(t * 6);
  const scale = height * scalePct;
  return (
    <div style={{ position: 'absolute', left: cx, top: cy, transform: `translate(-50%, -50%) scale(${scale})` }}>
      {showTrail && <div style={{ position: 'absolute', left: -460, top: -460, width: 920, height: 920, borderRadius: '50%', border: '2px dashed rgba(255,90,90,0.25)', pointerEvents: 'none' }} />}
      <div style={{ position: 'relative', width: 32, height: 32, borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, #e0e0e8 0%, #5a5a70 100%)', transform: `rotate(${t * 0.3}rad)` }}>
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i * Math.PI) / 2 + Math.PI / 4;
          return <div key={i} style={{ position: 'absolute', left: 16, top: 16, width: 46, height: 2.5, background: '#b0b0c8', transformOrigin: '0 50%', transform: `rotate(${angle}rad) translateX(14px)`, borderRadius: 2 }} />;
        })}
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: 6, height: 6, marginLeft: -3, marginTop: -3, borderRadius: '50%', background: `rgba(255,90,90,${blink})`, boxShadow: '0 0 12px rgba(255,90,90,0.8)' }} />
      </div>
    </div>
  );
};
