import React from "react";
import { C, sel, lerp, useAdegan } from "./VisualSadap";
import { Adegan2D, Brankas2D, Koin2D, Laptop2D, Tokoh, Label2D, OUT, pegas, klem01, kedipAt } from "./Aset2D";

const BrankasKosong2D: React.FC = () => {
  const { t, p } = useAdegan();
  const pintu = Math.min(1, pegas(sel(p, 0.04, 0.3)));
  const angkat = sel(p, 0.22, 0.42);
  return (
    <Adegan2D t={t}>
      <Brankas2D x={260} y={536} pintu={pintu} />
      {Array.from({ length: 14 }, (_, i) => {
        const q = klem01((p - 0.2 - i * 0.025) / 0.4);
        if (q <= 0) return null;
        const tinggi = 110 + (i % 4) * 30;
        const xx = 300 + q * (170 + (i % 5) * 55);
        const yy = 400 - 4 * tinggi * q * (1 - q) + 118 * q * q;
        return <Koin2D key={i} x={xx} y={yy} r={17} fase={q * 12 + i} />;
      })}
      <Tokoh x={730} y={536} ekspresi={p > 0.25 ? "kaget" : "datar"} aL={lerp(8, 150, angkat)} bL={lerp(6, 20, angkat)} aR={lerp(8, 150, angkat)} bR={lerp(6, 20, angkat)} lihatX={-1} kedip={kedipAt(t)} napas={Math.sin(t * 3)} miring={lerp(0, -6, angkat)} />
      <Label2D x={440} y={64} teks="6 miliar dolar lebih" warna={C.merah} lebar={380} opacity={sel(p, 0.35, 0.5)} />
    </Adegan2D>
  );
};

const JamDuaPuluh2D: React.FC = () => {
  const { t, p } = useAdegan();
  const menit = lerp(0, 20, sel(p, 0.08, 0.92));
  const isi = sel(p, 0.1, 0.9);
  const cx = 200;
  const cy = 290;
  const ys = [170, 290, 410];
  return (
    <Adegan2D t={t}>
      <ellipse cx={cx} cy={cy + 124} rx={100} ry={10} fill="#000000" opacity={0.3} />
      <circle cx={cx} cy={cy} r={112} fill="#f8fafc" stroke={OUT} strokeWidth={7} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return <line key={i} x1={cx + 92 * Math.sin(a)} y1={cy - 92 * Math.cos(a)} x2={cx + 104 * Math.sin(a)} y2={cy - 104 * Math.cos(a)} stroke={OUT} strokeWidth={i % 3 === 0 ? 6 : 3} strokeLinecap="round" />;
      })}
      <line x1={cx} y1={cy} x2={cx} y2={cy - 80} stroke={OUT} strokeWidth={6} strokeLinecap="round" transform={`rotate(${menit * 6} ${cx} ${cy})`} />
      <line x1={cx} y1={cy} x2={cx} y2={cy - 52} stroke={C.merah} strokeWidth={7} strokeLinecap="round" transform={`rotate(${menit * 0.5} ${cx} ${cy})`} />
      <circle cx={cx} cy={cy} r={9} fill={OUT} />
      <Label2D x={cx} y={470} teks={`${Math.floor(menit)} menit`} warna={C.kuning} lebar={220} />
      <Brankas2D x={480} y={440} s={0.55} pintu={1} />
      {ys.map((yy, i) => (
        <g key={i}>
          <rect x={700} y={yy - 45} width={120} height={90} rx={10} fill="#0f2a4a" stroke={OUT} strokeWidth={5} />
          <rect x={708} y={yy + 37 - 74 * isi} width={104} height={74 * isi} rx={4} fill={C.merah} opacity={0.6} />
        </g>
      ))}
      {Array.from({ length: 9 }, (_, i) => {
        const q = (t * 0.55 + i / 9) % 1;
        const xx = lerp(540, 750, q);
        const yy = lerp(330, ys[i % 3], q) - Math.sin(q * Math.PI) * 60;
        return <Koin2D key={i} x={xx} y={yy} r={14} fase={q * 10 + i} />;
      })}
    </Adegan2D>
  );
};

const KunciUtuh2D: React.FC = () => {
  const { t, p } = useAdegan();
  const goyang = Math.sin(t * 2.2) * 7;
  const buka = Math.min(1, pegas(sel(p, 0.3, 0.6)));
  const sx = Math.max(0.12, 1 - buka * 0.88);
  return (
    <Adegan2D t={t}>
      <g transform={`rotate(${goyang} 220 70)`}>
        <line x1={220} y1={70} x2={220} y2={150} stroke="#94a3b8" strokeWidth={5} />
        <g transform="translate(220 190)">
          <circle cx={0} cy={0} r={40} fill="none" stroke="url(#g2d-emas)" strokeWidth={16} />
          <circle cx={0} cy={0} r={48} fill="none" stroke={OUT} strokeWidth={3} />
          <circle cx={0} cy={0} r={32} fill="none" stroke={OUT} strokeWidth={3} />
          <rect x={-8} y={36} width={16} height={130} rx={6} fill="url(#g2d-emas)" stroke={OUT} strokeWidth={4} />
          <rect x={8} y={110} width={30} height={14} rx={4} fill="url(#g2d-emas)" stroke={OUT} strokeWidth={4} />
          <rect x={8} y={136} width={22} height={14} rx={4} fill="url(#g2d-emas)" stroke={OUT} strokeWidth={4} />
        </g>
      </g>
      {[0, 1, 2].map((i) => {
        const o = Math.max(0, Math.sin(t * 3 + i * 2));
        const gx = [190, 255, 235][i];
        const gy = [160, 215, 300][i];
        return (
          <g key={i} opacity={o}>
            <line x1={gx - 8} y1={gy} x2={gx + 8} y2={gy} stroke="#ffffff" strokeWidth={3} strokeLinecap="round" />
            <line x1={gx} y1={gy - 8} x2={gx} y2={gy + 8} stroke="#ffffff" strokeWidth={3} strokeLinecap="round" />
          </g>
        );
      })}
      <rect x={596} y={196} width={188} height={344} rx={6} fill="#050a14" stroke={OUT} strokeWidth={6} />
      <rect x={600} y={200} width={180} height={336} fill={C.merah} opacity={buka * 0.45} />
      <g transform={`translate(600 200) scale(${sx} 1)`}>
        <rect x={0} y={0} width={180} height={336} fill="#475569" stroke={OUT} strokeWidth={5} />
        <rect x={20} y={24} width={140} height={120} rx={8} fill="#334155" stroke={OUT} strokeWidth={3} />
        <circle cx={150} cy={190} r={9} fill={C.kuning} stroke={OUT} strokeWidth={3} />
      </g>
      <Tokoh x={420} y={536} baju={C.ungu} ekspresi={buka > 0.3 ? "kaget" : "datar"} aR={lerp(8, 100, buka)} bR={lerp(6, 10, buka)} lihatX={1} kedip={kedipAt(t, 1)} napas={Math.sin(t * 3)} miring={lerp(0, 5, buka)} />
      <text x={420} y={282 + Math.sin(t * 4) * 4} fontSize={54} fill={C.kuning} textAnchor="middle" fontWeight={700} fontFamily="inherit" opacity={1 - buka * 0.4}>?</text>
      <Label2D x={440} y={64} teks="Kunci utuh, tapi pintu terbuka" warna={C.kuning} lebar={460} opacity={sel(p, 0.5, 0.65)} />
    </Adegan2D>
  );
};

const PenandaTangan2D: React.FC = () => {
  const { t } = useAdegan();
  const tekan = Math.pow(Math.max(0, Math.sin(t * Math.PI * 2 * 0.75)), 2);
  const geserSabuk = (t * 60) % 40;
  return (
    <Adegan2D t={t}>
      <rect x={0} y={470} width={880} height={30} fill="#1e293b" stroke={OUT} strokeWidth={4} />
      {Array.from({ length: 24 }, (_, i) => (
        <rect key={i} x={i * 40 - 40 + geserSabuk} y={478} width={20} height={6} rx={3} fill="#475569" />
      ))}
      <rect x={350} y={120} width={190} height={240} rx={16} fill="url(#g2d-baja)" stroke={OUT} strokeWidth={6} />
      <rect x={372} y={146} width={146} height={64} rx={8} fill="#0f2a4a" stroke={OUT} strokeWidth={4} />
      <text x={445} y={190} fontSize={28} fill={C.cyan} textAnchor="middle" fontWeight={700} fontFamily="inherit">SIGN</text>
      <circle cx={392} cy={246} r={9} fill={tekan > 0.5 ? C.merah : C.teal} stroke={OUT} strokeWidth={3} />
      <circle cx={425} cy={246} r={9} fill={C.kuning} stroke={OUT} strokeWidth={3} />
      <rect x={430} y={360} width={30} height={10 + tekan * 46} fill="#94a3b8" stroke={OUT} strokeWidth={4} />
      <rect x={410} y={366 + tekan * 46} width={70} height={22} rx={6} fill={C.merah} stroke={OUT} strokeWidth={4} />
      {[0, 1, 2, 3].map((i) => {
        const q = (t * 0.28 + i / 4) % 1;
        const x = lerp(150, 840, q);
        const cap = x > 450;
        return (
          <g key={i} transform={`translate(${x} 452)`}>
            <rect x={-30} y={-46} width={60} height={46} rx={4} fill="#f8fafc" stroke={OUT} strokeWidth={3} />
            <line x1={-20} y1={-34} x2={14} y2={-34} stroke="#94a3b8" strokeWidth={3} />
            <line x1={-20} y1={-24} x2={20} y2={-24} stroke="#94a3b8" strokeWidth={3} />
            {cap ? <path d="M -14 -12 L -4 -4 L 14 -18" fill="none" stroke={C.teal} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" /> : null}
          </g>
        );
      })}
      <Tokoh x={90} y={536} tudung topeng aR={70 + Math.sin(t * 3) * 14} bR={-10} napas={Math.sin(t * 3)} />
      <Label2D x={560} y={64} teks="Meneken apa yang diminta" warna={C.cyan} lebar={400} />
    </Adegan2D>
  );
};

const LaptopDiambilAlih2D: React.FC = () => {
  const { t, p } = useAdegan();
  const target = [420, 590, 760];
  const kena = target.map((_, i) => sel(p, 0.25 + i * 0.22, 0.4 + i * 0.22));
  const ketik = Math.sin(t * 14);
  return (
    <Adegan2D t={t} tema="kantor">
      <Tokoh x={130} y={536} tudung topeng aL={14 + ketik * 8} bL={30} aR={14 - ketik * 8} bR={30} napas={Math.sin(t * 3)} />
      <rect x={20} y={440} width={840} height={96} fill="#27334f" stroke={OUT} strokeWidth={4} />
      <rect x={20} y={432} width={840} height={14} rx={4} fill="#3b4a6b" stroke={OUT} strokeWidth={4} />
      <g transform="translate(130 440) scale(0.7)">
        <rect x={-76} y={-108} width={152} height={108} rx={10} fill="#334155" stroke={OUT} strokeWidth={5} />
        <circle cx={0} cy={-54} r={10} fill={C.merah} opacity={0.5 + 0.4 * Math.sin(t * 6)} />
      </g>
      {target.map((tx, i) => {
        const mx = (130 + tx) / 2;
        const u = (t * 0.6 + i * 0.3) % 1;
        const bx = (1 - u) * (1 - u) * 130 + 2 * (1 - u) * u * mx + u * u * tx;
        const by = (1 - u) * (1 - u) * 355 + 2 * (1 - u) * u * 130 + u * u * 355;
        return (
          <g key={i} opacity={kena[i]}>
            <path d={`M 130 355 Q ${mx} 130 ${tx} 355`} fill="none" stroke={C.merah} strokeWidth={4} strokeDasharray="12 10" strokeDashoffset={-t * 60} />
            <circle cx={bx} cy={by} r={7} fill={C.merah} stroke="#ffffff" strokeWidth={2} />
          </g>
        );
      })}
      {target.map((tx, i) => (
        <Laptop2D key={i} x={tx} y={440} s={0.72} infeksi={kena[i] > 0.5 ? 1 : 0} t={t} />
      ))}
      <Label2D x={560} y={64} teks="Laptop insinyur dikuasai" warna={C.merah} lebar={400} opacity={sel(p, 0.2, 0.35)} />
    </Adegan2D>
  );
};

const LowonganPalsu2D: React.FC = () => {
  const { t, p } = useAdegan();
  const topeng = pegas(sel(p, 0.4, 0.62));
  const kaget = p > 0.78;
  return (
    <Adegan2D t={t} tema="kantor">
      <Tokoh x={150} y={536} baju={C.cyan} rambut="#3b2a1a" ekspresi={kaget ? "kaget" : "senyum"} aL={10 + Math.abs(Math.sin(t * 4)) * 30} aR={10 + Math.abs(Math.sin(t * 4 + 1)) * 30} lihatX={1} kedip={kedipAt(t, 0.5)} napas={Math.sin(t * 3)} />
      <g transform={`translate(${lerp(640, 770, Math.min(1, topeng))} 270)`} opacity={sel(p, 0.4, 0.5)}>
        <ellipse cx={0} cy={0} rx={54} ry={70} fill={C.merah} stroke={OUT} strokeWidth={5} />
        <ellipse cx={-20} cy={-10} rx={11} ry={7} fill={OUT} />
        <ellipse cx={20} cy={-10} rx={11} ry={7} fill={OUT} />
        <circle cx={-20} cy={-10} r={3.5} fill={C.kuning} />
        <circle cx={20} cy={-10} r={3.5} fill={C.kuning} />
        <path d="M -22 26 Q 0 44 22 26" fill="none" stroke={OUT} strokeWidth={5} strokeLinecap="round" />
      </g>
      <g transform="translate(515 300)">
        <rect x={-120} y={168} width={12} height={68} fill="#3b4a6b" stroke={OUT} strokeWidth={3} />
        <rect x={108} y={168} width={12} height={68} fill="#3b4a6b" stroke={OUT} strokeWidth={3} />
        <rect x={-185} y={-170} width={370} height={340} rx={18} fill="#0f2a4a" stroke={OUT} strokeWidth={6} />
        <rect x={-165} y={-150} width={330} height={56} rx={10} fill={C.cyan} stroke={OUT} strokeWidth={4} />
        <text x={0} y={-110} fontSize={32} fill={OUT} textAnchor="middle" fontWeight={700} fontFamily="inherit">DICARI</text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={-150} y={-66 + i * 36} width={300 - i * 50} height={14} rx={7} fill="#ffffff" opacity={0.3} />
        ))}
        <rect x={-80} y={80} width={160} height={56} rx={28} fill={C.teal} stroke={OUT} strokeWidth={4} />
        <text x={0} y={117} fontSize={26} fill={OUT} textAnchor="middle" fontWeight={700} fontFamily="inherit">LAMAR</text>
      </g>
      <Label2D x={660} y={64} teks="Lowongan palsu" warna={C.merah} lebar={300} opacity={sel(p, 0.5, 0.65)} />
    </Adegan2D>
  );
};

const MataMata2D: React.FC = () => {
  const { t, p } = useAdegan();
  const warna = [C.teal, C.cyan, C.ungu, C.kuning, C.teal, C.cyan, C.ungu];
  const sx = lerp(300, 640, sel(p, 0.1, 0.8));
  const sorot = sel(p, 0.8, 0.95);
  return (
    <Adegan2D t={t}>
      <polygon points={`150,120 ${sx - 70},536 ${sx + 70},536`} fill="rgba(255,209,102,0.22)" />
      <rect x={40} y={300} width={180} height={236} rx={6} fill="#27334f" stroke={OUT} strokeWidth={5} />
      <rect x={30} y={290} width={200} height={20} rx={5} fill="#3b4a6b" stroke={OUT} strokeWidth={4} />
      <Tokoh x={130} y={290} skala={0.9} tudung topeng aL={20} bL={10} aR={60 + Math.sin(t * 2) * 6} bR={70} napas={Math.sin(t * 3)} />
      {warna.map((w, i) => {
        const xi = 300 + i * 85;
        const aktif = Math.abs(sx - xi) < 38;
        return <Tokoh key={i} x={xi} y={536} skala={0.62} baju={w} ekspresi={aktif ? "kaget" : "senyum"} aL={aktif ? 70 : 8} aR={aktif ? 70 : 8} kedip={kedipAt(t, i * 0.7)} napas={Math.sin(t * 3 + i)} />;
      })}
      <text x={640} y={366 + Math.sin(t * 6) * 4} fontSize={52} fill={C.merah} textAnchor="middle" fontWeight={700} fontFamily="inherit" opacity={sorot}>!</text>
      <Label2D x={560} y={64} teks="Yang diincar: manusianya" warna={C.kuning} lebar={420} opacity={sel(p, 0.75, 0.9)} />
    </Adegan2D>
  );
};

export const VisualBinance2D: Record<string, React.FC> = {
  "brankas-kosong-2d": BrankasKosong2D,
  "jam-20-menit-2d": JamDuaPuluh2D,
  "kunci-utuh-2d": KunciUtuh2D,
  "penanda-tangan-2d": PenandaTangan2D,
  "laptop-diambil-alih-2d": LaptopDiambilAlih2D,
  "lowongan-palsu-2d": LowonganPalsu2D,
  "mata-mata-2d": MataMata2D,
};
