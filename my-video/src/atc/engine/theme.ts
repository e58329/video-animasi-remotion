export const C = {
  bg: '#061220',
  bg2: '#0d2a47',
  grid: '#14395e',
  cyan: '#38e1ff',
  green: '#3dffa0',
  amber: '#ffb52e',
  red: '#ff4d5e',
  white: '#f2f8ff',
  dim: '#86a8c8',
  panel: 'rgba(8,24,44,0.88)',
};

export const FONT = '"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif';

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const rad = (d: number) => (d * Math.PI) / 180;

export type VisualKey =
  | 'radar'
  | 'sky'
  | 'timeline'
  | 'tower'
  | 'roles'
  | 'radio'
  | 'separation'
  | 'runway'
  | 'holding'
  | 'squawk'
  | 'lightgun'
  | 'tcas'
  | 'future'
  | 'subscribe'
  | 'cta';

export type SceneDef = {
  id: string;
  visual: VisualKey;
  title: string;
  text: string;
  ch?: string;
  big?: string;
  data?: any;
};

export type VProps = {
  dur: number; // total frame scene
  vertical: boolean;
  data?: any;
  big?: string;
};
