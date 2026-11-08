#!/usr/bin/env python3
"""Mendaftarkan <AtcCompositions /> ke src/Root.tsx (dengan backup Root.tsx.bak)."""
import sys
from pathlib import Path

p = Path("src/Root.tsx")
if not p.exists():
    print("! src/Root.tsx tidak ditemukan. Tambahkan manual:")
    print("    import {AtcCompositions} from './atc/register';")
    print("    lalu taruh <AtcCompositions /> di dalam RemotionRoot.")
    sys.exit(0)

s = p.read_text(encoding="utf-8")
if "AtcCompositions" in s:
    print("Root.tsx sudah memuat AtcCompositions, lewati.")
    sys.exit(0)

idx = s.rfind("</>")
if idx == -1:
    print("! Tidak menemukan penutup fragment </> di Root.tsx. Tambahkan manual:")
    print("    import {AtcCompositions} from './atc/register';")
    print("    lalu taruh <AtcCompositions /> di dalam RemotionRoot.")
    sys.exit(0)

Path("src/Root.tsx.bak").write_text(s, encoding="utf-8")
s = s[:idx] + "  <AtcCompositions />\n    " + s[idx:]
s = "import {AtcCompositions} from './atc/register';\n" + s
p.write_text(s, encoding="utf-8")
print("Root.tsx diperbarui (backup: src/Root.tsx.bak).")
