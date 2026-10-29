import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { hexToRgba } from '../lib/color';

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const HEX_POINTS = '100,10 178,55 178,145 100,190 22,145 22,55';
const PLAY_POINTS = '84,68 84,132 138,100';

/**
 * Scene 2 (frame 78-172): reveal logo — heksagon tergambar (stroke animation),
 * segitiga play muncul dengan spring, nama channel muncul huruf demi huruf,
 * cincin pulse mengembang, dan garis bawah gradasi.
 */
export const LogoScene: React.FC<{
  channelName: string;
  accentColor: string;
  accentColor2: string;
}> = ({ channelName, accentColor, accentColor2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exit = interpolate(frame, [74, 92], [0, 1], CLAMP);

  // Heksagon tergambar dari 0 -> penuh
  const hexDraw = interpolate(frame, [2, 30], [1, 0], {
    ...CLAMP,
    easing: Easing.inOut(Easing.cubic),
  });

  // Segitiga play dengan efek spring
  const triSpring = Math.max(
    0,
    spring({ frame: frame - 22, fps, config: { damping: 11, stiffness: 150, mass: 0.7 } }),
  );

  // Dua cincin pulse mengembang
  const ring1 = interpolate(frame, [12, 52], [0, 1], CLAMP);
  const ring2 = interpolate(frame, [22, 62], [0, 1], CLAMP);

  // Nama channel huruf demi huruf, dikelompokkan per kata agar wrap tidak memotong kata
  const words = channelName.split(' ').filter(Boolean);
  const nameStart = 26;
  const stagger = 1.4;
  const nameSize = channelName.length > 14 ? 84 : channelName.length > 10 ? 96 : 110;
  const letterIndexByWord: number[][] = [];
  let letterCursor = 0;
  for (const w of words) {
    const idxs: number[] = [];
    for (let i = 0; i < w.length; i++) {
      idxs.push(letterCursor++);
    }
    letterCursor += 1; // spasi antar kata tetap dihitung agar ritme stagger konsisten
    letterIndexByWord.push(idxs);
  }

  // Garis bawah gradasi
  const underlineP = interpolate(frame, [50, 70], [0, 1], {
    ...CLAMP,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1 - exit,
        transform: `scale(${1 + exit * 0.05})`,
      }}
    >
      {/* width 100% agar maxWidth anak-anaknya dihitung terhadap kanvas 1920px,
          bukan terhadap lebar kolom yang menyusut menyesuaikan konten */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 26,
          width: '100%',
        }}
      >
        {/* Logo heksagon + segitiga play */}
        <div
          style={{
            position: 'relative',
            width: 230,
            height: 230,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <svg width={230} height={230} viewBox="0 0 200 200" style={{ position: 'absolute', overflow: 'visible' }}>
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={accentColor} />
                <stop offset="100%" stopColor={accentColor2} />
              </linearGradient>
            </defs>

            <circle
              cx={100}
              cy={100}
              r={105 + ring1 * 85}
              fill="none"
              stroke={hexToRgba(accentColor, 0.32 * (1 - ring1))}
              strokeWidth={1.5}
            />
            <circle
              cx={100}
              cy={100}
              r={105 + ring2 * 85}
              fill="none"
              stroke={hexToRgba(accentColor2, 0.3 * (1 - ring2))}
              strokeWidth={1.5}
            />

            <polygon
              points={HEX_POINTS}
              fill={hexToRgba(accentColor, 0.09)}
              stroke="url(#logoGradient)"
              strokeWidth={4.5}
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={hexDraw}
              style={{ filter: `drop-shadow(0 0 16px ${hexToRgba(accentColor, 0.55)})` }}
            />
            <polygon
              points={PLAY_POINTS}
              fill="url(#logoGradient)"
              transform={`translate(100 100) scale(${triSpring}) translate(-100 -100)`}
              style={{ filter: `drop-shadow(0 0 12px ${hexToRgba(accentColor2, 0.6)})` }}
            />
          </svg>
        </div>

        {/* Nama channel gradasi, muncul per huruf */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: 28,
            rowGap: 8,
            maxWidth: '82%',
            filter: `drop-shadow(0 0 30px ${hexToRgba(accentColor, 0.45)})`,
          }}
        >
          {words.map((word, wi) => (
            <span key={`${word}-${wi}`} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
              {letterIndexByWord[wi].map((li, i) => {
                const ch = word[i];
                const p = Math.max(
                  0,
                  spring({
                    frame: frame - (nameStart + li * stagger),
                    fps,
                    config: { damping: 14, stiffness: 130, mass: 0.8 },
                  }),
                );
                return (
                  <span
                    key={`${ch}-${li}`}
                    style={{
                      display: 'inline-block',
                      fontSize: nameSize,
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      lineHeight: 1.15,
                      backgroundImage: `linear-gradient(135deg, ${accentColor}, ${accentColor2})`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      opacity: p,
                      transform: `translateY(${(1 - p) * 55}px)`,
                    }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          ))}
        </div>

        {/* Garis bawah gradasi */}
        <div
          style={{
            height: 5,
            width: 440 * underlineP,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor2})`,
            boxShadow: `0 0 30px ${hexToRgba(accentColor, 0.7)}`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
