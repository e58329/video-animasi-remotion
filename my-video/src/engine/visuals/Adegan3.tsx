import React from "react";
import { C, Kanvas, T, useAdegan, sel } from "./VisualSadap";

const Kartu: React.FC<{ x: number; y: number; r: number; warna: string; label: string; o: number }> = ({ x, y, r, warna, label, o }) => (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r} 65 85)`}>
    <rect x={0} y={0} width={130} height={170} rx={14} fill="rgba(255,255,255,0.06)" stroke={warna} strokeWidth={4} />
    <T x={65} y={36} size={20} fill={warna}>{label}</T>
    <rect x={20} y={64} width={90} height={8} rx={4} fill="rgba(255,255,255,0.18)" />
    <rect x={20} y={90} width={70} height={8} rx={4} fill="rgba(255,255,255,0.18)" />
    <rect x={20} y={116} width={80} height={8} rx={4} fill="rgba(255,255,255,0.18)" />
  </g>
);

export const PerangKode: React.FC = () => {
  const { p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const kirim = sel(p, 0.1, 0.4);
  const acak = sel(p, 0.45, 0.62);
  const tiba = sel(p, 0.62, 0.7);
  const pecah = sel(p, 0.72, 0.9);
  const putar = p * 720;
  const rotor = [380, 440, 500];
  return (
    <Kanvas>
      <g opacity={masuk}>
        <rect x={30} y={240} width={180} height={110} rx={14} fill="rgba(255,255,255,0.06)" stroke={C.cyan} strokeWidth={4} />
        <T x={120} y={275} size={20} fill={C.redup}>Pesan asli</T>
        <T x={120} y={322} size={26} fill={C.teks}>HALO DUNIA</T>
        <rect x={340} y={190} width={200} height={210} rx={18} fill="rgba(255,255,255,0.05)" stroke={C.ungu} strokeWidth={4} />
        <T x={440} y={228} size={22} fill={C.ungu}>Mesin sandi</T>
        {rotor.map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy={310} r={26} fill="rgba(255,255,255,0.06)" stroke={C.ungu} strokeWidth={4} />
            <line x1={cx} y1={310} x2={cx} y2={288} stroke={C.teks} strokeWidth={4} strokeLinecap="round" transform={`rotate(${putar * (i + 1)} ${cx} 310)`} />
          </g>
        ))}
      </g>
      <rect x={210 + 130 * kirim - 20} y={285} width={40} height={30} rx={6} fill={C.cyan} opacity={kirim > 0 && kirim < 1 ? 1 : 0} />
      <rect x={540 + 130 * acak - 20} y={285} width={40} height={30} rx={6} fill={C.merah} opacity={acak > 0 && acak < 1 ? 1 : 0} />
      <g opacity={tiba}>
        <rect x={670} y={240} width={180} height={110} rx={14} fill="rgba(255,255,255,0.06)" stroke={C.merah} strokeWidth={4} />
        <T x={760} y={275} size={20} fill={C.redup}>Disadap</T>
        <T x={760} y={322} size={26} fill={C.merah}>KDOR GXQLD</T>
      </g>
      <g opacity={sel(p, 0.72, 0.8)}>
        <line x1={760} y1={352} x2={650} y2={452} stroke={C.merah} strokeWidth={4} strokeDasharray="8 8" />
        <rect x={230} y={452} width={420} height={120} rx={16} fill="rgba(255,255,255,0.06)" stroke={C.cyan} strokeWidth={4} />
        <T x={440} y={486} size={20} fill={C.redup}>Pemecah kode</T>
        <T x={440} y={540} size={36} fill={pecah > 0.5 ? C.cyan : C.merah}>{pecah > 0.5 ? "HALO DUNIA" : "KDOR GXQLD"}</T>
      </g>
    </Kanvas>
  );
};

export const LimaKriteria: React.FC = () => {
  const { p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const garis = sel(p, 0.08, 0.85);
  const xs = [115, 280, 445, 610, 775];
  const label: string[][] = [["Infrastruktur", "global"], ["Intelijen", "sinyal"], [], [], []];
  return (
    <Kanvas>
      <g opacity={masuk}>
        <T x={440} y={120} size={48} fill={C.cyan}>Lima kriteria</T>
      </g>
      <line x1={115} y1={300} x2={115 + 660 * garis} y2={300} stroke="rgba(255,255,255,0.18)" strokeWidth={6} />
      {xs.map((x, i) => {
        const o = sel(p, 0.1 + i * 0.15, 0.2 + i * 0.15);
        return (
          <g key={i} opacity={o}>
            <circle cx={x} cy={300} r={50} fill="rgba(0,229,255,0.15)" stroke={C.cyan} strokeWidth={5} />
            <T x={x} y={316} size={46} fill={C.teks}>{String(i + 1)}</T>
            {label[i].map((l, j) => (
              <T key={j} x={x} y={392 + j * 28} size={21} fill={C.teks}>{l}</T>
            ))}
          </g>
        );
      })}
    </Kanvas>
  );
};

export const DasarHukum: React.FC = () => {
  const { p } = useAdegan();
  const segel = sel(p, 0, 0.2);
  const pos: number[][] = [[60, 60, -8], [690, 70, 6], [40, 390, 5], [700, 390, -6], [375, 420, 3]];
  const warna = [C.cyan, C.ungu, C.teal, C.cyan, C.ungu];
  return (
    <Kanvas>
      {pos.map((q, i) => (
        <Kartu key={i} x={q[0]} y={q[1] + Math.sin(p * 8 + i * 1.3) * 5} r={q[2]} warna={warna[i]} label="Aturan" o={sel(p, 0.25 + i * 0.12, 0.4 + i * 0.12)} />
      ))}
      <g opacity={segel}>
        <circle cx={440} cy={300} r={80} fill="rgba(0,229,255,0.12)" stroke={C.cyan} strokeWidth={5} />
        <T x={440} y={294} size={28} fill={C.cyan}>Dasar</T>
        <T x={440} y={330} size={28} fill={C.teks}>hukum</T>
      </g>
    </Kanvas>
  );
};
