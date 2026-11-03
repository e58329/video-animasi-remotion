import json

INTRO = 3.0
topik = json.load(open("topik.json", encoding="utf-8"))
data = json.load(open("src/topik/data.json", encoding="utf-8"))

t = INTRO
terlihat = None
baris = []
for sc_topik, sc_data in zip(topik["scenes"], data["scenes"]):
    bab = sc_topik.get("bab", "")
    if bab and bab != terlihat:
        mulai = 0.0 if not baris else t
        baris.append(f"{int(mulai // 60)}:{int(mulai % 60):02d} {bab}")
        terlihat = bab
    t += sc_data["durasi"]
total = t + 2.0
print("\n".join(baris))
print(f"\nDurasi perkiraan: {int(total // 60)} menit {int(total % 60)} detik")
