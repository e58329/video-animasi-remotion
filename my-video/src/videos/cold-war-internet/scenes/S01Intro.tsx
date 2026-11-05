import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Earth, Stars, Title } from '../../../lib/components';
import { PALETTE } from '../../../lib/theme';

export const S01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Stars frame={frame} />
      <Earth cxPct={0.5} cyPct={0.95} radiusPct={0.62} frame={frame} />
      <Title frame={frame} text="1957" start={0.2} duration={3.8} sizePct={0.13} yPct={0.28} />
      <Title frame={frame} text="Perang Dingin" start={1.0} duration={3.0} sizePct={0.045} color={PALETTE.coldBlue} yPct={0.39} />
    </AbsoluteFill>
  );
};
