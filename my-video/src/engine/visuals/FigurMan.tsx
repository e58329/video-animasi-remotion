import React from "react";
import { W, mulus } from "./halus";

type Sudut = [number, number];
type Ekspresi = "senyum" | "kaget" | "bicara" | "datar";
type Pose = {
  tK: Sudut;
  tR: Sudut;
  kK: Sudut;
  kR: Sudut;
  naik: number;
  miring: number;
  ekspresi: Ekspresi;
};

export type PoseNama = "diam" | "lambai" | "ketik" | "kaget" | "tunjuk" | "bicara";
export type FigurSpek = {
  pose: PoseNama;
  baju?: string;
  celana?: string;
  rambut?: string;
  aksesori?: "tudung" | "dasi" | "kacamata";
  prop?: "laptop" | "chat" | "kaca" | "cv";
  bahaya?: boolean;
};

const S = Math.sin;
const rad = (d: number) => (d * Math.PI) / 180;
const GELAP = "#0A101D";
const KULIT = "#F2C9A5";
const FONT = 'Inter, "Segoe UI", Roboto, system-ui, sans-serif';
const SX = 22;
const SY = -158;
const HX = 12;
const HY = -98;
const UA = 44;
const FA = 40;
const TH = 52;
const SN = 50;

const ujung = (x: number, y: number, a1: number, a2: number, l1: number, l2: number) => {
  const sx = x + l1 * Math.sin(rad(a1));
  const sy = y + l1 * Math.cos(rad(a1));
  const tx = sx + l2 * Math.sin(rad(a1 + a2));
  const ty = sy + l2 * Math.cos(rad(a1 + a2));
  return { sx, sy, tx, ty };
};

const POSE: Record<PoseNama, (t: number) => Pose> = {
  diam: (t) => ({
    tK: [8 + 2 * S(t * 2), 4], tR: [8 + 2 * S(t * 2 + 1), 4],
    kK: [4, 0], kR: [4, 0], naik: 1.5 * S(t * 2), miring: 0, ekspresi: "senyum",
  }),
  lambai: (t) => ({
    tK: [8, 4], tR: [145, 28 * S(t * 9)],
    kK: [4, 0], kR: [4, 0], naik: 1.5 * S(t * 2), miring: 2 * S(t * 2), ekspresi: "senyum",
  }),
  ketik: (t) => ({
    tK: [-70, -10 + 4 * S(t * 13 + 1)], tR: [62, 20 + 5 * S(t * 13)],
    kK: [4, 0], kR: [4, 0], naik: S(t * 2), miring: -2, ekspresi: "datar",
  }),
  kaget: (t) => ({
    tK: [150, 8 * S(t * 20)], tR: [150, 8 * S(t * 20 + 1)],
    kK: [12, 0], kR: [12, 0], naik: 0, miring: 3 * S(t * 18), ekspresi: "kaget",
  }),
  tunjuk: (t) => ({
    tK: [8, 4], tR: [95, 4 * S(t * 3)],
    kK: [4, 0], kR: [4, 0], naik: 1.5 * S(t * 2), miring: 0, ekspresi: "datar",
  }),
  bicara: (t) => ({
    tK: [10, 6], tR: [70, -40 + 18 * S(t * 5)],
    kK: [4, 0], kR: [4, 0], naik: 1.5 * S(t * 2), miring: 0, ekspresi: "bicara",
  }),
};

const Laptop: React.FC<{ p: number; t: number; bahaya: boolean }> = ({ p, t, bahaya }) => {
  const k = mulus(p, 0.1, 0.3);
  const warna = bahaya ? W.bahaya : W.aksen;
  return (
    <g opacity={k}>
      <rect x={42} y={-126} width={158} height={8} rx={3} fill="#26365A" />
      <path d="M54,-118 V0 M188,-118 V0" stroke="#26365A" strokeWidth={8} strokeLinecap="round" />
      <rect x={84} y={-134} width={90} height={8} rx={3} fill="#C9D4EA" />
      <rect x={92} y={-196} width={74} height={62} rx={5} fill={bahaya ? "#3A0F18" : GELAP} stroke="#E8EEF9" strokeWidth={3} />
      {bahaya ? (
        <text x={129} y={-150} textAnchor="middle" fontSize={40} fontWeight={800} fill={W.bahaya}
          opacity={0.6 + 0.4 * Math.abs(S(t * 6))} style={{ fontFamily: FONT }}>!</text>
      ) : (
        [0, 1, 2].map((i) => (
          <rect key={i} x={100} y={-186 + i * 14} width={20 + 30 * (0.5 + 0.5 * S(t * 3 + i * 2))}
            height={5} rx={2} fill={warna} />
        ))
      )}
    </g>
  );
};

const Chat: React.FC<{ p: number; t: number }> = ({ p, t }) => {
  const a = mulus(p, 0.3, 0.46);
  const b = mulus(p, 0.4, 0.56);
  return (
    <g>
      <g transform={`translate(-100 -270) scale(${a})`} opacity={a}>
        <rect x={-52} y={-20} width={104} height={40} rx={16} fill="#18233A" stroke="#E8EEF9" strokeWidth={3} />
        <path d="M-20,20 L-30,34 L-4,20 Z" fill="#18233A" stroke="#E8EEF9" strokeWidth={3} strokeLinejoin="round" />
        {[-18, 0, 18].map((dx, i) => (
          <circle key={i} cx={dx} cy={0} r={4} fill={W.aksen} opacity={0.4 + 0.6 * S(t * 6 + i * 1.2) ** 2} />
        ))}
      </g>
      <g transform={`translate(80 -300) scale(${b})`} opacity={b}>
        <rect x={-42} y={-17} width={84} height={34} rx={14} fill={W.aksen} />
        <rect x={-26} y={-7} width={52} height={4} rx={2} fill={GELAP} />
        <rect x={-26} y={3} width={34} height={4} rx={2} fill={GELAP} />
      </g>
    </g>
  );
};

export const Figur: React.FC<{ f: FigurSpek; t: number; p: number; x: number; y: number }> = ({ f, t, p, x, y }) => {
  const po = POSE[f.pose](t);
  const baju = f.baju ?? "#4F7CFF";
  const celana = f.celana ?? "#2B3A63";
  const rambut = f.rambut ?? "#C9894B";
  const masuk = mulus(p, 0.02, 0.2);
  const lK = ujung(-HX, HY, -po.kK[0], -po.kK[1], TH, SN);
  const lR = ujung(HX, HY, po.kR[0], po.kR[1], TH, SN);
  const aK = ujung(-SX, SY, -po.tK[0], -po.tK[1], UA, FA);
  const aR = ujung(SX, SY, po.tR[0], po.tR[1], UA, FA);
  const kk = (t + 0.7) % 3.2;
  const kedip = kk < 0.16 ? S((kk / 0.16) * Math.PI) : 0;
  const ry = (po.ekspresi === "kaget" ? 5 : 3.4) * (1 - 0.9 * kedip);
  const tudung = f.aksesori === "tudung";
  const garis = { stroke: GELAP, strokeWidth: 3, fill: "none", strokeLinecap: "round" as const };
  return (
    <g transform={`translate(${x} ${y + (1 - masuk) * 30})`} opacity={masuk}>
      <ellipse cx={0} cy={3} rx={56} ry={7} fill="#000" opacity={0.35} />
      {f.prop === "laptop" && <Laptop p={p} t={t} bahaya={!!f.bahaya} />}
      <g transform={`translate(0 ${po.naik}) rotate(${po.miring} 0 ${HY})`}>
        <path d={`M${-HX},${HY} L${lK.sx},${lK.sy} L${lK.tx},${lK.ty}`} stroke={celana} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d={`M${HX},${HY} L${lR.sx},${lR.sy} L${lR.tx},${lR.ty}`} stroke={celana} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <ellipse cx={lK.tx - 3} cy={lK.ty - 1} rx={15} ry={6} fill="#E8EEF9" />
        <ellipse cx={lR.tx + 3} cy={lR.ty - 1} rx={15} ry={6} fill="#E8EEF9" />
        <rect x={-30} y={-166} width={60} height={72} rx={24} fill={baju} />
        <rect x={-7} y={-178} width={14} height={16} fill={KULIT} />
        {f.aksesori === "dasi" && (
          <g>
            <path d="M-14,-166 L0,-150 L-6,-166 Z M14,-166 L0,-150 L6,-166 Z" fill="#F5F7FF" />
            <path d="M0,-158 L-6,-148 L0,-112 L6,-148 Z" fill={W.bahaya} />
          </g>
        )}
        {tudung && <path d="M-36,-196 A36,36 0 0 1 36,-196 L42,-150 L-42,-150 Z" fill="#262C47" />}
        <circle cx={0} cy={-200} r={27} fill={KULIT} />
        {!tudung && (
          <path d="M-28,-202 A28,28 0 0 1 28,-202 Q10,-214 -6,-210 Q-20,-208 -28,-202 Z" fill={rambut} />
        )}
        <ellipse cx={-9} cy={-198} rx={3.4} ry={ry} fill={GELAP} />
        <ellipse cx={9} cy={-198} rx={3.4} ry={ry} fill={GELAP} />
        {f.aksesori === "kacamata" && (
          <g stroke={GELAP} strokeWidth={2.5} fill="none">
            <circle cx={-9} cy={-198} r={9} />
            <circle cx={9} cy={-198} r={9} />
            <path d="M-1,-198 H1" />
          </g>
        )}
        {po.ekspresi === "senyum" && <path d="M-8,-188 Q0,-181 8,-188" {...garis} />}
        {po.ekspresi === "datar" && <path d="M-6,-187 H6" {...garis} />}
        {po.ekspresi === "kaget" && <ellipse cx={0} cy={-186} rx={5} ry={6} fill={GELAP} />}
        {po.ekspresi === "bicara" && (
          <ellipse cx={0} cy={-187} rx={5} ry={1.2 + 4 * Math.abs(S(t * 14))} fill={GELAP} />
        )}
        <path d={`M${-SX},${SY} L${aK.sx},${aK.sy} L${aK.tx},${aK.ty}`} stroke={baju} strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d={`M${SX},${SY} L${aR.sx},${aR.sy} L${aR.tx},${aR.ty}`} stroke={baju} strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx={aK.tx} cy={aK.ty} r={8} fill={KULIT} />
        <circle cx={aR.tx} cy={aR.ty} r={8} fill={KULIT} />
        {f.prop === "kaca" && (
          <g>
            <path d={`M${aR.tx},${aR.ty} L${aR.tx + 12},${aR.ty - 8}`} stroke={W.aksen} strokeWidth={6} strokeLinecap="round" />
            <circle cx={aR.tx + 30} cy={aR.ty - 20} r={22} fill="none" stroke={W.aksen} strokeWidth={6} />
          </g>
        )}
        {f.prop === "cv" && (
          <g transform={`translate(${aR.tx} ${aR.ty})`}>
            <rect x={-4} y={-50} width={36} height={46} rx={3} fill="#F5F7FF" />
            <rect x={2} y={-42} width={24} height={3} fill="#7C8CA8" />
            <rect x={2} y={-34} width={24} height={3} fill="#7C8CA8" />
            <rect x={2} y={-26} width={16} height={3} fill="#7C8CA8" />
            <circle cx={22} cy={-14} r={5} fill={W.aksen} />
          </g>
        )}
        {f.prop === "chat" && <Chat p={p} t={t} />}
      </g>
    </g>
  );
};
