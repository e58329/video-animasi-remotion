import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, VProps, clamp} from './theme';
import {YouTubeLogo} from './ui';

export const HANDLE = '@yakalilutau';

const BellIcon: React.FC<{size?: number; color?: string; rot?: number}> = ({size = 56, color = C.white, rot = 0}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{transform: `rotate(${rot}deg)`, transformOrigin: '50% 10%'}}>
    <path
      fill={color}
      d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
    />
  </svg>
);

const ThumbIcon: React.FC<{size?: number}> = ({size = 72}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      fill={C.white}
      d="M2 21h4V9H2v12zm20-11c0-1.1-.9-2-2-2h-6.3l1-4.6.03-.3c0-.4-.2-.8-.4-1.1L13.2 1 6.6 7.6C6.2 8 6 8.5 6 9v10c0 1.1.9 2 2 2h9c.8 0 1.5-.5 1.8-1.2l3-7c.1-.2.2-.5.2-.8v-2z"
    />
  </svg>
);

const ChatIcon: React.FC<{size?: number}> = ({size = 72}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill={C.white} d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

const Cursor: React.FC = () => (
  <svg width={64} height={64} viewBox="0 0 20 28">
    <path d="M0 0 L0 22 L5.5 17 L9.5 26 L13 24.5 L9 15.5 L16.5 15.5 Z" fill="#ffffff" stroke="#000000" strokeWidth={1.4} />
  </svg>
);

/* ───────────── PROLOG SUBSCRIBE ───────────── */
export const SubscribeScene: React.FC<VProps> = ({dur, vertical}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = clamp(spring({frame: f - 4, fps, config: {damping: 11}}), 0, 1.2);
  const nameIn = clamp(spring({frame: f - 22, fps, config: {damping: 14}}), 0, 1.1);
  const btnIn = clamp(spring({frame: f - 38, fps, config: {damping: 14}}), 0, 1.1);
  const T = Math.max(70, Math.floor(dur * 0.58));
  const clicked = f >= T;
  const press = clicked && f < T + 6 ? 0.92 : 1;
  const cur = interpolate(f, [T - 45, T], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const bell = clicked ? Math.sin((f - T) * 0.7) * Math.max(0, 1 - (f - T) / 50) * 24 : 0;
  const glow = 0.5 + 0.5 * Math.sin(f / 10);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', paddingBottom: vertical ? 280 : 150, fontFamily: FONT}}>
      <div style={{transform: `scale(${pop})`, filter: `drop-shadow(0 0 ${18 + glow * 22}px rgba(255,0,0,0.65))`}}>
        <YouTubeLogo size={vertical ? 210 : 190} />
      </div>
      <div
        style={{
          marginTop: 30,
          opacity: clamp(nameIn),
          transform: `translateY(${(1 - clamp(nameIn)) * 30}px)`,
          fontSize: vertical ? 92 : 108,
          fontWeight: 900,
          color: C.white,
        }}
      >
        {HANDLE}
      </div>
      <div style={{marginTop: 12, opacity: clamp(nameIn), fontSize: 40, color: C.dim, fontWeight: 700}}>
        Bongkar cara kerja dunia
      </div>
      <div style={{position: 'relative', marginTop: 44, opacity: clamp(btnIn), transform: `scale(${btnIn * press})`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <div
            style={{
              background: clicked ? '#3a4b60' : '#ff0000',
              color: C.white,
              fontWeight: 900,
              fontSize: 48,
              padding: '20px 54px',
              borderRadius: 999,
              letterSpacing: 1,
            }}
          >
            {clicked ? 'SUBSCRIBED' : 'SUBSCRIBE'}
          </div>
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 46,
              background: clicked ? C.amber : '#3a4b60',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BellIcon size={58} color={clicked ? C.bg : C.white} rot={bell} />
          </div>
        </div>
        <div style={{position: 'absolute', left: '58%', top: '45%', opacity: clamp(cur + (clicked ? 1 : 0)), transform: `translate(${cur * 190}px, ${cur * 150}px)`}}>
          <Cursor />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── CTA PENUTUP ───────────── */
const Action: React.FC<{label: string; icon: React.ReactNode; delay: number; color: string}> = ({label, icon, delay, color}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = clamp(spring({frame: f - delay, fps, config: {damping: 11}}), 0, 1.15);
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, transform: `scale(${s})`, opacity: clamp(s)}}>
      <div style={{width: 130, height: 130, borderRadius: 65, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {icon}
      </div>
      <div style={{color: C.white, fontSize: 36, fontWeight: 800}}>{label}</div>
    </div>
  );
};

export const CtaScene: React.FC<VProps> = ({dur, vertical}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const head = clamp(spring({frame: f - 4, fps, config: {damping: 13}}), 0, 1.1);
  const logo = clamp(spring({frame: f - 70, fps, config: {damping: 12}}), 0, 1.1);
  const bell = Math.sin(f * 0.5) * 18;
  const pulse = 1 + 0.04 * Math.sin(f / 7);
  const top = vertical ? 230 : 70;
  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <div style={{position: 'absolute', left: 0, right: 0, top, textAlign: 'center', opacity: clamp(head), transform: `scale(${head})`}}>
        <div style={{color: C.white, fontSize: vertical ? 84 : 92, fontWeight: 900}}>Suka videonya?</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: top + (vertical ? 150 : 140), display: 'flex', justifyContent: 'center', gap: vertical ? 50 : 90}}>
        <Action label="Like" delay={22} color="#2a6aa5" icon={<ThumbIcon />} />
        <Action label="Komentar" delay={36} color="#2a6aa5" icon={<ChatIcon />} />
        <Action label="Subscribe" delay={50} color="#ff0000" icon={<BellIcon size={74} rot={bell} />} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: top + (vertical ? 400 : 330),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 30,
          opacity: clamp(logo),
          transform: `scale(${logo * pulse})`,
        }}
      >
        <YouTubeLogo size={vertical ? 100 : 110} />
        <div style={{color: C.white, fontSize: vertical ? 72 : 82, fontWeight: 900}}>{HANDLE}</div>
      </div>
      {!vertical && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center', gap: 80, opacity: clamp((f - dur * 0.45) / 15)}}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 420,
                height: 236,
                border: `4px dashed ${C.dim}`,
                borderRadius: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: C.dim,
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              Video berikutnya
            </div>
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};
