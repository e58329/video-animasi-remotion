import json, sys

p = sys.argv[1] if len(sys.argv) > 1 else "topik.json"
d = json.load(open(p, encoding="utf-8"))
if d.get("jenis") == "short":
    baku = open("templat/baku_short.txt", encoding="utf-8").read().strip()
    depan = d.get("pengantar_cta", "").strip()
    d["cta"] = (depan + " " if depan else "") + baku
    json.dump(d, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("CTA baku dipasang")
else:
    print("bukan short, dilewati")
