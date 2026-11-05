import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { Subtitle } from '../../lib/components';
import { PALETTE } from '../../lib/theme';
import { sec } from '../../lib/utils';
import { NARRATION, SCENE_TIMING } from './data';
import { S01Intro } from './scenes/S01Intro';
import { S02Sputnik } from './scenes/S02Sputnik';
import { S03PanicMap } from './scenes/S03PanicMap';
import { S04Disconnect } from './scenes/S04Disconnect';
import { S05MeshNetwork } from './scenes/S05MeshNetwork';
import { S06Teaser } from './scenes/S06Teaser';

export const ColdWarInternet: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: PALETTE.bgDark }}>
      <Sequence from={sec(SCENE_TIMING.intro.start)} durationInFrames={sec(SCENE_TIMING.intro.duration)}><S01Intro /></Sequence>
      <Sequence from={sec(SCENE_TIMING.sputnik.start)} durationInFrames={sec(SCENE_TIMING.sputnik.duration)}><S02Sputnik /></Sequence>
      <Sequence from={sec(SCENE_TIMING.panicMap.start)} durationInFrames={sec(SCENE_TIMING.panicMap.duration)}><S03PanicMap /></Sequence>
      <Sequence from={sec(SCENE_TIMING.disconnect.start)} durationInFrames={sec(SCENE_TIMING.disconnect.duration)}><S04Disconnect /></Sequence>
      <Sequence from={sec(SCENE_TIMING.mesh.start)} durationInFrames={sec(SCENE_TIMING.mesh.duration)}><S05MeshNetwork /></Sequence>
      <Sequence from={sec(SCENE_TIMING.teaser.start)} durationInFrames={sec(SCENE_TIMING.teaser.duration)}><S06Teaser /></Sequence>
      <Subtitle frame={frame} lines={NARRATION} />
    </AbsoluteFill>
  );
};
