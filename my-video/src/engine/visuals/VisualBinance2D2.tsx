import React from "react";
import { C, sel, lerp, useAdegan } from "./VisualSadap";
import { Adegan2D, Laptop2D, Tokoh, Label2D, OUT, pegas, klem01, kedipAt } from "./Aset2D";

const Bug: React.FC<{ x: number; y: number; t: number; s?: number }> = ({ x, y, t, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 0, 1].map((k) => (
      <g key={k}>
        <line x1={-8} y1={k * 8} x2={-22} y2={k * 12 + Math.sin(t * 14 + k) * 4} stroke={C.merah} strokeWidth={3} strokeLinecap="round" />
        <line x1={8} y1={k * 8} x2={22} y2={k * 12 + Math.sin(t * 14 + k + 1) * 4} stroke={C.merah} strokeWidth={3} strokeLinecap="round" />
      </g>
    ))}
    <ellipse cx={0} cy={0} rx={11} ry={16} fill={C.merah} stroke={OUT} strokeWidth={3} />
    <circle cx={0} cy={-18} r={7} fill={C.merah} stroke={OUT} strokeWidth={3} />
    <circle cx={-3} cy={-19} r={1.8} fill="#ffffff" />
    <circle cx={3} cy={-19} r={1.8} fill="#ffffff" />
  </g>
);

const Meja: React.FC = () => (
  <g>
    <rect x={20} y={440} width={840} height={96} fill="#27334f" stroke={OUT} strokeWidth={4} />
    <rect x={20} y={432} width={840} height={14} rx={4} fill="#3b4a6b" stroke={OUT} strokeWidth={4} />
  </g>
);

const RekruterPalsu2D: React.FC = () => {
  const { t, p } = useAdegan();
  const topeng = pegas(sel(p, 0.45, 0.7));
  const kartu = pegas(sel(p, 0.05, 0.25));
  return (
    <Adegan2D t={t} tema="kantor">
      <Tokoh x={130} y={536} baju={C.cyan} rambut="#3b2a1a" ekspresi={p > 0.7 ? "kaget" : "senyum"} aR={10 + Math.abs(Math.sin(t * 3)) * 12} lihatX={1} kedip={kedipAt(t, 0.4)} napas={Math.sin(t * 3)} />
      <g transform={`translate(520 ${lerp(640, 310, kartu)})`}>
        <rect x={-210} y={-190} width={420} height={380} rx={18} fill="#0f2a4a" stroke={OUT} strokeWidth={6} />
        <circle cx={-120} cy={-120} r={46} fill="#f1c27d" stroke={OUT} strokeWidth={5} />
        <path d="M -164 -128 A 46 46 0 0 1 -76 -128 Q -96 -160 -120 -154 Q -146 -154 -164 -128 Z" fill="#2b2118" stroke={OUT} strokeWidth={4} />
        <circle cx={-136} cy={-118} r={5} fill={OUT} />
        <circle cx={-104} cy={-118} r={5} fill={OUT} />
        <path d="M -138 -100 Q -120 -84 -102 -100" fill="none" stroke={OUT} strokeWidth={4} strokeLinecap="round" />
        <g transform={`translate(-120 -120) scale(${topeng})`} opacity={Math.min(1, topeng)}>
          <ellipse cx={0} cy={0} rx={44} ry={52} fill="#f8fafc" stroke={OUT} strokeWidth={5} />
          <ellipse cx={-15} cy={-8} rx={9} ry={5} fill={OUT} />
          <ellipse cx={15} cy={-8} rx={9} ry={5} fill={OUT} />
          <circle cx={-15} cy={-8} r={3} fill={C.merah} />
          <circle cx={15} cy={-8} r={3} fill={C.merah} />
          <path d="M -14 22 Q 0 32 14 22" fill="none" stroke={OUT} strokeWidth={4} strokeLinecap="round" />
        </g>
        <text x={-50} y={-128} fontSize={32} fill={C.teks} fontWeight={700} fontFamily="inherit">HR</text>
        <rect x={-50} y={-108} width={170} height={12} rx={6} fill="#ffffff" opacity={0.3} />
        <rect x={-50} y={-86} width={120} height={10} rx={5} fill="#ffffff" opacity={0.2} />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${-180 + i * 125} -40)`}>
            <rect x={0} y={0} width={110} height={96} rx={8} fill="#1b3a66" stroke={OUT} strokeWidth={4} />
            <circle cx={30} cy={28} r={11} fill={C.kuning} />
            <path d="M 8 96 L 38 56 L 62 78 L 80 60 L 102 96 Z" fill="#2f5d9e" />
            {i === 2 ? <polygon points="44,30 44,62 72,46" fill="#ffffff" opacity={0.9} /> : null}
          </g>
        ))}
        <rect x={-180} y={90} width={300} height={12} rx={6} fill="#ffffff" opacity={0.2} />
        <rect x={-180} y={116} width={220} height={12} rx={6} fill="#ffffff" opacity={0.15} />
      </g>
      <Label2D x={660} y={64} teks="HR palsu" warna={C.merah} lebar={240} opacity={sel(p, 0.5, 0.65)} />
    </Adegan2D>
  );
};

const CeoPalsuChat2D: React.FC = () => {
  const { t, p } = useAdegan();
  const m1 = pegas(sel(p, 0.1, 0.28));
  const m2 = pegas(sel(p, 0.32, 0.5));
  const m3 = pegas(sel(p, 0.58, 0.76));
  return (
    <Adegan2D t={t} tema="kantor">
      <Tokoh x={110} y={536} baju={C.cyan} rambut="#3b2a1a" ekspresi={p > 0.6 ? "kaget" : "senyum"} lihatX={1} kedip={kedipAt(t, 0.9)} napas={Math.sin(t * 3)} />
      <Tokoh x={770} y={536} baju={C.ungu} topeng aL={60 + Math.sin(t * 3) * 8} bL={20} napas={Math.sin(t * 3 + 1)} />
      <g transform="translate(440 300)">
        <rect x={-190} y={-210} width={380} height={420} rx={26} fill="#0f2a4a" stroke={OUT} strokeWidth={6} />
        <rect x={-190} y={-210} width={380} height={52} rx={26} fill="#16345f" />
        <text x={0} y={-176} fontSize={24} fill={C.ungu} textAnchor="middle" fontWeight={700} fontFamily="inherit">CEO</text>
        <g transform={`translate(-170 -130) scale(${m1})`}>
          <rect x={0} y={0} width={260} height={50} rx={16} fill="rgba(167,139,250,0.28)" stroke={C.ungu} strokeWidth={3} />
          <text x={14} y={32} fontSize={19} fill={C.teks} fontFamily="inherit">Profil kamu menarik.</text>
        </g>
        <g transform={`translate(-170 -64) scale(${m2})`}>
          <rect x={0} y={0} width={340} height={50} rx={16} fill="rgba(167,139,250,0.28)" stroke={C.ungu} strokeWidth={3} />
          <text x={14} y={32} fontSize={19} fill={C.teks} fontFamily="inherit">Selesaikan tugas coding ini.</text>
        </g>
        <g transform={`translate(-170 10) scale(${m3})`}>
          <rect x={0} y={0} width={300} height={78} rx={14} fill="rgba(255,107,107,0.16)" stroke={C.merah} strokeWidth={4} />
          <path d="M 18 18 L 18 58 L 52 58 L 52 30 L 40 18 Z" fill="none" stroke={C.merah} strokeWidth={4} strokeLinejoin="round" />
          <text x={66} y={46} fontSize={19} fill={C.teks} fontFamily="inherit">tugas-coding.zip</text>
          <path d="M 270 22 L 270 52 M 258 42 L 270 54 L 282 42" fill="none" stroke={C.merah} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <Label2D x={440} y={64} teks="CEO palsu lewat chat" warna={C.merah} lebar={340} opacity={sel(p, 0.2, 0.35)} />
    </Adegan2D>
  );
};

const TugasBerisiMalware2D: React.FC = () => {
  const { t, p } = useAdegan();
  const buka = pegas(sel(p, 0.05, 0.25));
  const infeksi = sel(p, 0.75, 0.85) > 0.5 ? 1 : 0;
  return (
    <Adegan2D t={t} tema="kantor">
      <Tokoh x={430} y={536} baju={C.cyan} rambut="#3b2a1a" ekspresi={p > 0.8 ? "kaget" : "datar"} aL={14} aR={infeksi ? 80 : 14} lihatX={1} kedip={kedipAt(t, 0.2)} napas={Math.sin(t * 3)} />
      <Meja />
      <g transform="translate(190 432)">
        <rect x={-60} y={-70} width={120} height={70} rx={8} fill={C.kuning} stroke={OUT} strokeWidth={5} />
        <g transform={`rotate(${-buka * 30} -60 -70)`}>
          <path d="M -60 -70 L -60 -88 L -22 -88 L -10 -70 Z" fill="#e0a92f" stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
        </g>
        <text x={0} y={-28} fontSize={20} fill={OUT} textAnchor="middle" fontWeight={700} fontFamily="inherit">tugas</text>
      </g>
      {[0, 1, 2, 3, 4].map((i) => {
        const q = klem01((p - 0.2 - i * 0.08) / 0.5);
        if (q <= 0) return null;
        return <Bug key={i} x={lerp(220, 640, q)} y={420 - Math.sin(q * Math.PI) * 80} t={t} s={0.8} />;
      })}
      <Laptop2D x={660} y={440} s={0.8} infeksi={infeksi} t={t} />
      <Label2D x={560} y={64} teks="Malware masuk ke laptop" warna={C.merah} lebar={400} opacity={sel(p, 0.7, 0.85)} />
    </Adegan2D>
  );
};

const PerangkatTerpisah2D: React.FC = () => {
  const { t, p } = useAdegan();
  const kotak = pegas(sel(p, 0.1, 0.35));
  const bug = sel(p, 0.35, 0.5);
  return (
    <Adegan2D t={t} tema="kantor">
      <Tokoh x={420} y={536} baju={C.cyan} rambut="#3b2a1a" ekspresi="senyum" aL={30} aR={30} kedip={kedipAt(t, 0.6)} napas={Math.sin(t * 3)} />
      <Meja />
      <Laptop2D x={190} y={440} s={0.8} />
      <g transform={`translate(190 330) scale(${1 + Math.sin(t * 3) * 0.04})`}>
        <path d="M 0 -44 L 34 -30 L 34 4 Q 34 34 0 50 Q -34 34 -34 4 L -34 -30 Z" fill="rgba(77,208,225,0.25)" stroke={C.teal} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -14 2 L -4 14 L 16 -12" fill="none" stroke={C.teal} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Laptop2D x={650} y={440} s={0.8} infeksi={bug > 0.5 ? 1 : 0} t={t} />
      <g opacity={Math.min(1, kotak)}>
        <rect x={525} y={265} width={250} height={200} rx={16} fill="rgba(160,230,255,0.10)" stroke="#a0e6ff" strokeWidth={5} strokeDasharray="12 8" />
      </g>
      <g opacity={bug}>
        <Bug x={650 + Math.sin(t * 2.2) * 50} y={312 + Math.sin(t * 3.1) * 12} t={t} s={0.8} />
      </g>
      <Label2D x={190} y={220} teks="Laptop kerja" warna={C.teal} lebar={240} />
      <Label2D x={650} y={220} teks="Perangkat terpisah" warna={C.kuning} lebar={290} opacity={Math.min(1, kotak)} />
    </Adegan2D>
  );
};

const CekResmi2D: React.FC = () => {
  const { t, p } = useAdegan();
  const lencana = pegas(sel(p, 0.45, 0.7));
  const sx = 520 + Math.sin(t * 1.6) * 40 * (1 - sel(p, 0.4, 0.5));
  return (
    <Adegan2D t={t}>
      <Tokoh x={150} y={536} baju={C.cyan} rambut="#3b2a1a" ekspresi="senyum" aR={60} lihatX={1} kedip={kedipAt(t, 0.3)} napas={Math.sin(t * 3)} />
      <rect x={380} y={230} width={280} height={306} rx={8} fill="#1b2f57" stroke={OUT} strokeWidth={6} />
      <rect x={380} y={230} width={280} height={40} fill="#16345f" stroke={OUT} strokeWidth={4} />
      <text x={520} y={258} fontSize={22} fill={C.teks} textAnchor="middle" fontWeight={700} fontFamily="inherit">PERUSAHAAN</text>
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={404 + (i % 3) * 84} y={286 + Math.floor(i / 3) * 50} width={56} height={32} rx={4} fill={i % 2 === 0 ? C.kuning : "#2a4a85"} opacity={i % 2 === 0 ? 0.55 + 0.3 * Math.sin(t * 2 + i) : 1} />
      ))}
      <rect x={496} y={492} width={48} height={44} fill="#0b1220" />
      <circle cx={sx} cy={340} r={58} fill="rgba(160,230,255,0.15)" stroke={C.kuning} strokeWidth={8} />
      <line x1={sx + 41} y1={381} x2={sx + 82} y2={430} stroke={C.kuning} strokeWidth={12} strokeLinecap="round" />
      <g transform={`translate(650 250) scale(${lencana})`}>
        <circle cx={0} cy={0} r={38} fill={C.teal} stroke={OUT} strokeWidth={5} />
        <path d="M -16 2 L -4 14 L 18 -12" fill="none" stroke="#ffffff" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Label2D x={520} y={64} teks="Cek lewat jalur resmi" warna={C.teal} lebar={380} opacity={sel(p, 0.5, 0.65)} />
    </Adegan2D>
  );
};

const RisikoBukanJaminan2D: React.FC = () => {
  const { t, p } = useAdegan();
  const perisai = pegas(sel(p, 0.05, 0.3));
  const retak = sel(p, 0.45, 0.7);
  const coret = sel(p, 0.6, 0.8);
  return (
    <Adegan2D t={t}>
      <Tokoh x={170} y={536} baju={C.cyan} rambut="#3b2a1a" ekspresi="datar" aR={20} lihatX={1} kedip={kedipAt(t, 0.8)} napas={Math.sin(t * 3)} />
      <g transform={`translate(540 340) scale(${perisai * 1.6})`}>
        <path d="M 0 -80 L 62 -54 L 62 8 Q 62 62 0 92 Q -62 62 -62 8 L -62 -54 Z" fill="url(#g2d-baja)" stroke={OUT} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -24 4 L -6 24 L 28 -18" fill="none" stroke={C.teal} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 4 -78 L 16 -30 L -6 -2 L 14 36 L 0 90" fill="none" stroke={C.merah} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="220" strokeDashoffset={220 * (1 - retak)} />
      </g>
      <text x={540} y={150} fontSize={64} fill={C.kuning} textAnchor="middle" fontWeight={700} fontFamily="inherit">100%</text>
      <line x1={450} y1={132} x2={lerp(450, 630, coret)} y2={lerp(132, 164, coret)} stroke={C.merah} strokeWidth={9} strokeLinecap="round" />
      <Label2D x={540} y={64} teks="Mengurangi risiko, bukan menjamin" warna={C.kuning} lebar={560} opacity={sel(p, 0.55, 0.7)} />
    </Adegan2D>
  );
};

export const VisualBinance2D2: Record<string, React.FC> = {
  "rekruter-palsu-2d": RekruterPalsu2D,
  "ceo-palsu-chat-2d": CeoPalsuChat2D,
  "tugas-berisi-malware-2d": TugasBerisiMalware2D,
  "perangkat-terpisah-2d": PerangkatTerpisah2D,
  "cek-resmi-2d": CekResmi2D,
  "risiko-bukan-jaminan-2d": RisikoBukanJaminan2D,
};
