export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 30;

/** Total durasi komposisi: 240 frame = 8 detik */
export const DURATION_IN_FRAMES = 240;

export type IntroProps = {
  /** Teks pembuka, mis. "SELAMAT DATANG DI" */
  welcomeText: string;
  /** Nama channel / brand, mis. "NOVA DIGITAL" */
  channelName: string;
  /** Tagline singkat */
  tagline: string;
  /** Teks tombol ajakan (CTA) */
  ctaText: string;
  /** Warna aksen utama (hex) */
  accentColor: string;
  /** Warna aksen kedua untuk gradasi (hex) */
  accentColor2: string;
  /** Tampilkan subtitle auto-caption (sinkron narasi TTS) */
  showSubtitle: boolean;
};

export const defaultIntroProps: IntroProps = {
  welcomeText: 'SELAMAT DATANG DI',
  channelName: 'NOVA DIGITAL',
  tagline: 'Wujudkan Ide Besar Menjadi Karya Digital',
  ctaText: 'SUBSCRIBE SEKARANG',
  accentColor: '#8b5cf6',
  accentColor2: '#3b82f6',
  showSubtitle: true,
};
