import React from "react";
import { C, sel, lin, lerp, useAdegan, Kanvas, T, Orang } from "./VisualSadap";

const PANEL = "rgba(255,255,255,0.06)";
const GELAP = "#0b1220";
const ES = "#a0e6ff";

const Judul: React.FC<{ teks: string }> = ({ teks }) => (
  <T x={440} y={56} size={30} fill={C.redup} bold>{teks}</T>
);

const Koin: React.FC<{ x: number; y: number; r?: number; warna?: string; opacity?: number }> = ({ x, y, r = 22, warna = C.kuning, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <circle r={r} fill={warna} stroke="#ffffff" strokeWidth={2} />
    <circle r={r * 0.6} fill="none" stroke={GELAP} strokeWidth={2} opacity={0.5} />
  </g>
);

const Laptop: React.FC<{ x: number; y: number; warna?: string; s?: number; opacity?: number }> = ({ x, y, warna = C.cyan, s = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    <rect x={-70} y={-90} width={140} height={90} rx={8} fill={PANEL} stroke={warna} strokeWidth={5} />
    <rect x={-92} y={2} width={184} height={14} rx={7} fill={warna} />
    <line x1={-45} y1={-62} x2={-5} y2={-62} stroke={warna} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
    <line x1={-45} y1={-44} x2={30} y2={-44} stroke={warna} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
    <line x1={-45} y1={-26} x2={10} y2={-26} stroke={warna} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
  </g>
);

const Kunci: React.FC<{ x: number; y: number; warna?: string; s?: number }> = ({ x, y, warna = C.kuning, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={0} r={34} fill="none" stroke={warna} strokeWidth={12} />
    <rect x={30} y={-7} width={130} height={14} rx={5} fill={warna} />
    <rect x={118} y={6} width={14} height={26} fill={warna} />
    <rect x={142} y={6} width={14} height={20} fill={warna} />
  </g>
);

const BrankasKosong: React.FC = () => {
  const { p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const sx = lerp(1, 0.12, sel(p, 0.12, 0.4));
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Brankas terkuras" />
        <rect x={290} y={130} width={300} height={340} rx={18} fill={GELAP} stroke={C.cyan} strokeWidth={6} />
        <rect x={306} y={146} width={268} height={308} rx={10} fill="#050a14" />
        <g transform={`translate(290 130) scale(${sx} 1)`}>
          <rect x={0} y={0} width={300} height={340} rx={18} fill="rgba(0,229,255,0.14)" stroke={C.cyan} strokeWidth={6} />
          <circle cx={225} cy={170} r={36} fill="none" stroke={C.cyan} strokeWidth={6} />
          <line x1={225} y1={150} x2={225} y2={190} stroke={C.cyan} strokeWidth={6} />
        </g>
        {Array.from({ length: 12 }, (_, i) => {
          const q = lin(p, 0.3 + i * 0.03, 0.75 + i * 0.03);
          const a = ((-170 + i * 14) * Math.PI) / 180;
          return <Koin key={i} x={440 + Math.cos(a) * q * 400} y={300 + Math.sin(a) * q * 260} r={18} opacity={q > 0 ? 1 - q * 0.7 : 0} />;
        })}
        <T x={440} y={545} size={24} fill={C.redup}>Hot wallet dikuras dalam satu malam</T>
      </g>
    </Kanvas>
  );
};

const KunciUtuh: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.12);
  const buka = sel(p, 0.35, 0.75);
  const sx = lerp(1, 0.15, buka);
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Kunci utuh, pintu terbuka" />
        <circle cx={300} cy={300} r={100 + 10 * Math.sin(t * 4)} fill="rgba(255,209,102,0.12)" />
        <Kunci x={215} y={300} warna={C.kuning} s={1.1} />
        <T x={300} y={470} size={22} fill={C.kuning}>Kunci tidak bocor</T>
        <rect x={560} y={190} width={150} height={240} fill="#050a14" stroke={C.teal} strokeWidth={5} />
        <rect x={560} y={190} width={150} height={240} fill={C.kuning} opacity={buka * 0.45} />
        <g transform={`translate(560 190) scale(${sx} 1)`}>
          <rect x={0} y={0} width={150} height={240} fill="rgba(77,208,225,0.25)" stroke={C.teal} strokeWidth={5} />
          <circle cx={125} cy={120} r={8} fill={C.teal} />
        </g>
        <T x={635} y={470} size={22} fill={C.teal}>Pintu terbuka sendiri</T>
      </g>
    </Kanvas>
  );
};

const LowonganPalsu: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const topeng = sel(p, 0.35, 0.8);
  const goyang = Math.sin(t * 2.5) * 3;
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Lowongan kerja" />
        <g transform={`translate(${lerp(560, 650, topeng)} 300)`} opacity={topeng}>
          <ellipse cx={0} cy={0} rx={70} ry={92} fill={C.merah} opacity={0.9} />
          <ellipse cx={-26} cy={-14} rx={13} ry={9} fill={GELAP} />
          <ellipse cx={26} cy={-14} rx={13} ry={9} fill={GELAP} />
          <path d="M -28 34 Q 0 56 28 34" fill="none" stroke={GELAP} strokeWidth={6} strokeLinecap="round" />
        </g>
        <g transform={`translate(0 ${goyang})`}>
          <rect x={200} y={110} width={380} height={380} rx={16} fill={GELAP} stroke={C.cyan} strokeWidth={5} />
          <T x={390} y={168} size={32} fill={C.cyan} bold>DICARI</T>
          <rect x={240} y={200} width={300} height={16} rx={8} fill="rgba(255,255,255,0.25)" />
          <rect x={240} y={232} width={240} height={16} rx={8} fill="rgba(255,255,255,0.18)" />
          <rect x={240} y={264} width={280} height={16} rx={8} fill="rgba(255,255,255,0.18)" />
          <rect x={240} y={296} width={200} height={16} rx={8} fill="rgba(255,255,255,0.18)" />
          <rect x={300} y={400} width={180} height={56} rx={28} fill={C.cyan} opacity={0.85} />
          <T x={390} y={437} size={24} fill={GELAP} bold>Lamar</T>
        </g>
      </g>
    </Kanvas>
  );
};

const LaptopDiambilAlih: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const xs = [200, 440, 680];
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Laptop insinyur diambil alih" />
        <circle cx={440} cy={140} r={36} fill={GELAP} stroke={C.merah} strokeWidth={5} />
        <circle cx={428} cy={136} r={5} fill={C.merah} />
        <circle cx={452} cy={136} r={5} fill={C.merah} />
        <T x={440} y={205} size={20} fill={C.merah}>Penyerang</T>
        {xs.map((x, i) => {
          const q = sel(p, 0.15 + i * 0.22, 0.3 + i * 0.22);
          const kena = sel(p, 0.3 + i * 0.22, 0.4 + i * 0.22) > 0.5;
          return (
            <g key={i}>
              <line x1={440} y1={178} x2={lerp(440, x, q)} y2={lerp(178, 300, q)} stroke={C.merah} strokeWidth={4} strokeDasharray="10 8" />
              {kena ? <circle cx={x} cy={355} r={100 + 12 * Math.sin(t * 5 + i)} fill="none" stroke={C.merah} strokeWidth={3} opacity={0.5} /> : null}
              <Laptop x={x} y={400} warna={kena ? C.merah : C.cyan} />
              <T x={x} y={455} size={20} fill={kena ? C.merah : C.redup}>{`Insinyur ${i + 1}`}</T>
            </g>
          );
        })}
      </g>
    </Kanvas>
  );
};

const GarisWaktuBinance: React.FC = () => {
  const { p } = useAdegan();
  const masuk = sel(p, 0, 0.08);
  const maju = lin(p, 0.08, 0.92);
  const ev = [
    { w: "Juni", k: "Paket palsu", c: C.kuning },
    { w: "Sep", k: "Lowongan palsu", c: C.kuning },
    { w: "20 Okt", k: "Laptop dikuasai", c: C.merah },
    { w: "29 Okt", k: "Dana dicuri", c: C.merah },
    { w: "31 Okt", k: "FBI menyebut", c: C.ungu },
    { w: "4 Nov", k: "98% diganti", c: C.teal },
  ];
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Kronologi" />
        <line x1={80} y1={310} x2={800} y2={310} stroke="rgba(255,255,255,0.2)" strokeWidth={6} strokeLinecap="round" />
        <line x1={80} y1={310} x2={lerp(80, 800, maju)} y2={310} stroke={C.cyan} strokeWidth={6} strokeLinecap="round" />
        {ev.map((e, i) => {
          const x = 110 + i * 132;
          const ada = sel(p, 0.1 + i * 0.13, 0.2 + i * 0.13);
          const atas = i % 2 === 0;
          return (
            <g key={i} opacity={ada}>
              <line x1={x} y1={310} x2={x} y2={atas ? 250 : 370} stroke={e.c} strokeWidth={3} />
              <circle cx={x} cy={310} r={14 + 4 * ada} fill={e.c} stroke="#ffffff" strokeWidth={3} />
              <T x={x} y={atas ? 232 : 408} size={26} fill={e.c} bold>{e.w}</T>
              <T x={x} y={atas ? 204 : 440} size={19} fill={C.teks}>{e.k}</T>
            </g>
          );
        })}
      </g>
    </Kanvas>
  );
};

const BursaDuaLaci: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const buka = sel(p, 0.2, 0.45);
  const sorot = sel(p, 0.5, 0.7) * (0.5 + 0.5 * Math.sin(t * 6));
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Dua tempat simpan" />
        <rect x={90} y={190} width={260} height={270} rx={18} fill={GELAP} stroke={C.cyan} strokeWidth={6} />
        <circle cx={220} cy={325} r={46} fill="none" stroke={C.cyan} strokeWidth={6} />
        <line x1={220} y1={300} x2={220} y2={350} stroke={C.cyan} strokeWidth={6} />
        <line x1={195} y1={325} x2={245} y2={325} stroke={C.cyan} strokeWidth={6} />
        <T x={220} y={500} size={22} fill={C.cyan}>Brankas besar</T>
        {[18, 34, 50].map((r, i) => (
          <path key={i} d={`M ${640 - r} 232 A ${r} ${r} 0 0 1 ${640 + r} 232`} fill="none" stroke={C.kuning} strokeWidth={5} strokeLinecap="round" opacity={0.4 + 0.6 * ((Math.sin(t * 5 - i) + 1) / 2)} />
        ))}
        <circle cx={640} cy={246} r={5} fill={C.kuning} />
        <rect x={480} y={290} width={320} height={160} rx={14} fill={GELAP} stroke={C.kuning} strokeWidth={5} />
        <rect x={496} y={300} width={288} height={60} rx={8} fill={PANEL} />
        {[0, 1, 2, 3, 4].map((i) => (
          <Koin key={i} x={530 + i * 55} y={332} r={18} />
        ))}
        <g transform={`translate(0 ${buka * 18})`}>
          <rect x={480} y={360} width={320} height={90} rx={12} fill={GELAP} stroke={C.kuning} strokeWidth={5} />
          <rect x={610} y={395} width={60} height={14} rx={7} fill={C.kuning} />
        </g>
        <rect x={470} y={280} width={340} height={180} rx={20} fill="none" stroke={C.merah} strokeWidth={5} opacity={sorot} />
        <T x={640} y={500} size={22} fill={C.kuning}>Laci kasir (hot wallet)</T>
      </g>
    </Kanvas>
  );
};

const MpcKunciTerpecah: React.FC = () => {
  const { p } = useAdegan();
  const masuk = sel(p, 0, 0.08);
  const k = sel(p, 0.3, 0.7);
  const kilat = sel(p, 0.28, 0.4);
  const a = { x: lerp(360, 170, k), y: lerp(260, 370, k) };
  const b = { x: lerp(470, 440, k), y: lerp(260, 370, k) };
  const c = { x: lerp(545, 710, k), y: lerp(262, 370, k) };
  const warna = [C.cyan, C.kuning, C.ungu];
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Kunci dipecah (MPC)" />
        <circle cx={440} cy={260} r={20 + 120 * kilat} fill="rgba(255,255,255,0.12)" opacity={kilat < 1 ? 1 - kilat : 0} />
        <circle cx={a.x} cy={a.y} r={34} fill="none" stroke={C.cyan} strokeWidth={12} />
        <rect x={b.x - 55} y={b.y - 7} width={110} height={14} rx={5} fill={C.kuning} />
        <rect x={c.x - 14} y={c.y - 8} width={14} height={30} fill={C.ungu} />
        <rect x={c.x + 8} y={c.y - 8} width={14} height={22} fill={C.ungu} />
        {[170, 440, 710].map((x, i) => (
          <g key={i}>
            <Orang x={x} y={510} skala={0.6} warna={warna[i]} />
            <T x={x} y={575} size={20} fill={C.redup}>{`Pihak ${i + 1}`}</T>
          </g>
        ))}
      </g>
    </Kanvas>
  );
};

const PenandaTanganMesin: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const gerak = Math.max(0, Math.sin(t * 5)) * 80;
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Layanan penanda tangan" />
        <line x1={30} y1={440} x2={850} y2={440} stroke="rgba(255,255,255,0.25)" strokeWidth={8} />
        {[0, 1, 2].map((i) => {
          const q = (t * 0.35 + i / 3) % 1;
          const x = lerp(60, 820, q);
          return (
            <g key={i} transform={`translate(${x} 380)`}>
              <rect x={-40} y={-50} width={80} height={100} rx={8} fill={GELAP} stroke={C.merah} strokeWidth={4} />
              <line x1={-24} y1={-26} x2={24} y2={-26} stroke={C.redup} strokeWidth={4} />
              <line x1={-24} y1={-8} x2={24} y2={-8} stroke={C.redup} strokeWidth={4} />
              {x > 460 ? <path d="M -16 22 L -4 34 L 18 8" fill="none" stroke={C.teal} strokeWidth={7} strokeLinecap="round" /> : null}
            </g>
          );
        })}
        <rect x={370} y={120} width={140} height={160} rx={14} fill={GELAP} stroke={C.cyan} strokeWidth={5} />
        <T x={440} y={150} size={22} fill={C.cyan} bold>Signing</T>
        <T x={440} y={176} size={22} fill={C.cyan} bold>service</T>
        <g transform={`translate(440 ${214 + gerak})`}>
          <rect x={-6} y={-44} width={12} height={26} fill={C.cyan} />
          <rect x={-22} y={-20} width={44} height={40} rx={8} fill={C.cyan} />
          <rect x={-36} y={20} width={72} height={12} rx={6} fill={C.cyan} />
        </g>
        <Orang x={100} y={300} skala={0.7} warna={C.merah} />
        <T x={100} y={212} size={20} fill={C.merah}>Penyerang</T>
      </g>
    </Kanvas>
  );
};

const PaketPalsuIklan: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.08);
  const ketik = sel(p, 0.05, 0.3);
  const turun = sel(p, 0.35, 0.6);
  const kata = "alat bantu coding AI";
  const pulsa = 0.5 + 0.5 * Math.sin(t * 6);
  return (
    <Kanvas>
      <g opacity={masuk}>
        <rect x={140} y={90} width={600} height={56} rx={28} fill={PANEL} stroke={C.cyan} strokeWidth={4} />
        <circle cx={180} cy={116} r={11} fill="none" stroke={C.cyan} strokeWidth={4} />
        <line x1={188} y1={124} x2={198} y2={134} stroke={C.cyan} strokeWidth={4} strokeLinecap="round" />
        <T x={220} y={125} size={24} anchor="start">{kata.slice(0, Math.floor(kata.length * ketik))}</T>
        <g transform={`translate(140 ${lerp(180, 340, turun)})`}>
          <rect x={0} y={0} width={600} height={140} rx={14} fill={PANEL} stroke={C.teal} strokeWidth={4} />
          <rect x={20} y={18} width={80} height={26} rx={6} fill={C.teal} />
          <T x={60} y={38} size={18} fill={GELAP} bold>Resmi</T>
          <rect x={20} y={64} width={360} height={14} rx={7} fill="rgba(255,255,255,0.25)" />
          <rect x={20} y={92} width={280} height={12} rx={6} fill="rgba(255,255,255,0.15)" />
        </g>
        <g transform={`translate(140 ${lerp(60, 180, turun)})`} opacity={turun}>
          <rect x={0} y={0} width={600} height={140} rx={14} fill={GELAP} stroke={C.kuning} strokeWidth={5} />
          <rect x={20} y={18} width={80} height={26} rx={6} fill={C.kuning} />
          <T x={60} y={38} size={18} fill={GELAP} bold>Iklan</T>
          <rect x={20} y={64} width={360} height={14} rx={7} fill="rgba(255,255,255,0.3)" />
          <rect x={20} y={92} width={280} height={12} rx={6} fill="rgba(255,255,255,0.18)" />
          <rect x={470} y={40} width={90} height={70} rx={8} fill="rgba(255,107,107,0.2)" stroke={C.merah} strokeWidth={4} opacity={0.5 + 0.5 * pulsa} />
          <line x1={515} y1={40} x2={515} y2={110} stroke={C.merah} strokeWidth={4} />
        </g>
      </g>
    </Kanvas>
  );
};

const RekruterPalsu: React.FC = () => {
  const { p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const topeng = sel(p, 0.45, 0.75);
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Wawancara pertama" />
        <g transform="translate(250 110)">
          <rect x={0} y={0} width={380} height={340} rx={16} fill={GELAP} stroke={C.cyan} strokeWidth={5} />
          <circle cx={80} cy={80} r={38} fill={C.redup} />
          <path d="M 24 170 Q 80 100 136 170 Z" fill={C.redup} />
          <rect x={170} y={56} width={170} height={18} rx={9} fill="rgba(255,255,255,0.3)" />
          <rect x={170} y={90} width={120} height={14} rx={7} fill="rgba(255,255,255,0.18)" />
          <T x={170} y={146} size={22} fill={C.cyan} anchor="start" bold>HR</T>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={24 + i * 118} y={206} width={104} height={90} rx={10} fill={PANEL} stroke={C.teal} strokeWidth={3} />
              {i < 2 ? (
                <circle cx={50 + i * 118} cy={232} r={9} fill={C.kuning} />
              ) : (
                <polygon points={`${54 + i * 118},232 ${54 + i * 118},272 ${92 + i * 118},252`} fill={C.teks} />
              )}
            </g>
          ))}
          <g transform={`translate(80 80) scale(${lerp(0.4, 1, topeng)})`} opacity={topeng}>
            <ellipse cx={0} cy={0} rx={40} ry={52} fill={C.merah} opacity={0.92} />
            <ellipse cx={-15} cy={-8} rx={8} ry={5} fill={GELAP} />
            <ellipse cx={15} cy={-8} rx={8} ry={5} fill={GELAP} />
            <path d="M -16 20 Q 0 32 16 20" fill="none" stroke={GELAP} strokeWidth={4} strokeLinecap="round" />
          </g>
        </g>
        <T x={440} y={520} size={26} fill={C.merah} bold opacity={topeng}>HR palsu</T>
      </g>
    </Kanvas>
  );
};

const CeoPalsuChat: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const b1 = sel(p, 0.12, 0.25);
  const b2 = sel(p, 0.32, 0.45);
  const b3 = sel(p, 0.55, 0.7);
  const titik = sel(p, 0.45, 0.5) * (1 - b3);
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Wawancara kedua" />
        <Orang x={140} y={470} skala={1.3} warna={C.ungu} />
        <T x={140} y={320} size={24} fill={C.merah} bold>CEO palsu</T>
        <rect x={300} y={110} width={520} height={430} rx={20} fill={PANEL} stroke={C.cyan} strokeWidth={5} />
        <g opacity={b1} transform={`translate(0 ${(1 - b1) * 16})`}>
          <rect x={330} y={150} width={280} height={56} rx={16} fill="rgba(167,139,250,0.25)" stroke={C.ungu} strokeWidth={3} />
          <T x={350} y={186} size={22} anchor="start">Profil kamu menarik.</T>
        </g>
        <g opacity={b2} transform={`translate(0 ${(1 - b2) * 16})`}>
          <rect x={330} y={230} width={340} height={56} rx={16} fill="rgba(167,139,250,0.25)" stroke={C.ungu} strokeWidth={3} />
          <T x={350} y={266} size={22} anchor="start">Selesaikan tugas coding ini.</T>
        </g>
        <g opacity={b3} transform={`translate(0 ${(1 - b3) * 16})`}>
          <rect x={330} y={320} width={260} height={64} rx={14} fill="rgba(255,107,107,0.18)" stroke={C.merah} strokeWidth={4} />
          <path d="M 350 342 L 350 366 L 380 366 L 380 348 L 368 348 L 364 342 Z" fill="none" stroke={C.merah} strokeWidth={3} />
          <T x={396} y={360} size={20} anchor="start">tugas-coding.zip</T>
        </g>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={350 + i * 26} cy={440 + Math.sin(t * 8 + i) * 4} r={7} fill={C.redup} opacity={titik} />
        ))}
      </g>
    </Kanvas>
  );
};

const Bug: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <g transform={`translate(${x} ${y})`}>
    {[-1, 0, 1].map((k) => (
      <g key={k}>
        <line x1={-8} y1={k * 8} x2={-22} y2={k * 12 + Math.sin(t * 14 + k) * 4} stroke={C.merah} strokeWidth={3} strokeLinecap="round" />
        <line x1={8} y1={k * 8} x2={22} y2={k * 12 + Math.sin(t * 14 + k + 1) * 4} stroke={C.merah} strokeWidth={3} strokeLinecap="round" />
      </g>
    ))}
    <ellipse cx={0} cy={0} rx={11} ry={16} fill={C.merah} />
    <circle cx={0} cy={-18} r={7} fill={C.merah} />
  </g>
);

const TugasBerisiMalware: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const infeksi = sel(p, 0.8, 0.9);
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Tugas coding berisi malware" />
        <path d="M 130 300 L 130 440 L 330 440 L 330 320 L 230 320 L 215 300 Z" fill={PANEL} stroke={C.kuning} strokeWidth={5} strokeLinejoin="round" />
        <T x={230} y={490} size={22} fill={C.kuning}>Tugas coding</T>
        {[0, 1, 2, 3].map((i) => {
          const q = lin(p, 0.25 + i * 0.1, 0.65 + i * 0.1);
          return q > 0 ? <Bug key={i} x={lerp(260, 640, q)} y={lerp(380, 350, q) + Math.sin(q * 6 + i) * 18} t={t} /> : null;
        })}
        <Laptop x={700} y={400} warna={infeksi > 0.5 ? C.merah : C.cyan} />
        <T x={700} y={455} size={22} fill={infeksi > 0.5 ? C.merah : C.redup}>Laptop kerja</T>
      </g>
    </Kanvas>
  );
};

const TokenKartuAkses: React.FC = () => {
  const { p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const q = sel(p, 0.25, 0.75);
  const x = lerp(260, 640, q);
  const y = 330 - Math.sin(q * Math.PI) * 60;
  const rot = Math.sin(q * Math.PI * 2) * 8;
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Token = kartu akses digital" />
        <Laptop x={170} y={400} s={1.1} />
        <T x={170} y={460} size={22} fill={C.redup}>Laptop insinyur</T>
        <line x1={260} y1={330} x2={x} y2={y} stroke={C.kuning} strokeWidth={3} strokeDasharray="8 8" opacity={0.6} />
        <g transform={`translate(${x} ${y}) rotate(${rot})`}>
          <rect x={-65} y={-42} width={130} height={84} rx={10} fill="rgba(255,209,102,0.18)" stroke={C.kuning} strokeWidth={4} />
          <rect x={-48} y={-26} width={26} height={20} rx={4} fill={C.kuning} />
          <T x={20} y={-10} size={18} fill={C.kuning} bold>TOKEN</T>
          <rect x={-48} y={14} width={96} height={8} rx={4} fill="rgba(255,255,255,0.3)" />
        </g>
        <Orang x={720} y={470} skala={0.9} warna={C.merah} />
        <T x={720} y={545} size={20} fill={C.merah}>Penyerang</T>
      </g>
    </Kanvas>
  );
};

const ContainerDijalankan: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const q = sel(p, 0.35, 0.75);
  const tekan = 1 + 0.15 * sel(p, 0.1, 0.25) * (1 - sel(p, 0.25, 0.4));
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Menjalankan container" />
        <rect x={480} y={140} width={300} height={360} rx={14} fill={GELAP} stroke={C.cyan} strokeWidth={5} />
        {[160, 270, 380].map((y, i) => (
          <g key={i}>
            <rect x={496} y={y} width={268} height={100} rx={8} fill={PANEL} stroke={C.redup} strokeWidth={2} />
            <circle cx={740} cy={y + 50} r={8} fill={i === 1 && q >= 1 ? C.merah : C.teal} opacity={i === 1 && q >= 1 ? 0.5 + 0.5 * Math.sin(t * 8) : 0.8} />
          </g>
        ))}
        <T x={630} y={122} size={20} fill={C.redup}>Server perusahaan</T>
        <g transform={`translate(200 200) scale(${tekan})`}>
          <circle cx={0} cy={0} r={46} fill={PANEL} stroke={C.kuning} strokeWidth={5} />
          <polygon points="-12,-22 -12,22 24,0" fill={C.kuning} />
        </g>
        <T x={200} y={275} size={22} fill={C.kuning}>Jalankan</T>
        <g transform={`translate(${lerp(130, 630, q)} ${lerp(470, 320, q)})`}>
          <rect x={-90} y={-40} width={180} height={80} rx={6} fill="rgba(255,107,107,0.2)" stroke={C.merah} strokeWidth={4} />
          {[-60, -30, 0, 30, 60].map((x) => (
            <line key={x} x1={x} y1={-34} x2={x} y2={34} stroke={C.merah} strokeWidth={3} opacity={0.7} />
          ))}
        </g>
        <T x={230} y={540} size={20} fill={C.redup}>Ruang program terisolasi</T>
      </g>
    </Kanvas>
  );
};

const DompetMeminjamKode: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const q = sel(p, 0.2, 0.65);
  const kena = sel(p, 0.65, 0.8) > 0.5;
  const x = lerp(740, 560, q);
  const y = lerp(190, 230, q);
  const warna = kena ? C.merah : C.cyan;
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Dompet meminjam kode" />
        <g transform="translate(330 340)">
          <Koin x={-40} y={-70} r={24} />
          <rect x={-110} y={-60} width={220} height={130} rx={18} fill={GELAP} stroke={warna} strokeWidth={5} />
          <line x1={-110} y1={-20} x2={110} y2={-20} stroke={warna} strokeWidth={4} />
          <circle cx={70} cy={10} r={12} fill={warna} />
        </g>
        <T x={330} y={450} size={22} fill={warna}>Dompet biasa</T>
        <line x1={x - 80} y1={y} x2={445} y2={310} stroke={C.ungu} strokeWidth={3} strokeDasharray="8 8" opacity={q > 0 ? 0.7 : 0} />
        <g transform={`translate(${x} ${y})`}>
          <rect x={-80} y={-50} width={160} height={100} rx={12} fill="rgba(167,139,250,0.2)" stroke={C.ungu} strokeWidth={4} />
          <T x={0} y={12} size={46} fill={C.kuning} bold>{"{ }"}</T>
          <T x={0} y={40} size={18} fill={C.ungu}>EIP-7702</T>
        </g>
        <g transform="translate(730 430)" opacity={sel(p, 0.4, 0.6)}>
          <circle cx={0} cy={0} r={34} fill="none" stroke={C.teal} strokeWidth={5} />
          <line x1={0} y1={0} x2={22 * Math.sin(t * 3)} y2={-22 * Math.cos(t * 3)} stroke={C.teal} strokeWidth={5} strokeLinecap="round" />
          <T x={0} y={68} size={18} fill={C.teal}>sementara</T>
        </g>
      </g>
    </Kanvas>
  );
};

const PembekuanStablecoin: React.FC = () => {
  const { p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Stablecoin dibekukan" />
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 140 + i * 150;
          const es = sel(p, 0.15 + i * 0.13, 0.28 + i * 0.13);
          return (
            <g key={i}>
              <Koin x={x} y={300} r={38} warna={C.teal} />
              <T x={x} y={313} size={34} fill={GELAP} bold>$</T>
              <rect x={x - 52} y={248} width={104} height={104} rx={14} fill="rgba(160,230,255,0.28)" stroke={ES} strokeWidth={4} opacity={es} />
              <line x1={x + 30} y1={262} x2={x + 42} y2={274} stroke="#ffffff" strokeWidth={3} opacity={es} />
              <line x1={x + 42} y1={262} x2={x + 30} y2={274} stroke="#ffffff" strokeWidth={3} opacity={es} />
            </g>
          );
        })}
        <T x={440} y={450} size={24} fill={ES}>Dibekukan satu per satu</T>
      </g>
    </Kanvas>
  );
};

const TukarKeEth: React.FC = () => {
  const { p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const panah = sel(p, 0.3, 0.55);
  const tumbuh = sel(p, 0.5, 0.8);
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Tukar ke aset yang lolos beku" />
        <rect x={110} y={190} width={250} height={250} rx={18} fill={GELAP} stroke={ES} strokeWidth={5} />
        <Koin x={235} y={315} r={50} warna={C.teal} opacity={lerp(1, 0.25, tumbuh)} />
        <T x={235} y={332} size={44} fill={GELAP} bold opacity={lerp(1, 0.25, tumbuh)}>$</T>
        <rect x={125} y={205} width={220} height={220} rx={12} fill="rgba(160,230,255,0.22)" />
        <T x={235} y={480} size={22} fill={ES}>Stablecoin</T>
        <line x1={385} y1={315} x2={lerp(385, 495, panah)} y2={315} stroke={C.kuning} strokeWidth={8} strokeLinecap="round" />
        <polygon points="495,295 525,315 495,335" fill={C.kuning} opacity={panah} />
        <rect x={540} y={190} width={230} height={250} rx={18} fill={GELAP} stroke={C.ungu} strokeWidth={5} />
        <g transform={`translate(655 315) scale(${lerp(0.2, 1, tumbuh)})`} opacity={tumbuh}>
          <polygon points="0,-60 46,0 0,60 -46,0" fill={C.ungu} stroke="#ffffff" strokeWidth={3} />
          <T x={0} y={8} size={22} fill={C.teks} bold>ETH</T>
        </g>
        <T x={655} y={480} size={22} fill={C.ungu}>Tak bisa dibekukan penerbit</T>
      </g>
    </Kanvas>
  );
};

const CuciUangOtomatis: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Pencucian uang otomatis" />
        {[0, 1, 2, 3].map((i) => {
          const q = (t * 0.5 + i / 4) % 1;
          return <Koin key={i} x={lerp(40, 290, q)} y={310} r={14} />;
        })}
        <rect x={300} y={200} width={200} height={220} rx={24} fill={GELAP} stroke={C.cyan} strokeWidth={6} />
        <circle cx={400} cy={310} r={64} fill={PANEL} stroke={C.cyan} strokeWidth={5} />
        <circle cx={400} cy={310} r={58} fill="none" stroke={C.cyan} strokeWidth={6} strokeDasharray="30 18" transform={`rotate(${t * 120} 400 310)`} />
        <g transform={`rotate(${t * 240} 400 310)`}>
          {[0, 120, 240].map((a) => (
            <circle key={a} cx={400 + 30 * Math.cos((a * Math.PI) / 180)} cy={310 + 30 * Math.sin((a * Math.PI) / 180)} r={9} fill={C.kuning} />
          ))}
        </g>
        {Array.from({ length: 16 }, (_, i) => {
          const q = (t * 0.45 + i / 16) % 1;
          return <circle key={i} cx={lerp(500, 840, q)} cy={310 + (i - 8) * q * 18} r={5} fill={C.kuning} opacity={1 - q * 0.3} />;
        })}
        <T x={150} y={520} size={22} fill={C.kuning}>Dana curian</T>
        <T x={700} y={520} size={22} fill={C.teal}>Ribuan dompet</T>
      </g>
    </Kanvas>
  );
};

const RekorPeretasan: React.FC = () => {
  const { p } = useAdegan();
  const masuk = sel(p, 0, 0.08);
  const gB = sel(p, 0.1, 0.5);
  const gC = sel(p, 0.3, 0.7);
  const d = sel(p, 0.55, 0.95);
  const keliling = 2 * Math.PI * 90;
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Rekor peretasan kripto" />
        <rect x={120} y={500 - 72 * gB} width={110} height={72 * gB} rx={6} fill={C.ungu} />
        <T x={175} y={500 - 72 * gB - 12} size={20} fill={C.ungu} opacity={gB}>sekitar $1,5 miliar</T>
        <T x={175} y={535} size={24} fill={C.teks} bold>Bybit</T>
        <T x={175} y={562} size={18} fill={C.redup}>Feb 2025</T>
        <rect x={270} y={500 - 300 * gC} width={110} height={300 * gC} rx={6} fill={C.merah} />
        <T x={325} y={500 - 300 * gC - 12} size={20} fill={C.merah} opacity={gC}>lebih dari $6 miliar</T>
        <T x={325} y={535} size={24} fill={C.teks} bold>Binance</T>
        <T x={325} y={562} size={18} fill={C.redup}>Okt 2026</T>
        <circle cx={640} cy={320} r={90} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={26} />
        <circle cx={640} cy={320} r={90} fill="none" stroke={C.kuning} strokeWidth={26} strokeDasharray={`${keliling * 0.72 * d} ${keliling}`} transform="rotate(-90 640 320)" />
        <T x={640} y={336} size={46} fill={C.kuning} bold>{`${Math.round(72 * d)}%`}</T>
        <T x={640} y={450} size={20} fill={C.redup}>dari kerugian</T>
        <T x={640} y={476} size={20} fill={C.redup}>peretasan kripto 2026</T>
      </g>
    </Kanvas>
  );
};

const DanaDaruratSafu: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const k = sel(p, 0.2, 0.9);
  const lv1 = lerp(0.9, 0.35, k);
  const lv2 = lerp(0.08, 0.85, k);
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Dana darurat menutup lubang" />
        <rect x={130} y={170} width={140} height={300} rx={16} fill={GELAP} stroke={C.cyan} strokeWidth={5} />
        <rect x={138} y={462 - 284 * lv1} width={124} height={284 * lv1} rx={8} fill="rgba(0,229,255,0.45)" />
        <T x={200} y={520} size={28} fill={C.cyan} bold>SAFU</T>
        <line x1={270} y1={430} x2={570} y2={430} stroke={C.cyan} strokeWidth={10} opacity={0.5} />
        {[0, 1, 2, 3, 4].map((i) => {
          const q = (t * 0.8 + i / 5) % 1;
          return <circle key={i} cx={lerp(270, 560, q)} cy={430} r={8} fill={C.cyan} />;
        })}
        <rect x={560} y={200} width={220} height={270} rx={18} fill={GELAP} stroke={C.kuning} strokeWidth={5} />
        <rect x={570} y={460 - 250 * lv2} width={200} height={250 * lv2} rx={8} fill="rgba(255,209,102,0.45)" />
        <T x={670} y={520} size={22} fill={C.kuning}>Menutup kerugian</T>
      </g>
    </Kanvas>
  );
};

const PenarikanBertahap: React.FC = () => {
  const { t, p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const g = lerp(12, 100, sel(p, 0.2, 0.9));
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Penarikan dibuka bertahap" />
        <rect x={318} y={190} width={12} height={260} fill={C.cyan} />
        <rect x={550} y={190} width={12} height={260} fill={C.cyan} />
        <rect x={330} y={200} width={110 - g / 2} height={240} fill="rgba(0,229,255,0.25)" stroke={C.cyan} strokeWidth={4} />
        <rect x={440 + g / 2} y={200} width={110 - g / 2} height={240} fill="rgba(0,229,255,0.25)" stroke={C.cyan} strokeWidth={4} />
        {[0, 1, 2, 3].map((i) => (
          <Orang key={i} x={100 + i * 52} y={430} skala={0.55} warna={C.cyan} langkah={t * 2 + i} />
        ))}
        {[0, 1, 2].map((i) => (
          <g key={i} opacity={sel(p, 0.35 + i * 0.15, 0.5 + i * 0.15)}>
            <Orang x={640 + i * 60} y={430} skala={0.55} warna={C.teal} />
          </g>
        ))}
        <T x={190} y={520} size={20} fill={C.cyan}>Antrean pelanggan</T>
        <T x={700} y={520} size={20} fill={C.teal}>Berhasil menarik</T>
      </g>
    </Kanvas>
  );
};

const LangkahSebar: React.FC = () => {
  const { p } = useAdegan();
  const masuk = sel(p, 0, 0.1);
  const jatuh = sel(p, 0.35, 0.7);
  const tanda = sel(p, 0.7, 0.85);
  const xs = [200, 440, 680];
  const telur = [-40, 0, 40];
  return (
    <Kanvas>
      <g opacity={masuk}>
        <Judul teks="Jangan satu keranjang" />
        {xs.map((x, i) => {
          const j = i === 0 ? jatuh : 0;
          return (
            <g key={i}>
              <g transform={`translate(${x} ${380 + j * 50}) rotate(${j * 65})`}>
                {telur.map((dx, n) => (
                  <ellipse key={n} cx={dx + j * (n - 1) * 30} cy={-14 + j * 40} rx={20} ry={26} fill={j > 0.6 ? C.merah : "#ffffff"} />
                ))}
                <path d="M -80 0 L 80 0 L 60 70 L -60 70 Z" fill="rgba(255,209,102,0.25)" stroke={C.kuning} strokeWidth={5} strokeLinejoin="round" />
              </g>
              <T x={x} y={500} size={20} fill={C.redup}>{`Tempat ${i + 1}`}</T>
            </g>
          );
        })}
        <g transform="translate(200 260)" opacity={tanda}>
          <line x1={-20} y1={-20} x2={20} y2={20} stroke={C.merah} strokeWidth={8} strokeLinecap="round" />
          <line x1={20} y1={-20} x2={-20} y2={20} stroke={C.merah} strokeWidth={8} strokeLinecap="round" />
        </g>
        {[440, 680].map((x) => (
          <path key={x} transform={`translate(${x} 260)`} d="M -22 0 L -6 18 L 24 -20" fill="none" stroke={C.teal} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" opacity={tanda} />
        ))}
      </g>
    </Kanvas>
  );
};

export const VisualBinance: Record<string, React.FC> = {
  "brankas-kosong": BrankasKosong,
  "kunci-utuh": KunciUtuh,
  "lowongan-palsu": LowonganPalsu,
  "laptop-diambil-alih": LaptopDiambilAlih,
  "garis-waktu-binance": GarisWaktuBinance,
  "bursa-dua-laci": BursaDuaLaci,
  "mpc-kunci-terpecah": MpcKunciTerpecah,
  "penanda-tangan-mesin": PenandaTanganMesin,
  "paket-palsu-iklan": PaketPalsuIklan,
  "rekruter-palsu": RekruterPalsu,
  "ceo-palsu-chat": CeoPalsuChat,
  "tugas-berisi-malware": TugasBerisiMalware,
  "token-kartu-akses": TokenKartuAkses,
  "container-dijalankan": ContainerDijalankan,
  "dompet-meminjam-kode": DompetMeminjamKode,
  "pembekuan-stablecoin": PembekuanStablecoin,
  "tukar-ke-eth": TukarKeEth,
  "cuci-uang-otomatis": CuciUangOtomatis,
  "rekor-peretasan": RekorPeretasan,
  "dana-darurat-safu": DanaDaruratSafu,
  "penarikan-bertahap": PenarikanBertahap,
  "langkah-sebar": LangkahSebar,
};
