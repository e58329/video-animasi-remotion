import React from 'react';
import { useVideoConfig } from 'remotion';
import { PALETTE } from '../theme';
import { fade, ip } from '../utils';

export const Title: React.FC<{ frame: number; text: string; start: number; duration: number; sizePct?: number; yPct?: number; color?: string }> = ({
  frame, text, start, duration, sizePct = 0.06, yPct = 0.35, color = PALETTE.textMain
}) => {
  const { width, height, fps } = useVideoConfig();
  const inStart = start * fps;
  const inEnd = (start + 0.4) * fps;
  const outStart = (start + duration - 0.4) * fps;
  const outEnd = (start + duration) * fps;
  const alpha = fade(frame, inStart, inEnd, outStart, outEnd);
  if (alpha <= 0) return null;
  const slideY = ip(frame, [inStart, inEnd], [24, 0]);
  const fontSize = height * sizePct;
  return (
    <div style={{ position: 'absolute', left: 0, top: height * yPct + slideY, width, textAlign: 'center', color, fontSize, fontWeight: 700, fontFamily: "'Segoe UI', system-ui, sans-serif", opacity: alpha, textShadow: `0 0 30px ${color}`, letterSpacing: sizePct > 0.08 ? 2 : 0, padding: '0 5%', boxSizing: 'border-box' }}>
      {text}
    </div>
  );
};
