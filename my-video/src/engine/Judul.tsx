import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { INTRO } from "./waktu";
import { tema } from "./tema";

export const Judul: React.FC<{ judul: string; subjudul?: string }> = ({ judul, subjudul }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const naik = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const opacity = interpolate(frame, [0, 15, INTRO - 20, INTRO], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const garis = interpolate(frame, [10, 40], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity }}>
      <div style={{ textAlign: "center", transform: `translateY(${(1 - naik) * 40}px)` }}>
        <div
          style={{
            fontFamily: tema.font,
            fontSize: 110,
            fontWeight: 900,
            color: "#fff",
            textShadow: "0 6px 30px rgba(0,0,0,0.8)",
            maxWidth: 1600,
            lineHeight: 1.1,
          }}
        >
          {judul}
        </div>
        <div style={{ width: garis, height: 6, background: tema.aksen, margin: "30px auto", borderRadius: 3 }} />
        {subjudul ? (
          <div
            style={{
              fontFamily: tema.font,
              fontSize: 44,
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              textShadow: "0 4px 14px rgba(0,0,0,0.8)",
            }}
          >
            {subjudul}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
