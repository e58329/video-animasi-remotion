export const PALETTE = {
  bgDark: '#06060f',
  bgDeep: '#0b0f1e',
  star: '#ffffff',
  redAlert: '#ff3b3b',
  coldBlue: '#4a90d9',
  warmAmber: '#f0a500',
  textMain: '#f0f0ff',
  textDim: '#8a8ab0',
  gridLine: '#1a2a4a',
} as const;
export type PaletteKey = keyof typeof PALETTE;
export const DEFAULT_FPS = 30;
