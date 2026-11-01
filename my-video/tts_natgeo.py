import sys, asyncio, edge_tts

text = sys.argv[1]
out_path = sys.argv[2]

async def main():
    c = edge_tts.Communicate(text, "id-ID-ArdiNeural", rate="-8%", pitch="-10Hz")
    await c.save(out_path)
    print(f"Selesai! Audio: {out_path}")

asyncio.run(main())
