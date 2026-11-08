import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, VProps, clamp, rad} from './theme';
import {Note, Plane, Stage, reveal} from './ui';

/* ───────────── RADAR ───────────── */
const BLIPS = [
  {a: 30, r: 120, d: 0.06, l: 'SKY214 FL350'},
  {a: 110, r: 200, d: -0.05, l: 'NUS088 FL280'},
  {a: 200, r: 150, d: 0.04, l: 'JET771 FL310'},
  {a: 280, r: 240, d: -0.03, l: 'AIR305 FL390'},
  {a: 330, r: 90, d: 0.08, l: 'FLY912 FL120'},
  {a: 70, r: 260, d: 0.03, l: 'CGO440 FL360'},
];

export const Radar: React.FC<VProps> = () => {
  const f = useCurrentFrame();
  const cx = 500;
  const cy = 300;
  const R = 280;
  const sweep = (f * 3.2) % 360;
  return (
    <Stage>
      <circle cx={cx} cy={cy} r={R + 8} fill="rgba(6,30,24,0.55)" stroke={C.green} strokeWidth={3} />
      {[70, 140, 210, 280].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={C.green} strokeOpacity={0.35} strokeWidth={1.5} />
      ))}
      <line x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke={C.green} strokeOpacity={0.3} />
      <line x1={cx} y1={cy - R} x2={cx} y2={cy + R} stroke={C.green} strokeOpacity={0.3} />
      {Array.from({length: 28}).map((_, k) => {
        const a = rad(sweep - k * 1.5);
        return (
          <line
            key={k}
            x1={cx}
            y1={cy}
            x2={cx + R * Math.sin(a)}
            y2={cy - R * Math.cos(a)}
            stroke={C.green}
            strokeOpacity={(1 - k / 28) * 0.28}
            strokeWidth={5}
          />
        );
      })}
      <line
        x1={cx}
        y1={cy}
        x2={cx + R * Math.sin(rad(sweep))}
        y2={cy - R * Math.cos(rad(sweep))}
        stroke={C.green}
        strokeWidth={3}
      />
      {BLIPS.map((b, i) => {
        const a = b.a + f * b.d;
        const x = cx + b.r * Math.sin(rad(a));
        const y = cy - b.r * Math.cos(rad(a));
        const diff = (((sweep - a) % 360) + 360) % 360;
        const op = Math.max(0.12, 1 - diff / 260);
        return (
          <g key={i} opacity={op}>
            <circle cx={x} cy={y} r={7} fill={C.green} />
            <text x={x + 12} y={y - 10} fill={C.green} fontSize={20} fontFamily="monospace" fontWeight={700}>
              {b.l}
            </text>
          </g>
        );
      })}
    </Stage>
  );
};

/* ───────────── SKY (rute penerbangan) ───────────── */
const ROUTES = [
  {a: [60, 120], b: [940, 420], o: 0},
  {a: [940, 90], b: [80, 480], o: 0.35},
  {a: [120, 540], b: [880, 150], o: 0.6},
  {a: [500, 40], b: [520, 560], o: 0.2},
  {a: [40, 300], b: [960, 300], o: 0.75},
  {a: [250, 40], b: [760, 570], o: 0.5},
];

export const Sky: React.FC<VProps> = ({dur}) => {
  const f = useCurrentFrame();
  const ph = (f % 60) / 60;
  return (
    <Stage>
      {ROUTES.map((r, i) => (
        <line
          key={'l' + i}
          x1={r.a[0]}
          y1={r.a[1]}
          x2={r.b[0]}
          y2={r.b[1]}
          stroke={C.dim}
          strokeOpacity={0.45}
          strokeWidth={2}
          strokeDasharray="6 10"
        />
      ))}
      {ROUTES.map((r, i) => (
        <g key={'a' + i}>
          <circle cx={r.a[0]} cy={r.a[1]} r={8} fill={C.cyan} />
          <circle cx={r.b[0]} cy={r.b[1]} r={8} fill={C.cyan} />
        </g>
      ))}
      <circle cx={500} cy={300} r={ph * 240} fill="none" stroke={C.amber} strokeWidth={3} strokeOpacity={1 - ph} />
      <circle cx={500} cy={300} r={14} fill={C.amber} />
      <text x={500} y={345} textAnchor="middle" fill={C.amber} fontSize={26} fontWeight={800}>
        ATC
      </text>
      {ROUTES.map((r, i) => {
        const t = (f / (dur * 0.9) + r.o) % 1;
        const x = r.a[0] + (r.b[0] - r.a[0]) * t;
        const y = r.a[1] + (r.b[1] - r.a[1]) * t;
        const rot = (Math.atan2(r.b[0] - r.a[0], -(r.b[1] - r.a[1])) * 180) / Math.PI;
        return <Plane key={'p' + i} x={x} y={y} rot={rot} scale={1.15} />;
      })}
    </Stage>
  );
};

/* ───────────── TIMELINE ───────────── */
export const Timeline: React.FC<VProps> = ({dur, data}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const items: {year: string; label: string}[] = data?.items ?? [];
  const n = items.length;
  const planeX = 60 + 880 * clamp(f / dur);
  return (
    <Stage>
      <line x1={50} y1={300} x2={950} y2={300} stroke={C.cyan} strokeWidth={4} strokeOpacity={0.45} />
      <line x1={50} y1={300} x2={planeX} y2={300} stroke={C.cyan} strokeWidth={6} />
      {items.map((it, i) => {
        const x = n === 1 ? 500 : 170 + i * (660 / (n - 1));
        const start = 18 + i * ((dur * 0.6) / Math.max(n, 1));
        const s = clamp(spring({frame: f - start, fps, config: {damping: 13}}));
        const up = i % 2 === 0;
        return (
          <g key={i} opacity={s}>
            <line x1={x} y1={300} x2={x} y2={up ? 250 : 350} stroke={C.amber} strokeWidth={3} />
            <circle cx={x} cy={300} r={16} fill={C.amber} stroke={C.white} strokeWidth={3} />
            <Note x={x - 170} y={up ? 70 : 350} w={340} h={180} align="center" size={26} box border={C.amber}>
              <div style={{color: C.amber, fontSize: 44, fontWeight: 900}}>{it.year}</div>
              <div>{it.label}</div>
            </Note>
          </g>
        );
      })}
      <Plane x={planeX} y={300} rot={90} scale={1.2} />
    </Stage>
  );
};

/* ───────────── TOWER ───────────── */
export const Tower: React.FC<VProps> = ({dur}) => {
  const f = useCurrentFrame();
  const planeX = 940 - ((f * 1.1) % 420);
  return (
    <Stage>
      <line x1={0} y1={560} x2={1000} y2={560} stroke={C.dim} strokeWidth={3} />
      {[0, 1, 2].map((k) => {
        const ph = ((f + k * 20) % 60) / 60;
        return <circle key={k} cx={500} cy={105} r={ph * 330} fill="none" stroke={C.cyan} strokeWidth={3} strokeOpacity={(1 - ph) * 0.7} />;
      })}
      <path d="M478 255 L522 255 L530 520 L470 520 Z" fill="#1c4a75" />
      <rect x={420} y={520} width={160} height={40} fill="#16385a" />
      <path d="M425 185 L575 185 L595 255 L405 255 Z" fill="rgba(56,225,255,0.35)" stroke={C.cyan} strokeWidth={4} />
      <rect x={415} y={170} width={170} height={15} fill="#2a6aa5" />
      <line x1={500} y1={170} x2={500} y2={110} stroke={C.white} strokeWidth={4} />
      <circle cx={500} cy={105} r={9} fill={C.red} />
      <circle cx={500} cy={212} r={11} fill={C.white} />
      <path d="M484 250 Q500 222 516 250 Z" fill={C.white} />
      <Plane x={planeX} y={110} rot={270} scale={1.2} />

      <g opacity={reveal(f, dur * 0.2)}>
        <line x1={380} y1={215} x2={412} y2={215} stroke={C.amber} strokeWidth={3} />
      </g>
      <Note x={30} y={160} w={350} h={110} show={reveal(f, dur * 0.2)} align="center" size={27} box border={C.amber}>
        Kabin kaca: pandangan 360° ke landasan
      </Note>

      <g opacity={reveal(f, dur * 0.42)}>
        <line x1={500} y1={105} x2={600} y2={70} stroke={C.cyan} strokeWidth={3} />
      </g>
      <Note x={600} y={20} w={390} h={100} show={reveal(f, dur * 0.42)} align="center" size={27} box>
        Radio VHF: 118–137 MHz
      </Note>

      <g opacity={reveal(f, dur * 0.62)}>
        <line x1={598} y1={225} x2={640} y2={260} stroke={C.green} strokeWidth={3} />
      </g>
      <Note x={630} y={250} w={360} h={120} show={reveal(f, dur * 0.62)} align="center" size={27} box border={C.green}>
        Di dalam: layar radar, cuaca, dan lampu landasan
      </Note>
    </Stage>
  );
};

/* ───────────── ROLES (estafet) ───────────── */
const ROLES = [
  {n: 'Clearance Delivery', s: 'Izin rute'},
  {n: 'Ground', s: 'Taxi & pushback'},
  {n: 'Tower', s: 'Lepas landas & mendarat'},
  {n: 'Approach / Departure', s: 'Radar sekitar bandara'},
  {n: 'Area Control (ACC)', s: 'Jalur jelajah'},
];

export const Roles: React.FC<VProps> = ({dur}) => {
  const f = useCurrentFrame();
  const prog = clamp((f - 10) / Math.max(1, dur - 40));
  const act = Math.min(4, Math.floor(prog * 5));
  const bx = (i: number) => 16 + i * 198;
  return (
    <Stage>
      {ROLES.map((r, i) => {
        const on = i === act;
        const done = i < act;
        return (
          <g key={i}>
            <rect
              x={bx(i)}
              y={130}
              width={176}
              height={200}
              rx={18}
              fill={on ? 'rgba(255,181,46,0.18)' : C.panel}
              stroke={on ? C.amber : done ? C.green : C.dim}
              strokeWidth={on ? 5 : 2.5}
            />
            <Note x={bx(i)} y={130} w={176} h={200} align="center" size={25}>
              <div style={{color: on ? C.amber : C.white, fontSize: 27, fontWeight: 900}}>{r.n}</div>
              <div style={{color: C.dim, fontSize: 21, fontWeight: 600, marginTop: 8}}>{r.s}</div>
            </Note>
            {i < 4 && <path d={`M${bx(i) + 181} 230 l12 -10 v20 z`} fill={C.dim} />}
          </g>
        );
      })}
      <line x1={60} y1={430} x2={940} y2={430} stroke={C.dim} strokeDasharray="8 10" strokeWidth={3} />
      <Plane x={60 + 880 * prog} y={430} rot={90} scale={1.3} color={C.amber} />
      <Note x={100} y={485} w={800} h={80} align="center" size={30} color={C.cyan}>
        Estafet: tiap pengendali memegang satu frekuensi radio
      </Note>
    </Stage>
  );
};
