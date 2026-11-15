import React from "react";
import { Kanvas, useAdegan } from "./VisualSadap";
import { W, mulus, antar } from "./halus";

const FONT = 'Inter, "Segoe UI", Roboto, system-ui, sans-serif';

export const LatarTipo: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { p } = useAdegan();
  const buka = mulus(p, 0, 0.05);
  const tutup = 1 - antar(p, 0.94, 1);
  return (
    <Kanvas>
      <rect x={0} y={0} width={880} height={607} fill="#0B1020" />
      <g opacity={buka * tutup}>{children}</g>
    </Kanvas>
  );
};

export const TeksBesar: React.FC<{
  x: number;
  y: number;
  t: string;
  k: number;
  ukuran?: number;
  warna?: string;
  tebal?: number;
  geser?: number;
}> = ({ x, y, t, k, ukuran = 150, warna = "#F5F7FF", tebal = 800, geser = 40 }) => (
  <text
    x={x}
    y={y}
    fontSize={ukuran}
    fontWeight={tebal}
    fill={warna}
    opacity={k}
    letterSpacing={-ukuran * 0.03}
    transform={`translate(0 ${(1 - k) * geser})`}
    style={{ fontFamily: FONT }}
  >
    {t}
  </text>
);

export const Label: React.FC<{ x: number; y: number; t: string; k?: number }> = ({
  x,
  y,
  t,
  k = 1,
}) => (
  <text
    x={x}
    y={y}
    fontSize={26}
    fontWeight={500}
    fill={W.redup}
    opacity={k}
    letterSpacing={4}
    style={{ fontFamily: FONT }}
  >
    {t}
  </text>
);

export const GarisAksen: React.FC<{ x: number; y: number; panjang: number; k: number }> = ({
  x,
  y,
  panjang,
  k,
}) => (
  <line
    x1={x}
    y1={y}
    x2={x + panjang}
    y2={y}
    stroke={W.aksen}
    strokeWidth={8}
    strokeLinecap="round"
    strokeDasharray={panjang}
    strokeDashoffset={panjang * (1 - k)}
  />
);

export const IkonKoin: React.FC<{ x: number; y: number; r?: number; o?: number }> = ({
  x,
  y,
  r = 16,
  o = 1,
}) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r} fill="none" stroke={W.aksen} strokeWidth={4} />
    <circle r={r * 0.35} fill={W.aksen} />
  </g>
);

export const IkonBrankas: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({
  x,
  y,
  s = 1,
  o = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-70} y={-62} width={140} height={124} rx={18} fill="none" stroke={W.garis} strokeWidth={5} />
    <circle cx={0} cy={0} r={26} fill="none" stroke={W.aksen} strokeWidth={5} />
    <circle cx={0} cy={0} r={5} fill={W.aksen} />
    <line x1={-40} y1={62} x2={-40} y2={76} stroke={W.garis} strokeWidth={5} strokeLinecap="round" />
    <line x1={40} y1={62} x2={40} y2={76} stroke={W.garis} strokeWidth={5} strokeLinecap="round" />
  </g>
);

export const IkonJam: React.FC<{ x: number; y: number; menit: number; s?: number; o?: number }> = ({
  x,
  y,
  menit,
  s = 1,
  o = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={0} r={90} fill="none" stroke={W.garis} strokeWidth={5} />
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i * 30 * Math.PI) / 180;
      return (
        <line
          key={i}
          x1={74 * Math.sin(a)}
          y1={-74 * Math.cos(a)}
          x2={84 * Math.sin(a)}
          y2={-84 * Math.cos(a)}
          stroke={W.redup}
          strokeWidth={3}
          strokeLinecap="round"
        />
      );
    })}
    <line x1={0} y1={0} x2={0} y2={-66} stroke={W.garis} strokeWidth={5} strokeLinecap="round" transform={`rotate(${menit * 6})`} />
    <line x1={0} y1={0} x2={0} y2={-42} stroke={W.aksen} strokeWidth={6} strokeLinecap="round" transform={`rotate(${menit * 0.5})`} />
    <circle cx={0} cy={0} r={7} fill={W.garis} />
  </g>
);
