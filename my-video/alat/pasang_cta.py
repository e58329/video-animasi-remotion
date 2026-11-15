import json

p = "src/topik/data.json"
d = json.load(open(p, encoding="utf-8"))
n = 0
for pt in d.get("potongan") or []:
    c = pt.get("cta")
    if isinstance(c, dict):
        c["visual"] = "ajakan-berlangganan"
        n += 1
json.dump(d, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"CTA diganti visualnya: {n}")
