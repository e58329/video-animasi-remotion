import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Hitung } from "./animasi";
import { AngkaData } from "./types";
import { tema } from "./tema";

export const Angka: React.FC<AngkaData & { dur: number }> = ({
  dari = 0,
  ke,
  desimal = 0,
  awalan = "",
  akhiran = "",
  label,
  dur,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 120 } });
  const opacity = interpolate(frame, [0, 12, Math.max(dur - 15, 13), Math.max(dur, 14)], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 90, opacity }}>
      <div style={{ textAlign: "center", transform: `scale(${0.8 + 0.2 * pop})` }}>
        <div
          style={{
            fontFamily: tema.font,
            fontSize: 150,
            fontWeight: 900,
            color: tema.aksen,
            lineHeight: 1,
            textShadow: `0 0 40px ${tema.aksen}, 0 6px 20px rgba(0,0,0,0.9)`,
          }}
        >
          <Hitung dari={dari} ke={ke} mulai={8} durasi={50} desimal={desimal} awalan={awalan} akhiran={akhiran} />
        </div>
        {label ? (
          <div
            style={{
              fontFamily: tema.font,
              fontSize: 48,
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              marginTop: 10,
              textShadow: "0 4px 14px rgba(0,0,0,0.9)",
            }}
          >
            {label}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
