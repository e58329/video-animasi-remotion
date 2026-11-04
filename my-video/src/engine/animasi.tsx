import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

const klem = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const useProgres = (mulai = 0, durasi = 20) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [mulai, mulai + durasi], [0, 1], { ...klem, easing: Easing.out(Easing.cubic) });
};

export const formatAngka = (v: number, desimal = 0) => {
  const [bulat, pecah] = Math.abs(v).toFixed(desimal).split(".");
  const ribuan = bulat.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (v < 0 ? "-" : "") + ribuan + (pecah ? "," + pecah : "");
};

export const Muncul: React.FC<{
  mulai?: number;
  arah?: "atas" | "bawah" | "kiri" | "kanan" | "skala";
  jarak?: number;
  children: React.ReactNode;
}> = ({ mulai = 0, arah = "bawah", jarak = 40, children }) => {
  const p = useProgres(mulai, 20);
  const sisa = (1 - p) * jarak;
  const transform =
    arah === "bawah" ? `translateY(${sisa}px)`
    : arah === "atas" ? `translateY(${-sisa}px)`
    : arah === "kiri" ? `translateX(${-sisa}px)`
    : arah === "kanan" ? `translateX(${sisa}px)`
    : `scale(${0.7 + 0.3 * p})`;
  return <div style={{ opacity: p, transform }}>{children}</div>;
};

export const Ketik: React.FC<{ teks: string; mulai?: number; kecepatan?: number; kursor?: boolean }> = ({
  teks,
  mulai = 0,
  kecepatan = 0.8,
  kursor = true,
}) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.min(teks.length, Math.floor((frame - mulai) * kecepatan)));
  const tampil = kursor && Math.floor(frame / 15) % 2 === 0 ? "|" : "";
  return <span>{teks.slice(0, n) + tampil}</span>;
};

export const Hitung: React.FC<{
  dari?: number;
  ke: number;
  mulai?: number;
  durasi?: number;
  desimal?: number;
  awalan?: string;
  akhiran?: string;
}> = ({ dari = 0, ke, mulai = 0, durasi = 45, desimal = 0, awalan = "", akhiran = "" }) => {
  const p = useProgres(mulai, durasi);
  return <span>{awalan + formatAngka(dari + (ke - dari) * p, desimal) + akhiran}</span>;
};

export const Denyut: React.FC<{ amplitudo?: number; periode?: number; children: React.ReactNode }> = ({
  amplitudo = 0.04,
  periode = 12,
  children,
}) => {
  const frame = useCurrentFrame();
  return <div style={{ transform: `scale(${1 + Math.sin(frame / periode) * amplitudo})` }}>{children}</div>;
};

// Untuk dipakai di dalam <svg>
export const Garis: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  warna?: string;
  tebal?: number;
  mulai?: number;
  durasi?: number;
}> = ({ x1, y1, x2, y2, warna = "#00E5FF", tebal = 6, mulai = 0, durasi = 30 }) => {
  const p = useProgres(mulai, durasi);
  const panjang = Math.hypot(x2 - x1, y2 - y1);
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={warna}
      strokeWidth={tebal}
      strokeLinecap="round"
      strokeDasharray={panjang}
      strokeDashoffset={panjang * (1 - p)}
    />
  );
};
