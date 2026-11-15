import React from "react";
import { Laut } from "./Laut";
import { KapalSelam } from "./KapalSelam";
import { Angkasa } from "./Angkasa";
import { Abstrak } from "./Abstrak";
import { Pencarian } from "./Pencarian";
import { Lelang } from "./Lelang";
import { Koin } from "./Koin";
import { Jaringan } from "./Jaringan";
import { GrafikBatang } from "./GrafikBatang";
import { Terminal } from "./Terminal";
import { JaringanTumbuh } from "./JaringanTumbuh";
import { Web } from "./Web";
import { Radar } from "./Radar";
import { Menara } from "./Menara";
import { LangitPesawat } from "./LangitPesawat";
import { GarisWaktu } from "./GarisWaktu";

const LautTenang: React.FC = () => <Laut kedalaman={0.35} />;

const GrafikAlphabet: React.FC = () => (
  <GrafikBatang
    judul="Pendapatan Alphabet kuartal III 2026 (miliar dolar AS)"
    sumber="Sumber: laporan keuangan Alphabet kuartal III 2026"
    data={[
      { label: "Pencarian & lainnya", nilai: 63.4, warna: "#00E5FF" },
      { label: "Google Cloud", nilai: 30.7, warna: "#4dd0e1" },
      { label: "Langganan & perangkat", nilai: 14.3, warna: "#a78bfa" },
      { label: "Iklan YouTube", nilai: 11.2, warna: "#ffd166" },
      { label: "Jaringan iklan", nilai: 7.5, warna: "#ff6b6b" },
    ]}
  />
);

const GarisWaktuAtc: React.FC = () => (
  <GarisWaktu
    judul="Perjalanan teknologi menara ATC"
    peristiwa={[
      { tahun: "1920", label: "Menara Croydon" },
      { tahun: "1929", label: "Pengatur pertama" },
      { tahun: "1930", label: "Menara radio" },
      { tahun: "1946", label: "Radar sipil" },
      { tahun: "1958", label: "Lahir FAA" },
      { tahun: "1987", label: "TCAS wajib" },
      { tahun: "2015", label: "Menara jarak jauh" },
      { tahun: "2019", label: "ADS-B satelit" },
    ]}
  />
);

export const visualTerdaftar: Record<string, React.FC> = {
  laut: LautTenang,
  "kapal-selam": KapalSelam,
  angkasa: Angkasa,
  abstrak: Abstrak,
  pencarian: Pencarian,
  lelang: Lelang,
  koin: Koin,
  jaringan: Jaringan,
  "grafik-alphabet": GrafikAlphabet,
  terminal: Terminal,
  "jaringan-tumbuh": JaringanTumbuh,
  web: Web,
  radar: Radar,
  menara: Menara,
  langit: LangitPesawat,
  "garis-waktu-atc": GarisWaktuAtc,
};

export const ambilVisual = (nama: string): React.FC => visualTerdaftar[nama] ?? Abstrak;
