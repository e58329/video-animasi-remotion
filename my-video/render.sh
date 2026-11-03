#!/bin/bash
set -e
NAMA="${1:?Pakai: ./render.sh nama-video}"
npx remotion render Video "out/$NAMA.mp4" --concurrency=2
[ -s "out/$NAMA.mp4" ] || { echo "Render gagal, tidak ada yang dihapus"; exit 1; }
rm -rf src/topik public/topik __pycache__ .trash
rm -f topik.json dump*.txt cek.txt studio.log
mkdir -p src/topik
echo '{"judul":"","scenes":[]}' > src/topik/data.json
find out -type f ! -name '*.mp4' -delete
echo "Selesai. Sisa video:"; ls -lh out
