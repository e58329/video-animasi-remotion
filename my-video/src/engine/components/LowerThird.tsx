import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const LowerThird: React.FC<{ judul: string; subtitle: string; warna: string }> = ({ judul, subtitle, warna }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animasi masuk dari kiri
  const slideIn = spring({ frame, fps, delay: 20, config: { damping: 14 } });
  const translateX = interpolate(slideIn, [0, 1], [-500, 0]);

  return (
    <div style={{
      position: "absolute", bottom: 100, left: 100,
      transform: `translateX(${translateX}px)`,
      borderLeft: `8px solid ${warna}`,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: "20px 40px",
      borderRadius: "0 10px 10px 0",
      color: "white", fontFamily: "sans-serif"
    }}>
      <h2 style={{ margin: 0, fontSize: 50 }}>{judul}</h2>
      <p style={{ margin: 0, fontSize: 30, color: "#ccc" }}>{subtitle}</p>
    </div>
  );
};
