import React from 'react';
import { useVideoConfig } from 'remotion';
import { PALETTE } from '../theme';
import type { NarrationLine } from '../types';

export const Subtitle: React.FC<{ frame: number; lines: NarrationLine[]; sizePct?: number }> = ({ frame, lines, sizePct = 0.028 }) => {
  const { width, height, fps } = useVideoConfig();
  const t = frame / fps;
  const active = [...lines].reverse().find((l) => t >= l.t);
  if (!active) return null;
  const fontSize = height * sizePct;
  return (
    <div style={{ position: 'absolute', left: width * 0.08, width: width * 0.84, bottom: height * 0.1, textAlign: 'center' }}>
      <div style={{ display: 'inline-block', padding: `${fontSize * 0.55}px ${fontSize * 0.9}px`, borderRadius: 10, background: 'rgba(0,0,0,0.55)', color: PALETTE.textMain, fontSize, lineHeight: 1.35, fontFamily: 'system-ui, sans-serif' }}>
        {active.text}
      </div>
    </div>
  );
};
