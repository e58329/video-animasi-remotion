import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Stars, Title } from '../../../lib/components';
import { PALETTE } from '../../../lib/theme';
import { ip } from '../../../lib/utils';
import { USMap } from '../components/USMap';

export const S04Disconnect: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const disconnect = ip(frame, [0, fps * 4], [0, 1]);
  const flashP = ip(frame, [fps * 0.5, fps * 3.5], [0, 1]);
  const flash = Math.abs(Math.sin(flashP * Math.PI * 6)) * (1 - flashP);
  return (
    <AbsoluteFill>
      <Stars frame={frame} intensity={0.2} />
      <USMap frame={frame} disconnect={disconnect} />
      <AbsoluteFill style={{ background: PALETTE.redAlert, opacity: flash * 0.35 }} />
      <Title frame={frame} text="KOMUNIKASI TERPUTUS" start={0.5} duration={4} sizePct={0.045} color={PALETTE.redAlert} yPct={0.16} />
    </AbsoluteFill>
  );
};
