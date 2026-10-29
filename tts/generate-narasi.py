#!/usr/bin/env python3
"""
Generate narasi TTS GRATIS ala narator dokumenter (Nat Geo) pakai Microsoft Edge TTS.

Voice id-ID-ArdiNeural = voice laki-laki NATIF Indonesia (logat Indonesia bener,
bukan voice Mandarin yang dipaksa ngomong Indonesia).

Cara pakai:
  pip install edge-tts
  python tts/generate-narasi.py
  # hasil: public/narration.mp3 (otomatis terpakai di video Remotion)

Opsi lain:
  python tts/generate-narasi.py --text "Teks narasi kamu di sini"
  python tts/generate-narasi.py --pitch -30Hz    # makin dalam
  python tts/generate-narasi.py --rate -12%      # makin pelan
  python tts/generate-narasi.py --voice id-ID-GadisNeural   # suara perempuan
"""
import argparse
import asyncio
import os

import edge_tts

VOICE = "id-ID-ArdiNeural"
DEFAULT_TEXT = (
    "Selamat datang di Nova Digital. Wujudkan ide besar, menjadi karya digital."
)


async def generate(text: str, voice: str, pitch: str, rate: str, out: str) -> None:
    tts = edge_tts.Communicate(text, voice, pitch=pitch, rate=rate)
    folder = os.path.dirname(out)
    if folder:
        os.makedirs(folder, exist_ok=True)
    await tts.save(out)


def main() -> None:
    ap = argparse.ArgumentParser(description="Narasi TTS gratis ala dokumenter")
    ap.add_argument("--text", default=DEFAULT_TEXT, help="teks narasi")
    ap.add_argument("--voice", default=VOICE, help="voice Edge TTS")
    ap.add_argument("--pitch", default="-22Hz", help="mis. -22Hz (~turun 20 persen)")
    ap.add_argument("--rate", default="-8%", help="mis. -8% (lebih pelan)")
    ap.add_argument("--out", default=os.path.join("public", "narration.mp3"))
    args = ap.parse_args()

    asyncio.run(generate(args.text, args.voice, args.pitch, args.rate, args.out))
    print(f"OK -> {args.out}")


if __name__ == "__main__":
    main()
