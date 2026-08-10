/**
 * The hero field.
 *
 * Signals arrive, converge into one bright concentration, and leave again as
 * several possible outputs. That is the page's argument drawn once, with no
 * labels: the moment of decision is the only bright thing in the picture.
 *
 * Deliberately NOT a system architecture diagram – no named nodes, no boxes,
 * no neural-network lattice. It is atmosphere with a thesis.
 *
 * Geometry is generated once at module scope from a seeded PRNG, never from
 * Math.random(), so the server and the client emit byte-identical markup and
 * hydration cannot mismatch. Everything is plain SVG: no canvas, no runtime
 * loop, nothing to schedule on the main thread after paint.
 */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Wide and flat. The field is a horizon, not a portrait.
const W = 1000;
const H = 430;
const FX = 486;
const FY = 215;

/** Two decimals is well below a pixel at any render size, and halves the markup. */
const r2 = (n: number) => Math.round(n * 100) / 100;

const rnd = mulberry32(20260809);

type Pt = [number, number];

/** Cubic Bezier evaluation – used to hang particles on the trajectories. */
function onCurve(p0: Pt, c1: Pt, c2: Pt, p1: Pt, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [
    a * p0[0] + b * c1[0] + c * c2[0] + d * p1[0],
    a * p0[1] + b * c1[1] + c * c2[1] + d * p1[1],
  ];
}

type Filament = { d: string; o: number; w: number; delay: number };
type Dot = { x: number; y: number; r: number; o: number; delay: number; dur: number };

const FILAMENTS: Filament[] = [];
const STREAM: Dot[] = [];

/**
 * One side of the field. Filaments all begin at the focus and travel outward,
 * which is what makes them converge visually: the density is highest where
 * they share an origin. Particles are then hung along each curve, so the
 * trajectories read as moving signal rather than as drawn lines.
 */
function fan(dir: 1 | -1, count: number) {
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count - 0.5; // -0.5 .. 0.5 across the fan
    const spread = t * (330 + rnd() * 150);
    const p0: Pt = [FX, FY];
    const c1: Pt = [FX + dir * (100 + rnd() * 110), FY + spread * (0.05 + rnd() * 0.12)];
    const c2: Pt = [FX + dir * (300 + rnd() * 150), FY + spread * (0.6 + rnd() * 0.4)];
    const p1: Pt = [
      FX + dir * (470 + rnd() * 90),
      FY + spread + (rnd() - 0.5) * 40,
    ];

    FILAMENTS.push({
      d: `M${FX} ${FY}C${r2(c1[0])} ${r2(c1[1])} ${r2(c2[0])} ${r2(c2[1])} ${r2(p1[0])} ${r2(p1[1])}`,
      o: r2(0.16 + rnd() * 0.5),
      w: r2(0.5 + rnd() * 1.05),
      delay: Math.round(rnd() * 620),
    });

    // Two or three particles per filament, biased outward so they don't pile
    // up at the shared origin.
    const n = 2 + Math.floor(rnd() * 2);
    for (let k = 0; k < n; k++) {
      const tt = 0.24 + Math.pow(rnd(), 0.75) * 0.74;
      const [x, y] = onCurve(p0, c1, c2, p1, tt);
      STREAM.push({
        x: r2(x),
        y: r2(y),
        r: r2(0.7 + Math.pow(rnd(), 2) * 2.4),
        o: r2(0.25 + rnd() * 0.6),
        delay: Math.round(rnd() * 4200),
        dur: Math.round(3600 + rnd() * 3600),
      });
    }
  }
}

// Slightly more filaments leaving than arriving: many signals in, more
// possible actions out.
fan(-1, 34);
fan(1, 40);

/** A loose haze around the trajectories, so the field has no hard edge. */
const HAZE: Dot[] = Array.from({ length: 70 }, () => {
  const angle = rnd() * Math.PI * 2;
  const radius = Math.pow(rnd(), 0.55) * 520;
  return {
    x: r2(FX + Math.cos(angle) * radius),
    y: r2(FY + Math.sin(angle) * radius * 0.42),
    r: r2(0.55 + Math.pow(rnd(), 2.4) * 2),
    o: r2(0.14 + rnd() * 0.4),
    delay: Math.round(rnd() * 4600),
    dur: Math.round(4200 + rnd() * 3600),
  };
});

/** A handful of open rings at the edges, where the field thins out. */
const RINGS = Array.from({ length: 8 }, (_, i) => {
  const side = i % 2 === 0 ? 1 : -1;
  return {
    x: r2(FX + side * (330 + rnd() * 170)),
    y: r2(FY + (rnd() - 0.5) * 330),
    r: r2(2.6 + rnd() * 4),
    o: r2(0.24 + rnd() * 0.32),
  };
});

export function HeroField() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="An abstract field of blue signals converging into a single bright concentration and branching outward again."
      focusable="false"
    >
      <defs>
        {/* The field fades out toward the frame rather than being cropped by
            it, so it reads as a window onto something larger. */}
        <radialGradient id="hf-fade" cx="49%" cy="50%" r="58%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="72%" stopColor="#fff" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hf-mask">
          <rect width={W} height={H} fill="url(#hf-fade)" />
        </mask>

        <radialGradient id="hf-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2f9ff" stopOpacity="0.95" />
          <stop offset="30%" stopColor="#8fd0ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="hf-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.17" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g mask="url(#hf-mask)">
        {/* Very soft ground light. Establishes depth before anything is drawn. */}
        <ellipse cx={FX} cy={FY} rx={470} ry={175} fill="url(#hf-halo)" />

        <g fill="none" stroke="var(--accent-2)" strokeLinecap="round">
          {FILAMENTS.map((f, i) => (
            <path
              key={i}
              d={f.d}
              strokeWidth={f.w}
              opacity={f.o}
              pathLength={1}
              className="filament"
              style={{ animationDelay: `${f.delay}ms` }}
            />
          ))}
        </g>

        <g fill="var(--accent-2)">
          {HAZE.concat(STREAM).map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.r}
              className="spark"
              style={{
                // The keyframes read the resting opacity from this variable so
                // each particle breathes around its own level, not a shared one.
                ["--o" as string]: d.o,
                opacity: d.o,
                animationDelay: `${d.delay}ms`,
                animationDuration: `${d.dur}ms`,
              }}
            />
          ))}
        </g>

        <g fill="none" stroke="var(--accent-2)" strokeWidth={0.9}>
          {RINGS.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r={c.r} opacity={c.o} />
          ))}
        </g>

        {/* The concentration. The single brightest point on the page. */}
        <ellipse cx={FX} cy={FY} rx={132} ry={72} fill="url(#hf-core)" opacity={0.85} />
        <ellipse cx={FX} cy={FY} rx={34} ry={22} fill="url(#hf-core)" />
        <circle cx={FX} cy={FY} r={2.2} fill="#f4faff" opacity={0.95} />
      </g>
    </svg>
  );
}
