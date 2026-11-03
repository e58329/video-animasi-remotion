import { TopikData } from "./types";

export const FPS = 30;
export const INTRO = 90;
export const OUTRO = 60;
export const OV = 15;

export const hitungJadwal = (data: TopikData) => {
  let mulai = data.judul ? INTRO : 0;
  const jadwal = data.scenes.map((sc) => {
    const dur = Math.max(Math.round(sc.durasi * FPS), 1);
    const item = { mulai, dur };
    mulai += dur;
    return item;
  });
  const total = Math.max(mulai + (data.scenes.length ? OUTRO : 0), 90);
  return { jadwal, total };
};
