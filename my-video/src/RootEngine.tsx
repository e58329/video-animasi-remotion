import {AtcCompositions} from './atc/register';
import React from "react";
import { Composition } from "remotion";
import { Video } from "./engine/Video";
import { VideoVertikal, hitungVertikal } from "./engine/VideoVertikal";
import { FPS, hitungJadwal } from "./engine/waktu";
import { TopikData } from "./engine/types";
import data from "./topik/data.json";

const topik = data as unknown as TopikData;

export const RootEngine: React.FC = () => (
  <>
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
    <Composition
      id="Vertikal"
      component={VideoVertikal}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={hitungVertikal(topik, 0).total}
      defaultProps={{ data: topik, potongan: 0 }}
      calculateMetadata={({ props }) => ({ durationInFrames: hitungVertikal(props.data, props.potongan ?? 0).total })}
    />
    <AtcCompositions />
    </>
);
