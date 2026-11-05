import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { PALETTE } from '../theme';
import { ip } from '../utils';

export const MeshNetwork: React.FC<{ frame: number; nodeCount?: number; maxLinkPct?: number; nodeColor?: string; linkColor?: string }> = ({
  frame, nodeCount = 14, maxLinkPct = 0.2, nodeColor = PALETTE.warmAmber, linkColor = PALETTE.coldBlue
}) => {
  const { width, height, fps } = useVideoConfig();
  const t = frame / fps;
  const cx = width / 2;
  const cy = height * 0.55;
  const maxDist = height * maxLinkPct;
  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const ang = (i / nodeCount) * Math.PI * 2 + t * 0.1;
    const rad = height * 0.13 + (i % 3) * height * 0.075;
    return { x: cx + Math.cos(ang) * rad, y: cy + Math.sin(ang) * rad * 0.7, r: 4 + (i % 3) * 2 };
  });
  const linkProgress = ip(frame, [0, fps * 3], [0, 1]);
  return (
    <AbsoluteFill style={{ background: PALETTE.bgDark }}>
      {nodes.map((a, i) => nodes.map((b, j) => {
          if (j <= i) return null;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= maxDist) return null;
          const vis = Math.max(0, Math.min(1, linkProgress * 3 - i * 0.15));
          if (vis <= 0) return null;
          const angle = Math.atan2(b.y - a.y, b.x - a.x);
          return <div key={`${i}-${j}`} style={{ position: 'absolute', left: a.x, top: a.y, width: d, height: 1.5, background: linkColor, opacity: vis * 0.5, transformOrigin: '0 50%', transform: `rotate(${angle}rad)` }} />;
        })
      )}
      {nodes.map((n, i) => {
        const pulse = 0.6 + 0.4 * Math.sin(t * 3 + n.x * 0.01);
        return <div key={i} style={{ position: 'absolute', left: n.x - n.r, top: n.y - n.r, width: n.r * 2, height: n.r * 2, borderRadius: '50%', background: nodeColor, opacity: pulse }} />;
      })}
    </AbsoluteFill>
  );
};
