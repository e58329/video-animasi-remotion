import { Sfx } from "./types";

// Nama pendek -> berkas di public/sfx (Kenney Interface Sounds, CC0)
export const SFX: Record<string, string> = {
  klik: "sfx/klik.mp3",
  pop: "sfx/pop.mp3",
  transisi: "sfx/transisi.mp3",
  transisi2: "sfx/transisi2.mp3",
  sukses: "sfx/sukses.mp3",
  konfirmasi: "sfx/konfirmasi.mp3",
  error: "sfx/error.mp3",
  tetes: "sfx/tetes.mp3",
  tetes2: "sfx/tetes2.mp3",
  semprot: "sfx/semprot.mp3",
  kaca: "sfx/kaca.mp3",
  geser: "sfx/geser.mp3",
  tombol: "sfx/tombol.mp3",
  tick: "sfx/tick.mp3",
  pluck: "sfx/pluck.mp3",
  pertanyaan: "sfx/pertanyaan.mp3",
  glitch: "sfx/glitch.mp3",
  buka: "sfx/buka.mp3",
  tutup: "sfx/tutup.mp3",
  bong: "sfx/bong.mp3",
};

export const berkasSfx = (x: Sfx): string | undefined => x.file ?? (x.nama ? SFX[x.nama] : undefined);
