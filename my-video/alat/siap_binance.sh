#!/bin/bash
set -e
cd /workspaces/video-animasi-remotion/my-video
python3 alat/dari_naskah.py naskah_binance.txt
python3 alat/pasang_visual.py
python3 alat/disclaimer_diam.py
python3 alat/periksa.py
