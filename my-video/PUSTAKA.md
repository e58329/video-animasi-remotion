# Pustaka engine

## Visual (src/engine/visuals), dipakai lewat field "visual"
laut, kapal-selam, angkasa, abstrak, pencarian, lelang, koin, jaringan, grafik-alphabet

## Overlay per scene (topik.json)
- fokus: "teks besar"
- angka: { "ke": 63.35, "dari": 0, "desimal": 2, "awalan": "US$", "akhiran": " miliar", "label": "..." }
- sfx: [{ "nama": "tetes", "at": 2.5, "volume": 0.4 }]  (atau "file": "sfx/xxx.mp3")

## Opsi topik
- sfxOtomatis: true  (transisi tiap scene + pop saat fokus/angka)
- sfxTransisi: "sfx/transisi.mp3"
- musik: "topik/musik.mp3"

## Animasi (src/engine/animasi.tsx)
Muncul, Ketik, Hitung, Denyut, Garis, useProgres, formatAngka

## SFX (public/sfx, katalog src/engine/sfx.ts, lisensi CC0 Kenney)
klik pop transisi transisi2 sukses konfirmasi error tetes tetes2 semprot kaca geser tombol tick pluck pertanyaan glitch buka tutup bong

## Alat (alat/)
- periksa.py: gerbang naskah sebelum pipeline (visual, sfx, angka, ajakan berlangganan, brief). Pakai: python alat/periksa.py topik.json
- buat_video.py: suara, timing kata, dan laporan salah ucap (laporan-suara.txt)
- cek.py: QA dari file render (loudness, layar hitam, gambar beku, hening, durasi, kontak.jpg), dipanggil otomatis oleh render.sh
- bab.py: bab YouTube dari jadwal scene, dipanggil otomatis oleh render.sh (hasil di laporan.txt)
- bab_dari_video.py: bab YouTube dari video yang sudah jadi (cadangan)
- pasang_sfx.sh: memasang 20 SFX Kenney (CC0) ke public/sfx
- templat/BRIEF.md: salin ke BRIEF.md tiap video baru, isi bagian [ISI]

## Format vertikal (TikTok, Reels, Shorts)
- Komposisi "Vertikal" (1080x1920), zona aman di src/engine/zona.ts
- topik.json: "potongan": [{ "nama": "hook", "scenes": [1,2,3], "cta": "kalimat ajakan menonton video lengkap" }]
- Urutan: buat_video.py lalu buat_potongan.py; render.sh merender tiap potongan jadi out/NAMA-potongan.mp4
- Pratinjau di Studio: pilih komposisi Vertikal (potongan pertama), atau ubah props potongan

## Short mandiri (tanpa video panjang)
- topik.json: "jenis": "short", "nama": "...", "cta": "...", "scenes": [...] (tanpa bab, tanpa prolog)
- Urutan: periksa.py, buat_video.py, buat_potongan.py, lalu ./render.sh nama --short (hasil out/nama.mp4)
- Target 30 sampai 60 detik (sekitar 70 sampai 140 kata), hook di kalimat pertama

## Entry pipeline
- Pipeline ini memakai src/indexEngine.ts (komposisi Video dan Vertikal), terpisah dari src/Root.tsx yang dipakai proyek lain
- Studio untuk pipeline ini: npx remotion studio src/indexEngine.ts
- render.sh sudah memakai entry ini
