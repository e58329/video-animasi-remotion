import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { hexToRgba } from '../lib/color';

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * Scene 1 (frame 0-85): teks sambutan muncul kata demi kata
 * dengan efek slide-up + blur, diakhiri garis aksen gradasi.
 */
export const WelcomeScene: React.FC<{
  welcomeText: string;
  accentColor: string;
  accentColor2: string;
}> = ({ welcomeText, accentColor, accentColor2 }) => {
  const frame = useCurrentFrame();
  const words = welcomeText.split(' ').filter(Boolean);

  const exit = interpolate(frame, [66, 84], [0, 1], CLAMP);
  const lineP = interpolate(frame, [24, 46], [0, 1], {
    ...CLAMP,
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          columnGap: 30,
          rowGap: 10,
          maxWidth: '82%',
          opacity: 1 - exit,
          transform: `translateY(${-exit * 80}px)`,
        }}
      >
        {words.map((word, i) => {
          const start = 5 + i * 6;
          const p = interpolate(frame, [start, start + 22], [0, 1], {
            ...CLAMP,
            easing: Easing.out(Easing.cubic),
          });
          return (
            <span
              key={`${word}-${i}`}
              style={{
                fontSize: 78,
                fontWeight: 600,
                letterSpacing: '0.14em',
                color: '#e2e8f0',
                opacity: p,
                transform: `translateY(${(1 - p) * 95}px)`,
                filter: `blur(${(1 - p) * 12}px)`,
                textShadow: '0 6px 40px rgba(2, 6, 18, 0.85)',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Garis aksen gradasi */}
      <div
        style={{
          marginTop: 38,
          height: 4,
          width: 320 * lineP,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor2})`,
          boxShadow: `0 0 26px ${hexToRgba(accentColor, 0.75)}`,
          opacity: lineP * (1 - exit),
        }}
      />
    </AbsoluteFill>
  );
};
