import React from "react";

export const Pesawat: React.FC<{ x: number; y: number; rotasi?: number; skala?: number; warna?: string }> = ({
  x,
  y,
  rotasi = 0,
  skala = 1,
  warna = "#ffffff",
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotasi}) scale(${skala})`}>
    <path
      d="M0,-34 L7,-12 L44,10 L44,19 L7,9 L5,30 L18,38 L18,44 L0,40 L-18,44 L-18,38 L-5,30 L-7,9 L-44,19 L-44,10 L-7,-12 Z"
      fill={warna}
    />
  </g>
);
