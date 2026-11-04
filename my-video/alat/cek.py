import json
import math
import re
import subprocess
import sys

TARGET_LUFS = -16.0
BATAS_PUNCAK = -1.0


def jalan(args):
    return subprocess.run(args, capture_output=True, text=True)


def mmss(d):
    return f"{int(d // 60)}:{int(d % 60):02d}"


def info(path):
    r = jalan(["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", path])
    return json.loads(r.stdout)


def ukur_suara(path):
    r = jalan(["ffmpeg", "-nostats", "-i", path, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"])
    ringkas = r.stderr.split("Summary:")[-1]

    def ambil(pola):
        m = re.search(pola, ringkas)
        return float(m.group(1)) if m else None

    return ambil(r"I:\s+(-?[\d.]+) LUFS"), ambil(r"LRA:\s+(-?[\d.]+) LU"), ambil(r"Peak:\s+(-?[\d.]+) dBFS")


def deteksi(path, durasi):
    r = jalan(
        [
            "ffmpeg", "-nostats", "-i", path,
            "-vf", "blackdetect=d=0.4:pic_th=0.98,freezedetect=n=0.001:d=2",
            "-af", "silencedetect=noise=-40dB:d=1.5",
            "-f", "null", "-",
        ]
    )
    hitam, beku, senyap = [], [], []
    mulai_beku = None
    mulai_senyap = None
    for baris in r.stderr.splitlines():
        m = re.search(r"black_start:([\d.]+) black_end:([\d.]+)", baris)
        if m:
            hitam.append((float(m.group(1)), float(m.group(2))))
        m = re.search(r"freeze_start: ([\d.]+)", baris)
        if m:
            mulai_beku = float(m.group(1))
        m = re.search(r"freeze_duration: ([\d.]+)", baris)
        if m and mulai_beku is not None:
            beku.append((mulai_beku, float(m.group(1))))
            mulai_beku = None
        m = re.search(r"silence_start: (-?[\d.]+)", baris)
        if m:
            mulai_senyap = max(0.0, float(m.group(1)))
        m = re.search(r"silence_duration: ([\d.]+)", baris)
        if m and mulai_senyap is not None:
            senyap.append((mulai_senyap, float(m.group(1))))
            mulai_senyap = None
    if mulai_beku is not None:
        beku.append((mulai_beku, max(0.0, durasi - mulai_beku)))
    if mulai_senyap is not None:
        senyap.append((mulai_senyap, max(0.0, durasi - mulai_senyap)))
    return hitam, beku, senyap


def lembar(path, durasi):
    langkah = max(1, math.ceil(durasi / 24))
    n = math.ceil(durasi / langkah)
    baris = max(1, math.ceil(n / 4))
    jalan(
        ["ffmpeg", "-y", "-v", "error", "-i", path, "-vf", f"fps=1/{langkah},scale=480:-1,tile=4x{baris}",
         "-frames:v", "1", "-update", "1", "kontak.jpg"]
    )
    return langkah


def main():
    if len(sys.argv) < 2:
        sys.exit("Pakai: python alat/cek.py out/nama.mp4 [target_lufs]")
    path = sys.argv[1]
    target = float(sys.argv[2]) if len(sys.argv) > 2 else TARGET_LUFS

    data = info(path)
    durasi = float(data["format"]["duration"])
    ukuran = float(data["format"].get("size", 0)) / 1e6
    video = next((s for s in data["streams"] if s["codec_type"] == "video"), None)
    audio = next((s for s in data["streams"] if s["codec_type"] == "audio"), None)

    baris, peringatan = [], []
    baris.append(f"Berkas   : {path} ({ukuran:.0f} MB)")
    baris.append(f"Durasi   : {mmss(durasi)} ({durasi:.1f} detik)")

    if video:
        pembilang, penyebut = video["r_frame_rate"].split("/")
        fps = float(pembilang) / float(penyebut)
        baris.append(f"Gambar   : {video['width']}x{video['height']}, {fps:g} fps, {video['codec_name']}")
        if (video["width"], video["height"]) != (1920, 1080):
            peringatan.append(f"Resolusi {video['width']}x{video['height']}, bukan 1920x1080")
    else:
        peringatan.append("Tidak ada aliran gambar")

    if audio:
        baris.append(f"Suara    : {audio['codec_name']}, {audio.get('sample_rate', '?')} Hz")
        if video and "duration" in audio and "duration" in video:
            selisih = abs(float(audio["duration"]) - float(video["duration"]))
            if selisih > 0.2:
                peringatan.append(f"Panjang suara dan gambar beda {selisih:.2f} detik")
    else:
        peringatan.append("Tidak ada aliran suara")

    if audio:
        lufs, lra, puncak = ukur_suara(path)
        teks_lufs = "tidak terbaca" if lufs is None else f"{lufs:.1f} LUFS"
        teks_puncak = "tidak terbaca" if puncak is None else f"{puncak:.1f} dB"
        baris.append(f"Loudness : {teks_lufs} (target {target:g}), puncak {teks_puncak}, rentang {lra if lra is not None else '?'} LU")
        if lufs is None or lufs < -40:
            peringatan.append("Suara nyaris tidak terdengar")
        elif abs(lufs - target) > 2:
            peringatan.append(
                f"Loudness {lufs:.1f} LUFS jauh dari target {target:g}. Perbaiki: "
                f"ffmpeg -i {path} -c:v copy -af loudnorm=I={target:g}:TP=-1.5:LRA=11 hasil-norm.mp4"
            )
        if puncak is not None and puncak > BATAS_PUNCAK:
            peringatan.append(f"Puncak suara {puncak:.1f} dB melewati batas {BATAS_PUNCAK:g} dB (risiko pecah)")

    hitam, beku, senyap = deteksi(path, durasi)
    for a, b in hitam:
        if a < durasi - 2.0:
            peringatan.append(f"Layar hitam {mmss(a)} sampai {mmss(b)}")
    for a, d in beku:
        peringatan.append(f"Gambar beku {d:.1f} detik mulai {mmss(a)}")
    for a, d in senyap:
        if a >= 0.5 and a < durasi - 4.5:
            peringatan.append(f"Hening {d:.1f} detik mulai {mmss(a)}")

    langkah = lembar(path, durasi)
    baris.append(f"Cuplikan : kontak.jpg (satu gambar tiap {langkah} detik)")

    baris.append("")
    if peringatan:
        baris.append(f"HASIL: PERLU DICEK ({len(peringatan)} peringatan)")
        baris.extend("  - " + p for p in peringatan)
    else:
        baris.append("HASIL: LULUS, tidak ada peringatan")
    baris.append("")
    baris.append("Belum terukur: rasa musik dan suara (perlu didengar), warna di layar lain.")

    teks = "\n".join(baris)
    open("laporan.txt", "w", encoding="utf-8").write(teks + "\n")
    print(teks)


if __name__ == "__main__":
    main()
