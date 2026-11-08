#!/usr/bin/env python3
"""
TTS untuk video ATC (long + short).
- Suara: edge-tts id-ID-ArdiNeural, pitch diturunkan (asetrate/atempo) seperti engine sebelumnya.
- Output: public/atc/audio/<id>.mp3, src/atc/durations.json, chapters_atc.txt
Pemakaian:
    pip install edge-tts
    python3 tts_atc.py            # lewati audio yang sudah ada
    python3 tts_atc.py --force    # buat ulang semua
"""
import asyncio
import json
import re
import subprocess
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent
NARR = ROOT / "src/atc/narration.json"
OUT = ROOT / "public/atc/audio"
DUR = ROOT / "src/atc/durations.json"
CHAPTERS = ROOT / "chapters_atc.txt"

VOICE = "id-ID-ArdiNeural"
RATE = "-6%"
PITCH = 0.85  # 1.0 = asli; makin kecil makin berat

# Teks tampil di subtitle tetap asli; yang dibaca TTS diganti supaya pelafalan benar.
SAY = [
    ("@yakalilutau", "ya kali lu tau"),
    ("ADS-B", "ei di es bi"),
    ("TCAS", "ti kas"),
    ("ATC", "ei ti si"),
    ("ACC", "ei si si"),
    ("VHF", "ve ha ef"),
    ("FAA", "ef ei ei"),
    ("GPS", "ji pi es"),
    ("AirNav", "er nev"),
    ("Überlingen", "Uberlingen"),
    ("Clearance Delivery", "Klirens Deliveri"),
    ("Approach", "Aprouch"),
    ("Departure", "Dipartyur"),
    ("Ground", "Graund"),
    ("Tower", "Tauer"),
    ("readback", "ridbek"),
    ("Croydon", "Kroidon"),
    ("Archie League", "Arci Lig"),
    ("St. Louis", "Seint Luis"),
    ("Grand Canyon", "Grend Kenyon"),
]


def spoken(text: str) -> str:
    for a, b in SAY:
        text = re.sub(re.escape(a), b, text)
    return text


def run(cmd):
    return subprocess.run(cmd, check=True, capture_output=True, text=True)


async def synth(text: str, path: Path):
    for attempt in range(3):
        try:
            await edge_tts.Communicate(text, VOICE, rate=RATE).save(str(path))
            return
        except Exception as e:  # jaringan putus dsb
            print(f"  gagal ({e}), ulang {attempt + 1}/3")
            await asyncio.sleep(2)
    raise SystemExit("edge-tts gagal 3x, cek koneksi lalu jalankan ulang.")


def pitch_down(src: Path, dst: Path):
    sr = 24000  # sample rate keluaran edge-tts
    af = f"asetrate={int(sr * PITCH)},aresample=44100,atempo={1 / PITCH:.4f},silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse"
    run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(src), "-af", af, "-ar", "44100", "-b:a", "128k", str(dst)])


def seconds(path: Path) -> float:
    r = run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)])
    return round(float(r.stdout.strip()), 2)


def mmss(t: float) -> str:
    t = int(t)
    return f"{t // 60}:{t % 60:02d}"


async def main():
    force = "--force" in sys.argv
    data = json.loads(NARR.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    scenes = data["long"] + data["short"]
    durations = {}
    for i, s in enumerate(scenes, 1):
        dst = OUT / f"{s['id']}.mp3"
        if dst.exists() and not force:
            print(f"[{i}/{len(scenes)}] {s['id']} sudah ada, lewati")
        else:
            print(f"[{i}/{len(scenes)}] {s['id']} ...")
            raw = OUT / f"_{s['id']}_raw.mp3"
            await synth(spoken(s["text"]), raw)
            pitch_down(raw, dst)
            raw.unlink(missing_ok=True)
        durations[s["id"]] = seconds(dst)

    DUR.write_text(json.dumps(durations, indent=2), encoding="utf-8")

    # chapter YouTube (video long); tiap scene dipadatkan +0.6 dtk, sama seperti di Remotion
    t = 0.0
    lines = []
    for s in data["long"]:
        if s.get("ch"):
            lines.append(f"{mmss(t)} {s['ch']}")
        t += durations[s["id"]] + 0.6
    CHAPTERS.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"\nTotal video long: {mmss(t)}  (tulis ulang durations.json: {DUR})")
    print("\nCHAPTER (tempel ke deskripsi YouTube):\n" + "\n".join(lines))


if __name__ == "__main__":
    asyncio.run(main())
