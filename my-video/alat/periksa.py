import json
import os
import re
import sys

KANAL = "Yakali Lu Tau"
DURASI_MIN = 8 * 60
KATA_PER_DETIK = 2.05
JEDA_SCENE = 1.0


def kunci_dari(path, awal):
    if not os.path.exists(path):
        return set()
    s = open(path, encoding="utf-8").read()
    i = s.find(awal)
    if i < 0:
        return set()
    j = s.find("};", i)
    blok = s[i : j if j > 0 else len(s)]
    pola = r'^\s*(?:"([^"]+)"|([A-Za-z_]\w*))\s*:'
    return {a or b for a, b in re.findall(pola, blok, flags=re.M)}


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else "topik.json"
    try:
        data = json.load(open(path, encoding="utf-8"))
    except FileNotFoundError:
        sys.exit(f"GALAT: {path} tidak ditemukan")
    except json.JSONDecodeError as e:
        sys.exit(f"GALAT: JSON tidak valid di baris {e.lineno}, kolom {e.colno}: {e.msg}")

    galat, peringatan = [], []
    visual_ok = kunci_dari("src/engine/visuals/index.tsx", "export const visualTerdaftar")
    sfx_ok = kunci_dari("src/engine/sfx.ts", "export const SFX")
    scenes = data.get("scenes", [])
    if not scenes:
        galat.append("Tidak ada scene")

    total_kata = 0
    durasi_perkiraan = 5.0
    for i, sc in enumerate(scenes, start=1):
        teks = sc.get("teks", "").strip()
        kata = teks.split()
        total_kata += len(kata)
        dur_scene = len(kata) / KATA_PER_DETIK + JEDA_SCENE
        durasi_perkiraan += dur_scene
        if not teks:
            galat.append(f"Scene {i}: teks kosong")
            continue
        v = sc.get("visual", "abstrak")
        if visual_ok and v not in visual_ok:
            galat.append(f"Scene {i}: visual '{v}' tidak terdaftar (tersedia: {', '.join(sorted(visual_ok))})")
        if sc.get("fokus") and sc.get("angka"):
            peringatan.append(f"Scene {i}: fokus dan angka dipakai bersamaan, posisinya bertumpuk")
        angka = sc.get("angka")
        if angka is not None and not isinstance(angka.get("ke"), (int, float)):
            galat.append(f"Scene {i}: angka.ke harus berupa angka")
        for x in sc.get("sfx", []):
            nama, berkas = x.get("nama"), x.get("file")
            if nama and sfx_ok and nama not in sfx_ok:
                galat.append(f"Scene {i}: sfx '{nama}' tidak ada di katalog")
            if berkas and not os.path.exists(os.path.join("public", berkas)):
                galat.append(f"Scene {i}: berkas sfx public/{berkas} tidak ada")
            if not nama and not berkas:
                galat.append(f"Scene {i}: sfx tanpa nama atau file")
            if not isinstance(x.get("at"), (int, float)):
                galat.append(f"Scene {i}: sfx tanpa waktu 'at'")
            elif x["at"] > dur_scene:
                peringatan.append(f"Scene {i}: sfx pada {x['at']} detik melewati perkiraan panjang scene ({dur_scene:.0f} detik)")
        angka_lain = [t.strip(".,") for t in re.findall(r"\d[\d.,]*", teks) if re.search(r"\d[.,]\d|\d{5,}", t)]
        if angka_lain:
            peringatan.append(f"Scene {i}: angka berpemisah atau sangat besar ({', '.join(angka_lain)}) bisa salah dibaca suara, tulis dengan huruf")
        if re.search(r"[^\x00-\x7F]", teks.replace("\u2019", "'")):
            peringatan.append(f"Scene {i}: ada huruf non-ASCII (misalnya umlaut), suara mungkin salah baca")
        if len(kata) > 90:
            peringatan.append(f"Scene {i}: {len(kata)} kata, terlalu panjang untuk satu visual (pecah jadi dua)")
        if not sc.get("bab"):
            peringatan.append(f"Scene {i}: tanpa field 'bab' (bab YouTube tidak bisa dibuat)")

    if durasi_perkiraan < DURASI_MIN:
        peringatan.append(f"Perkiraan durasi {durasi_perkiraan / 60:.1f} menit, di bawah target 8 menit")

    prolog = [s for s in scenes if "prolog" in s.get("bab", "").lower()]
    if prolog and not any(re.search(r"berlangganan|subscribe", s["teks"], re.I) for s in prolog):
        peringatan.append("Prolog belum berisi ajakan berlangganan")
    if not prolog:
        peringatan.append("Tidak ada bab 'Prolog'")
    akhir = scenes[-4:]
    if not any(re.search(r"berlangganan|subscribe", s["teks"], re.I) for s in akhir):
        peringatan.append("CTA di akhir belum berisi ajakan berlangganan")
    sebut = sum(1 for s in scenes if KANAL.lower() in s["teks"].lower())
    if sebut < 2:
        peringatan.append(f"Nama channel '{KANAL}' disebut {sebut} kali di narasi (target 2: prolog dan CTA)")

    if os.path.exists("BRIEF.md"):
        sisa = open("BRIEF.md", encoding="utf-8").read().count("[ISI]")
        if sisa:
            peringatan.append(f"BRIEF.md masih punya {sisa} bagian [ISI] yang kosong")
    else:
        peringatan.append("BRIEF.md belum ada (salin dari templat/BRIEF.md)")

    print(f"Scene: {len(scenes)}, kata: {total_kata}, perkiraan durasi: {durasi_perkiraan / 60:.1f} menit")
    for g in galat:
        print("GALAT      :", g)
    for p in peringatan:
        print("PERINGATAN :", p)
    if not galat and not peringatan:
        print("LULUS: tidak ada temuan")
    elif not galat:
        print(f"LULUS dengan {len(peringatan)} peringatan")
    else:
        print(f"GAGAL: {len(galat)} galat, perbaiki dulu sebelum menjalankan buat_video.py")
        sys.exit(1)


if __name__ == "__main__":
    main()
