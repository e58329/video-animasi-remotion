#!/bin/bash
set -e
mkdir -p public/sfx
S=/tmp/kenney/interface/addons/kenney_interface_sounds
if [ ! -d "$S" ]; then
  mkdir -p /tmp/kenney
  git clone -q --depth 1 https://github.com/Calinou/kenney-interface-sounds.git /tmp/kenney/interface
fi
for l in /tmp/kenney/interface/LICENSE*; do
  [ -e "$l" ] && cp "$l" public/sfx/LICENSE-interface.txt
done
for par in klik:click_003 pop:select_002 transisi:maximize_006 transisi2:minimize_006 sukses:confirmation_001 konfirmasi:confirmation_002 error:error_004 tetes:drop_001 tetes2:drop_003 semprot:drop_004 kaca:glass_003 geser:scroll_002 tombol:switch_003 tick:tick_002 pluck:pluck_001 pertanyaan:question_001 glitch:glitch_001 buka:open_001 tutup:close_002 bong:bong_001; do
  n=${par%%:*}; f=${par##*:}
  ffmpeg -y -v error -i "$S/$f.wav" -ar 44100 -b:a 128k "public/sfx/$n.mp3"
done
cat > public/sfx/LISENSI.txt << 'EOT'
Kenney Interface Sounds, CC0 1.0: https://opengameart.org/content/interface-sounds (mirror: https://github.com/Calinou/kenney-interface-sounds)
EOT
echo "SFX terpasang: $(ls public/sfx/*.mp3 | wc -l) berkas"
