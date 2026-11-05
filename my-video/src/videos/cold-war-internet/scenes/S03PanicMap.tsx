import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Stars, Title } from '../../../lib/components';
import { PALETTE } from '../../../lib/theme';
import { ip } from '../../../lib/utils';
import { USMap } from '../components/USMap';

export const S03PanicMap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mapAlpha = ip(frame, [0, fps * 1.5], [0, 1]);
  const flashP = ip(frame, [fps * 1, fps * 7], [0, 1]);
  const flash = Math.abs(Math.sin(flashP * Math.PI * 6)) * (1 - flashP);
  return (
    <AbsoluteFill>
      <Stars frame={frame} intensity={0.3} />
      <USMap frame={frame} disconnect={0} opacity={mapAlpha} />
      <AbsoluteFill style={{ background: PALETTE.redAlert, opacity: flash * 0.25 }} />
      <Title frame={frame} text="AMERIKA PANIK" start={1.5} duration={5.5} sizePct={0.052} color={PALETTE.redAlert} yPct={0.16} />
    </AbsoluteFill>
  );
};
