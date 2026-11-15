import React from "react";

export type Titik = { x: number; y: number };
export type Lintasan = (t: number) => Titik;

export type OpsiMiring = {
  hadap?: "kanan" | "kiri";
  offset?: number;
  kekuatan?: number;
  batas?: number;
  jendela?: number;
};

const RAD = 180 / Math.PI;

export const miringPada = (
  lintasan: Lintasan,
  t: number,
  opsi: OpsiMiring = {},
): number => {
  const { hadap = "kanan", offset = 0, kekuatan = 0.6, batas = 35, jendela = 0.03 } = opsi;
  const a = lintasan(Math.max(0, t - jendela));
  const b = lintasan(Math.min(1, t + jendela));
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const sudut =
    hadap === "kanan" ? Math.atan2(dy, dx) * RAD : Math.atan2(-dy, -dx) * RAD;
  const rel = ((sudut + 540) % 360) - 180;
  const sisa = hadap === "kanan" ? rel : ((rel + 540) % 360) - 180;
  const dibatasi = Math.max(-batas, Math.min(batas, sisa * kekuatan));
  return dibatasi + offset;
};

export const PesawatMiring: React.FC<{
  lintasan: Lintasan;
  t: number;
  opsi?: OpsiMiring;
  children: (p: { x: number; y: number; rot: number }) => React.ReactNode;
}> = ({ lintasan, t, opsi, children }) => {
  const tt = Math.max(0, Math.min(1, t));
  const { x, y } = lintasan(tt);
  const rot = miringPada(lintasan, tt, opsi);
  return <>{children({ x, y, rot })}</>;
};
