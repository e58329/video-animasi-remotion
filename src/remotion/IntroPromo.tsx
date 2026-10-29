import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { AnimatedBackground } from './components/AnimatedBackground';
import { WelcomeScene } from './components/WelcomeScene';
import { LogoScene } from './components/LogoScene';
import { TaglineScene } from './components/TaglineScene';
import { FONT_STACK } from './fonts';
import type { IntroProps } from './constants';

/** Overlay penutup: memudar ke warna dasar di 1 detik terakhir agar loop mulus. */
const FadeOutOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [226, 239], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ backgroundColor: '#070b16', opacity, pointerEvents: 'none' }} />;
};

/**
 * Komposisi utama "IntroPromo" — intro animasi gaya dark tech, 1920x1080 @30fps.
 *
 * Timeline (240 frame @ 30fps = 8 detik):
 *   0-85    : Scene 1 — teks sambutan (slide-up + blur per kata)
 *   78-172  : Scene 2 — reveal logo heksagon + nama channel per huruf
 *   162-240 : Scene 3 — tagline + tombol CTA spring
 */
export const IntroPromo: React.FC<IntroProps> = (props) => {
  const { accentColor, accentColor2 } = props;

  return (
    <AbsoluteFill style={{ backgroundColor: '#070b16', fontFamily: FONT_STACK }}>
      <AnimatedBackground accentColor={accentColor} accentColor2={accentColor2} />

      <Sequence from={0} durationInFrames={86}>
        <WelcomeScene welcomeText={props.welcomeText} accentColor={accentColor} accentColor2={accentColor2} />
      </Sequence>

      <Sequence from={78} durationInFrames={94}>
        <LogoScene channelName={props.channelName} accentColor={accentColor} accentColor2={accentColor2} />
      </Sequence>

      <Sequence from={162} durationInFrames={78}>
        <TaglineScene
          tagline={props.tagline}
          ctaText={props.ctaText}
          accentColor={accentColor}
          accentColor2={accentColor2}
        />
      </Sequence>

      <FadeOutOverlay />
    </AbsoluteFill>
  );
};
