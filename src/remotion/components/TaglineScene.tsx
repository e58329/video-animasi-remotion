import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { hexToRgba } from '../lib/color';

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * Scene 3 (frame 162-240): tagline muncul kata demi kata,
 * lalu tombol CTA dengan efek spring pop + glow berdenyut.
 */
export const TaglineScene: React.FC<{
  tagline: string;
  ctaText: string;
  accentColor: string;
  accentColor2: string;
}> = ({ tagline, ctaText, accentColor, accentColor2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exit = interpolate(frame, [60, 78], [0, 1], CLAMP);

  // Pembatas atas menyebar
  const dividerP = interpolate(frame, [0, 14], [0, 1], {
    ...CLAMP,
    easing: Easing.out(Easing.cubic),
  });

  const words = tagline.split(' ').filter(Boolean);

  // Tombol CTA spring pop
  const ctaSpring = Math.max(
    0,
    spring({ frame: frame - 30, fps, config: { damping: 12, stiffness: 170, mass: 0.9 } }),
  );

  // Denyut glow setelah tombol mendarat
  const pulse = frame > 44 ? (Math.sin(frame / 5) + 1) / 2 : 0;

  const taglineSize = tagline.length > 42 ? 46 : tagline.length > 28 ? 52 : 58;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        opacity: 1 - exit,
        transform: `scale(${1 + exit * 0.04})`,
      }}
    >
      {/* Pembatas gradasi */}
      <div
        style={{
          width: 170 * dividerP,
          height: 3,
          borderRadius: 999,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          marginBottom: 34,
        }}
      />

      {/* Tagline kata demi kata */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          columnGap: 16,
          rowGap: 8,
          maxWidth: '78%',
          marginBottom: 52,
        }}
      >
        {words.map((word, i) => {
          const start = 6 + i * 3.2;
          const p = interpolate(frame, [start, start + 16], [0, 1], {
            ...CLAMP,
            easing: Easing.out(Easing.cubic),
          });
          return (
            <span
              key={`${word}-${i}`}
              style={{
                fontSize: taglineSize,
                fontWeight: 500,
                color: '#cbd5e1',
                opacity: p,
                transform: `translateY(${(1 - p) * 40}px)`,
                filter: `blur(${(1 - p) * 8}px)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Tombol CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '26px 62px',
          borderRadius: 999,
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor2})`,
          boxShadow: `0 14px 60px ${hexToRgba(accentColor, 0.35 + pulse * 0.35)}, inset 0 0 0 1px rgba(255, 255, 255, 0.18)`,
          transform: `scale(${ctaSpring})`,
          opacity: Math.min(1, ctaSpring * 3),
        }}
      >
        <svg width={26} height={26} viewBox="0 0 24 24">
          <polygon points="7,4 20,12 7,20" fill="#ffffff" />
        </svg>
        <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: '0.13em', color: '#ffffff' }}>
          {ctaText}
        </span>
      </div>
    </AbsoluteFill>
  );
};
