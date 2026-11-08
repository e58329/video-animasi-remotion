import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, clamp} from './theme';

export const reveal = (f: number, start: number, len = 12) => clamp((f - start) / len);

export const Bg: React.FC = () => {
  const f = useCurrentFrame();
  const off = (f * 0.4) % 60;
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 30%, ${C.bg2}, ${C.bg} 70%)`}}>
      <svg width="100%" height="100%" style={{position: 'absolute', opacity: 0.35}}>
        <defs>
          <pattern id="atcgrid" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform={`translate(${off} ${off})`}>
            <path d="M60 0H0V60" fill="none" stroke={C.grid} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#atcgrid)" />
      </svg>
    </AbsoluteFill>
  );
};

export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg viewBox="0 0 1000 600" style={{width: '100%', height: 'auto', display: 'block', overflow: 'visible'}}>
    {children}
  </svg>
);

export const PLANE_PATH =
  'M0,-22 L5,-8 L26,6 L26,11 L5,7 L4,18 L11,24 L11,27 L0,24 L-11,27 L-11,24 L-4,18 L-5,7 L-26,11 L-26,6 L-5,-8 Z';

export const Plane: React.FC<{x: number; y: number; rot?: number; scale?: number; color?: string}> = ({
  x,
  y,
  rot = 0,
  scale = 1,
  color = C.white,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <path d={PLANE_PATH} fill={color} />
  </g>
);

// Teks yang bisa wrap di dalam SVG (foreignObject)
export const Note: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  show?: number;
  color?: string;
  size?: number;
  align?: 'left' | 'center' | 'right';
  box?: boolean;
  border?: string;
  children: React.ReactNode;
}> = ({x, y, w, h, show = 1, color = C.white, size = 26, align = 'left', box = false, border = C.cyan, children}) => (
  <foreignObject x={x} y={y} width={w} height={h} style={{opacity: show}}>
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        textAlign: align,
        color,
        fontFamily: FONT,
        fontSize: size,
        fontWeight: 700,
        lineHeight: 1.2,
        boxSizing: 'border-box',
        ...(box ? {background: C.panel, border: `3px solid ${border}`, borderRadius: 16, padding: '8px 16px'} : {}),
      }}
    >
      <div>{children}</div>
    </div>
  </foreignObject>
);

export const BigCallout: React.FC<{text: string; dur: number; vertical: boolean}> = ({text, dur, vertical}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - 20, fps, config: {damping: 12}});
  const out = interpolate(f, [dur * 0.72, dur * 0.82], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '46%',
        textAlign: 'center',
        transform: `translateY(-50%) scale(${0.6 + 0.4 * s})`,
        opacity: clamp(s) * out,
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          maxWidth: vertical ? 940 : 1400,
          background: 'rgba(4,12,24,0.84)',
          border: `4px solid ${C.amber}`,
          borderRadius: 24,
          padding: vertical ? '28px 36px' : '26px 46px',
          color: C.white,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: vertical ? 72 : 78,
          lineHeight: 1.1,
        }}
      >
        {text}
      </span>
    </div>
  );
};

const chunk = (text: string, max: number) => {
  const sentences = text.split(/(?<=[.?!:])\s+/);
  const out: string[] = [];
  for (const s of sentences) {
    if (s.length <= max) {
      out.push(s);
      continue;
    }
    let cur = '';
    for (const w of s.split(' ')) {
      if ((cur + ' ' + w).trim().length > max) {
        out.push(cur.trim());
        cur = w;
      } else {
        cur = (cur + ' ' + w).trim();
      }
    }
    if (cur) out.push(cur.trim());
  }
  return out.filter(Boolean);
};

export const Subtitle: React.FC<{text: string; dur: number; vertical: boolean}> = ({text, dur, vertical}) => {
  const f = useCurrentFrame();
  const parts = chunk(text, vertical ? 52 : 90);
  const total = parts.reduce((s, p) => s + p.length, 0);
  const p = clamp(f / Math.max(1, dur - 14));
  let acc = 0;
  let idx = parts.length - 1;
  for (let i = 0; i < parts.length; i++) {
    acc += parts[i].length / total;
    if (p <= acc) {
      idx = i;
      break;
    }
  }
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: vertical ? 330 : 60,
        display: 'flex',
        justifyContent: 'center',
        padding: vertical ? '0 50px' : '0 160px',
      }}
    >
      <div
        style={{
          background: 'rgba(0,0,0,0.64)',
          color: C.white,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: vertical ? 50 : 42,
          lineHeight: 1.25,
          textAlign: 'center',
          padding: '12px 26px',
          borderRadius: 16,
        }}
      >
        {parts[idx]}
      </div>
    </div>
  );
};

// Logo YouTube versi gambar vektor sederhana (bisa diganti PNG resmi bila mau)
export const YouTubeLogo: React.FC<{size?: number}> = ({size = 120}) => (
  <svg width={size * 1.42} height={size} viewBox="0 0 142 100">
    <rect x="0" y="0" width="142" height="100" rx="28" fill="#FF0000" />
    <path d="M57 28 L98 50 L57 72 Z" fill="#ffffff" />
  </svg>
);

// Subtitle karaoke (short): kata yang sedang diucapkan menyala
export const KaraokeSubtitle: React.FC<{text: string; dur: number}> = ({text, dur}) => {
  const f = useCurrentFrame();
  const words = text.split(/\s+/).filter(Boolean);
  const wt = (w: string) => w.length + 1 + (/[.?!:,]$/.test(w) ? 4 : 0);
  const total = words.reduce((s, w) => s + wt(w), 0);
  const p = clamp((f + 4) / Math.max(1, dur - 18));
  let acc = 0;
  const starts = words.map((w) => {
    const s = acc / total;
    acc += wt(w);
    return s;
  });
  let cur = 0;
  for (let i = 0; i < words.length; i++) if (p >= starts[i]) cur = i;
  const pages: number[][] = [];
  let page: number[] = [];
  words.forEach((w, i) => {
    page.push(i);
    if (page.length >= 4 || /[.?!,:]$/.test(w)) {
      pages.push(page);
      page = [];
    }
  });
  if (page.length) pages.push(page);
  const pg = pages.find((x) => x.includes(cur)) ?? pages[pages.length - 1];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 330, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 20px', padding: '0 60px'}}>
      {pg.map((i) => {
        const on = i === cur;
        return (
          <span
            key={i}
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 76,
              lineHeight: 1.25,
              color: on ? C.amber : C.white,
              opacity: on || i < cur ? 1 : 0.6,
              transform: `scale(${on ? 1.12 : 1})`,
              WebkitTextStroke: '10px #000',
              paintOrder: 'stroke fill',
              textShadow: '0 6px 14px rgba(0,0,0,0.8)',
            }}
          >
            {words[i]}
          </span>
        );
      })}
    </div>
  );
};
