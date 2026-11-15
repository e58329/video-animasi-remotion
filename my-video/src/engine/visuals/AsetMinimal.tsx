import React from "react";
import { Kanvas, useAdegan } from "./VisualSadap";
import { W, mulus, antar } from "./halus";

type Pos = { x: number; y: number; s?: number; o?: number; children?: React.ReactNode };

const G: React.FC<Pos> = ({ x, y, s = 1, o = 1, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {children}
  </g>
);

export const AdeganMin: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { p } = useAdegan();
  const buka = mulus(p, 0, 0.06);
  const tutup = 1 - antar(p, 0.95, 1);
  return (
    <Kanvas>
      <defs>
        <radialGradient id="min-latar" cx="50%" cy="42%" r="75%">
          <stop offset="0" stopColor="#16213A" />
          <stop offset="1" stopColor={W.latar} />
        </radialGradient>
        <filter id="min-bayang" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      <rect x={0} y={0} width={880} height={607} fill="url(#min-latar)" />
      <g opacity={buka * tutup} transform={`translate(0 ${(1 - buka) * 14})`}>
        {children}
      </g>
    </Kanvas>
  );
};

export const Muncul: React.FC<{ k: number; geser?: number; children?: React.ReactNode }> = ({
  k,
  geser = 14,
  children,
}) => (
  <g opacity={k} transform={`translate(0 ${(1 - k) * geser})`}>
    {children}
  </g>
);

export const Teks: React.FC<{
  x: number;
  y: number;
  t: string;
  ukuran?: number;
  warna?: string;
  tebal?: number;
  o?: number;
}> = ({ x, y, t, ukuran = 34, warna = W.garis, tebal = 600, o = 1 }) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    fontSize={ukuran}
    fontWeight={tebal}
    fill={warna}
    opacity={o}
    letterSpacing={0.5}
    fontFamily={'Inter, "Segoe UI", Roboto, system-ui, sans-serif'}
  >
    {t}
  </text>
);

export const Brankas: React.FC<Omit<Pos, "children"> & { pintu?: number }> = ({
  x,
  y,
  s = 1,
  o = 1,
  pintu = 0,
}) => {
  const lebar = 176 * (1 - 0.88 * pintu);
  const cx = -88 + lebar / 2;
  const r = lebar / 176;
  return (
    <G x={x} y={y} s={s} o={o}>
      <rect x={-80} y={92} width={30} height={12} rx={4} fill={W.redup} />
      <rect x={50} y={92} width={30} height={12} rx={4} fill={W.redup} />
      <rect x={-110} y={-95} width={220} height={190} rx={24} fill={W.permukaan} filter="url(#min-bayang)" />
      <rect x={-88} y={-73} width={176} height={146} rx={14} fill="#0A101D" />
      <rect x={-88} y={-73} width={lebar} height={146} rx={14} fill="#26365A" />
      <ellipse cx={cx} cy={0} rx={Math.max(2, 26 * r)} ry={26} fill="none" stroke={W.aksen} strokeWidth={5} />
      <ellipse cx={cx} cy={0} rx={Math.max(1, 5 * r)} ry={5} fill={W.aksen} />
    </G>
  );
};

export const Koin: React.FC<{ x: number; y: number; r?: number; o?: number; putar?: number }> = ({
  x,
  y,
  r = 16,
  o = 1,
  putar = 0,
}) => {
  const l = Math.max(0.2, Math.abs(Math.cos(putar)));
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <ellipse rx={r * l} ry={r} fill={W.aksen} />
      <ellipse rx={r * l * 0.6} ry={r * 0.6} fill="none" stroke="#0E1525" strokeOpacity={0.3} strokeWidth={2} />
    </g>
  );
};

export const Akun: React.FC<Omit<Pos, "children"> & { warna?: string }> = ({
  x,
  y,
  s = 1,
  o = 1,
  warna = W.redup,
}) => (
  <G x={x} y={y} s={s} o={o}>
    <circle cx={0} cy={-22} r={20} fill={warna} />
    <path d="M -40 40 C -40 4 40 4 40 40 Z" fill={warna} />
  </G>
);
