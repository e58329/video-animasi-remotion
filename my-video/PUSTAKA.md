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
