import { VisualBinanceV3 } from "./SpekBinance";
import { VisualBinanceV2 } from "./VisualBinanceV2";
import { VisualBinance2D2 } from "./VisualBinance2D2";
import { VisualBinance2D } from "./VisualBinance2D";
import { VisualBinance } from "./VisualBinance";
import { DisclaimerDiam } from "./DisclaimerDiam";
import { PerangKode, LimaKriteria, DasarHukum } from "./Adegan3";
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
import { Peringkat } from "./Peringkat";
import { AiSadap, AjakanKomentar, AjakanLangganan, AjakanSuka, BerbagiIntelijen, KabelLaut, KlikTautan, KlikVsTanpaKlik, LangkahLockdown, LangkahRestart, LangkahTautan, LangkahUpdate, MenaraPalsu, PenyadapanMassal, PerusahaanSpyware, TargetTertentu, Telegraf, TelegrafDuaPihak, TelegrafSadap , RisikoBukanJaminan } from "./Adegan2";
import { KedutaanSadap, SerahPatung, SinarRadio, TanpaBaterai, TerowonganGali, TerowonganSadap, MataMata, PonselDiambilAlih, DaftarNomor, StempelBantah, KartuDisclaimer } from "./VisualSadap";

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

const GarisWaktuSadap: React.FC = () => (
  <GarisWaktu
    judul="Perjalanan teknologi penyadapan"
    peristiwa={[
      { tahun: "1844", label: "Telegraf" },
      { tahun: "1946", label: "Cikal Five Eyes" },
      { tahun: "1955", label: "Terowongan Berlin" },
      { tahun: "1971", label: "Ivy Bells" },
      { tahun: "2013", label: "Bocoran Snowden" },
      { tahun: "2016", label: "Pegasus terungkap" },
      { tahun: "2021", label: "Pegasus Project" },
    ]}
  />
);

const mkPeringkat = (n: number): React.FC => () => <Peringkat sorot={n} />;

const GarisWaktuLaporan: React.FC = () => (
  <GarisWaktu
    judul="Dugaan dan laporan: alat sadap di Indonesia"
    peristiwa={[
      { tahun: "2017", label: "Jejak pengadaan tertua" },
      { tahun: "2023", label: "Tempo: jejak Pegasus" },
      { tahun: "2024", label: "Laporan Amnesty" },
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
  "garis-waktu-sadap": GarisWaktuSadap,
  "garis-waktu-laporan": GarisWaktuLaporan,
  "peringkat-1": mkPeringkat(1),
  "peringkat-2": mkPeringkat(2),
  "peringkat-3": mkPeringkat(3),
  "peringkat-4": mkPeringkat(4),
  "peringkat-5": mkPeringkat(5),
  "peringkat-semua": mkPeringkat(0),
  "klik-tautan": KlikTautan,
  "klik-vs-tanpa-klik": KlikVsTanpaKlik,
  "perusahaan-spyware": PerusahaanSpyware,
  "target-tertentu": TargetTertentu,
  "langkah-update": LangkahUpdate,
  "langkah-restart": LangkahRestart,
  "langkah-tautan": LangkahTautan,
  "langkah-lockdown": LangkahLockdown,
  "risiko-bukan-jaminan": RisikoBukanJaminan,
  "ajakan-suka": AjakanSuka,
  "ajakan-komentar": AjakanKomentar,
  "ajakan-berlangganan": AjakanLangganan,
  "telegraf": Telegraf,
  "perang-kode": PerangKode,
  "lima-kriteria": LimaKriteria,
  "dasar-hukum": DasarHukum,
  "telegraf-sadap": TelegrafSadap,
  "telegraf-dua-pihak": TelegrafDuaPihak,
  "berbagi-intelijen": BerbagiIntelijen,
  "kabel-laut": KabelLaut,
  "menara-palsu": MenaraPalsu,
  "penyadapan-massal": PenyadapanMassal,
  "ai-sadap": AiSadap,
  "kedutaan-sadap": KedutaanSadap,
  "serah-patung": SerahPatung,
  "sinar-radio": SinarRadio,
  "tanpa-baterai": TanpaBaterai,
  "terowongan-gali": TerowonganGali,
  "terowongan-sadap": TerowonganSadap,
  "mata-mata": MataMata,
  "ponsel-diambil-alih": PonselDiambilAlih,
  "daftar-nomor": DaftarNomor,
  "stempel-bantah": StempelBantah,
  "kartu-disclaimer": KartuDisclaimer,
  "kartu-disclaimer-diam": DisclaimerDiam,
  "brankas-kosong": VisualBinance["brankas-kosong"],
  "kunci-utuh": VisualBinance["kunci-utuh"],
  "lowongan-palsu": VisualBinance["lowongan-palsu"],
  "laptop-diambil-alih": VisualBinance["laptop-diambil-alih"],
  "garis-waktu-binance": VisualBinance["garis-waktu-binance"],
  "bursa-dua-laci": VisualBinance["bursa-dua-laci"],
  "mpc-kunci-terpecah": VisualBinance["mpc-kunci-terpecah"],
  "penanda-tangan-mesin": VisualBinance["penanda-tangan-mesin"],
  "paket-palsu-iklan": VisualBinance["paket-palsu-iklan"],
  "rekruter-palsu": VisualBinance["rekruter-palsu"],
  "ceo-palsu-chat": VisualBinance["ceo-palsu-chat"],
  "tugas-berisi-malware": VisualBinance["tugas-berisi-malware"],
  "token-kartu-akses": VisualBinance["token-kartu-akses"],
  "container-dijalankan": VisualBinance["container-dijalankan"],
  "dompet-meminjam-kode": VisualBinance["dompet-meminjam-kode"],
  "pembekuan-stablecoin": VisualBinance["pembekuan-stablecoin"],
  "tukar-ke-eth": VisualBinance["tukar-ke-eth"],
  "cuci-uang-otomatis": VisualBinance["cuci-uang-otomatis"],
  "rekor-peretasan": VisualBinance["rekor-peretasan"],
  "dana-darurat-safu": VisualBinance["dana-darurat-safu"],
  "penarikan-bertahap": VisualBinance["penarikan-bertahap"],
  "langkah-sebar": VisualBinance["langkah-sebar"],
  "brankas-kosong-2d": VisualBinance2D["brankas-kosong-2d"],
  "jam-20-menit-2d": VisualBinance2D["jam-20-menit-2d"],
  "kunci-utuh-2d": VisualBinance2D["kunci-utuh-2d"],
  "penanda-tangan-2d": VisualBinance2D["penanda-tangan-2d"],
  "laptop-diambil-alih-2d": VisualBinance2D["laptop-diambil-alih-2d"],
  "lowongan-palsu-2d": VisualBinance2D["lowongan-palsu-2d"],
  "mata-mata-2d": VisualBinance2D["mata-mata-2d"],
  "rekruter-palsu-2d": VisualBinance2D2["rekruter-palsu-2d"],
  "ceo-palsu-chat-2d": VisualBinance2D2["ceo-palsu-chat-2d"],
  "tugas-berisi-malware-2d": VisualBinance2D2["tugas-berisi-malware-2d"],
  "perangkat-terpisah-2d": VisualBinance2D2["perangkat-terpisah-2d"],
  "cek-resmi-2d": VisualBinance2D2["cek-resmi-2d"],
  "risiko-bukan-jaminan-2d": VisualBinance2D2["risiko-bukan-jaminan-2d"],
  "brankas-kosong-v2": VisualBinanceV2["brankas-kosong-v2"],
  "jam-20-menit-v2": VisualBinanceV2["jam-20-menit-v2"],
  // v3-mulai
  "brankas-kosong-v2": VisualBinanceV3["brankas-kosong-v2"],
  "kunci-utuh-v2": VisualBinanceV3["kunci-utuh-v2"],
  "lowongan-palsu-v2": VisualBinanceV3["lowongan-palsu-v2"],
  "laptop-diambil-alih-v2": VisualBinanceV3["laptop-diambil-alih-v2"],
  "garis-waktu-binance-v2": VisualBinanceV3["garis-waktu-binance-v2"],
  "jaringan-v2": VisualBinanceV3["jaringan-v2"],
  "penanda-tangan-mesin-v2": VisualBinanceV3["penanda-tangan-mesin-v2"],
  "token-kartu-akses-v2": VisualBinanceV3["token-kartu-akses-v2"],
  "bursa-dua-laci-v2": VisualBinanceV3["bursa-dua-laci-v2"],
  "mata-mata-v2": VisualBinanceV3["mata-mata-v2"],
  "mpc-kunci-terpecah-v2": VisualBinanceV3["mpc-kunci-terpecah-v2"],
  "paket-palsu-iklan-v2": VisualBinanceV3["paket-palsu-iklan-v2"],
  "terminal-v2": VisualBinanceV3["terminal-v2"],
  "rekruter-palsu-v2": VisualBinanceV3["rekruter-palsu-v2"],
  "ceo-palsu-chat-v2": VisualBinanceV3["ceo-palsu-chat-v2"],
  "tugas-berisi-malware-v2": VisualBinanceV3["tugas-berisi-malware-v2"],
  "container-dijalankan-v2": VisualBinanceV3["container-dijalankan-v2"],
  "koin-v2": VisualBinanceV3["koin-v2"],
  "dompet-meminjam-kode-v2": VisualBinanceV3["dompet-meminjam-kode-v2"],
  "radar-v2": VisualBinanceV3["radar-v2"],
  "pembekuan-stablecoin-v2": VisualBinanceV3["pembekuan-stablecoin-v2"],
  "tukar-ke-eth-v2": VisualBinanceV3["tukar-ke-eth-v2"],
  "cuci-uang-otomatis-v2": VisualBinanceV3["cuci-uang-otomatis-v2"],
  "stempel-bantah-v2": VisualBinanceV3["stempel-bantah-v2"],
  "rekor-peretasan-v2": VisualBinanceV3["rekor-peretasan-v2"],
  "dana-darurat-safu-v2": VisualBinanceV3["dana-darurat-safu-v2"],
  "penarikan-bertahap-v2": VisualBinanceV3["penarikan-bertahap-v2"],
  "langkah-sebar-v2": VisualBinanceV3["langkah-sebar-v2"],
  "langkah-tautan-v2": VisualBinanceV3["langkah-tautan-v2"],
  "langkah-update-v2": VisualBinanceV3["langkah-update-v2"],
  "risiko-bukan-jaminan-v2": VisualBinanceV3["risiko-bukan-jaminan-v2"],
  // v3-selesai
};

export const ambilVisual = (nama: string): React.FC => visualTerdaftar[nama] ?? (() => <div style={{position:"absolute",inset:0,background:"#b00020",color:"#fff",fontSize:64,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center"}}>VISUAL TIDAK ADA: {String(nama)}</div>);
