import React, { useMemo } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Kata } from "./types";
import { tema } from "./tema";
import { ZONA } from "./zona";

const MAKS = 5;

const buatKelompok = (kata: Kata[]) => {
  const hasil: Kata[][] = [];
  let cur: Kata[] = [];
  kata.forEach((k) => {
    cur.push(k);
    const akhirKalimat = /[.!?]$/.test(k.t);
    const jedaKoma = /[,;:]$/.test(k.t) && cur.length >= 3;
    if (akhirKalimat || jedaKoma || cur.length >= MAKS) {
      hasil.push(cur);
      cur = [];
    }
  });
  if (cur.length) hasil.push(cur);
  return hasil;
};

export const SubtitleVertikal: React.FC<{ kata: Kata[] }> = ({ kata }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const kelompok = useMemo(() => buatKelompok(kata), [kata]);
  if (!kelompok.length) return null;

  let idx = 0;
  kelompok.forEach((g, i) => {
    if (t >= g[0].s - 0.05) idx = i;
  });
  const g = kelompok[idx];
  const mulai = g[0].s - 0.05;
  if (t < mulai || t > g[g.length - 1].e + 0.6) return null;
  const masuk = Math.min(1, (t - mulai) * 12);

  return (
    <div
      style={{
        position: "absolute",
        left: ZONA.kiri,
        top: ZONA.subY,
        width: ZONA.lebar - ZONA.kiri - ZONA.kanan,
        height: ZONA.subT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: masuk,
        transform: `translateY(${(1 - masuk) * 14}px)`,
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: 4 }}>
        {g.map((k, i) => {
          const aktif = t >= k.s && t < k.e;
          const lewat = t >= k.e;
          const pop = aktif
            ? spring({ frame: frame - Math.round(k.s * fps), fps, config: { damping: 12, stiffness: 220 } })
            : 0;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                margin: "0 10px",
                fontFamily: tema.font,
                fontSize: 62,
                fontWeight: 800,
                color: aktif ? tema.aksen : lewat ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                textShadow: aktif
                  ? `0 0 20px ${tema.aksen}, 0 4px 10px rgba(0,0,0,0.95)`
                  : "0 4px 12px rgba(0,0,0,0.95)",
                transform: `scale(${1 + 0.06 * pop})`,
              }}
            >
              {k.t}
            </span>
          );
        })}
      </div>
    </div>
  );
};
