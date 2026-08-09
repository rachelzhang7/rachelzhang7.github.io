import Link from "next/link";
import { territories } from "@/content/territories";

/**
 * The hero's visual signature: one thin line rising across the field, marked
 * at three points.
 *
 * It is a trajectory, not a readout. The line ascends left to right through
 * Depth, Building and Taste, and the three marks are real links into those
 * territories – so the drawing carries the site's argument rather than
 * decorating it.
 *
 * Everything that made this read as instrumentation is deliberately gone: no
 * graticule, no channel numbers, no sweep label, no invented metrics. A grid
 * of measurement lines behind a meaningless waveform is technological costume,
 * and this audience looks at real dashboards for a living.
 *
 * The path is computed at build time and serialises into the HTML as a static
 * `d` string – no runtime maths, no canvas, no layout shift, and byte-identical
 * across builds.
 */

const W = 1000;
const H = 200;

/**
 * Two cubic segments forming one long eased arc: nearly flat on the left, then
 * accelerating upward and easing again at the top.
 *
 * A deliberately drawn curve rather than a plotted one. Evenly-spaced rising
 * points produce a straight diagonal, which reads as a chart axis – the shape
 * has to carry the energy itself.
 */
const SEGMENTS: Array<[number, number][]> = [
  [
    [0, 178],
    [230, 176],
    [400, 150],
    [520, 112],
  ],
  [
    [520, 112],
    [640, 74],
    [790, 40],
    [W, 22],
  ],
];

const tracePath = `M${SEGMENTS[0][0][0]},${SEGMENTS[0][0][1]} ${SEGMENTS.map(
  (s) => `C${s[1][0]},${s[1][1]} ${s[2][0]},${s[2][1]} ${s[3][0]},${s[3][1]}`,
).join(" ")}`;

/** Point on a cubic bezier at parameter t. */
function cubicAt(seg: [number, number][], t: number): [number, number] {
  const u = 1 - t;
  const [a, b, c, d] = seg;
  return [
    u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
    u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
  ];
}

/**
 * Sample the curve so a mark can be placed at an exact x. The marks sit at the
 * centres of the three label columns below, which is what lets the drop-lines
 * go: alignment alone makes it obvious which point belongs to which pillar.
 */
const samples: Array<[number, number]> = [];
for (const seg of SEGMENTS) {
  for (let i = 0; i <= 240; i++) samples.push(cubicAt(seg, i / 240));
}

function yAt(x: number): number {
  let best = samples[0];
  for (const s of samples) {
    if (Math.abs(s[0] - x) < Math.abs(best[0] - x)) best = s;
  }
  return best[1];
}

const marks = territories.map((territory, i) => {
  const x = (W / 6) * (2 * i + 1); // centres of the three columns below
  return { territory, x, y: yAt(x) };
});

export function HeroTrace() {
  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full overflow-visible"
        style={{ aspectRatio: `${W} / ${H}` }}
        role="img"
        aria-label="A rising line marked at three points, one for each of the three pillars."
      >
        <defs>
          <filter id="trace-glow" x="-10%" y="-80%" width="120%" height="260%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* Violet bloom beneath the line. This is the only glow in the hero,
            and it exists to give the ground depth, not to be seen directly. */}
        <path
          d={tracePath}
          pathLength={1}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={3}
          opacity={0.45}
          filter="url(#trace-glow)"
          className="trace-draw"
        />

        {/* The line itself. */}
        <path
          d={tracePath}
          pathLength={1}
          fill="none"
          stroke="var(--text-primary)"
          strokeWidth={1.25}
          strokeLinecap="round"
          opacity={0.82}
          className="trace-draw"
        />

        {/* Three marks sitting on the line. No drop-lines: vertical rules down
            to a baseline are what made this read as a bar chart. Alignment
            with the labels below does that job silently. */}
        {marks.map(({ territory, x, y }, i) => (
          <circle
            key={territory.key}
            cx={x}
            cy={y}
            r={3.5}
            fill="var(--bg-base)"
            stroke="var(--line-hover)"
            strokeWidth={1.25}
            className="marker"
            style={{ animationDelay: `${820 + i * 90}ms` }}
          />
        ))}
      </svg>

      {/* The three marks as real links, aligned under their points. */}
      <ul className="grid grid-cols-3 border-t border-hair">
        {territories.map((t) => (
          <li key={t.key}>
            <Link
              href={t.href}
              className="group flex h-full flex-col gap-1.5 py-5 text-center"
            >
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-quiet transition-colors duration-200 group-hover:text-accent-2 group-focus-visible:text-accent-2">
                {t.index}
              </span>
              <span className="text-sm text-tertiary transition-colors duration-200 group-hover:text-primary group-focus-visible:text-primary">
                {t.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
