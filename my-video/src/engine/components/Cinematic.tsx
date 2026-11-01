import React from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from "remotion";

type Props = {
  children: React.ReactNode;
  zoomFrom?: number;
  zoomTo?: number;
  panX?: number;
  letterbox?: boolean;
};

export const Cinematic: React.FC<Props> = ({
  children, zoomFrom = 1, zoomTo = 1.08, panX = 0, letterbox = true,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, width, height} = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateRight: "clamp",
  });
  const scale = zoomFrom + (zoomTo - zoomFrom) * t;
  const bar = letterbox ? Math.max(0, (height - width / 2.35) / 2) : 0;

  return (
    <AbsoluteFill style={{background: "#000"}}>
      <AbsoluteFill style={{transform: `scale(${scale}) translateX(${panX * t}px)`}}>
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)"}}
      />
      <AbsoluteFill style={{opacity: 0.07, mixBlendMode: "overlay"}}>
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed={frame % 8} />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </AbsoluteFill>
      {bar > 0 && (
        <>
          <div style={{position: "absolute", top: 0, left: 0, right: 0, height: bar, background: "#000"}} />
          <div style={{position: "absolute", bottom: 0, left: 0, right: 0, height: bar, background: "#000"}} />
        </>
      )}
    </AbsoluteFill>
  );
};
