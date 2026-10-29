'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Check, Copy, Github, Palette, RotateCcw, Subtitles, Terminal, Type } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  DURATION_IN_FRAMES,
  FPS,
  HEIGHT,
  WIDTH,
  defaultIntroProps,
  type IntroProps,
} from '@/remotion/constants';

const PlayerPanel = dynamic(() => import('./PlayerPanel'), {
  ssr: false,
  loading: () => <div className="aspect-video w-full animate-pulse rounded-xl bg-white/[0.04]" />,
});

const PRESETS: Array<{ name: string; accentColor: string; accentColor2: string }> = [
  { name: 'Neon Ungu', accentColor: '#8b5cf6', accentColor2: '#3b82f6' },
  { name: 'Cyan Neon', accentColor: '#22d3ee', accentColor2: '#a78bfa' },
  { name: 'Emerald', accentColor: '#34d399', accentColor2: '#14b8a6' },
  { name: 'Sunset', accentColor: '#fb7185', accentColor2: '#fbbf24' },
];

const REPO_URL = 'https://github.com/e58329/video-animasi-remotion';

const stats = [
  { label: 'Resolusi', value: `${WIDTH} × ${HEIGHT}` },
  { label: 'Frame Rate', value: `${FPS} fps` },
  { label: 'Durasi', value: `${(DURATION_IN_FRAMES / FPS).toFixed(1)} dtk` },
  { label: 'Total Frame', value: `${DURATION_IN_FRAMES}` },
  { label: 'Narasi', value: 'Ardi TTS (pitch -20%)' },
];

export function StudioClient() {
  const { toast } = useToast();
  const [props, setProps] = useState<IntroProps>(defaultIntroProps);
  const [copied, setCopied] = useState(false);

  const update = (key: keyof IntroProps, value: string | boolean) =>
    setProps((prev) => ({ ...prev, [key]: value }));

  const activePreset = PRESETS.find(
    (p) => p.accentColor === props.accentColor && p.accentColor2 === props.accentColor2,
  );

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(props, null, 2));
      setCopied(true);
      toast({
        title: 'Konfigurasi disalin',
        description: 'Tempel ke defaultIntroProps di src/remotion/constants.ts',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: 'Gagal menyalin',
        description: 'Clipboard tidak tersedia di browser ini.',
        variant: 'destructive',
      });
    }
  };

  const resetDefaults = () => {
    setProps(defaultIntroProps);
    toast({ title: 'Dikembalikan ke bawaan' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#070b16] text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#070b16]/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/25">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <polygon points="7,4 20,12 7,20" fill="#ffffff" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-semibold leading-tight">Video Animasi Remotion</h1>
              <p className="text-xs text-slate-400">Studio preview — komposisi IntroPromo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 sm:inline">
              16:9 · 30 fps · 8 dtk
            </span>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Buka repositori GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Konten utama */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Kolom player */}
          <section aria-label="Preview video">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
                <PlayerPanel inputProps={props} />
              </div>

              {/* Statistik komposisi */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-lg bg-white/[0.04] p-3">
                    <p className="text-[11px] uppercase tracking-wider text-slate-500">{s.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-100">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sidebar editor */}
          <aside className="space-y-6" aria-label="Editor komposisi">
            {/* Teks video */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center gap-2">
                <Type className="h-4 w-4 text-violet-400" aria-hidden="true" />
                <h2 className="text-sm font-semibold">Teks Video</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="welcomeText" className="text-slate-300">
                    Teks Pembuka
                  </Label>
                  <Input
                    id="welcomeText"
                    value={props.welcomeText}
                    maxLength={40}
                    onChange={(e) => update('welcomeText', e.target.value)}
                    className="border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500"
                    placeholder="SELAMAT DATANG DI"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="channelName" className="text-slate-300">
                    Nama Channel / Brand
                  </Label>
                  <Input
                    id="channelName"
                    value={props.channelName}
                    maxLength={24}
                    onChange={(e) => update('channelName', e.target.value)}
                    className="border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500"
                    placeholder="NOVA DIGITAL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline" className="text-slate-300">
                    Tagline
                  </Label>
                  <Input
                    id="tagline"
                    value={props.tagline}
                    maxLength={60}
                    onChange={(e) => update('tagline', e.target.value)}
                    className="border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500"
                    placeholder="Wujudkan Ide Besar Menjadi Karya Digital"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaText" className="text-slate-300">
                    Teks Tombol CTA
                  </Label>
                  <Input
                    id="ctaText"
                    value={props.ctaText}
                    maxLength={24}
                    onChange={(e) => update('ctaText', e.target.value)}
                    className="border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500"
                    placeholder="SUBSCRIBE SEKARANG"
                  />
                </div>
              </div>
            </div>

            {/* Narasi & subtitle */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center gap-2">
                <Subtitles className="h-4 w-4 text-violet-400" aria-hidden="true" />
                <h2 className="text-sm font-semibold">Narasi & Subtitle</h2>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <Label htmlFor="showSubtitle" className="text-slate-300">
                    Subtitle otomatis
                  </Label>
                  <p className="text-xs text-slate-500">
                    Caption per kata, nyala sinkron dengan suara TTS
                  </p>
                </div>
                <Switch
                  id="showSubtitle"
                  checked={props.showSubtitle}
                  onCheckedChange={(v) => update('showSubtitle', v)}
                />
              </div>
            </div>

            {/* Warna aksen */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center gap-2">
                <Palette className="h-4 w-4 text-violet-400" aria-hidden="true" />
                <h2 className="text-sm font-semibold">Warna Aksen</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((p) => {
                  const active = activePreset?.name === p.name;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() =>
                        setProps((prev) => ({ ...prev, accentColor: p.accentColor, accentColor2: p.accentColor2 }))
                      }
                      className={`flex items-center gap-2 rounded-lg border p-2.5 text-left text-xs transition-colors ${
                        active
                          ? 'border-violet-500 bg-violet-500/10 text-white'
                          : 'border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/10'
                      }`}
                      aria-pressed={active}
                    >
                      <span
                        className="h-5 w-5 shrink-0 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor2})`,
                        }}
                        aria-hidden="true"
                      />
                      {p.name}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="accentColor" className="text-xs text-slate-400">
                    Warna 1
                  </Label>
                  <input
                    id="accentColor"
                    type="color"
                    value={props.accentColor}
                    onChange={(e) => update('accentColor', e.target.value)}
                    className="h-10 w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 p-1"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="accentColor2" className="text-xs text-slate-400">
                    Warna 2
                  </Label>
                  <input
                    id="accentColor2"
                    type="color"
                    value={props.accentColor2}
                    onChange={(e) => update('accentColor2', e.target.value)}
                    className="h-10 w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 p-1"
                  />
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={resetDefaults}
                className="mt-4 w-full border-white/15 bg-transparent text-slate-200 hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="mr-2 h-3.5 w-3.5" />
                Kembalikan ke Bawaan
              </Button>
            </div>

            {/* Render */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-violet-400" aria-hidden="true" />
                <h2 className="text-sm font-semibold">Render ke Video MP4</h2>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-slate-400">
                Jalankan di lokal setelah repo di-clone (butuh Node.js 18+ dan Chromium untuk
                rendering):
              </p>
              <pre className="overflow-x-auto rounded-lg bg-black/50 p-3 text-xs leading-relaxed text-emerald-300">
                <code>npx remotion render IntroPromo out/intro.mp4</code>
              </pre>
              <p className="mb-3 mt-4 text-xs leading-relaxed text-slate-400">
                Atau buka Remotion Studio untuk mengedit secara interaktif:
              </p>
              <pre className="overflow-x-auto rounded-lg bg-black/50 p-3 text-xs leading-relaxed text-emerald-300">
                <code>npx remotion studio</code>
              </pre>
              <Button
                size="sm"
                onClick={copyConfig}
                className="mt-4 w-full bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:from-violet-600 hover:to-blue-600"
              >
                {copied ? <Check className="mr-2 h-3.5 w-3.5" /> : <Copy className="mr-2 h-3.5 w-3.5" />}
                {copied ? 'Tersalin!' : 'Salin Konfigurasi JSON'}
              </Button>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 text-xs text-slate-500 sm:flex-row">
          <p>Dibuat dengan Remotion 4 + Next.js — semua animasi digenerate lewat kode React.</p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-slate-300"
          >
            e58329/video-animasi-remotion
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}
