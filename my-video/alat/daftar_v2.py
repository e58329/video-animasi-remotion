import re

spek = open("src/engine/visuals/SpekBinance.tsx", encoding="utf-8").read()
nama = re.findall(r'^\s*"([a-z0-9-]+)":\s*\{', spek, re.M)
baris = [f'  "{n}-v2": VisualBinanceV3["{n}-v2"],' for n in nama]
blok = "  // v3-mulai\n" + "\n".join(baris) + "\n  // v3-selesai"
p = "src/engine/visuals/index.tsx"
s = open(p, encoding="utf-8").read()
if "// v3-mulai" in s:
    s = re.sub(r"  // v3-mulai.*?// v3-selesai", lambda m: blok, s, flags=re.S)
elif "  ...VisualBinanceV3," in s:
    s = s.replace("  ...VisualBinanceV3,", blok, 1)
else:
    raise SystemExit("penanda tidak ketemu, jangan lanjut")
open(p, "w", encoding="utf-8").write(s)
print(len(nama), "visual terdaftar")
