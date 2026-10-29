import React from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from 'remotion';
import { hexToRgba } from '../lib/color';

const PARTICLE_COUNT = 42;
const GRID_SIZE = 90;

/**
 * Latar belakang bertema "dark tech": gradasi gelap, grid bergerak pelan,
 * dua orb cahaya blur yang mengapung, partikel berkelip, dan vignette.
 */
export const AnimatedBackground: React.FC<{
  accentColor: string;
  accentColor2: string;
}> = ({ accentColor, accentColor2 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Gerakan orb yang lambat dan organik
  const orb1X = width * (0.22 + Math.sin(frame / 105) * 0.07);
  const orb1Y = height * (0.28 + Math.cos(frame / 130) * 0.06);
  const orb2X = width * (0.78 + Math.cos(frame / 95) * 0.06);
  const orb2Y = height * (0.74 + Math.sin(frame / 120) * 0.07);

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Basis gradasi gelap */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 60% 50% at 20% 15%, ${hexToRgba(accentColor, 0.14)}, transparent 70%),
            radial-gradient(ellipse 55% 45% at 82% 85%, ${hexToRgba(accentColor2, 0.12)}, transparent 70%),
            linear-gradient(160deg, #070b16 0%, #0f172a 55%, #0b1220 100%)`,
        }}
      />

      {/* Grid teknologi yang bergeser pelan */}
      <AbsoluteFill
        style={{
          opacity: 0.55 * fadeIn,
          backgroundImage: `linear-gradient(${hexToRgba(accentColor, 0.08)} 1px, transparent 1px),
            linear-gradient(90deg, ${hexToRgba(accentColor, 0.08)} 1px, transparent 1px)`,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          transform: `translateY(${(frame * 0.4) % GRID_SIZE}px)`,
          maskImage: 'radial-gradient(ellipse 75% 70% at 50% 45%, black 25%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 45%, black 25%, transparent 100%)',
        }}
      />

      {/* Orb cahaya blur */}
      <div
        style={{
          position: 'absolute',
          width: 720,
          height: 720,
          borderRadius: '50%',
          filter: 'blur(150px)',
          background: hexToRgba(accentColor, 0.16),
          left: orb1X - 360,
          top: orb1Y - 360,
          opacity: fadeIn,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 640,
          height: 640,
          borderRadius: '50%',
          filter: 'blur(150px)',
          background: hexToRgba(accentColor2, 0.13),
          left: orb2X - 320,
          top: orb2Y - 320,
          opacity: fadeIn,
        }}
      />

      {/* Partikel yang naik perlahan dan berkelip */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const seedX = random(`px-${i}`);
        const seedY = random(`py-${i}`);
        const seedS = random(`ps-${i}`);
        const size = 2 + seedS * 4;
        const speed = 0.25 + seedS * 0.7;
        const range = height + 120;
        const y = (((seedY * range - frame * speed) % range) + range) % range - 60;
        const x = seedX * width + Math.sin(frame / 60 + i * 1.7) * 14;
        const twinkle = 0.5 + 0.5 * Math.sin(frame / 18 + i * 2.3);
        const color = i % 2 === 0 ? accentColor : accentColor2;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: '50%',
              background: color,
              opacity: (0.12 + 0.4 * twinkle) * fadeIn,
              boxShadow: `0 0 ${size * 3}px ${hexToRgba(color, 0.8)}`,
            }}
          />
        );
      })}

      {/* Vignette agar fokus ke tengah */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(2, 4, 10, 0.55) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
