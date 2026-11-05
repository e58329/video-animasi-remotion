import { interpolate } from 'remotion';

export const ip = (
  frame: number,
  input: [number, number],
  output: [number, number],
  easing?: (t: number) => number,
): number =>
  interpolate(frame, input, output, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

export const fade = (
  frame: number,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number,
): number =>
  Math.min(ip(frame, [inStart, inEnd], [0, 1]), ip(frame, [outStart, outEnd], [1, 0]));

export const mulberry32 = (seed: number): (() => number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const sec = (s: number, fps = 30): number => Math.round(s * fps);
