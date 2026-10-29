# Narasi TTS Gratis (Suara Natural, Bukan Robot)

Narasi di video ini dibuat pakai **Microsoft Edge TTS** — 100% gratis, neural, dan
pakai voice Indonesia asli (logat Indonesia bener, bukan voice Mandarin yang
dipaksa ngomong Indonesia).

Pengaturan yang dipakai:

| Parameter | Nilai | Alasan |
|-----------|-------|--------|
| Voice | `id-ID-ArdiNeural` | Laki-laki native Indonesia |
| Pitch | `-22Hz` | Turun ~20% -> suara lebih dalam ala narator dokumenter |
| Rate | `-8%` | Sedikit pelan, biar ada feel dokumenter |

## Cara regenerate narasi

```bash
pip install edge-tts
python tts/generate-narasi.py --text "Teks narasi kamu di sini"
```

Audio otomatis tersimpan ke `public/narration.mp3` dan langsung terpakai di
komposisi Remotion lewat `<Audio src={staticFile('narration.mp3')} />`.

## Voice lain yang bisa dicoba

- `id-ID-GadisNeural` — perempuan Indonesia
- `en-US-ChristopherNeural` — laki-laki Inggris, dalam (klasik dokumenter)
- `en-US-GuyNeural` — laki-laki Inggris, hangat

Daftar lengkap: `edge-tts --list-voices`
