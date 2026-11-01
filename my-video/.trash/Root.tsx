import { Composition } from "remotion";
import { MyComp } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Perbandingan"
      component={MyComp}
      durationInFrames={14400}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
