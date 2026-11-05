import type { NarrationLine } from '../../lib/types';

export const US_CITIES = [
  { x: 0.18, y: 0.35, name: 'Seattle' }, { x: 0.12, y: 0.62, name: 'San Francisco' },
  { x: 0.3, y: 0.72, name: 'Los Angeles' }, { x: 0.48, y: 0.48, name: 'Denver' },
  { x: 0.58, y: 0.78, name: 'Dallas' }, { x: 0.7, y: 0.42, name: 'Chicago' },
  { x: 0.82, y: 0.38, name: 'New York' }, { x: 0.78, y: 0.62, name: 'Washington DC' },
];

export const NARRATION: NarrationLine[] = [
  { t: 0.0, text: 'Tahun 1957. Perang Dingin mencapai puncaknya.' },
  { t: 4.5, text: 'Uni Soviet meluncurkan Sputnik — satelit pertama di dunia.' },
  { t: 9.0, text: 'Amerika panik. Langit bukan lagi milik mereka.' },
  { t: 14.0, text: 'Satu kekhawatiran besar muncul...' },
  { t: 17.0, text: 'Bagaimana jika serangan nuklir memutus SEMUA komunikasi?' },
  { t: 22.0, text: 'Telepon, radio, telegraf — semuanya bisa lumpuh dalam sekejap.' },
  { t: 27.0, text: 'Pemerintah AS butuh jaringan yang TIDAK BISA dihancurkan.' },
  { t: 32.0, text: 'Sebuah jaringan tanpa pusat. Tanpa titik lemah tunggal.' },
  { t: 37.0, text: 'Dan jawabannya datang dari seorang pria di kantor kecil...' },
];

export const SCENE_TIMING = {
  intro: { start: 0, duration: 4.5 }, sputnik: { start: 4.5, duration: 4.5 },
  panicMap: { start: 9, duration: 8 }, disconnect: { start: 17, duration: 5 },
  mesh: { start: 22, duration: 10 }, teaser: { start: 32, duration: 10 },
} as const;
export const TOTAL_DURATION_SEC = 42;
