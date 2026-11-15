import subprocess, sys
import numpy as np

f = sys.argv[1] if len(sys.argv) > 1 else "out/sadap-tiktok.mp4"
t = sys.argv[2] if len(sys.argv) > 2 else "8.5"
cmd = ["ffmpeg", "-v", "error", "-ss", t, "-i", f, "-frames:v", "1",
       "-vf", "crop=1080:607:0:600", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
a = np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.uint8)
a = a.reshape(607, 1080, 3).astype(int)
m = (a[:, :, 0] < 90) & (a[:, :, 1] > 170) & (a[:, :, 2] > 190)
ys, xs = np.where(m)
w, h = xs.max() - xs.min(), ys.max() - ys.min()
print(f"{f} detik {t}: lebar {w}, tinggi {h}, rasio {h / w:.2f} (ponsel asli sekitar 2,1)")
