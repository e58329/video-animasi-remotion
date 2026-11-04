export type Kata = { t: string; s: number; e: number };

export type Sfx = { file?: string; nama?: string; at: number; volume?: number };

export type AngkaData = {
  ke: number;
  dari?: number;
  desimal?: number;
  awalan?: string;
  akhiran?: string;
  label?: string;
};

export type SceneData = {
  sfx?: Sfx[];
  fokus?: string;
  angka?: AngkaData | null;
  visual: string;
  teks: string;
  audio: string;
  durasi: number;
  kata: Kata[];
};

export type Potongan = { nama: string; scenes: number[]; cta?: SceneData };

export type TopikData = {
  potongan?: Potongan[];
  judul: string;
  subjudul?: string;
  musik?: string;
  sfxTransisi?: string;
  sfxOtomatis?: boolean;
  scenes: SceneData[];
};
