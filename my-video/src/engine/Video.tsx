import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { TopikData } from "./types";
import { FPS, INTRO, OV, hitungJadwal } from "./waktu";
import { Kamera } from "./Kamera";
import { Subtitle } from "./Subtitle";
import { Judul } from "./Judul";
import { Fokus } from "./Fokus";
import { Angka } from "./Angka";
import { SFX, berkasSfx } from "./sfx";
import { ambilVisual } from "./visuals";

const klem = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Masuk: React.FC<{ frames: number; children: React.ReactNode }> = ({ frames, children }) => {
  const frame = useCurrentFrame();
  const opacity = frames > 0 ? interpolate(frame, [0, frames], [0, 1], klem) : 1;
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const Video: React.FC<{ data: TopikData }> = ({ data }) => {
  const { jadwal, total } = hitungJadwal(data);
  const frame = useCurrentFrame();
  const ada = data.scenes.length > 0;
  const transisi = data.sfxTransisi || (data.sfxOtomatis ? SFX.transisi : "");

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {ada && data.judul ? (
        <Sequence from={0} durationInFrames={INTRO + OV}>
          <Kamera dur={INTRO + OV} indeks={1}>
            {React.createElement(ambilVisual(data.scenes[0].visual))}
          </Kamera>
        </Sequence>
      ) : null}

      {data.scenes.map((sc, i) => {
        const { mulai, dur } = jadwal[i];
        const dari = Math.max(mulai - OV, 0);
        return (
          <Sequence key={"v" + i} from={dari} durationInFrames={dur + (mulai - dari)}>
            <Masuk frames={mulai - dari}>
              <Kamera dur={dur + OV} indeks={i}>
                {React.createElement(ambilVisual(sc.visual))}
              </Kamera>
            </Masuk>
          </Sequence>
        );
      })}

      <AbsoluteFill
        style={{ background: "radial-gradient(circle, rgba(0,0,0,0) 45%, rgba(0,0,0,0.75) 100%)" }}
      />

      {ada && data.judul ? (
        <Sequence from={0} durationInFrames={INTRO}>
          <Judul judul={data.judul} subjudul={data.subjudul} />
        </Sequence>
      ) : null}

      {data.scenes.map((sc, i) => (
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
          {sc.fokus ? <Fokus teks={sc.fokus} dur={jadwal[i].dur} /> : null}
          {sc.angka ? <Angka {...sc.angka} dur={jadwal[i].dur} /> : null}
          {sc.kata && sc.kata.length > 0 ? <Subtitle kata={sc.kata} /> : null}
        </Sequence>
      ))}

      {transisi
        ? data.scenes.map((_, i) => (
            <Sequence key={"t" + i} from={Math.max(jadwal[i].mulai - OV, 0)}>
              <Audio src={staticFile(transisi)} volume={0.5} />
            </Sequence>
          ))
        : null}

      {ada && data.musik ? (
        <Audio
          src={staticFile(data.musik)}
          loop
          volume={(f) =>
            interpolate(f, [0, 30, Math.max(total - 60, 31), Math.max(total, 32)], [0, 0.12, 0.12, 0], klem)
          }
        />
      ) : null}

      <AbsoluteFill
        style={{ background: "#000", opacity: interpolate(frame, [total - 30, total], [0, 1], klem) }}
      />
    </AbsoluteFill>
  );
};
