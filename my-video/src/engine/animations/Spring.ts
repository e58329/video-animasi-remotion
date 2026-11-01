import { spring } from "remotion";

export const useSpringValue = (frame: number, fps: number, delay: number = 0) => {
  return spring({
    frame,
    fps,
    config: { damping: 12, mass: 1, stiffness: 100 },
    delay,
  });
};
