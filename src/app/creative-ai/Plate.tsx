import type { Work } from "@/content/creative";
import { cn } from "@/lib/cn";

/**
 * Gallery plates.
 *
 * The artworks below are generated stand-ins for pieces that aren't published
 * yet. They are drawn rather than decorated: each variant is a different
 * geometric idea (a frequency field, an offset bloom, a stratigraphy, an
 * interference lattice, an orbit set, a grain field), so the gallery never
 * reads as one texture repeated six times.
 *
 * Two constraints hold the whole file together:
 *
 *  1. Nothing is random. Every position comes from a closed-form function of
 *     its index, so a rebuild produces byte-identical markup.
 *  2. A plate carries at most one accent stroke. The accent is metadata on
 *     this site, and an artwork that leans on it becomes a poster.
 *
 * Passing `image` swaps in a real asset at exactly the same aspect ratio, so
 * replacing a placeholder changes zero layout. Plain <img> on purpose: the
 * route is a static export, where next/image's optimizer endpoint 404s.
 */

type Span = Work["span"];
type Visual = Work["visual"];

const FAINT = "var(--line-hair)";
const RULE = "var(--line-strong)";
const QUIET = "var(--text-quiet)";
const ACCENT = "var(--accent)";

/** Drawing surface per span. The viewBox *is* the aspect ratio. */
const FRAME: Record<Span, { w: number; h: number }> = {
  wide: { w: 1600, h: 900 },
  square: { w: 1200, h: 1200 },
  tall: { w: 900, h: 1200 },
};

/** Mono terminus for the plate rule — a real measurement of the plate. */
export const plateFormat: Record<Span, string> = {
  wide: "16 : 9",
  square: "1 : 1",
  tall: "3 : 4",
};

/**
 * Deterministic hash in [0,1). Stands in for noise without ever being random:
 * same index in, same value out, on every machine and every build.
 */
function hash(i: number, seed = 1): number {
  const s = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

type PlateProps = {
  visual: Visual;
  span: Span;
  /** Real asset under /public. Overrides the generated artwork. */
  image?: string;
  /** Used as alt text when a real asset is present. */
  title: string;
  className?: string;
};

export function Plate({ visual, span, image, title, className }: PlateProps) {
  const { w, h } = FRAME[span];

  return (
    <div
      className={cn("w-full border border-hair bg-sunken", className)}
      style={{ aspectRatio: `${w} / ${h}` }}
      data-slot="plate"
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={title}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <svg
          viewBox={`0 0 ${w} ${h}`}
          /* Hairlines stay hairlines at every plate size. `vector-effect` is
             NOT an inherited property, so it has to be set on the drawn
             elements themselves rather than once on the parent group. */
          className="h-full w-full [&_*]:[vector-effect:non-scaling-stroke]"
          aria-hidden="true"
          focusable="false"
        >
          <g fill="none" strokeWidth={1}>
            {artwork[visual](w, h)}
          </g>
        </svg>
      )}
    </div>
  );
}

/* ==========================================================================
   THE ARTWORKS
   ========================================================================== */

const artwork: Record<Visual, (w: number, h: number) => React.ReactNode> = {
  /** A frequency field: sound rendered as a bank of vertical strokes. */
  spectrum: (w, h) => {
    const px = w * 0.05;
    const py = h * 0.14;
    const n = 84;
    const step = (w - px * 2) / (n - 1);
    const mid = h * 0.53;

    const bars = Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      const envelope = Math.pow(Math.sin(Math.PI * t), 0.55);
      const amp =
        0.30 * Math.abs(Math.sin(i * 0.21)) +
        0.42 * Math.abs(Math.sin(i * 0.062 + 0.9)) +
        0.28 * hash(i, 3);
      return {
        x: px + i * step,
        len: (h - py * 2) * envelope * (0.08 + 0.92 * Math.min(amp, 1)),
      };
    });

    const max = bars.reduce((m, b) => Math.max(m, b.len), 1);
    const peak = bars.reduce((best, b, i) => (b.len > bars[best].len ? i : best), 0);

    return (
      <>
        <line x1={px} y1={mid} x2={w - px} y2={mid} stroke={FAINT} />
        {bars.map((b, i) => {
          const r = b.len / max;
          return (
            <line
              key={i}
              x1={b.x}
              y1={mid - b.len / 2}
              x2={b.x}
              y2={mid + b.len / 2}
              stroke={i === peak ? ACCENT : r > 0.52 ? QUIET : r > 0.24 ? RULE : FAINT}
              strokeWidth={i === peak ? 2 : 1}
            />
          );
        })}
      </>
    );
  },

  /** Concentric arcs whose centres drift — a bloom, not a bullseye. */
  bloom: (w, h) => {
    const cx = w * 0.5;
    const cy = h * 0.5;
    const rMax = Math.min(w, h) * 0.46;
    const rings = 30;

    const ring = (i: number) => {
      const t = (i + 1) / rings;
      const r = rMax * Math.pow(t, 1.18);
      return {
        r,
        cx: cx + Math.cos(t * 4.6 + 0.4) * rMax * 0.22 * t,
        cy: cy + Math.sin(t * 3.3 + 1.1) * rMax * 0.16 * t,
      };
    };

    const accentAt = 21;
    const a = ring(accentAt);
    const a0 = -2.25;
    const a1 = -0.15;
    const arc = `M ${(a.cx + a.r * Math.cos(a0)).toFixed(2)} ${(a.cy + a.r * Math.sin(a0)).toFixed(2)} A ${a.r.toFixed(2)} ${a.r.toFixed(2)} 0 0 1 ${(a.cx + a.r * Math.cos(a1)).toFixed(2)} ${(a.cy + a.r * Math.sin(a1)).toFixed(2)}`;

    return (
      <>
        {Array.from({ length: rings }, (_, i) => {
          const c = ring(i);
          return (
            <circle
              key={i}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              stroke={i % 5 === 2 ? QUIET : i % 2 === 0 ? RULE : FAINT}
              opacity={i % 5 === 2 ? 0.75 : 1}
            />
          );
        })}
        <path d={arc} stroke={ACCENT} />
      </>
    );
  },

  /** Layered horizontal bands — sediment, read bottom to top. */
  strata: (w, h) => {
    const px = w * 0.07;
    const py = h * 0.1;
    const bands = 18;
    const cols = 60;
    const accentAt = 11;

    return (
      <>
        {Array.from({ length: bands }, (_, i) => {
          const base = py + (i * (h - py * 2)) / (bands - 1);
          const amp =
            h * 0.022 * (0.4 + Math.abs(Math.sin(i * 0.55))) * (1 + 0.6 * hash(i, 7));
          const pts = Array.from({ length: cols + 1 }, (_, j) => {
            const x = px + (j * (w - px * 2)) / cols;
            const y =
              base +
              amp * Math.sin(j * 0.22 + i * 0.7) +
              amp * 0.45 * Math.sin(j * 0.07 - i * 0.3);
            return `${x.toFixed(1)},${y.toFixed(1)}`;
          }).join(" ");

          return (
            <polyline
              key={i}
              points={pts}
              stroke={
                i === accentAt ? ACCENT : i % 3 === 0 ? QUIET : i % 2 === 0 ? RULE : FAINT
              }
              opacity={i % 3 === 0 && i !== accentAt ? 0.7 : 1}
            />
          );
        })}
        {Array.from({ length: bands }, (_, i) => {
          const y = py + (i * (h - py * 2)) / (bands - 1);
          return (
            <line
              key={i}
              x1={w * 0.025}
              y1={y}
              x2={w * 0.048}
              y2={y}
              stroke={i % 5 === 0 ? RULE : FAINT}
            />
          );
        })}
      </>
    );
  },

  /**
   * Two rakes of near-parallel lines at opposite leans and slightly different
   * pitches. Neither family is interesting alone; the beat between them is the
   * image. Interference, drawn rather than described.
   */
  weave: (w, h) => {
    const px = w * 0.05;
    const py = h * 0.06;
    const span = w - px * 2;
    const lean = w * 0.11;
    const a = 46;
    const b = 53;
    const accentAt = 31;

    /** Envelope so the field breathes instead of tiling to the edges. */
    const veil = (t: number) => 0.3 + 0.7 * Math.abs(Math.sin(t * Math.PI * 1.4 + 0.4));

    return (
      <>
        {Array.from({ length: a }, (_, j) => {
          const t = j / (a - 1);
          const x = px + t * span;
          return (
            <line
              key={`a${j}`}
              x1={x - lean / 2}
              y1={py}
              x2={x + lean / 2}
              y2={h - py}
              stroke={j === accentAt ? ACCENT : j % 6 === 0 ? QUIET : RULE}
              opacity={j === accentAt ? 1 : veil(t)}
            />
          );
        })}
        {Array.from({ length: b }, (_, j) => {
          const t = j / (b - 1);
          const x = px + t * span;
          return (
            <line
              key={`b${j}`}
              x1={x + lean / 2}
              y1={py}
              x2={x - lean / 2}
              y2={h - py}
              stroke={j % 6 === 3 ? RULE : FAINT}
              opacity={veil(1 - t)}
            />
          );
        })}
        <line x1={px} y1={h * 0.5} x2={w - px} y2={h * 0.5} stroke={FAINT} />
      </>
    );
  },

  /** Nested ellipses, each rotated a fixed step past the last. */
  orbit: (w, h) => {
    const cx = w * 0.5;
    const cy = h * 0.5;
    const R = Math.min(w, h) * 0.45;
    const n = 16;
    const accentAt = 11;

    return (
      <>
        <line x1={w * 0.06} y1={cy} x2={w - w * 0.06} y2={cy} stroke={FAINT} />
        <line x1={cx} y1={h * 0.06} x2={cx} y2={h - h * 0.06} stroke={FAINT} />
        {Array.from({ length: n }, (_, i) => {
          const t = (i + 1) / n;
          const rx = R * t;
          const ry = R * t * (0.3 + 0.42 * Math.abs(Math.sin(i * 0.62 + 0.3)));
          return (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              transform={`rotate(${(i * 11.5).toFixed(1)} ${cx} ${cy})`}
              stroke={i === accentAt ? ACCENT : i % 4 === 0 ? QUIET : RULE}
              opacity={i % 4 === 0 && i !== accentAt ? 0.7 : 1}
            />
          );
        })}
      </>
    );
  },

  /** A grain field: density falls off from a focus, jitter is hashed. */
  grain: (w, h) => {
    const px = w * 0.05;
    const py = h * 0.05;
    const cols = 28;
    const cellW = (w - px * 2) / cols;
    const rows = Math.max(6, Math.round((h - py * 2) / cellW));
    const cellH = (h - py * 2) / rows;
    const fx = px + (w - px * 2) * 0.42;
    const fy = py + (h - py * 2) * 0.44;
    const reach = Math.hypot(w, h) * 0.42;
    const mark = Math.min(w, h) * 0.008;

    const dots: React.ReactNode[] = [];
    for (let gy = 0; gy < rows; gy += 1) {
      for (let gx = 0; gx < cols; gx += 1) {
        const i = gy * cols + gx;
        const x = px + (gx + 0.5) * cellW + (hash(i, 1) - 0.5) * cellW * 0.9;
        const y = py + (gy + 0.5) * cellH + (hash(i, 2) - 0.5) * cellH * 0.9;
        const d = Math.min(1, Math.hypot(x - fx, y - fy) / reach);
        const density = 1 - d;
        if (hash(i, 5) > 0.22 + 0.78 * Math.pow(density, 1.4)) continue;
        dots.push(
          <circle
            key={i}
            cx={x.toFixed(1)}
            cy={y.toFixed(1)}
            r={(cellW * (0.05 + 0.15 * density) * (0.6 + hash(i, 9))).toFixed(2)}
            fill={density > 0.7 ? QUIET : density > 0.4 ? RULE : FAINT}
            stroke="none"
          />,
        );
      }
    }

    return (
      <>
        {dots}
        <rect
          x={fx - mark / 2}
          y={fy - mark / 2}
          width={mark}
          height={mark}
          stroke={ACCENT}
        />
      </>
    );
  },
};
