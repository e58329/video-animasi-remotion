import React from "react";
import { C, Kanvas } from "./VisualSadap";

export const OUT = "#0b1220";
export const klem01 = (x: number) => Math.max(0, Math.min(1, x));
export const pegas = (p: number) => {
  const x = klem01(p);
  return 1 - Math.exp(-6 * x) * Math.cos(11 * x);
};
export const kedipAt = (t: number, off = 0) => {
  const k = (t + off) % 3.2;
  return k < 0.16 ? Math.sin((k / 0.16) * Math.PI) : 0;
};

export const Defs2D: React.FC = () => (
  <defs>
    <linearGradient id="g2d-malam" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#060b1f" />
      <stop offset="1" stopColor="#14284d" />
    </linearGradient>
    <linearGradient id="g2d-baja" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#64748b" />
      <stop offset="1" stopColor="#1e293b" />
    </linearGradient>
    <linearGradient id="g2d-emas" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#ffe08a" />
      <stop offset="1" stopColor="#d49a1c" />
    </linearGradient>
  </defs>
);

const TINGGI_JAUH = [90, 140, 105, 160];
const TINGGI_DEKAT = [150, 230, 185, 260];

export const Latar2D: React.FC<{ t: number; tema?: "malam" | "kantor" }> = ({ t, tema = "malam" }) => {
  const geserJauh = (t * 10) % 320;
  const geserDekat = (t * 22) % 480;
  return (
    <g>
      <rect x={0} y={0} width={880} height={607} fill="url(#g2d-malam)" />
      {Array.from({ length: 20 }, (_, i) => (
        <circle key={i} cx={(i * 97 + 31) % 880} cy={18 + ((i * 53) % 190)} r={1.2 + (i % 3) * 0.7} fill="#ffffff" opacity={0.2 + 0.35 * Math.abs(Math.sin(t * 1.4 + i))} />
      ))}
      <g transform={`translate(${-geserJauh} 0)`}>
        {Array.from({ length: 16 }, (_, i) => {
          const h = TINGGI_JAUH[i % 4];
          return <rect key={i} x={i * 80} y={520 - h} width={64} height={h + 100} fill="#0d1a38" />;
        })}
      </g>
      <g transform={`translate(${-geserDekat} 0)`}>
        {Array.from({ length: 13 }, (_, i) => {
          const h = TINGGI_DEKAT[i % 4];
          return (
            <g key={i}>
              <rect x={i * 120} y={530 - h} width={98} height={h + 90} fill="#11224a" stroke={OUT} strokeWidth={3} />
              {Array.from({ length: 6 }, (_, k) => {
                const nyala = ((i % 4) + k) % 3 === 0;
                return <rect key={k} x={i * 120 + 14 + (k % 2) * 42} y={530 - h + 16 + Math.floor(k / 2) * 32} width={26} height={16} rx={3} fill={nyala ? C.kuning : "#1b3366"} opacity={nyala ? 0.6 + 0.3 * Math.sin(t * 2 + k) : 1} />;
              })}
            </g>
          );
        })}
      </g>
      <rect x={0} y={536} width={880} height={71} fill={tema === "kantor" ? "#172a4d" : "#0a1428"} />
      <line x1={0} y1={536} x2={880} y2={536} stroke={OUT} strokeWidth={4} />
    </g>
  );
};

export const Adegan2D: React.FC<{ t: number; tema?: "malam" | "kantor"; children: React.ReactNode }> = ({ t, tema = "malam", children }) => (
  <Kanvas>
    <Defs2D />
    <Latar2D t={t} tema={tema} />
    {children}
  </Kanvas>
);

export const Label2D: React.FC<{ x: number; y: number; teks: string; warna?: string; lebar?: number; opacity?: number }> = ({ x, y, teks, warna = C.kuning, lebar = 300, opacity = 1 }) => (
  <g opacity={opacity}>
    <rect x={x - lebar / 2} y={y - 26} width={lebar} height={46} rx={23} fill={OUT} stroke={warna} strokeWidth={4} />
    <text x={x} y={y + 8} fontSize={24} fill={warna} textAnchor="middle" fontWeight={700} fontFamily="inherit">{teks}</text>
  </g>
);

export const Koin2D: React.FC<{ x: number; y: number; r?: number; fase?: number; opacity?: number }> = ({ x, y, r = 20, fase = 0, opacity = 1 }) => {
  const sx = Math.max(0.15, Math.abs(Math.cos(fase)));
  return (
    <g transform={`translate(${x} ${y}) scale(${sx} 1)`} opacity={opacity}>
      <circle r={r} fill="url(#g2d-emas)" stroke={OUT} strokeWidth={3} />
      <circle r={r * 0.68} fill="none" stroke="#a16f0e" strokeWidth={2} />
      <path d={`M ${-r * 0.4} ${-r * 0.3} A ${r * 0.6} ${r * 0.6} 0 0 1 ${r * 0.2} ${-r * 0.55}`} fill="none" stroke="#ffffff" strokeWidth={2} opacity={0.7} strokeLinecap="round" />
    </g>
  );
};

export const Laptop2D: React.FC<{ x: number; y: number; s?: number; infeksi?: number; t?: number; buka?: number }> = ({ x, y, s = 1, infeksi = 0, t = 0, buka = 1 }) => {
  const merah = infeksi > 0.5;
  const getar = merah ? Math.sin(t * 40) * 2 : 0;
  return (
    <g transform={`translate(${x + getar} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={22} rx={110} ry={9} fill="#000000" opacity={0.3} />
      <g transform={`scale(1 ${buka})`}>
        <rect x={-76} y={-108} width={152} height={108} rx={10} fill="#1e293b" stroke={OUT} strokeWidth={5} />
        <rect x={-66} y={-98} width={132} height={88} rx={5} fill={merah ? "#3a0d12" : "#0f2a4a"} />
        {merah ? (
          <g>
            <path d="M 0 -84 L 26 -34 L -26 -34 Z" fill={C.kuning} stroke={OUT} strokeWidth={3} strokeLinejoin="round" />
            <rect x={-3} y={-72} width={6} height={20} rx={3} fill={OUT} />
            <circle cx={0} cy={-42} r={3.5} fill={OUT} />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={-66} y={-98 + ((t * 70 + i * 30) % 86)} width={132} height={3} fill={C.merah} opacity={0.35} />
            ))}
          </g>
        ) : (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={-54} y={-86 + i * 18} width={50 + ((i * 23) % 50)} height={7} rx={3.5} fill={C.cyan} opacity={0.7} />
            ))}
          </g>
        )}
      </g>
      <path d="M -92 0 L 92 0 L 110 20 L -110 20 Z" fill="#cbd5e1" stroke={OUT} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-22} y={5} width={44} height={7} rx={3.5} fill="#94a3b8" />
    </g>
  );
};

export const Brankas2D: React.FC<{ x: number; y: number; s?: number; pintu?: number }> = ({ x, y, s = 1, pintu = 0 }) => {
  const sx = Math.max(0.12, 1 - pintu * 0.88);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={4} rx={150} ry={12} fill="#000000" opacity={0.3} />
      <rect x={-130} y={-300} width={260} height={300} rx={22} fill="url(#g2d-baja)" stroke={OUT} strokeWidth={6} />
      <rect x={-104} y={-274} width={208} height={248} rx={12} fill="#050a14" stroke={OUT} strokeWidth={4} />
      <rect x={-104} y={-274} width={208} height={248} rx={12} fill={C.kuning} opacity={pintu * 0.18} />
      <line x1={-104} y1={-150} x2={104} y2={-150} stroke="#1e293b" strokeWidth={6} />
      <g transform={`translate(-104 -150) scale(${sx} 1)`}>
        <rect x={0} y={-124} width={208} height={248} rx={12} fill="url(#g2d-baja)" stroke={OUT} strokeWidth={5} />
        <circle cx={104} cy={0} r={52} fill="#334155" stroke={OUT} strokeWidth={5} />
        <circle cx={104} cy={0} r={34} fill="none" stroke="#94a3b8" strokeWidth={5} />
        <g transform={`rotate(${pintu * 240} 104 0)`}>
          {[0, 60, 120].map((a) => (
            <line key={a} x1={64} y1={0} x2={144} y2={0} stroke="#94a3b8" strokeWidth={6} strokeLinecap="round" transform={`rotate(${a} 104 0)`} />
          ))}
        </g>
        <circle cx={104} cy={0} r={9} fill={C.kuning} stroke={OUT} strokeWidth={3} />
      </g>
    </g>
  );
};

export type Ekspresi = "senyum" | "kaget" | "datar" | "sedih" | "marah";

const Kaki: React.FC<{ x: number; sudut: number; celana: string }> = ({ x, sudut, celana }) => (
  <g transform={`translate(${x} -84) rotate(${sudut})`}>
    <rect x={-10} y={0} width={20} height={80} rx={9} fill={celana} stroke={OUT} strokeWidth={4} />
    <ellipse cx={3} cy={84} rx={17} ry={8} fill="#0f172a" stroke={OUT} strokeWidth={3} />
  </g>
);

const Lengan: React.FC<{ x: number; y: number; a: number; b: number; baju: string; kulit: string }> = ({ x, y, a, b, baju, kulit }) => (
  <g transform={`translate(${x} ${y}) rotate(${a})`}>
    <rect x={-9} y={0} width={18} height={48} rx={9} fill={baju} stroke={OUT} strokeWidth={4} />
    <g transform={`translate(0 44) rotate(${b})`}>
      <rect x={-8} y={0} width={16} height={42} rx={8} fill={baju} stroke={OUT} strokeWidth={4} />
      <circle cx={0} cy={46} r={10} fill={kulit} stroke={OUT} strokeWidth={3} />
    </g>
  </g>
);

export const Tokoh: React.FC<{
  x: number; y: number; skala?: number; hadap?: 1 | -1;
  baju?: string; celana?: string; kulit?: string; rambut?: string;
  tudung?: boolean; topeng?: boolean; ekspresi?: Ekspresi;
  aL?: number; bL?: number; aR?: number; bR?: number;
  kaki?: number; miring?: number; lihatX?: number; lihatY?: number;
  kedip?: number; napas?: number;
}> = ({
  x, y, skala = 1, hadap = 1, baju = C.teal, celana = "#1f2a44", kulit = "#f1c27d", rambut = "#2b2118",
  tudung = false, topeng = false, ekspresi = "datar", aL = 8, bL = 6, aR = 8, bR = 6,
  kaki = 0, miring = 0, lihatX = 0, lihatY = 0, kedip = 0, napas = 0,
}) => {
  const n = napas * 3;
  const warnaBaju = tudung ? "#1e293b" : baju;
  const wajah = tudung ? "#a98558" : kulit;
  const alis: number[][] =
    ekspresi === "marah" ? [[-22, -48, -6, -40], [6, -40, 22, -48]]
    : ekspresi === "sedih" ? [[-22, -42, -6, -48], [6, -48, 22, -42]]
    : ekspresi === "kaget" ? [[-22, -54, -6, -54], [6, -54, 22, -54]]
    : [[-22, -47, -6, -47], [6, -47, 22, -47]];
  const mulut =
    ekspresi === "senyum" ? <path d="M -12 -16 Q 0 -2 12 -16" fill="none" stroke={OUT} strokeWidth={4} strokeLinecap="round" />
    : ekspresi === "kaget" ? <ellipse cx={0} cy={-10} rx={7} ry={9} fill="#5b1a1a" stroke={OUT} strokeWidth={3} />
    : ekspresi === "sedih" ? <path d="M -12 -6 Q 0 -18 12 -6" fill="none" stroke={OUT} strokeWidth={4} strokeLinecap="round" />
    : ekspresi === "marah" ? <path d="M -11 -8 Q 0 -16 11 -8" fill="none" stroke={OUT} strokeWidth={4} strokeLinecap="round" />
    : <line x1={-9} y1={-10} x2={9} y2={-10} stroke={OUT} strokeWidth={4} strokeLinecap="round" />;
  return (
    <g transform={`translate(${x} ${y}) scale(${skala * hadap} ${skala})`}>
      <ellipse cx={0} cy={4} rx={48} ry={9} fill="#000000" opacity={0.3} />
      <Kaki x={-14} sudut={kaki} celana={celana} />
      <Kaki x={14} sudut={-kaki} celana={celana} />
      <rect x={-32} y={-164 + n} width={64} height={84} rx={22} fill={warnaBaju} stroke={OUT} strokeWidth={5} />
      <rect x={6} y={-158 + n} width={22} height={72} rx={11} fill="#000000" opacity={0.14} />
      {tudung ? <rect x={-18} y={-116 + n} width={36} height={22} rx={8} fill="#0f172a" opacity={0.6} /> : null}
      <Lengan x={-32} y={-148 + n} a={aL} b={bL} baju={warnaBaju} kulit={kulit} />
      <Lengan x={32} y={-148 + n} a={-aR} b={-bR} baju={warnaBaju} kulit={kulit} />
      <g transform={`translate(0 ${-168 + n}) rotate(${miring})`}>
        {tudung ? <ellipse cx={0} cy={-30} rx={46} ry={48} fill="#1e293b" stroke={OUT} strokeWidth={5} /> : null}
        <rect x={-9} y={-4} width={18} height={16} fill={wajah} stroke={OUT} strokeWidth={3} />
        <circle cx={0} cy={-32} r={36} fill={wajah} stroke={OUT} strokeWidth={5} />
        {!tudung ? <path d="M -36 -34 A 36 36 0 0 1 36 -34 Q 22 -60 -2 -54 Q -26 -52 -36 -34 Z" fill={rambut} stroke={OUT} strokeWidth={4} strokeLinejoin="round" /> : null}
        {tudung ? <path d="M -46 -26 A 46 50 0 0 1 46 -26 L 34 -26 A 34 40 0 0 0 -34 -26 Z" fill="#1e293b" stroke={OUT} strokeWidth={4} strokeLinejoin="round" /> : null}
        {topeng ? (
          <g>
            <ellipse cx={0} cy={-32} rx={32} ry={38} fill="#f8fafc" stroke={OUT} strokeWidth={4} />
            <path d="M -22 -38 Q -13 -46 -5 -36 Q -13 -30 -22 -38 Z" fill={OUT} />
            <path d="M 22 -38 Q 13 -46 5 -36 Q 13 -30 22 -38 Z" fill={OUT} />
            <circle cx={-13} cy={-37} r={3} fill={C.merah} />
            <circle cx={13} cy={-37} r={3} fill={C.merah} />
            <path d="M -14 -14 Q 0 -4 14 -14" fill="none" stroke={OUT} strokeWidth={4} strokeLinecap="round" />
          </g>
        ) : (
          <g>
            {[-13, 13].map((ex) => (
              <g key={ex}>
                <ellipse cx={ex} cy={-30} rx={9} ry={Math.max(0.5, 10 * (1 - kedip))} fill="#ffffff" stroke={OUT} strokeWidth={2} />
                <circle cx={ex + lihatX * 3} cy={-30 + lihatY * 3} r={4.5 * (1 - kedip * 0.6)} fill={OUT} />
              </g>
            ))}
            {alis.map((a, i) => (
              <line key={i} x1={a[0]} y1={a[1]} x2={a[2]} y2={a[3]} stroke={OUT} strokeWidth={4} strokeLinecap="round" />
            ))}
            {mulut}
          </g>
        )}
      </g>
    </g>
  );
};
