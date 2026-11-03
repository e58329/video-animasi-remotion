export type Kata = { t: string; s: number; e: number };

export type Sfx = { file: string; at: number; volume?: number };

export type SceneData = {
  sfx?: Sfx[];
  fokus?: string;
  visual: string;
  teks: string;
  audio: string;
  durasi: number;
  kata: Kata[];
};

export type TopikData = {
  judul: string;
  subjudul?: string;
  musik?: string;
  sfxTransisi?: string;
  scenes: SceneData[];
};
