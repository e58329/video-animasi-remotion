import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {C, VProps, clamp} from './theme';
import {Note, Plane, Stage, reveal} from './ui';

/* ───────────── RADIO ───────────── */
const DEFAULT_LINES = [
  {who: 'PILOT', text: 'Tower, ready for departure.'},
  {who: 'ATC', text: 'Runway two five left, cleared for takeoff.'},
  {who: 'PILOT', text: 'Cleared for takeoff, runway two five left.'},
];

export const Radio: React.FC<VProps> = ({dur, data}) => {
  const f = useCurrentFrame();
  const lines: {who: string; text: string}[] = data?.lines ?? DEFAULT_LINES;
  const n = lines.length;
  return (
    <Stage>
      {lines.map((l, i) => {
        const start = 14 + i * ((dur * 0.62) / n);
        const chars = Math.max(0, Math.floor((f - start) * 1.6));
        const pilot = l.who === 'PILOT';
        const col = pilot ? C.cyan : C.amber;
        return (
          <g key={i} opacity={chars > 0 ? 1 : 0}>
            <Note x={pilot ? 20 : 180} y={30 + i * 170} w={800} h={140} size={30} box border={col}>
              <div>
                <span style={{color: col, fontWeight: 900, fontSize: 24}}>{l.who}</span>
                <br />
                {l.text.slice(0, chars)}
              </div>
            </Note>
          </g>
        );
      })}
      <Note x={40} y={545} w={920} h={50} align="center" size={30} color={C.green} show={reveal(f, dur * 0.65, 15)}>
        Alpha · Bravo · Charlie · Delta · Echo ...
      </Note>
    </Stage>
  );
};

/* ───────────── SEPARATION ───────────── */
export const Separation: React.FC<VProps> = ({dur}) => {
  const f = useCurrentFrame();
  const d = Math.sin(f / 28) * 14;
  const r1 = reveal(f, 10, 15);
  const r2 = reveal(f, dur * 0.35, 15);
  const r3 = reveal(f, dur * 0.7, 15);
  return (
    <Stage>
      <rect x={10} y={10} width={480} height={430} rx={20} fill={C.panel} stroke={C.dim} strokeWidth={2} />
      <rect x={510} y={10} width={480} height={430} rx={20} fill={C.panel} stroke={C.dim} strokeWidth={2} />
      <text x={250} y={55} textAnchor="middle" fill={C.dim} fontSize={26} fontWeight={700}>
        TAMPAK ATAS
      </text>
      <text x={750} y={55} textAnchor="middle" fill={C.dim} fontSize={26} fontWeight={700}>
        TAMPAK SAMPING
      </text>

      <g opacity={r1}>
        <Plane x={120 + d} y={250} rot={90} scale={1.4} />
        <Plane x={390 + d} y={250} rot={90} scale={1.4} />
        <line x1={160 + d} y1={250} x2={350 + d} y2={250} stroke={C.amber} strokeWidth={3} />
        <line x1={160 + d} y1={232} x2={160 + d} y2={268} stroke={C.amber} strokeWidth={3} />
        <line x1={350 + d} y1={232} x2={350 + d} y2={268} stroke={C.amber} strokeWidth={3} />
        <text x={255 + d} y={215} textAnchor="middle" fill={C.amber} fontSize={36} fontWeight={900}>
          3–5 NM
        </text>
      </g>

      <g opacity={r2}>
        <Plane x={690 + d} y={170} rot={90} scale={1.4} />
        <Plane x={690 + d} y={340} rot={90} scale={1.4} />
        <line x1={790} y1={170} x2={790} y2={340} stroke={C.amber} strokeWidth={3} strokeDasharray="8 8" />
        <line x1={772} y1={170} x2={808} y2={170} stroke={C.amber} strokeWidth={3} />
        <line x1={772} y1={340} x2={808} y2={340} stroke={C.amber} strokeWidth={3} />
        <text x={822} y={266} fill={C.amber} fontSize={34} fontWeight={900}>
          1.000 ft
        </text>
      </g>

      <Note x={40} y={465} w={920} h={110} show={r3} align="center" size={30} color={C.cyan}>
        Di belakang pesawat besar, jaraknya ditambah: pusaran udara (wake turbulence)
      </Note>
    </Stage>
  );
};

/* ───────────── RUNWAY ───────────── */
export const Runway: React.FC<VProps> = ({dur}) => {
  const f = useCurrentFrame();
  const p = clamp(f / dur);

  const aLand = clamp((p - 0.05) / 0.45);
  const aX = interpolate(aLand, [0, 1], [-40, 760], {easing: Easing.out(Easing.cubic)});
  const aExit = clamp((p - 0.52) / 0.1);
  const aY = 290 + 140 * aExit;
  const aRot = p < 0.5 ? 90 : interpolate(clamp((p - 0.5) / 0.04), [0, 1], [90, 180]);

  const bUp = clamp((p - 0.64) / 0.1);
  const bRun = clamp((p - 0.76) / 0.24);
  const bY = 430 - 140 * bUp;
  const bX = 300 + interpolate(bRun, [0, 1], [0, 760], {easing: Easing.in(Easing.quad)});
  const bRot = p < 0.74 ? 0 : interpolate(clamp((p - 0.74) / 0.04), [0, 1], [0, 90]);

  const occupied = p < 0.58 || p > 0.66;
  return (
    <Stage>
      <rect x={0} y={250} width={1000} height={80} fill="#26394d" stroke={C.white} strokeWidth={2} />
      <line x1={0} y1={290} x2={1000} y2={290} stroke={C.white} strokeWidth={3} strokeDasharray="30 24" />
      <line x1={200} y1={430} x2={800} y2={430} stroke={C.dim} strokeWidth={26} strokeOpacity={0.35} />
      <line x1={300} y1={330} x2={300} y2={430} stroke={C.dim} strokeWidth={26} strokeOpacity={0.35} />
      <line x1={760} y1={330} x2={760} y2={430} stroke={C.dim} strokeWidth={26} strokeOpacity={0.35} />
      <line x1={282} y1={346} x2={318} y2={346} stroke={C.amber} strokeWidth={4} />
      <line x1={282} y1={354} x2={318} y2={354} stroke={C.amber} strokeWidth={4} strokeDasharray="6 5" />
      <Plane x={aX} y={aY} rot={aRot} scale={1.5} color={C.cyan} />
      <Plane x={bX} y={bY} rot={bRot} scale={1.5} color={C.amber} />
      <text x={500} y={70} textAnchor="middle" fill={occupied ? C.red : C.green} fontSize={44} fontWeight={900}>
        {occupied ? 'LANDASAN: TERPAKAI' : 'LANDASAN: BEBAS'}
      </text>
      <Note x={80} y={470} w={460} h={70} align="center" size={30} color={C.amber}>
        Titik tunggu: pesawat berikutnya menunggu
      </Note>
    </Stage>
  );
};

/* ───────────── SQUAWK (transponder) ───────────── */
const EMERGENCY = [
  {code: '7500', t: 'Pembajakan', c: C.red},
  {code: '7600', t: 'Radio rusak', c: C.amber},
  {code: '7700', t: 'Darurat umum', c: C.red},
];

export const Squawk: React.FC<VProps> = ({dur, data}) => {
  const f = useCurrentFrame();
  const mode = data?.mode ?? 'normal';

  if (mode === 'emergency') {
    const k = Math.min(2, Math.floor(clamp((f - dur * 0.18) / (dur * 0.72)) * 3));
    const started = f > dur * 0.18;
    const blink = Math.floor(f / 8) % 2 === 0;
    const cur = started ? EMERGENCY[k] : null;
    return (
      <Stage>
        <rect x={290} y={20} width={420} height={130} rx={18} fill="#02080f" stroke={cur ? cur.c : C.green} strokeWidth={5} />
        <text x={500} y={52} textAnchor="middle" fill={C.dim} fontSize={22} fontWeight={700}>
          SQUAWK
        </text>
        <text
          x={500}
          y={125}
          textAnchor="middle"
          fill={cur ? (blink ? cur.c : C.white) : C.green}
          fontSize={84}
          fontWeight={900}
          fontFamily="monospace"
        >
          {cur ? cur.code : '4721'}
        </text>
        {EMERGENCY.map((e, i) => {
          const on = started && i === k;
          return (
            <g key={e.code}>
              <rect
                x={160}
                y={190 + i * 125}
                width={680}
                height={100}
                rx={16}
                fill={on ? 'rgba(255,77,94,0.16)' : C.panel}
                stroke={on ? (blink ? e.c : C.white) : C.dim}
                strokeWidth={on ? 5 : 2}
              />
              <text x={210} y={258 + i * 125} fill={e.c} fontSize={60} fontWeight={900} fontFamily="monospace">
                {e.code}
              </text>
              <text x={450} y={255 + i * 125} fill={C.white} fontSize={46} fontWeight={800}>
                {e.t}
              </text>
            </g>
          );
        })}
      </Stage>
    );
  }

  // normal: label pesawat di layar pengendali
  const rows = ['SKY214', 'FL350  ↗', '450 kt', 'SQUAWK 4721'];
  return (
    <Stage>
      <Plane x={150} y={300} rot={90} scale={2} />
      {[0, 1, 2].map((k) => {
        const ph = ((f + k * 14) % 42) / 42;
        return <circle key={k} cx={190} cy={300} r={20 + ph * 130} fill="none" stroke={C.cyan} strokeWidth={3} strokeOpacity={(1 - ph) * 0.8} />;
      })}
      <rect x={400} y={90} width={570} height={420} rx={22} fill="#02080f" stroke={C.green} strokeWidth={4} />
      <circle cx={450} cy={150} r={9} fill={C.green} />
      <line x1={450} y1={150} x2={520} y2={190} stroke={C.green} strokeWidth={2} />
      {rows.map((r, i) => (
        <Note
          key={i}
          x={500}
          y={150 + i * 80}
          w={450}
          h={70}
          show={reveal(f, 20 + i * (dur * 0.14), 10)}
          size={i === 0 ? 52 : 42}
          color={i === 0 ? C.green : i === 3 ? C.amber : C.white}
        >
          {r}
        </Note>
      ))}
      <Note x={400} y={520} w={570} h={60} align="center" size={28} color={C.dim}>
        Label di layar pengendali
      </Note>
    </Stage>
  );
};

/* ───────────── LIGHT GUN ───────────── */
const SIGNALS = [
  {c: C.green, flash: false, t: 'Hijau tetap', m: 'boleh mendarat'},
  {c: C.red, flash: false, t: 'Merah tetap', m: 'beri jalan, terus berputar'},
  {c: C.red, flash: true, t: 'Merah berkedip', m: 'bandara tidak aman, jangan mendarat'},
  {c: C.green, flash: true, t: 'Hijau berkedip', m: 'kembali, lalu mendarat'},
];

export const LightGun: React.FC<VProps> = ({dur}) => {
  const f = useCurrentFrame();
  const act = Math.min(3, Math.floor(clamp((f - 8) / Math.max(1, dur - 30)) * 4));
  const s = SIGNALS[act];
  const on = !s.flash || Math.floor(f / 7) % 2 === 0;
  const bob = Math.sin(f / 18) * 8;
  return (
    <Stage>
      <rect x={290} y={210} width={22} height={120} fill="#1c4a75" />
      <path d="M262 150 L340 150 L352 210 L250 210 Z" fill="rgba(56,225,255,0.35)" stroke={C.cyan} strokeWidth={3} />
      <polygon points={`345,175 800,${215 + bob} 800,${305 + bob} 345,195`} fill={s.c} opacity={on ? 0.75 : 0.08} />
      <circle cx={345} cy={185} r={13} fill={s.c} opacity={on ? 1 : 0.25} />
      <Plane x={850} y={260 + bob} rot={270} scale={1.5} />
      {SIGNALS.map((g, i) => (
        <g key={i} opacity={i === act ? 1 : 0.35}>
          <circle cx={50} cy={387 + i * 62} r={14} fill={g.c} />
          <Note x={80} y={360 + i * 62} w={900} h={54} size={29} color={i === act ? C.white : C.dim}>
            <span style={{color: g.c, fontWeight: 900}}>{g.t}</span>
            {' — '}
            {g.m}
          </Note>
        </g>
      ))}
    </Stage>
  );
};

/* ───────────── TCAS ───────────── */
export const Tcas: React.FC<VProps> = ({dur}) => {
  const f = useCurrentFrame();
  const p = clamp(f / dur);
  const ap = clamp((p - 0.05) / 0.8);
  const climb = clamp((ap - 0.3) / 0.25);
  const ease = Easing.inOut(Easing.quad)(climb);
  const ax = 70 + 860 * ap;
  const bx = 930 - 860 * ap;
  const ay = 300 - 130 * ease;
  const by = 300 + 130 * ease;
  const blink = Math.floor(f / 8) % 2 === 0;
  const warn = ap > 0.15 && ap < 0.3;
  const ra = ap >= 0.3;
  return (
    <Stage>
      <line x1={40} y1={300} x2={960} y2={300} stroke={C.dim} strokeDasharray="8 12" strokeWidth={2} strokeOpacity={0.6} />
      <Plane x={ax} y={ay} rot={90 - 20 * ease} scale={1.7} color={C.cyan} />
      <Plane x={bx} y={by} rot={270 - 20 * ease} scale={1.7} color={C.amber} />
      {warn && (
        <text x={500} y={70} textAnchor="middle" fill={blink ? C.amber : C.white} fontSize={64} fontWeight={900}>
          TRAFFIC! TRAFFIC!
        </text>
      )}
      {ra && (
        <g>
          <text x={40} y={90} fill={C.green} fontSize={44} fontWeight={900}>
            Pesawat A: CLIMB, CLIMB
          </text>
          <text x={960} y={540} textAnchor="end" fill={C.amber} fontSize={44} fontWeight={900}>
            Pesawat B: DESCEND, DESCEND
          </text>
        </g>
      )}
    </Stage>
  );
};

/* ───────────── FUTURE (ADS-B, satelit, menara digital) ───────────── */
const Sat: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g>
    <rect x={x - 14} y={y - 9} width={28} height={18} fill={C.white} />
    <rect x={x - 52} y={y - 6} width={32} height={12} fill={C.cyan} />
    <rect x={x + 20} y={y - 6} width={32} height={12} fill={C.cyan} />
  </g>
);

export const Future: React.FC<VProps> = ({dur}) => {
  const f = useCurrentFrame();
  const p = clamp(f / dur);
  const s1 = p < 0.5 ? 1 : clamp(1 - (p - 0.5) / 0.06);
  const s2 = clamp((p - 0.52) / 0.06);
  const px = 150 + 700 * clamp(f / (dur * 0.5));
  const sats = [
    [200, 110],
    [500, 60],
    [800, 110],
  ];
  const near = sats.reduce((a, b) => (Math.abs(b[0] - px) < Math.abs(a[0] - px) ? b : a));
  const ph = (f % 36) / 36;
  return (
    <Stage>
      <g opacity={s1}>
        <circle cx={500} cy={1020} r={520} fill="none" stroke={C.cyan} strokeWidth={3} />
        {sats.map((s, i) => (
          <Sat key={i} x={s[0]} y={s[1]} />
        ))}
        <line
          x1={px}
          y1={400}
          x2={near[0]}
          y2={near[1] + 14}
          stroke={C.amber}
          strokeWidth={3}
          strokeDasharray="10 8"
          strokeDashoffset={-f * 3}
        />
        <circle cx={px} cy={400} r={ph * 70} fill="none" stroke={C.green} strokeWidth={3} strokeOpacity={1 - ph} />
        <Plane x={px} y={400} rot={90} scale={1.5} />
        <Note x={60} y={525} w={880} h={60} align="center" size={30} color={C.white}>
          ADS-B: pesawat menyiarkan posisi GPS-nya, satelit menangkapnya
        </Note>
      </g>
      <g opacity={s2}>
        <rect x={230} y={30} width={540} height={330} rx={22} fill="#02080f" stroke={C.cyan} strokeWidth={5} />
        <line x1={260} y1={250} x2={740} y2={250} stroke={C.dim} strokeWidth={14} />
        <rect x={470} y={170} width={14} height={80} fill="#1c4a75" />
        <path d="M450 140 L504 140 L512 170 L442 170 Z" fill="rgba(56,225,255,0.4)" stroke={C.cyan} strokeWidth={2} />
        <Plane x={300 + ((f * 2) % 400)} y={215} rot={90} scale={0.9} />
        <rect x={560} y={95} width={150} height={44} rx={6} fill="none" stroke={C.green} strokeWidth={2} />
        <text x={568} y={125} fill={C.green} fontSize={22} fontFamily="monospace" fontWeight={700}>
          SKY214
        </text>
        <Note x={100} y={390} w={800} h={170} show={s2} align="center" size={32} color={C.white}>
          Menara digital: kamera 360° dan layar, pengendali bisa berada jauh dari bandara
        </Note>
      </g>
    </Stage>
  );
};

/* ───────────── HOLDING (pola tunggu) ───────────── */
const HL = 420;
const HR = 130;
const HPER = 2 * HL + 2 * Math.PI * HR;

const holdPos = (s0: number) => {
  const s = ((s0 % HPER) + HPER) % HPER;
  const arc = Math.PI * HR;
  const cxR = 500 + HL / 2;
  const cxL = 500 - HL / 2;
  if (s < HL) return {x: cxL + s, y: 300 - HR, rot: 90};
  if (s < HL + arc) {
    const phi = (s - HL) / HR;
    return {x: cxR + HR * Math.sin(phi), y: 300 - HR * Math.cos(phi), rot: 90 + (phi * 180) / Math.PI};
  }
  if (s < 2 * HL + arc) return {x: cxR - (s - HL - arc), y: 300 + HR, rot: 270};
  const phi = (s - 2 * HL - arc) / HR;
  return {x: cxL - HR * Math.sin(phi), y: 300 + HR * Math.cos(phi), rot: 270 + (phi * 180) / Math.PI};
};

export const Holding: React.FC<VProps> = ({dur}) => {
  const f = useCurrentFrame();
  const cols = [C.white, C.amber, C.cyan];
  const alts = ['FL100', 'FL110', 'FL120'];
  const d = `M ${500 - HL / 2} ${300 - HR} L ${500 + HL / 2} ${300 - HR} A ${HR} ${HR} 0 0 1 ${500 + HL / 2} ${300 + HR} L ${500 - HL / 2} ${300 + HR} A ${HR} ${HR} 0 0 1 ${500 - HL / 2} ${300 - HR} Z`;
  return (
    <Stage>
      <path d={d} fill="none" stroke={C.dim} strokeWidth={3} strokeDasharray="10 10" strokeOpacity={0.7} />
      <circle cx={500} cy={300} r={10} fill={C.red} />
      {cols.map((col, k) => {
        const p = holdPos(f * 4 + (k * HPER) / 3);
        return (
          <g key={k}>
            <Plane x={p.x} y={p.y} rot={p.rot} scale={1.4} color={col} />
            <text x={p.x + 34} y={p.y - 22} fill={col} fontSize={24} fontWeight={800} fontFamily="monospace">
              {alts[k]}
            </text>
          </g>
        );
      })}
      <Note x={60} y={500} w={880} h={90} show={reveal(f, dur * 0.25, 15)} align="center" size={32} color={C.cyan}>
        Pola tunggu (holding): berputar sambil menunggu giliran mendarat
      </Note>
    </Stage>
  );
};
