import asyncio
import edge_tts

async def generate_audio():
    with open("src/data/naskah.txt", "r") as f:
        text = f.read()

    voice = "id-ID-ArdiNeural"
    # Perlambat tempo bicara 20% agar lebih berwibawa
    rate = "-20%" 
    output_file = "public/audio/narasi-ardi.mp3"
    
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    await communicate.save(output_file)
    print(f"✅ Suara Ardi (Jernih, Tempo Lambat) berhasil dibuat!")

if __name__ == "__main__":
    asyncio.run(generate_audio())
