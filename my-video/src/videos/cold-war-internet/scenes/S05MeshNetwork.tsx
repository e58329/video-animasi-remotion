import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { MeshNetwork, Title } from '../../../lib/components';
import { PALETTE } from '../../../lib/theme';

export const S05MeshNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <MeshNetwork frame={frame} />
      <Title frame={frame} text="JARINGAN TANPA PUSAT" start={2} duration={5} sizePct={0.042} color={PALETTE.coldBlue} yPct={0.18} />
    </AbsoluteFill>
  );
};
