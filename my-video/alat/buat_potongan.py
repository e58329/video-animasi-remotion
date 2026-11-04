import asyncio
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import buat_video as bv
from faster_whisper import WhisperModel

BATAS_DETIK = 90
HANDLE = "@yakalilutau"


def main():
    if len(sys.argv) < 2:
        sys.exit("Pakai: python alat/buat_potongan.py topik.json   (setelah buat_video.py)")
    topik = json.load(open(sys.argv[1], encoding="utf-8"))
    data = json.load(open(bv.KELUAR, encoding="utf-8"))
    suara = {"voice": "id-ID-ArdiNeural", "rate": "-10%", "pitch": "-15Hz", **topik.get("suara", {})}
    jumlah = len(data["scenes"])
    handle = topik.get("handle", HANDLE)

    model = None
    hasil = []
    for idx, p in enumerate(topik.get("potongan", [])):
        nomor = p.get("scenes", [])
        salah = [n for n in nomor if not isinstance(n, int) or not 1 <= n <= jumlah]
        if salah or not nomor:
            sys.exit(f"Potongan {idx + 1} ('{p.get('nama', '')}'): nomor scene tidak valid {salah or '(kosong)'}; tersedia 1 sampai {jumlah}")
        item = {"nama": p.get("nama", f"potongan{idx + 1}"), "scenes": nomor}
        detik = sum(data["scenes"][n - 1]["durasi"] for n in nomor)

        if p.get("cta"):
            if model is None:
                model = WhisperModel("small", device="cpu", compute_type="int8")
            os.makedirs(bv.FOLDER_AUDIO, exist_ok=True)
            path = f"{bv.FOLDER_AUDIO}/cta-{idx + 1}.mp3"
            asyncio.run(bv.sintesis(p["cta"], path, suara))
            d = bv.durasi_audio(path)
            kata_naskah = p["cta"].split()
            try:
                kw = bv.kata_whisper(model, path)
            except Exception as e:
                print(f"  Whisper gagal di CTA potongan {idx + 1} ({e}), pakai perkiraan waktu")
                kw = []
            waktu = bv.selaraskan(kata_naskah, kw, d)
            item["cta"] = {
                "visual": "abstrak",
                "sfx": [],
                "fokus": handle,
                "angka": None,
                "teks": p["cta"],
                "audio": f"topik/cta-{idx + 1}.mp3",
                "durasi": round(d + 0.3, 3),
                "kata": [{"t": t, "s": round(s, 3), "e": round(e, 3)} for t, (s, e) in zip(kata_naskah, waktu)],
            }
            detik += d + 0.3

        hasil.append(item)
        peringatan = f"  PERINGATAN: di atas {BATAS_DETIK} detik" if detik > BATAS_DETIK else ""
        print(f"Potongan {idx + 1} '{item['nama']}': scene {nomor}, sekitar {detik:.0f} detik{peringatan}")

    data["potongan"] = hasil
    json.dump(data, open(bv.KELUAR, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    print(f"Selesai. {len(hasil)} potongan vertikal tersimpan di {bv.KELUAR}")


if __name__ == "__main__":
    main()
