import { interpolate, Easing } from "remotion";

const jepit = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const W = {
  latar: "#0E1525",
  permukaan: "#18233A",
  garis: "#E8EEF9",
  redup: "#7C8CA8",
  aksen: "#FFC857",
  bahaya: "#FF6B6B",
};

const keluar = Easing.bezier(0.16, 1, 0.3, 1);
const lembut = Easing.bezier(0.45, 0, 0.15, 1);

export const mulus = (p: number, a: number, b: number) =>
  interpolate(p, [a, b], [0, 1], { ...jepit, easing: keluar });

export const antar = (p: number, a: number, b: number) =>
  interpolate(p, [a, b], [0, 1], { ...jepit, easing: lembut });

export const kenyal = (p: number, a: number, b: number) => {
  const x = Math.max(0, Math.min(1, (p - a) / (b - a)));
  if (x >= 1) return 1;
  return 1 - Math.exp(-6 * x) * (Math.cos(6 * x) + Math.sin(6 * x));
};

export const urut = (p: number, i: number, jeda: number, mulai: number, dur: number) =>
  mulus(p, mulai + i * jeda, mulai + i * jeda + dur);

export const campur = (a: number, b: number, k: number) => a + (b - a) * k;

export const napas = (t: number, periode = 3.2, amp = 1, fase = 0) =>
  Math.sin(((t + fase) * Math.PI * 2) / periode) * amp;

export const garisGambar = (panjang: number, k: number) => ({
  strokeDasharray: panjang,
  strokeDashoffset: panjang * (1 - k),
});
