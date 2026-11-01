import json
import subprocess
import numpy as np
from faster_whisper import WhisperModel

AUDIO = "public/audio/narasi-ardi.mp3"
OUT = "public/audio/narasi-whisper.json"

raw = subprocess.run(
    ["ffmpeg", "-v", "error", "-i", AUDIO, "-f", "f32le", "-ac", "1", "-ar", "16000", "-"],
    capture_output=True,
    check=True,
).stdout
audio = np.frombuffer(raw, dtype=np.float32)

model = WhisperModel("small", device="cpu", compute_type="int8")
print("Sedang memproses audio...")
segments, info = model.transcribe(
    audio, language="id", word_timestamps=True, vad_filter=True
)

words = []
for seg in segments:
    for w in seg.words:
        words.append({"text": w.word.strip(), "start": round(w.start, 3), "end": round(w.end, 3)})

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(words, f, indent=2, ensure_ascii=False)

print(f"Berhasil! {len(words)} kata disimpan ke {OUT}")
