import json, sys

src = sys.argv[1] if len(sys.argv) > 1 else "naskah_long.txt"
JUDUL = "Video baru"
PENANDA = {"@PROLOG": "prolog", "@DISCLAIMER": "disclaimer", "@CTA": "penutup"}
BATAS_KATA = 22


def muat_baku(path="templat/baku_long.txt"):
    out, kunci = {}, None
    for raw in open(path, encoding="utf-8"):
        s = raw.rstrip("\n")
        if s.startswith("## "):
            kunci = s[3:].strip().lower()
            out[kunci] = []
        if kunci and s.strip():
            out[kunci].append(s)
    return out


baku = muat_baku()
baris = []
for raw in open(src, encoding="utf-8"):
    s = raw.strip()
    if s.startswith("# judul:"):
        JUDUL = s[8:].strip()
    elif s in PENANDA:
        baris += baku[PENANDA[s]]
    else:
        baris.append(raw.rstrip("\n"))

scenes, bab, kata = [], None, 0
for no, raw in enumerate(baris, 1):
    s = raw.strip()
    if not s:
        continue
    if s.startswith("## "):
        bab = s[3:].strip()
        continue
    p = [x.strip() for x in s.split(" | ")]
    if len(p) < 2:
        sys.exit(f"GALAT baris {no}: format harus 'visual | teks'")
    sc = {"visual": p[0], "teks": p[1]}
    if bab:
        sc["bab"] = bab
    for x in p[2:]:
        a = x.split(":", 3)
        if a[0] != "angka" or len(a) != 4:
            sys.exit(f"GALAT baris {no}: pakai angka:ke:akhiran:label")
        sc["angka"] = {"ke": int(a[1]), "label": a[3]}
        if a[2]:
            sc["angka"]["akhiran"] = " " + a[2]
    n = len(p[1].split())
    if n > BATAS_KATA:
        print(f"PERINGATAN: scene {len(scenes)+1} ({bab}) {n} kata, sekitar {n/2.3:.0f} detik. Pecah supaya visual berganti tiap beberapa detik")
    kata += n
    scenes.append(sc)
json.dump({"judul": JUDUL, "scenes": scenes}, open("topik.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"topik.json: {len(scenes)} scene, {kata} kata, sekitar {kata/2.3/60:.1f} menit")
