import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Earth, Stars, Title } from '../../../lib/components';
import { PALETTE } from '../../../lib/theme';
import { ip } from '../../../lib/utils';
import { Sputnik } from '../components/Sputnik';

export const S02Sputnik: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const sx = ip(frame, [0, fps * 4.2], [width * 0.1, width * 0.85]);
  const sy = ip(frame, [0, fps * 4.2], [height * 0.3, height * 0.25]);
  return (
    <AbsoluteFill>
      <Stars frame={frame} />
      <Earth cxPct={0.2} cyPct={0.85} radiusPct={0.5} frame={frame} />
      <Sputnik cx={sx} cy={sy} frame={frame} />
      <Title frame={frame} text="Sputnik" start={0.7} duration={3.0} sizePct={0.06} color={PALETTE.redAlert} yPct={0.12} />
    </AbsoluteFill>
  );
};
