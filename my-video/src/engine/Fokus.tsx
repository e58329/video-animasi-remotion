import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { tema } from "./tema";

export const Fokus: React.FC<{ teks: string; dur: number }> = ({ teks, dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 120 } });
  const opacity = interpolate(frame, [0, 12, Math.max(dur - 15, 13), Math.max(dur, 14)], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 120, opacity }}>
      <div
        style={{
          fontFamily: tema.font,
          fontSize: 120,
          fontWeight: 900,
          color: tema.aksen,
          textAlign: "center",
          maxWidth: 1700,
          lineHeight: 1.05,
          textShadow: `0 0 40px ${tema.aksen}, 0 6px 20px rgba(0,0,0,0.9)`,
          transform: `scale(${0.8 + 0.2 * pop})`,
        }}
      >
        {teks}
      </div>
    </AbsoluteFill>
  );
};
