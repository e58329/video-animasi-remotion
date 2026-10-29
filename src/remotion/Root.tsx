import React from 'react';
import { Composition } from 'remotion';
import { IntroPromo } from './IntroPromo';
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH, defaultIntroProps } from './constants';

/**
 * Root komposisi Remotion — dipakai oleh CLI (remotion studio / remotion render).
 * Entry point terdaftar di remotion.config.ts -> ./src/remotion/index.ts
 */
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="IntroPromo"
      component={IntroPromo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={defaultIntroProps}
    />
  );
};
