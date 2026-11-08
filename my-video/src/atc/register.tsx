import React from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, Still, staticFile} from 'remotion';
import narration from './narration.json';
import durations from './durations.json';
import {SceneDef, C, FONT} from './engine/theme';
import {SceneView} from './engine/SceneView';
import {YouTubeLogo} from './engine/ui';
import {HANDLE} from './engine/channel';

// ─── Pengaturan ───
const FPS = 30;
// Isi dengan path di folder public (mis. 'atc/bgm.mp3') kalau mau musik latar. Kosongkan = tanpa musik.
const BGM = '';
const BGM_VOLUME = 0.14;

type Item = {scene: SceneDef; from: number; frames: number; hasAudio: boolean};

const DUR = durations as Record<string, number>;
const estimate = (t: string) => t.trim().split(/\s+/).length / 2.4; // detik, dipakai kalau audio belum dibuat

const build = (scenes: SceneDef[]): Item[] => {
  let from = 0;
  return scenes.map((scene) => {
    const sec = DUR[scene.id] ?? estimate(scene.text);
    const frames = Math.ceil((sec + 0.6) * FPS);
    const item = {scene, from, frames, hasAudio: scene.id in DUR};
    from += frames;
    return item;
  });
};

const LONG = build(narration.long as unknown as SceneDef[]);
const SHORT = build(narration.short as unknown as SceneDef[]);
const total = (l: Item[]) => l[l.length - 1].from + l[l.length - 1].frames;

const Video: React.FC<{layout: Item[]; vertical: boolean}> = ({layout, vertical}) => (
  <AbsoluteFill style={{background: C.bg}}>
    {BGM ? <Audio src={staticFile(BGM)} volume={BGM_VOLUME} loop /> : null}
    {layout.map((it) => (
      <Sequence key={it.scene.id} from={it.from} durationInFrames={it.frames}>
        <SceneView scene={it.scene} dur={it.frames} vertical={vertical} hasAudio={it.hasAudio} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export const AtcLong: React.FC = () => <Video layout={LONG} vertical={false} />;
export const AtcShort: React.FC = () => <Video layout={SHORT} vertical />;

export const AtcThumb: React.FC = () => (
  <AbsoluteFill style={{background: `radial-gradient(circle at 75% 45%, ${C.bg2}, ${C.bg})`, fontFamily: FONT}}>
    <svg width={1280} height={720} style={{position: 'absolute'}}>
      {[120, 210, 300, 390].map((r) => (
        <circle key={r} cx={930} cy={370} r={r} fill="none" stroke={C.green} strokeOpacity={0.4} strokeWidth={3} />
      ))}
      <line x1={930} y1={370} x2={1210} y2={160} stroke={C.green} strokeWidth={5} />
      <polygon points="930,370 1210,160 1270,250" fill={C.green} opacity={0.18} />
      {[
        [1030, 300],
        [820, 250],
        [900, 520],
        [1120, 450],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={11} fill={C.green} />
      ))}
      <g transform="translate(930 370) rotate(40) scale(4.2)">
        <path d="M0,-22 L5,-8 L26,6 L26,11 L5,7 L4,18 L11,24 L11,27 L0,24 L-11,27 L-11,24 L-4,18 L-5,7 L-26,11 L-26,6 L-5,-8 Z" fill={C.white} />
      </g>
    </svg>
    <div style={{position: 'absolute', left: 60, top: 50}}>
      <div style={{fontSize: 66, fontWeight: 900, color: C.amber, lineHeight: 1.05}}>RAHASIA</div>
      <div style={{fontSize: 150, fontWeight: 900, color: C.white, lineHeight: 0.98}}>MENARA</div>
      <div style={{fontSize: 235, fontWeight: 900, color: C.cyan, lineHeight: 0.9}}>ATC</div>
      <div style={{fontSize: 46, fontWeight: 800, color: C.white, marginTop: 14}}>Sejarah &amp; cara kerjanya</div>
    </div>
    <div style={{position: 'absolute', left: 60, bottom: 36, display: 'flex', alignItems: 'center', gap: 18}}>
      <YouTubeLogo size={52} />
      <div style={{fontSize: 44, fontWeight: 900, color: C.white}}>{HANDLE}</div>
    </div>
  </AbsoluteFill>
);

export const AtcCompositions: React.FC = () => (
  <>
    <Composition id="AtcLong" component={AtcLong} durationInFrames={total(LONG)} fps={FPS} width={1920} height={1080} />
    <Composition id="AtcShort" component={AtcShort} durationInFrames={total(SHORT)} fps={FPS} width={1080} height={1920} />
    <Still id="AtcThumb" component={AtcThumb} width={1280} height={720} />
  </>
);
