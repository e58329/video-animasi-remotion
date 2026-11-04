import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SceneData, TopikData } from "./types";
import { FPS } from "./waktu";
import { Kamera } from "./Kamera";
import { Fokus } from "./Fokus";
import { Angka } from "./Angka";
import { SubtitleVertikal } from "./SubtitleVertikal";
import { SFX, berkasSfx } from "./sfx";
import { ambilVisual } from "./visuals";
import { ZONA } from "./zona";

const klem = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const EKOR = 15;
const SKALA_ATAS = 0.7;

export const daftarScene = (data: TopikData, idx: number): SceneData[] => {
  const p = data.potongan?.[idx];
  if (!p) return data.scenes.slice(0, 3);
  const daftar = p.scenes.map((n) => data.scenes[n - 1]).filter(Boolean);
  if (p.cta) daftar.push(p.cta);
  return daftar;
};

export const hitungVertikal = (data: TopikData, idx: number) => {
  let mulai = 0;
  const jadwal = daftarScene(data, idx).map((sc) => {
    const dur = Math.max(Math.round(sc.durasi * FPS), 1);
    const item = { mulai, dur };
    mulai += dur;
    return item;
  });
  return { jadwal, total: Math.max(mulai + EKOR, 90) };
};

const Masuk: React.FC<{ frames: number; children: React.ReactNode }> = ({ frames, children }) => {
  const frame = useCurrentFrame();
  const opacity = frames > 0 ? interpolate(frame, [0, frames], [0, 1], klem) : 1;
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const AreaAtas: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "absolute",
      left: ZONA.kiri,
      top: ZONA.atas,
      width: (ZONA.lebar - ZONA.kiri - ZONA.kanan) / SKALA_ATAS,
      height: 340,
      transform: `scale(${SKALA_ATAS})`,
      transformOrigin: "top left",
    }}
  >
    {children}
  </div>
);

export const VideoVertikal: React.FC<{ data: TopikData; potongan?: number }> = ({ data, potongan = 0 }) => {
  const daftar = daftarScene(data, potongan);
  const { jadwal, total } = hitungVertikal(data, potongan);
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {daftar.map((sc, i) => {
        const V = ambilVisual(sc.visual);
        const { mulai, dur } = jadwal[i];
        const terakhir = i === daftar.length - 1;
        return (
          <Sequence key={"v" + i} from={mulai} durationInFrames={dur + (terakhir ? EKOR : 0)}>
            <Masuk frames={i === 0 ? 0 : 6}>
              <AbsoluteFill style={{ filter: "blur(36px) brightness(0.55)", transform: "scale(1.15)" }}>
                {React.createElement(V)}
              </AbsoluteFill>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: ZONA.jendelaY,
                  width: ZONA.lebar,
                  height: ZONA.jendelaT,
                  overflow: "hidden",
                }}
              >
                <Kamera dur={dur} indeks={i}>
                  {React.createElement(V)}
                </Kamera>
              </div>
            </Masuk>
          </Sequence>
        );
      })}

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {daftar.map((sc, i) => (
        <Sequence key={"s" + i} from={jadwal[i].mulai} durationInFrames={jadwal[i].dur}>
          <Audio src={staticFile(sc.audio)} />
          {(sc.sfx ?? []).map((x, j) => {
            const berkas = berkasSfx(x);
            if (!berkas) return null;
            return (
              <Sequence key={"x" + j} from={Math.round(x.at * FPS)}>
                <Audio src={staticFile(berkas)} volume={x.volume ?? 0.6} />
              </Sequence>
            );
          })}
          {data.sfxOtomatis && (sc.fokus || sc.angka) ? (
            <Sequence from={8}>
              <Audio src={staticFile(SFX.pop)} volume={0.35} />
            </Sequence>
          ) : null}
          {sc.fokus ? (
            <AreaAtas>
              <Fokus teks={sc.fokus} dur={jadwal[i].dur} />
            </AreaAtas>
          ) : null}
          {sc.angka ? (
            <AreaAtas>
              <Angka {...sc.angka} dur={jadwal[i].dur} />
            </AreaAtas>
          ) : null}
          <SubtitleVertikal kata={sc.kata} />
        </Sequence>
      ))}

      {data.musik ? (
        <Audio
          src={staticFile(data.musik)}
          loop
          volume={(f) =>
            interpolate(f, [0, 20, Math.max(total - 30, 21), Math.max(total, 22)], [0, 0.12, 0.12, 0], klem)
          }
        />
      ) : null}

      <AbsoluteFill
        style={{ background: "#000", opacity: interpolate(frame, [total - 12, total], [0, 1], klem) }}
      />
    </AbsoluteFill>
  );
};
