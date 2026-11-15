import React from "react";
import { C, Kanvas, T, useAdegan, sel } from "./VisualSadap";

const TEKS: string[] = ["Sebelum mulai, satu hal penting. Video ini untuk edukasi dan hiburan, bukan nasihat hukum, medis, atau keuangan.", "Informasi bersumber dari data publik yang bisa berubah. Sumbernya ada di deskripsi video, dan kalau ada kekeliruan, tulis di komentar."];

const bungkus = (t: string, maks: number) => {
  const baris: string[] = [];
  let cur = "";
  for (const w of t.split(" ")) {
    if ((cur + " " + w).trim().length > maks) {
      baris.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) baris.push(cur);
  return baris;
};

const susun = () => {
  for (let size = 26; size >= 14; size -= 1) {
    const maks = Math.floor(780 / (size * 0.58));
    const para = TEKS.map((t) => bungkus(t, maks));
    const n = para.reduce((a, b) => a + b.length, 0);
    const tinggi = n * size * 1.35 + (para.length - 1) * size * 0.6;
    if (tinggi <= 440 || size === 14) return { size, para };
  }
  return { size: 14, para: TEKS.map((t) => bungkus(t, 80)) };
};

export const DisclaimerDiam: React.FC = () => {
  const { p } = useAdegan();
  const masuk = sel(p, 0, 0.06);
  const { size, para } = susun();
  let y = 150;
  return (
    <Kanvas penuh>
      <g opacity={masuk}>
        <T x={440} y={70} size={34} fill={C.teal} bold>Catatan penting</T>
        <rect x={60} y={95} width={760} height={4} rx={2} fill={C.teal} opacity={0.5} />
        {para.map((baris, i) => {
          const blok = baris.map((b, j) => (
            <T key={i + "-" + j} x={440} y={y + j * size * 1.35} size={size} fill={C.teks}>{b}</T>
          ));
          y += baris.length * size * 1.35 + size * 0.6;
          return <g key={i}>{blok}</g>;
        })}
      </g>
    </Kanvas>
  );
};
