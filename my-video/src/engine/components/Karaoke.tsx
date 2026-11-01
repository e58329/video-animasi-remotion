import React, {useEffect, useState} from "react";
import {continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig} from "remotion";

type W = {t: string; s: number; e: number};

const buildLines = (words: W[], perLine: number): W[][] => {
  const lines: W[][] = [];
  let cur: W[] = [];
  for (const w of words) {
    cur.push(w);
    if (cur.length >= perLine || /[.!?]$/.test(w.t)) {
      lines.push(cur);
      cur = [];
    }
  }
  if (cur.length) lines.push(cur);
  return lines;
};

export const Karaoke: React.FC<{
  src?: string;
  offsetSec?: number;
  bottom?: number;
  perLine?: number;
}> = ({src = "audio/narasi-ardi.words.json", offsetSec = 0, bottom = 170, perLine = 7}) => {
  const [words, setWords] = useState<W[]>([]);
  const [handle] = useState(() => delayRender("karaoke"));
  useEffect(() => {
    fetch(staticFile(src))
      .then((r) => r.json())
      .then((j) => {
        setWords(j.words);
        continueRender(handle);
      })
      .catch(() => continueRender(handle));
  }, [handle, src]);

  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const now = frame / fps - offsetSec;
  const lines = buildLines(words, perLine);

  let line: W[] | undefined;
  for (const l of lines) {
    if (l[0].s - 0.05 <= now) line = l;
    else break;
  }
  if (!line || now > line[line.length - 1].e + 0.5) return null;

  return (
    <div style={{position: "absolute", left: 0, right: 0, bottom, display: "flex", justifyContent: "center", padding: "0 120px"}}>
      <div style={{fontFamily: "Inter, Arial, sans-serif", fontWeight: 800, fontSize: 56, lineHeight: 1.25, textAlign: "center", textShadow: "0 3px 12px rgba(0,0,0,0.9)"}}>
        {line.map((w, i) => (
          <span key={i} style={{color: now >= w.s ? "#FFD54A" : "rgba(255,255,255,0.6)", marginRight: 14}}>
            {w.t}
          </span>
        ))}
      </div>
    </div>
  );
};
