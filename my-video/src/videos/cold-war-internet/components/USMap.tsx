import React from 'react';
import { useVideoConfig } from 'remotion';
import { PALETTE } from '../../../lib/theme';
import { US_CITIES } from '../data';

export const USMap: React.FC<{ frame: number; disconnect: number; opacity?: number; widthPct?: number; heightPct?: number; centerYPct?: number }> = ({
  frame, disconnect, opacity = 1, widthPct = 0.55, heightPct = 0.42, centerYPct = 0.58
}) => {
  const { width, height, fps } = useVideoConfig();
  const mapW = width * widthPct;
  const mapH = height * heightPct;
  const left = width / 2 - mapW / 2;
  const top = height * centerYPct - mapH / 2;
  const t = frame / fps;
  const fontSize = height * 0.012;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <div style={{ position: 'absolute', left: left - 20, top: top - 20, width: mapW + 40, height: mapH + 40, borderRadius: 16, background: 'rgba(10,20,40,0.6)', border: `2px solid ${PALETTE.gridLine}` }} />
      {Array.from({ length: 9 }).map((_, i) => (
        <React.Fragment key={i}>
          <div style={{ position: 'absolute', left: left + (mapW / 8) * i, top, width: 1, height: mapH, background: 'rgba(40,70,120,0.35)' }} />
          <div style={{ position: 'absolute', left, top: top + (mapH / 8) * i, width: mapW, height: 1, background: 'rgba(40,70,120,0.35)' }} />
        </React.Fragment>
      ))}
      {US_CITIES.slice(0, -1).map((a, i) => {
        const b = US_CITIES[i + 1];
        const ax = left + a.x * mapW, ay = top + a.y * mapH;
        const bx = left + b.x * mapW, by = top + b.y * mapH;
        const lineProgress = Math.min(1, Math.max(0, (1 - disconnect) * 3 - i * 0.3));
        if (lineProgress <= 0) return null;
        const ex = ax + (bx - ax) * lineProgress, ey = ay + (by - ay) * lineProgress;
        const len = Math.hypot(ex - ax, ey - ay), angle = Math.atan2(ey - ay, ex - ax);
        return (
          <React.Fragment key={i}>
            <div style={{ position: 'absolute', left: ax, top: ay, width: len, height: 2, background: PALETTE.coldBlue, opacity: lineProgress * 0.8, transformOrigin: '0 50%', transform: `rotate(${angle}rad)` }} />
            {lineProgress < 1 && <div style={{ position: 'absolute', left: ex - 4, top: ey - 4, width: 8, height: 8, borderRadius: '50%', background: PALETTE.redAlert }} />}
          </React.Fragment>
        );
      })}
      {US_CITIES.map((c, i) => {
        const cx = left + c.x * mapW, cy = top + c.y * mapH;
        const pulse = 0.6 + 0.4 * Math.sin(t * 3 + c.x * 10);
        return (
          <React.Fragment key={i}>
            <div style={{ position: 'absolute', left: cx - 4, top: cy - 4, width: 8, height: 8, borderRadius: '50%', background: PALETTE.warmAmber, opacity: pulse }} />
            <div style={{ position: 'absolute', left: cx, top: cy + fontSize * 1.5, transform: 'translateX(-50%)', color: PALETTE.textMain, fontSize, whiteSpace: 'nowrap' }}>{c.name}</div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
