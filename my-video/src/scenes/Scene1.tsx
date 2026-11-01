import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedText } from "../engine/components/Text";

export const Scene1 = () => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
    <AnimatedText text="Welcome to Remotion Engine" />
  </AbsoluteFill>
);
