import React from "react";
import { Composition } from "remotion";
import { Video } from "./engine/Video";
import { FPS, hitungJadwal } from "./engine/waktu";
import { TopikData } from "./engine/types";
import data from "./topik/data.json";

const topik = data as unknown as TopikData;

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Video"
    component={Video}
    width={1920}
    height={1080}
    fps={FPS}
    durationInFrames={hitungJadwal(topik).total}
    defaultProps={{ data: topik }}
    calculateMetadata={({ props }) => ({ durationInFrames: hitungJadwal(props.data).total })}
  />
);
