import React from "react";
import { useAdegan } from "./VisualSadap";
import { W, mulus, antar, napas, campur } from "./halus";
import { LatarTipo, TeksBesar, Label, GarisAksen, IkonKoin } from "./TipografiV3";
import { Figur, FigurSpek } from "./FigurMan";

const c = (x: number, y: number, r: number) =>
  `M${x - r},${y} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0`;

type Bagian = { d: string; aksen?: boolean; putar?: boolean; tebal?: number };

export const IKON: Record<string, Bagian[]> = {
  brankas: [
    { d: "M-40,-34 h80 v68 h-80 z" },
    { d: c(-8, 0, 15), aksen: true },
    { d: "M26,-8 v16" },
    { d: "M-28,34 v10 M28,34 v10" },
  ],
  koin: [{ d: c(0, 0, 36), aksen: true }, { d: c(0, 0, 18) }],
  kunci: [{ d: c(-24, 0, 16), aksen: true }, { d: "M-8,0 H42 M30,0 V14 M42,0 V10" }],
  laptop: [{ d: "M-36,-32 h72 v48 h-72 z" }, { d: "M-50,30 H50" }, { d: "M-8,-8 h16", aksen: true }],
  terminal: [
    { d: "M-44,-32 h88 v64 h-88 z" },
    { d: "M-30,-12 l14,10 l-14,10", aksen: true },
    { d: "M-4,12 h24" },
  ],
  radar: [
    { d: c(0, 0, 42) },
    { d: c(0, 0, 24) },
    { d: "M0,0 L36,-22", aksen: true, putar: true },
    { d: c(22, 14, 4) },
  ],
  jaringan: [
    { d: "M-34,-20 L0,-34 L34,-14 L26,28 L-20,26 Z M0,-34 L-20,26 M0,-34 L26,28" },
    { d: c(-34, -20, 6), aksen: true },
    { d: c(0, -34, 6), aksen: true },
    { d: c(34, -14, 6), aksen: true },
    { d: c(26, 28, 6), aksen: true },
    { d: c(-20, 26, 6), aksen: true },
  ],
  mata: [{ d: "M-46,0 Q0,-42 46,0 Q0,42 -46,0 Z" }, { d: c(0, 0, 13), aksen: true }],
  stempel: [
    { d: "M-28,-42 h38 l18,18 v64 h-56 z" },
    { d: "M-16,-8 h32 M-16,8 h32 M-16,24 h18" },
    { d: c(22, 28, 13), aksen: true },
  ],
  perisai: [
    { d: "M0,-44 L36,-30 V2 Q36,30 0,46 Q-36,30 -36,2 V-30 Z" },
    { d: "M-14,2 l10,10 l20,-22", aksen: true },
  ],
  jam: [{ d: c(0, 0, 42) }, { d: "M0,0 V-26", putar: true }, { d: "M0,0 L16,10", aksen: true }],
  tautan: [
    { d: "M-4,-18 H-24 A18,18 0 0 0 -24,18 H-4" },
    { d: "M4,-18 H24 A18,18 0 0 1 24,18 H4", aksen: true },
    { d: "M-14,0 H14" },
  ],
  update: [{ d: "M30,-10 A32,32 0 1 0 34,8", aksen: true }, { d: "M32,-28 V-10 H14" }],
  sebar: [
    { d: "M-44,0 H-8 M-8,0 L24,-28 M-8,0 H24 M-8,0 L24,28" },
    { d: c(32, -28, 7), aksen: true },
    { d: c(34, 0, 7), aksen: true },
    { d: c(32, 28, 7), aksen: true },
  ],
  orang: [{ d: c(0, -22, 14), aksen: true }, { d: "M-34,42 Q-34,6 0,6 Q34,6 34,42" }],
  chat: [
    { d: "M-46,-32 h92 v52 h-48 l-18,18 v-18 h-26 z" },
    { d: "M-22,-6 h2 M0,-6 h2 M22,-6 h2", aksen: true, tebal: 9 },
  ],
  paket: [
    { d: "M-36,-18 L0,-38 L36,-18 V22 L0,42 L-36,22 Z" },
    { d: "M-36,-18 L0,2 L36,-18 M0,2 V42", aksen: true },
  ],
  grafik: [{ d: "M-42,-38 V38 H46" }, { d: "M-22,38 V10 M0,38 V-10 M22,38 V-30", aksen: true, tebal: 10 }],
  beku: [{ d: "M0,-42 V42 M-36,-21 L36,21 M-36,21 L36,-21", aksen: true }, { d: c(0, 0, 8) }],
  tukar: [
    { d: "M-38,-14 H30 M18,-28 L32,-14 L18,0", aksen: true },
    { d: "M38,14 H-30 M-18,0 L-32,14 L-18,28" },
  ],
  cuci: [
    { d: "M-38,-42 h76 v84 h-76 z" },
    { d: c(0, 8, 24), aksen: true },
    { d: "M-26,-28 h2 M-14,-28 h2", tebal: 8 },
  ],
  waktu: [{ d: "M-46,0 H46" }, { d: "M-30,-14 V14 M-10,-14 V14 M10,-14 V14 M30,-14 V14", aksen: true }],
  laci: [{ d: "M-42,-38 h84 v34 h-84 z M-42,4 h84 v34 h-84 z" }, { d: "M-12,-21 h24 M-12,21 h24", aksen: true }],
  dompet: [{ d: "M-42,-26 H34 V36 H-42 Z" }, { d: "M12,-6 h32 v24 h-32 z", aksen: true }, { d: c(26, 6, 3) }],
  container: [{ d: "M-46,-6 h42 v32 h-42 z M0,-6 h42 v32 h-42 z M-22,-38 h42 v32 h-42 z" }],
  pena: [
    { d: "M-34,34 L-18,30 L30,-18 L20,-28 L-28,20 Z", aksen: true },
    { d: "M-44,44 h30 q10,-12 20,0 t20,0" },
  ],
};

export type Spek = {
  label: string;
  besar: string;
  kecil: string;
  ikon: string;
  efek?: "koin";
  bahaya?: boolean;
  figur?: FigurSpek;
};

const Gambar: React.FC<{ nama: string; p: number; t: number }> = ({ nama, p, t }) => {
  const bagian = IKON[nama] ?? IKON.koin;
  return (
    <g>
      {bagian.map((b, i) => {
        const k = mulus(p, 0.08 + i * 0.04, 0.3 + i * 0.04);
        if (k <= 0.001) return null;
        const el = (
          <path
            d={b.d}
            pathLength={1}
            fill="none"
            stroke={b.aksen ? W.aksen : W.garis}
            strokeWidth={b.tebal ?? 5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1 1"
            strokeDashoffset={1 - k}
          />
        );
        return b.putar ? (
          <g key={i} transform={`rotate(${t * (nama === "jam" ? 90 : 80)})`}>
            {el}
          </g>
        ) : (
          <g key={i}>{el}</g>
        );
      })}
    </g>
  );
};

export const Tipo: React.FC<{ s: Spek }> = ({ s }) => {
  const { t, p } = useAdegan();
  const k1 = mulus(p, 0.04, 0.2);
  const k2 = mulus(p, 0.14, 0.3);
  const garis = antar(p, 0.2, 0.42);
  const ub = Math.min(220, 780 / (0.58 * Math.max(1, s.besar.length)));
  const uk = Math.min(78, (s.figur ? 520 : 760) / (0.52 * Math.max(1, s.kecil.length)));
  const yk = 270 + 24 + uk;
  return (
    <LatarTipo>
      <Label x={60} y={92} t={s.label} k={k1} />
      <TeksBesar x={56} y={270} t={s.besar} k={k1} ukuran={ub} />
      <TeksBesar
        x={60}
        y={yk}
        t={s.kecil}
        k={k2}
        ukuran={uk}
        warna={s.bahaya ? W.bahaya : W.aksen}
        tebal={700}
        geser={30}
      />
      <GarisAksen x={62} y={yk + 34} panjang={300} k={garis} />
      <circle cx={700} cy={400} r={190} fill="none" stroke={W.garis} strokeOpacity={0.07} strokeWidth={3} opacity={k1} />
      {s.figur ? (
        <Figur f={s.figur} t={t} p={p} x={s.figur.prop === "laptop" ? 610 : 700} y={568} />
      ) : (
        <g transform={`translate(720 ${470 + napas(t, 3.2, 5)}) scale(1.3)`}>
          <Gambar nama={s.ikon} p={p} t={t} />
        </g>
      )}
      {s.efek === "koin" &&
        Array.from({ length: 5 }, (_, i) => {
          const a = 0.34 + i * 0.06;
          const k = antar(p, a, a + 0.3);
          if (k <= 0 || k >= 1) return null;
          const x = campur(720, 835, k);
          const y = campur(470, 330 + (i % 3) * 26, k) - Math.sin(k * Math.PI) * 40;
          const o = Math.min(1, k * 8) * (1 - antar(k, 0.8, 1));
          return <IkonKoin key={i} x={x} y={y} r={14} o={o} />;
        })}
    </LatarTipo>
  );
};
