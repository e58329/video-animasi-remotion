import React from 'react';
import { Composition } from 'remotion';
import { ColdWarInternet } from './videos/cold-war-internet';
import { DEFAULT_FPS } from './lib/theme';
import { TOTAL_DURATION_SEC } from './videos/cold-war-internet/data';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ColdWarInternet"
        component={ColdWarInternet}
        durationInFrames={TOTAL_DURATION_SEC * DEFAULT_FPS}
        fps={DEFAULT_FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
