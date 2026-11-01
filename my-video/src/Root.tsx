import React from "react";
import { Composition, staticFile } from "remotion";
import { VideoSinematik } from "./VideoSinematik";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="VideoNatGeo"
      component={VideoSinematik}
      durationInFrames={900}
      fps={FPS}
      width={1920}
      height={1080}
      calculateMetadata={async () => {
        try {
          const res = await fetch(staticFile("audio/narasi-whisper.json"));
          const words: { end: number }[] = await res.json();
          const lastEnd = words[words.length - 1].end;
          return { durationInFrames: Math.ceil((lastEnd + 1.5) * FPS) };
        } catch {
          return { durationInFrames: 900 };
        }
      }}
    />
  );
};
