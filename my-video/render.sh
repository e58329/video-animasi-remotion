#!/bin/bash
set -e
NAMA="${1:?Pakai: ./render.sh nama-video}"
grep -q '"visual"' src/topik/data.json || { echo "Belum ada data video (src/topik/data.json kosong). Jalankan buat_video.py dulu."; exit 1; }
npx remotion render Video "out/$NAMA.mp4" --concurrency=2
[ -s "out/$NAMA.mp4" ] || { echo "Render gagal, tidak ada yang dihapus"; exit 1; }
python alat/cek.py "out/$NAMA.mp4" || true
{ echo; echo "BAB YOUTUBE"; python alat/bab.py; } >> laporan.txt 2>/dev/null || true
python - << 'PY' > /tmp/potongan.txt
import json
d = json.load(open("src/topik/data.json", encoding="utf-8"))
for i, p in enumerate(d.get("potongan", [])):
    print(i, p["nama"])
PY
while read -r IDX PNAMA; do
  [ -n "$IDX" ] || continue
  echo "Render potongan vertikal: $PNAMA"
  npx remotion render Vertikal "out/$NAMA-$PNAMA.mp4" --props="{\"potongan\":$IDX}" --concurrency=2
done < /tmp/potongan.txt
rm -rf src/topik public/topik __pycache__ .trash
rm -f topik.json BRIEF.md dump*.txt cek.txt studio.log laporan-suara.txt
mkdir -p src/topik
echo '{"judul":"","scenes":[]}' > src/topik/data.json
find out -type f ! -name '*.mp4' -delete
echo "Selesai. Sisa video:"; ls -lh out
echo "Laporan: laporan.txt dan kontak.jpg (ditimpa tiap render)"
