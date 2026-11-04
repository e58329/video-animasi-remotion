import asyncio
import difflib
import json
import os
import re
import subprocess
import sys

import edge_tts
import numpy as np
from faster_whisper import WhisperModel

JEDA = 0.5
KELUAR = "src/topik/data.json"
FOLDER_AUDIO = "public/topik"


def durasi_audio(path):
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", path]
    )
    return float(out.decode().strip())


def baca_audio(path):
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", "16000", "-"],
        capture_output=True,
        check=True,
    ).stdout
    return np.frombuffer(raw, dtype=np.float32)


def kata_whisper(model, path):
    segmen, _ = model.transcribe(baca_audio(path), language="id", word_timestamps=True, vad_filter=True)
    return [(w.word.strip(), w.start, w.end) for s in segmen for w in s.words]


def selaraskan(kata_naskah, kw, durasi):
    norm = lambda x: re.sub(r"[^\w]", "", x.lower())
    a = [norm(x) for x in kata_naskah]
    b = [norm(w[0]) for w in kw]
    waktu = [None] * len(a)
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    for blok in sm.get_matching_blocks():
        for k in range(blok.size):
            waktu[blok.a + k] = (kw[blok.b + k][1], kw[blok.b + k][2])
    awal = kw[0][1] if kw else 0.0
    akhir = kw[-1][2] if kw else durasi
    i = 0
    while i < len(a):
        if waktu[i] is None:
            j = i
            while j < len(a) and waktu[j] is None:
                j += 1
            t0 = waktu[i - 1][1] if i > 0 else awal
            t1 = waktu[j][0] if j < len(a) else akhir
            t1 = max(t1, t0)
            bobot = [max(len(a[k]), 1) for k in range(i, j)]
            tot = sum(bobot)
            cur = t0
            for k in range(i, j):
                dur = (t1 - t0) * bobot[k - i] / tot
                waktu[k] = (cur, cur + dur)
                cur += dur
            i = j
        else:
            i += 1
    return waktu


async def sintesis(teks, path, suara):
    c = edge_tts.Communicate(teks, suara["voice"], rate=suara["rate"], pitch=suara["pitch"])
    await c.save(path)


def main():
    if len(sys.argv) < 2:
        sys.exit("Pakai: python alat/buat_video.py topik.json")
    topik = json.load(open(sys.argv[1], encoding="utf-8"))
    suara = {"voice": "id-ID-ArdiNeural", "rate": "-10%", "pitch": "-15Hz", **topik.get("suara", {})}
    os.makedirs(FOLDER_AUDIO, exist_ok=True)
    os.makedirs(os.path.dirname(KELUAR), exist_ok=True)

    model = WhisperModel("small", device="cpu", compute_type="int8")
    scenes = []
    for i, sc in enumerate(topik["scenes"], start=1):
        path = f"{FOLDER_AUDIO}/scene-{i}.mp3"
        asyncio.run(sintesis(sc["teks"], path, suara))
        d = durasi_audio(path)
        kata_naskah = sc["teks"].split()
        try:
            kw = kata_whisper(model, path)
        except Exception as e:
            print(f"  Whisper gagal di scene {i} ({e}), pakai perkiraan waktu")
            kw = []
        waktu = selaraskan(kata_naskah, kw, d)
        scenes.append(
            {
                "visual": sc.get("visual", "abstrak"),
                "sfx": sc.get("sfx", []),
                "fokus": sc.get("fokus", ""),
                "angka": sc.get("angka"),
                "teks": sc["teks"],
                "audio": f"topik/scene-{i}.mp3",
                "durasi": round(d + JEDA, 3),
                "kata": [
                    {"t": t, "s": round(s, 3), "e": round(e, 3)} for t, (s, e) in zip(kata_naskah, waktu)
                ],
            }
        )
        print(f"Scene {i}: {d:.1f} detik, {len(kata_naskah)} kata")

    data = {
        "judul": topik.get("judul", ""),
        "subjudul": topik.get("subjudul", ""),
        "musik": topik.get("musik", ""),
        "sfxTransisi": topik.get("sfxTransisi", ""),
        "sfxOtomatis": topik.get("sfxOtomatis", False),
        "scenes": scenes,
    }
    json.dump(data, open(KELUAR, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    print(f"Selesai. Data video ada di {KELUAR}")


if __name__ == "__main__":
    main()
