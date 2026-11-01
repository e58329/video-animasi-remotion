import asyncio
import edge_tts
import json

TEKS = "Di ujung samudra yang paling dalam... terdapat sebuah rahasia yang telah lama tersembunyi. Hari ini... kita akan menyelami batas terakhir yang belum terjamah. Mengungkap misteri... yang belum pernah terungkap sebelumnya."
VOICE = "id-ID-ArdiNeural"
AUDIO_OUT = "public/audio/narasi-ardi.mp3"
JSON_OUT = "public/audio/narasi-ardi.words.json"

async def buat_karaoke():
    communicate = edge_tts.Communicate(TEKS, VOICE, rate="-10%", pitch="-15Hz")
    submaker = edge_tts.SubMaker()
    
    with open(AUDIO_OUT, "wb") as file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.feed(chunk)
                
    # Simpan data timestamp ke JSON
    with open(JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(submaker.get_subs(), f, indent=2)
        
    print(f"✅ Sukses! Audio dan Subtitle JSON dibuat.")

if __name__ == "__main__":
    asyncio.run(buat_karaoke())
