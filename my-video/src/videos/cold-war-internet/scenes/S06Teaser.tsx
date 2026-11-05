import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Title } from '../../../lib/components';
import { PALETTE } from '../../../lib/theme';

export const S06Teaser: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const t = frame / fps;
  const cx = width / 2, cy = height * 0.5;
  const pulse = 1 + 0.08 * Math.sin(t * 2);
  const maxDist = height * 0.46;
  return (
    <AbsoluteFill style={{ background: PALETTE.bgDark }}>
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i / 60) * Math.PI * 2;
        const dist = maxDist * (1 - ((t * 0.4 + i * 0.05) % 1));
        const px = cx + Math.cos(a) * dist, py = cy + Math.sin(a) * dist;
        return <div key={i} style={{ position: 'absolute', left: px - 2.5, top: py - 2.5, width: 5, height: 5, borderRadius: '50%', background: PALETTE.coldBlue, opacity: 0.3 + 0.4 * (1 - dist / maxDist) }} />;
      })}
      <div style={{ position: 'absolute', left: cx - 160 * pulse, top: cy - 160 * pulse, width: 320 * pulse, height: 320 * pulse, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,165,0,0.4) 0%, rgba(240,165,0,0) 70%)' }} />
      <Title frame={frame} text="...seorang pria di kantor kecil" start={1} duration={6} sizePct={0.038} yPct={0.48} />
      <Title frame={frame} text="BERSAMBUNG →" start={7} duration={2.8} sizePct={0.026} color={PALETTE.textDim} yPct={0.88} />
    </AbsoluteFill>
  );
};
