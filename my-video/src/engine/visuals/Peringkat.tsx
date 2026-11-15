import React from "react";
import { Muncul } from "../animasi";

const DATA = [
  { no: 1, nama: "Amerika Serikat", ket: "NSA dan jaringan Five Eyes", warna: "#00E5FF" },
  { no: 2, nama: "Tiongkok", ket: "Pengawasan dalam negeri terluas", warna: "#4dd0e1" },
  { no: 3, nama: "Israel", ket: "Unit 8200 dan industri spyware", warna: "#a78bfa" },
  { no: 4, nama: "Inggris", ket: "GCHQ dan Tempora", warna: "#ffd166" },
  { no: 5, nama: "Rusia", ket: "Intersepsi jaringan dan unit siber", warna: "#ff6b6b" },
];

export const Peringkat: React.FC<{ sorot?: number }> = ({ sorot = 0 }) => (
  <div style={{ width: "100%", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, padding: "30px 60px", color: "#fff" }}>
    <div style={{ fontSize: 34, fontWeight: 700 }}>Peringkat editorial kemampuan sadap</div>
    <div style={{ fontSize: 22, opacity: 0.7, marginBottom: 8 }}>Penilaian editorial, bukan data resmi</div>
    {DATA.map((d) => {
      const tampil = sorot === 0 || d.no >= sorot;
      const aktif = sorot === 0 || d.no === sorot;
      if (!tampil) return <div key={d.no} style={{ height: 78 }} />;
      return (
        <Muncul key={d.no} arah="kiri" jarak={60}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "14px 22px", borderRadius: 16, border: `3px solid ${aktif ? d.warna : "rgba(255,255,255,0.15)"}`, background: aktif ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)", opacity: aktif ? 1 : 0.55 }}>
            <div style={{ fontSize: 44, fontWeight: 800, color: d.warna, width: 60 }}>{d.no}</div>
            <div>
              <div style={{ fontSize: 34, fontWeight: 700 }}>{d.nama}</div>
              <div style={{ fontSize: 22, opacity: 0.75 }}>{d.ket}</div>
            </div>
          </div>
        </Muncul>
      );
    })}
  </div>
);
