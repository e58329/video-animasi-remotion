import React from "react";
import { Tipo, Spek } from "./TipoEngine";

const SPEK: Record<string, Spek> = {
  "brankas-kosong": { label: "KERUGIAN", besar: "6 miliar", kecil: "dolar lebih", ikon: "brankas", efek: "koin" },
  "kunci-utuh": { label: "TEMUAN AWAL", besar: "Kunci", kecil: "tetap utuh", ikon: "kunci" },
  "lowongan-palsu": { label: "SEPTEMBER", besar: "Lowongan", kecil: "palsu", ikon: "stempel", figur: { pose: "tunjuk", prop: "cv", baju: "#2FBF9B" } },
  "laptop-diambil-alih": { label: "AKIBATNYA", besar: "Laptop", kecil: "diambil alih", ikon: "laptop", bahaya: true, figur: { pose: "kaget", prop: "laptop", bahaya: true, baju: "#4F7CFF" } },
  "garis-waktu-binance": { label: "KRONOLOGI", besar: "Garis waktu", kecil: "kejadian", ikon: "waktu" },
  "jaringan": { label: "JAWABAN SINGKAT", besar: "Bukan", kecil: "jaringan blockchain", ikon: "jaringan" },
  "penanda-tangan-mesin": { label: "CARA MASUK", besar: "Sistem resmi", kecil: "ditumpangi", ikon: "pena" },
  "token-kartu-akses": { label: "IBARATNYA", besar: "Kartu akses", kecil: "dicuri, bukan brankas", ikon: "kunci", bahaya: true },
  "bursa-dua-laci": { label: "ANALOGI", besar: "Dua laci", kecil: "milik bursa", ikon: "laci" },
  "mata-mata": { label: "PEMANTAUAN", besar: "Mengintai", kecil: "pintu terpenting", ikon: "mata", bahaya: true, figur: { pose: "tunjuk", prop: "kaca", aksesori: "tudung", bahaya: true, baju: "#38405F" } },
  "mpc-kunci-terpecah": { label: "TEKNIK MPC", besar: "Kunci", kecil: "dipecah", ikon: "kunci" },
  "paket-palsu-iklan": { label: "JUNI", besar: "Paket palsu", kecil: "lewat iklan", ikon: "paket", bahaya: true },
  "terminal": { label: "KODE", besar: "Kode", kecil: "dijalankan", ikon: "terminal" },
  "rekruter-palsu": { label: "WAWANCARA 1", besar: "Rekruter", kecil: "palsu", ikon: "orang", figur: { pose: "lambai", baju: "#F2994A", aksesori: "kacamata" } },
  "ceo-palsu-chat": { label: "WAWANCARA 2", besar: "CEO palsu", kecil: "lewat chat", ikon: "chat", figur: { pose: "bicara", prop: "chat", aksesori: "dasi", baju: "#5B6CFF" } },
  "tugas-berisi-malware": { label: "TUGAS CODING", besar: "Malware", kecil: "di dalam tugas", ikon: "terminal", bahaya: true, figur: { pose: "ketik", prop: "laptop", aksesori: "tudung", bahaya: true, baju: "#38405F" } },
  "container-dijalankan": { label: "CONTAINER", besar: "Ruang", kecil: "terisolasi", ikon: "container" },
  "koin": { label: "DANA", besar: "Dana", kecil: "mulai berpindah", ikon: "koin", efek: "koin" },
  "dompet-meminjam-kode": { label: "ETHEREUM", besar: "EIP-7702", kecil: "dompet meminjam kode", ikon: "dompet" },
  "radar": { label: "PERINGATAN INTERNAL", besar: "Peringatan", kecil: "transfer besar", ikon: "radar" },
  "pembekuan-stablecoin": { label: "SATU JAM PERTAMA", besar: "Stablecoin", kecil: "dibekukan", ikon: "beku" },
  "tukar-ke-eth": { label: "BALASAN", besar: "Ke ETH", kecil: "stablecoin ditukar", ikon: "tukar" },
  "cuci-uang-otomatis": { label: "PENCUCIAN", besar: "Otomatis", kecil: "pencucian uang", ikon: "cuci", bahaya: true },
  "stempel-bantah": { label: "TUDUHAN", besar: "Dibantah", kecil: "Korea Utara", ikon: "stempel" },
  "rekor-peretasan": { label: "ANGKA", besar: "Chainalysis", kecil: "versi analis", ikon: "grafik" },
  "dana-darurat-safu": { label: "DANA DARURAT", besar: "SAFU", kecil: "disisihkan Binance", ikon: "perisai" },
  "penarikan-bertahap": { label: "1 NOVEMBER", besar: "Dibuka", kecil: "bertahap", ikon: "waktu" },
  "langkah-sebar": { label: "LANGKAH 1", besar: "Sebar aset", kecil: "jangan di satu tempat", ikon: "sebar" },
  "langkah-tautan": { label: "LANGKAH 2", besar: "Waspadai", kecil: "tautan", ikon: "tautan" },
  "langkah-update": { label: "LANGKAH 3", besar: "Update", kecil: "dari sumber resmi", ikon: "update" },
  "risiko-bukan-jaminan": { label: "INGAT", besar: "Tidak ada", kecil: "yang 100 persen aman", ikon: "perisai" },
};

export const VisualBinanceV3: Record<string, React.FC> = {};
for (const [nama, s] of Object.entries(SPEK)) {
  VisualBinanceV3[nama + "-v2"] = () => <Tipo s={s} />;
}
