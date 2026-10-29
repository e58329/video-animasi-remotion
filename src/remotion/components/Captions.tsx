import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { NARRATION_CARDS } from '../narration-data';
import { hexToRgba } from '../lib/color';

/**
 * Subtitle auto-caption gaya karaoke — kata aktif menyala PERSIS sinkron
 * dengan narasi TTS. Timing per kata digenerasi otomatis dari WordBoundary
 * Edge TTS (lihat narration-data.ts), jadi tanpaWhisper/API berbayar.
 *
 * Visual: chip gelap glassy di bawah layar, kata yang sudah diucap putih
 * terang, kata aktif gradasi neon + glow + pop spring, kata berikutnya redup.
 */
export const Captions: React.FC<{ accentColor: string; accentColor2: string }> = ({
  accentColor,
  accentColor2,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const t = frame / fps;

  // Card aktif: tampil sedikit sebelum kata pertama, hilang sesudah kata terakhir
  const card = NARRATION_CARDS.find((c) => t >= c.start - 0.3 && t <= c.end + 0.55);
  if (!card) return null;

  const enter = interpolate(t, [card.start - 0.3, card.start - 0.05], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exit = interpolate(t, [card.end + 0.25, card.end + 0.55], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(enter, exit);
  const rise = interpolate(enter, [0, 1], [20, 0]);

  // Token asli (dengan tanda baca, mis. "besar,") — jumlahnya sama dengan words
  const tokens = card.text.split(' ');

  const base: React.CSSProperties = {
    display: 'inline-block',
    fontSize: 52,
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: '-0.5px',
    whiteSpace: 'nowrap',
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: height * 0.1,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          columnGap: 26,
          rowGap: 12,
          maxWidth: 1500,
          padding: '30px 56px',
          opacity,
          transform: `translateY(${rise}px)`,
          background: 'linear-gradient(135deg, rgba(15,20,40,0.78), rgba(8,12,24,0.66))',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 32,
          backdropFilter: 'blur(18px)',
          boxShadow: '0 26px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {card.words.map((w, i) => {
          const token = tokens[i] ?? w.word;
          const isActive = t >= w.start && t < w.end;
          const isFuture = t < w.start;

          if (isFuture) {
            return (
              <span key={i} style={{ ...base, color: 'rgba(226,232,240,0.42)' }}>
                {token}
              </span>
            );
          }

          if (isActive) {
            const pop = spring({
              frame: Math.max(0, (t - w.start) * fps),
              fps,
              config: { damping: 12, stiffness: 220, mass: 0.55 },
            });
            return (
              <span
                key={i}
                style={{
                  ...base,
                  backgroundImage: `linear-gradient(100deg, ${accentColor}, ${accentColor2})`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transform: `scale(${0.88 + 0.12 * pop})`,
                  filter: `drop-shadow(0 0 20px ${hexToRgba(accentColor, 0.55)})`,
                }}
              >
                {token}
              </span>
            );
          }

          return (
            <span key={i} style={{ ...base, color: '#f8fafc' }}>
              {token}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
