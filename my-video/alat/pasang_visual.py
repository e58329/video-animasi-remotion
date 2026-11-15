import json
MAP=[("Perang Dunia Kedua mengubah","perang-kode"),("Kriterianya lima","lima-kriteria"),("Penyadapan di Indonesia punya dasar hukum","dasar-hukum"),("Tapi kisah ini dimulai jauh","telegraf"),
("Tahun 1945, sebuah patung hadiah","serah-patung"),
("Semua bermula dari telegraf","telegraf"),
("Dan siapa pun yang bisa menyentuh kabel","telegraf-sadap"),
("Di Perang Saudara Amerika","telegraf-dua-pihak"),
("Lalu telepon datang tahun 1876","telegraf-sadap"),
("Tahun 1946, Amerika dan Inggris","berbagi-intelijen"),
("Lalu datang era Perang Dingin","mata-mata"),
("Tahun 1945, anak-anak Soviet","serah-patung"),
("Di dalamnya tersembunyi mikrofon","tanpa-baterai"),
("Alat itu baru ketahuan tahun 1952","sinar-radio"),
("Tidak ada daftar resmi","penyadapan-massal"),
("Menariknya, sebagian besar spyware","klik-tautan"),
("Amnesty menegaskan tidak punya bukti","garis-waktu-laporan"),
("Beberapa perusahaan yang disebut","stempel-bantah")]
def ss(o,k=''):
    if isinstance(o,str): return [o] if k!='visual' else []
    if isinstance(o,dict): return [t for a,b in o.items() for t in ss(b,a)]
    if isinstance(o,list): return [t for b in o for t in ss(b,k)]
    return []
d=json.load(open('topik.json'))
sisa=[]
for i,s in enumerate(d['scenes']):
    if s.get('visual')!='abstrak': continue
    t=' '.join(ss(s))
    for p,v in MAP:
        if p in t[:100]:
            s['visual']=v; break
    else: sisa.append((i,t[:60]))
json.dump(d,open('topik.json','w'),ensure_ascii=False,indent=2)
print('masih abstrak:',len(sisa))
for i,t in sisa: print(i,t)
