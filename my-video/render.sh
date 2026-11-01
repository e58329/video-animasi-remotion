#!/bin/bash
set -e
NAMA="${1:?Pakai: ./render.sh nama-video}"
npx remotion render VideoNatGeo "out/$NAMA.mp4"
[ -s "out/$NAMA.mp4" ] || { echo "Render gagal, tidak ada yang dihapus"; exit 1; }
rm -rf src public __pycache__ .trash
rm -f generate_karaoke.py transkripsi_whisper.py transkripsi_whisper.bak tts_natgeo.py
rm -f dump*.txt cek.txt studio.log
find out -type f ! -name '*.mp4' -delete
echo "Selesai. Sisa video:"; ls -lh out
