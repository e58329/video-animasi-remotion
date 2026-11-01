import React from "react";
import { Img, staticFile, useCurrentFrame, interpolate } from "remotion";

export const GambarAset: React.FC<{ namaFile: string }> = ({ namaFile }) => {
  const frame = useCurrentFrame();
  // Efek zoom-in perlahan (Ken Burns effect)
  const scale = interpolate(frame, [0, 150], [1, 1.1]);

  return (
    <Img 
      src={staticFile(namaFile)} 
      style={{ 
        width: "100%", 
        height: "100%", 
        objectFit: "cover", 
        transform: `scale(${scale})`,
        opacity: 0.6 // Dibuat agak transparan agar teks terbaca
      }} 
    />
  );
};
