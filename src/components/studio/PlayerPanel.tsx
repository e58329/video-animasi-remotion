'use client';

import React from 'react';
import { Player } from '@remotion/player';
import { IntroPromo } from '@/remotion/IntroPromo';
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH, type IntroProps } from '@/remotion/constants';

/**
 * Pembungkus Remotion Player — dimuat via dynamic import dengan ssr:false
 * agar hanya berjalan di browser.
 */
const PlayerPanel: React.FC<{ inputProps: IntroProps }> = ({ inputProps }) => {
  return (
    <Player
      component={IntroPromo}
      inputProps={inputProps}
      durationInFrames={DURATION_IN_FRAMES}
      compositionWidth={WIDTH}
      compositionHeight={HEIGHT}
      fps={FPS}
      controls
      loop
      autoPlay
      muted
      acknowledgeRemotionLicense
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default PlayerPanel;
