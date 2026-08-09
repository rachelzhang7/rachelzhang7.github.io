/**
 * The hero's visual signature.
 *
 * A single drawn line rising through three marked points, set in a tall field
 * with one soft violet wash behind it. It sits opposite the headline as the
 * visual counterweight to the type, and its job is atmosphere and gesture, not
 * information.
 *
 * Deliberately unlabelled, and deliberately not navigation: the three pillars
 * are named in full immediately below, so repeating them here would put a
 * second taxonomy in competition with the first. It is `aria-hidden` for the
 * same reason – there is nothing here a screen reader needs that the pillar
 * list does not already say better.
 *
 * Everything that made this read as instrumentation is gone: no graticule, no
 * channel numbers, no sweep label, no drop-lines to a baseline, no invented
 * metrics. The path is computed at build time and serialises as a static `d`
 * string, so there is no runtime maths and no layout shift.
 */

const W = 600;
const H = 720;

/**
 * Two cubic segments. The line enters low and left, holds, then accelerates up
 * and away – a gesture rather than a plot. Portrait, so it reads as a field
 * with something moving through it rather than a chart drawn under the copy.
 */
const SEGMENTS: Array<[number, number][]> = [
  [
    [96, 676],
    [104, 548],
    [214, 528],
    [304, 436],
  ],
  [
    [304, 436],
    [402, 336],
    [386, 206],
    [498, 64],
  ],
];

const tracePath = `M${SEGMENTS[0][0][0]},${SEGMENTS[0][0][1]} ${SEGMENTS.map(
  (s) => `C${s[1][0]},${s[1][1]} ${s[2][0]},${s[2][1]} ${s[3][0]},${s[3][1]}`,
).join(" ")}`;

function cubicAt(seg: [number, number][], t: number): [number, number] {
  const u = 1 - t;
  const [a, b, c, d] = seg;
  return [
    u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
    u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
  ];
}

/** Even spacing along the drawn length, not along x, so the marks look placed. */
const marks = (() => {
  const pts: Array<[number, number]> = [];
  const lens: number[] = [0];
  for (const seg of SEGMENTS) {
    for (let i = 0; i <= 300; i++) {
      const p = cubicAt(seg, i / 300);
      if (pts.length) {
        const prev = pts[pts.length - 1];
        lens.push(lens[lens.length - 1] + Math.hypot(p[0] - prev[0], p[1] - prev[1]));
      }
      pts.push(p);
    }
  }
  const total = lens[lens.length - 1];
  return [0.24, 0.54, 0.83].map((f) => {
    const target = total * f;
    let i = 0;
    while (i < lens.length - 1 && lens[i] < target) i++;
    return pts[i];
  });
})();

export function HeroTrace() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="trace-bloom" x="-40%" y="-20%" width="180%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <radialGradient id="trace-field" cx="46%" cy="46%" r="54%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* The field. This is the atmosphere: it should register as depth in the
          ground rather than as a shape you could point at. */}
      <ellipse cx={300} cy={370} rx={300} ry={330} fill="url(#trace-field)" />

      {/* Violet bloom under the line. */}
      <path
        d={tracePath}
        pathLength={1}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={3.5}
        opacity={0.6}
        filter="url(#trace-bloom)"
        className="trace-draw"
      />

      {/* The line. */}
      <path
        d={tracePath}
        pathLength={1}
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth={1.75}
        strokeLinecap="round"
        opacity={0.9}
        className="trace-draw"
      />

      {/* Three points, unlabelled. They mark the pillars without naming them. */}
      {marks.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={4}
          fill="var(--bg-base)"
          stroke="var(--text-tertiary)"
          strokeWidth={1.5}
          className="marker"
          style={{ animationDelay: `${880 + i * 100}ms` }}
        />
      ))}
    </svg>
  );
}
