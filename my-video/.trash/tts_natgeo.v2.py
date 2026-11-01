import asyncio, re, random, subprocess, tempfile, os
import edge_tts

VOICE = "id-ID-ArdiNeural"
BASE_RATE = -3
BASE_PITCH = -8      # Hz
DEEPEN = 0.86        # <1 = makin berat (pitch turun, tempo dikompensasi)
PAUSE_SENT = 0.65    # jeda akhir kalimat
PAUSE_COMMA = 0.22   # jeda di koma
random.seed(7)

def post_filter():
    inv = 1 / DEEPEN
    return (
        f"asetrate=24000*{DEEPEN},aresample=24000,atempo={inv:.4f},"
        "highpass=f=60,"
        "equalizer=f=90:t=q:w=1:g=6,"
        "equalizer=f=220:t=q:w=1:g=3,"
        "equalizer=f=2800:t=q:w=1.5:g=-2,"
        "equalizer=f=6500:t=q:w=2:g=-4,"
        "acompressor=threshold=-20dB:ratio=3:attack=20:release=250:makeup=3,"
        "aecho=0.85:0.5:35|70:0.12|0.08,"
        "loudnorm=I=-16:TP=-1.5:LRA=8"
    )

PRON = {"laut": "lawt", "lautan": "lawtan", "pulau": "pulaw", "kalau": "kalaw"}

def fix_pron(text):
    for k, v in PRON.items():
        text = re.sub(rf"\b{k}\b", v, text, flags=re.I)
    return text

def split_text(text):
    text = fix_pron(text)
    items = []  # (teks, jeda_setelah)
    for s in re.split(r"(?<=[.!?])\s+", text.strip()):
        if not s:
            continue
        parts = [s]
        if len(s) > 80:
            raw = re.split(r"(?<=[,;:])\s+", s)
            parts = []
            for r in raw:
                if parts and len(r) < 25:
                    parts[-1] += " " + r
                else:
                    parts.append(r)
        for i, p in enumerate(parts):
            last = i == len(parts) - 1
            items.append((p, PAUSE_SENT if last else PAUSE_COMMA, last))
    return items

async def _synth(items, tmp):
    out = []
    for i, (t, pause, last) in enumerate(items):
        rate = BASE_RATE + random.randint(-4, 3)
        pitch = BASE_PITCH + random.randint(-2, 2) - (3 if last else 0)
        p = os.path.join(tmp, f"s{i}.mp3")
        await edge_tts.Communicate(t, VOICE, rate=f"{rate:+d}%", pitch=f"{pitch:+d}Hz").save(p)
        out.append((p, pause))
    return out

def _silence(tmp, dur):
    p = os.path.join(tmp, f"sil_{dur}.mp3")
    if not os.path.exists(p):
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi",
                        "-i", "anullsrc=r=24000:cl=mono", "-t", str(dur),
                        "-q:a", "9", p], check=True)
    return p

def generate_natgeo(text, out_path):
    items = split_text(text)
    with tempfile.TemporaryDirectory() as tmp:
        files = asyncio.run(_synth(items, tmp))
        lst = os.path.join(tmp, "list.txt")
        with open(lst, "w") as f:
            for i, (p, pause) in enumerate(files):
                f.write(f"file '{p}'\n")
                if i < len(files) - 1:
                    f.write(f"file '{_silence(tmp, pause)}'\n")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat",
                        "-safe", "0", "-i", lst, "-af", post_filter(), out_path], check=True)
    return out_path

if __name__ == "__main__":
    generate_natgeo(
        "Jauh di bawah permukaan laut, sebuah kapal baja bergerak tanpa suara. "
        "Bagaimana mungkin benda seberat ribuan ton, bisa melayang di dalam air? "
        "Jawabannya tersembunyi dalam satu prinsip sederhana.",
        "tes_natgeo.mp3")
