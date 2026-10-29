/**
 * Data timing narasi per kata — DIGENERASI OTOMATIS oleh tts/generate-narasi.py.
 * Jangan edit manual; regenerate lewat: python tts/generate-narasi.py
 *
 * Waktu dalam detik, SUDAH termasuk delay audio 0.4s (Sequence from={12}),
 * jadi tinggal dibandingkan langsung dengan useCurrentFrame()/fps.
 */
export type NarrationWord = { word: string; start: number; end: number };
export type CaptionCard = { text: string; start: number; end: number; words: NarrationWord[] };

export const NARRATION_CARDS: CaptionCard[] = [
  {
    "text": "Selamat datang di Nova Digital",
    "start": 0.502,
    "end": 2.472,
    "words": [
      {
        "word": "Selamat",
        "start": 0.502,
        "end": 0.937
      },
      {
        "word": "datang",
        "start": 0.937,
        "end": 1.372
      },
      {
        "word": "di",
        "start": 1.372,
        "end": 1.48
      },
      {
        "word": "Nova",
        "start": 1.48,
        "end": 1.752
      },
      {
        "word": "Digital",
        "start": 1.752,
        "end": 2.472
      }
    ]
  },
  {
    "text": "Wujudkan ide besar, menjadi karya digital",
    "start": 3.387,
    "end": 6.376,
    "words": [
      {
        "word": "Wujudkan",
        "start": 3.387,
        "end": 3.944
      },
      {
        "word": "ide",
        "start": 3.944,
        "end": 4.134
      },
      {
        "word": "besar",
        "start": 4.134,
        "end": 4.678
      },
      {
        "word": "menjadi",
        "start": 4.963,
        "end": 5.357
      },
      {
        "word": "karya",
        "start": 5.357,
        "end": 5.656
      },
      {
        "word": "digital",
        "start": 5.656,
        "end": 6.376
      }
    ]
  }
];

export const NARRATION_END = 6.38; // detik, akhir kata terakhir
