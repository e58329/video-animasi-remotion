import React from "react";
import { useAdegan } from "./VisualSadap";
import { W, mulus, antar, campur } from "./halus";
import { LatarTipo, TeksBesar, Label, GarisAksen, IkonKoin, IkonBrankas, IkonJam } from "./TipografiV3";

const BrankasKosong: React.FC = () => {
  const { p } = useAdegan();
  const k1 = mulus(p, 0.04, 0.2);
  const k2 = mulus(p, 0.14, 0.3);
  const k3 = mulus(p, 0.26, 0.4);
  const garis = antar(p, 0.2, 0.42);
  return (
    <LatarTipo>
      <Label x={60} y={92} t="KERUGIAN" k={k1} />
      <TeksBesar x={56} y={300} t="6 miliar" k={k1} ukuran={170} />
      <TeksBesar x={60} y={390} t="dolar lebih" k={k2} ukuran={78} warna={W.aksen} tebal={700} geser={30} />
      <GarisAksen x={62} y={430} panjang={300} k={garis} />
      <IkonBrankas x={700} y={440} s={1.1} o={k3} />
      {Array.from({ length: 5 }, (_, i) => {
        const a = 0.34 + i * 0.05;
        const k = antar(p, a, a + 0.3);
        if (k <= 0 || k >= 1) return null;
        const x = campur(700, 740 + (i % 3) * 40, k);
        const y = campur(440, 150 + (i % 3) * 50, k) - Math.sin(k * Math.PI) * 50;
        const o = Math.min(1, k * 8) * (1 - antar(k, 0.8, 1));
        return <IkonKoin key={i} x={x} y={y} r={16} o={o} />;
      })}
    </LatarTipo>
  );
};

const Jam20Menit: React.FC = () => {
  const { p } = useAdegan();
  const k1 = mulus(p, 0.04, 0.2);
  const k2 = mulus(p, 0.14, 0.3);
  const hitung = antar(p, 0.1, 0.9);
  const menit = 20 * hitung;
  return (
    <LatarTipo>
      <Label x={60} y={92} t="WAKTU" k={k1} />
      <TeksBesar x={52} y={350} t={String(Math.floor(menit))} k={k1} ukuran={300} />
      <TeksBesar x={60} y={440} t="menit" k={k2} ukuran={86} warna={W.aksen} tebal={700} geser={30} />
      <GarisAksen x={62} y={490} panjang={360 * hitung} k={1} />
      <IkonJam x={690} y={300} menit={menit} o={k2} />
    </LatarTipo>
  );
};

export const VisualBinanceV2: Record<string, React.FC> = {
  "brankas-kosong-v2": BrankasKosong,
  "jam-20-menit-v2": Jam20Menit,
};
