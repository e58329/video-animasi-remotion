import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, SceneDef, VProps, VisualKey} from './theme';
import {Bg, BigCallout, KaraokeSubtitle, Subtitle} from './ui';
import {Radar, Roles, Sky, Timeline, Tower} from './visuals1';
import {Future, Holding, LightGun, Radio, Runway, Separation, Squawk, Tcas} from './visuals2';
import {CtaScene, SubscribeScene} from './channel';

const VISUALS: Record<VisualKey, React.FC<VProps>> = {
  radar: Radar,
  sky: Sky,
  timeline: Timeline,
  tower: Tower,
  roles: Roles,
  radio: Radio,
  separation: Separation,
  runway: Runway,
  holding: Holding,
  squawk: Squawk,
  lightgun: LightGun,
  tcas: Tcas,
  future: Future,
  subscribe: SubscribeScene,
  cta: CtaScene,
};

export const SceneView: React.FC<{scene: SceneDef; dur: number; vertical: boolean; hasAudio: boolean}> = ({
  scene,
  dur,
  vertical,
  hasAudio,
}) => {
  const f = useCurrentFrame();
  const fade = interpolate(f, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  const V = VISUALS[scene.visual];
  const full = scene.visual === 'subscribe' || scene.visual === 'cta';

  return (
    <AbsoluteFill style={{fontFamily: FONT, opacity: fade}}>
      <Bg />
      {hasAudio && <Audio src={staticFile(`atc/audio/${scene.id}.mp3`)} />}

      {full ? (
        <V dur={dur} vertical={vertical} data={scene.data} />
      ) : (
        <>
          {scene.title ? (
            <div style={{position: 'absolute', top: vertical ? 160 : 44, left: 0, right: 0, textAlign: 'center'}}>
              <span
                style={{
                  background: C.cyan,
                  color: C.bg,
                  padding: '10px 28px',
                  borderRadius: 999,
                  fontWeight: 900,
                  fontSize: vertical ? 44 : 34,
                  letterSpacing: 1,
                }}
              >
                {scene.title}
              </span>
            </div>
          ) : null}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: vertical ? 420 : 140,
              width: vertical ? 1020 : 1180,
            }}
          >
            <V dur={dur} vertical={vertical} data={scene.data} big={scene.big} />
          </div>
          {scene.big ? <BigCallout text={scene.big} dur={dur} vertical={vertical} /> : null}
        </>
      )}

      {vertical ? <KaraokeSubtitle text={scene.text} dur={dur} /> : <Subtitle text={scene.text} dur={dur} vertical={vertical} />}
    </AbsoluteFill>
  );
};
