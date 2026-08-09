import Link from "next/link";
import { territories } from "@/content/territories";

/**
 * The homepage hero: a single trace on a graticule.
 *
 * The concept the client's mockup carried – many signals converging into
 * understanding, then into expression – rebuilt as an instrument readout
 * rather than the AI-generated particle-network image, which is both
 * unusable and the single most tired visual in this genre.
 *
 * Three things keep this from being ornament:
 *  1. The four markers ARE the navigation to the four territories. If they
 *     were decorative dots on a pretty wave, a sophisticated visitor would
 *     clock it as styling pretending to be information.
 *  2. The path is deterministic and computed at build time, so it serialises
 *     into the HTML as a static `d` string. No runtime maths, no canvas, no
 *     requestAnimationFrame, no layout shift.
 *  3. It sweeps once on load and then stops. No idle shimmer – that restraint
 *     is most of what separates this from a crypto dashboard.
 *
 * All type lives in HTML rather than inside the SVG. Text set in viewBox units
 * scales with the drawing, so at 375px the labels rendered around 4px and were
 * illegible. As HTML they stay real text: legible, selectable, and reachable by
 * a screen reader and the keyboard.
 */

const W = 1000;
const H = 300;
const MID = H / 2;

/**
 * Deterministic waveform. Four sine components – no Math.random, so every build
 * produces a byte-identical path and the diff stays clean.
 */
function traceY(x: number): number {
  const t = x / W;
  return (
    MID -
    46 * Math.sin(t * Math.PI * 2.1) -
    21 * Math.sin(t * Math.PI * 6.3 + 0.9) -
    9 * Math.sin(t * Math.PI * 13.7 + 2.2) -
    3 * Math.sin(t * Math.PI * 31.1 + 1.1)
  );
}

const tracePath = (() => {
  const points: string[] = [];
  for (let x = 0; x <= W; x += 4) {
    points.push(`${x},${traceY(x).toFixed(2)}`);
  }
  return `M${points.join(" L")}`;
})();

/**
 * Markers sit at the centre of each quarter, which is exactly where the four
 * columns of the label grid below centre – so the drawing and the type line up
 * without any absolute positioning.
 */
const markers = territories.map((territory, i) => {
  const x = (W / 8) * (2 * i + 1);
  return { territory, x, y: traceY(x) };
});

export function HeroTrace() {
  return (
    <div>
      {/* Corner readouts, in the positions scope UI puts them. */}
      <div className="flex items-baseline justify-between">
        {/* Derived, not hard-coded: this is a readout, and a readout that
            disagrees with what is on screen is worse than no readout. */}
        <span className="label">
          CH.01–{String(territories.length).padStart(2, "0")}
        </span>
        <span className="label">Sweep: auto</span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 block w-full"
        style={{ aspectRatio: `${W} / ${H}` }}
        role="img"
        aria-label="A single waveform crossing four marked points, one for each area of work."
      >
        <defs>
          <filter id="hero-bloom" x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* Graticule: 12 × 6 divisions, the convention of a scope screen.
            Static and server-rendered, so the hero is legible before any
            JavaScript runs. */}
        <g shapeRendering="crispEdges">
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={((i + 1) * W) / 12}
              y1={0}
              x2={((i + 1) * W) / 12}
              y2={H}
              stroke="var(--line-hair)"
              opacity={0.55}
            />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={((i + 1) * H) / 6}
              x2={W}
              y2={((i + 1) * H) / 6}
              stroke="var(--line-hair)"
              opacity={0.55}
            />
          ))}
          <line x1={0} y1={MID} x2={W} y2={MID} stroke="var(--line-strong)" />
        </g>

        {/* Phosphor bloom – applied once, never animated. */}
        <path
          d={tracePath}
          pathLength={1}
          fill="none"
          stroke="var(--acc-identity)"
          strokeWidth={2}
          opacity={0.22}
          filter="url(#hero-bloom)"
          className="trace-draw"
        />

        {/* The trace itself. */}
        <path
          d={tracePath}
          pathLength={1}
          fill="none"
          stroke="var(--text-primary)"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.72}
          className="trace-draw"
        />

        {/* Markers and their leader lines down to the labels. */}
        {markers.map(({ territory, x, y }, i) => (
          <g key={territory.key} data-territory={territory.key}>
            <line
              x1={x}
              y1={y + 9}
              x2={x}
              y2={H}
              stroke="var(--line-hair)"
            />
            {/* Neutral at rest. Rendering all four territory accents at once
                turns this into a colour-coded navigation menu – the exact
                "beautiful navigation dashboard" this site is trying not to be.
                The accent appears on interaction instead, so a visitor still
                learns the colour system, one territory at a time. */}
            <rect
              x={x - 3}
              y={y - 3}
              width={6}
              height={6}
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth={1.5}
              className="marker"
              style={{ animationDelay: `${900 + i * 70}ms` }}
            />
          </g>
        ))}
      </svg>

      {/* The four markers as real links. On phones they fall to two columns and
          stop tracking the marker positions, which is the honest trade – the
          labels stay legible instead of staying aligned. */}
      <ul className="grid grid-cols-2 border-t border-hair sm:grid-cols-4">
        {territories.map((t) => (
          <li key={t.key}>
            <Link
              href={t.href}
              data-territory={t.key}
              className="group flex h-full flex-col gap-1 px-1 py-4 text-center transition-colors sm:items-center"
            >
              <span className="label transition-colors group-hover:text-accent group-focus-visible:text-accent">
                {t.index}
              </span>
              <span className="text-sm text-tertiary transition-colors group-hover:text-primary group-focus-visible:text-primary">
                {t.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
