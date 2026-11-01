import { SceneKapalSelam } from "./SceneKapalSelam";
import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  delayRender,
  continueRender,
} from "remotion";

type W = { text: string; start: number; end: number };
const CHUNK = 5;

export const VideoSinematik: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const [words, setWords] = useState<W[]>([]);
  const [handle] = useState(() => delayRender("load subtitle"));

  useEffect(() => {
    fetch(staticFile("audio/narasi-whisper.json"))
      .then((r) => r.json())
      .then((d) => {
        setWords(d);
        continueRender(handle);
      })
      .catch((e) => {
        console.error("Gagal load subtitle:", e);
        continueRender(handle);
      });
  }, [handle]);

  const t = frame / fps;
  let idx = words.findIndex((w) => t >= w.start && t <= w.end);
  if (idx === -1) {
    idx = words.reduce((acc, w, i) => (w.start <= t ? i : acc), -1);
  }
  const chunkStart = idx >= 0 ? Math.floor(idx / CHUNK) * CHUNK : 0;
  const chunk = idx >= 0 ? words.slice(chunkStart, chunkStart + CHUNK) : [];
  const last = chunk[chunk.length - 1];
  const visible = chunk.length > 0 && t <= last.end + 0.6;

  const cameraZoom = interpolate(frame, [0, durationInFrames], [1, 1.4]);
  const cameraPanX = interpolate(frame, [0, durationInFrames], [-30, 30]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <Audio src={staticFile("audio/narasi-ardi.mp3")} />

      <SceneKapalSelam />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0) 40%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      <AbsoluteFill
        style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 150 }}
      >
        {visible && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 24,
              maxWidth: 1500,
            }}
          >
            {chunk.map((w, i) => {
              const isActive = t >= w.start && t <= w.end;
              const pop = isActive
                ? spring({
                    frame: frame - Math.round(w.start * fps),
                    fps,
                    config: { damping: 10, stiffness: 200 },
                  })
                : 0;
              return (
                <span
                  key={chunkStart + i}
                  style={{
                    display: "inline-block",
                    fontFamily: "Arial, sans-serif",
                    fontSize: 70,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    color: isActive ? "#00FFFF" : "rgba(255, 255, 255, 0.6)",
                    textShadow: isActive
                      ? "0px 0px 20px #00FFFF, 0px 4px 10px rgba(0,0,0,0.9)"
                      : "0px 4px 10px rgba(0,0,0,0.9)",
                    transform: `scale(${1 + 0.15 * pop})`,
                  }}
                >
                  {w.text.trim()}
                </span>
              );
            })}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
