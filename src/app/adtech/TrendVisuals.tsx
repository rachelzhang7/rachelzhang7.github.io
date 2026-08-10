/**
 * Industry Trends visuals.
 *
 * Deliberately lighter than the Selected Work chapters: Selected Work is
 * evidence and gets rendered detail, Trends is perspective and gets diagram.
 *
 * Where a label carries meaning it is real HTML text, not SVG text – SVG text
 * does not reflow, and at a third of the content width it lands around 7px.
 * The SVG here draws only geometry.
 */

/* ── 01 · creative enters the optimization space ───────────────────────── */

/** Nine pastel variants. Fixed palette, so the render is deterministic. */
const VARIANTS = [
  ["#8fd8e8", "#2f8fa8"],
  ["#f5cba8", "#c9763c"],
  ["#f2b9c8", "#b3557a"],
  ["#a9dcc0", "#2f8f63"],
  ["#a9c4ec", "#3b6bb0"],
  ["#f0dfa4", "#b09232"],
  ["#c8bde8", "#6a55a8"],
  ["#9fdccd", "#2b8f7a"],
  ["#eec3a6", "#b5713f"],
];

function Bottle({ x, y, s, body, band }: { x: number; y: number; s: number; body: string; band: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="0" y="2" width="12" height="26" rx="3.5" fill={body} />
      <rect x="0" y="11" width="12" height="9" fill={band} />
      <rect x="3" y="0" width="6" height="3" rx="1.2" fill={band} opacity="0.65" />
    </g>
  );
}

export function CreativeSpace() {
  return (
    <div>
      <CreativeSpaceDiagram />
      {/* Labels live in HTML, aligned to the three stages they name. At a third
          of the content width, SVG text would land around 7px and never reflow. */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <span className="label text-[0.625rem] normal-case leading-[1.35] tracking-[0.08em] text-quiet">
          One creative
        </span>
        <span className="label text-center text-[0.625rem] normal-case leading-[1.35] tracking-[0.08em] text-quiet">
          Generated variants
        </span>
        <span className="label text-right text-[0.625rem] normal-case leading-[1.35] tracking-[0.08em] text-quiet">
          Adaptive creative
        </span>
      </div>
    </div>
  );
}

function CreativeSpaceDiagram() {
  return (
    <svg viewBox="0 0 320 92" className="h-auto w-full" aria-hidden="true" focusable="false">
      {/* one creative */}
      <rect x="0" y="8" width="46" height="76" rx="4" fill="#161a21" stroke="#252b35" strokeWidth="0.8" />
      <Bottle x={17} y={26} s={1} body="#c9cfd8" band="#8b93a0" />

      <path
        d="M54 46h18"
        stroke="var(--accent-2)"
        strokeWidth="1"
        opacity="0.55"
        strokeLinecap="round"
      />
      <path d="M70 43l4 3-4 3" fill="none" stroke="var(--accent-2)" strokeWidth="1" opacity="0.55" strokeLinecap="round" strokeLinejoin="round" />

      {/* generated variants */}
      {VARIANTS.map(([body, band], i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <g key={i} transform={`translate(${84 + col * 40} ${8 + row * 26})`}>
            <rect width="34" height="22" rx="2.5" fill={body} opacity="0.9" />
            <Bottle x={11} y={2} s={0.62} body="#fdfdfb" band={band} />
          </g>
        );
      })}

      <path
        d="M206 46h18"
        stroke="var(--accent-2)"
        strokeWidth="1"
        opacity="0.55"
        strokeLinecap="round"
      />
      <path d="M222 43l4 3-4 3" fill="none" stroke="var(--accent-2)" strokeWidth="1" opacity="0.55" strokeLinecap="round" strokeLinejoin="round" />

      {/* adaptive creative */}
      <defs>
        <linearGradient id="cs-adaptive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fd0a4" />
          <stop offset="100%" stopColor="#2f8f63" />
        </linearGradient>
      </defs>
      <rect x="274" y="8" width="46" height="76" rx="4" fill="url(#cs-adaptive)" />
      <Bottle x={291} y={26} s={1} body="#fdfdfb" band="#1f6f4c" />
    </svg>
  );
}

/* ── 02 · retrieve to rank to generate ─────────────────────────────────── */

/**
 * Titles are pre-split into lines. Four chevrons share roughly a third of the
 * content width, so "Recommend × Generate" has to break where it is legible
 * rather than wherever the box happens to run out.
 */
const STEPS = [
  { key: "retrieve", title: ["Retrieve"], note: "Choose candidates", tint: "#12324f" },
  { key: "rank", title: ["Rank"], note: "Choose what fits", tint: "#164a75" },
  { key: "generate", title: ["Generate"], note: "Create new possibilities", tint: "#1d63a0" },
  {
    key: "recommend",
    title: ["Recommend", "× Generate"],
    note: "Decide what should exist",
    tint: "#3f5fb8",
  },
];

/**
 * Chevrons are CSS clip-paths rather than SVG so the labels stay real,
 * selectable, reflowing text. Below `sm` the points are dropped and the steps
 * become plain stacked rows – a four-across chevron strip is unreadable on a
 * phone, and the arrow is already implied by the order.
 *
 * The horizontal padding at `sm` has to clear the notch on BOTH sides, or the
 * clip eats the first and last glyph of every label.
 */
export function GenerativeProgression() {
  const notch = "0.5rem";
  return (
    <ol className="flex flex-col gap-1.5 sm:flex-row sm:gap-0">
      {STEPS.map((s) => (
        <li
          key={s.key}
          className="min-w-0 flex-1 px-3 py-3 sm:px-[0.95rem] sm:py-4 sm:[clip-path:var(--chev)] sm:first:[clip-path:var(--chev-first)] sm:last:[clip-path:var(--chev-last)]"
          style={{
            background: s.tint,
            ["--chev" as string]: `polygon(0 0, calc(100% - ${notch}) 0, 100% 50%, calc(100% - ${notch}) 100%, 0 100%, ${notch} 50%)`,
            ["--chev-first" as string]: `polygon(0 0, calc(100% - ${notch}) 0, 100% 50%, calc(100% - ${notch}) 100%, 0 100%)`,
            ["--chev-last" as string]: `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${notch} 50%)`,
          }}
        >
          <p className="label text-[0.5625rem] leading-[1.3] tracking-[0.06em] text-primary sm:text-[0.625rem]">
            {s.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="mt-2 text-[0.6875rem] leading-[1.3] text-secondary">{s.note}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── 03 · AI between intent and conversion ─────────────────────────────── */

const OUTCOMES = [
  {
    label: "Discover",
    path: "M7 7.5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0M14.8 14.8 19 19",
  },
  { label: "Recommend", path: "M12 3.5 13.9 9 19.5 11 13.9 13 12 18.5 10.1 13 4.5 11 10.1 9Z" },
  { label: "Compare", path: "M3.5 5.5h7v6h-7zM13.5 11.5h7v6h-7z" },
  { label: "Buy", path: "M3.5 4.5h2.6l2.2 9.5h9.1M8.6 17.6a1 1 0 1 0 2 0 1 1 0 1 0-2 0M15.6 17.6a1 1 0 1 0 2 0 1 1 0 1 0-2 0M6.6 7.5h13l-1.4 5.5" },
];

function Glyph({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[1.125rem] w-[1.125rem] shrink-0 text-accent-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}

export function IntentPath() {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {/* intent */}
      <div className="flex shrink-0 flex-col items-center gap-2">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-tertiary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="7.5" r="3.6" />
          <path d="M4.8 20c1.4-3.7 4-5.5 7.2-5.5s5.8 1.8 7.2 5.5" />
        </svg>
        <span className="label text-[0.625rem]">Intent</span>
      </div>

      {/* the assistant, and the branches out of it */}
      <div className="relative flex min-w-0 flex-1 items-center">
        <svg
          viewBox="0 0 76 76"
          className="h-14 w-14 shrink-0 sm:h-16 sm:w-16"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <radialGradient id="ip-orb" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e6f2ff" stopOpacity="0.9" />
              <stop offset="36%" stopColor="var(--accent-2)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="38" cy="38" r="38" fill="url(#ip-orb)" />
          <circle cx="38" cy="38" r="16" fill="#0b1017" stroke="var(--accent-2)" strokeWidth="1.2" />
          <text
            x="38"
            y="42.5"
            textAnchor="middle"
            className="font-mono"
            fontSize="12"
            fill="#dceeff"
            letterSpacing="0.06em"
          >
            AI
          </text>
        </svg>

        {/* Decorative connectors. Stretched to fill whatever gap is left, so
            they always meet the labels regardless of column width. */}
        <svg
          viewBox="0 0 60 120"
          preserveAspectRatio="none"
          className="h-[7.5rem] min-w-0 flex-1 self-center"
          fill="none"
          stroke="var(--accent-2)"
          strokeWidth="1.4"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M0 60C24 60 30 16 60 15" opacity="0.42" />
          <path d="M0 60C26 60 32 44 60 45" opacity="0.42" />
          <path d="M0 60C26 60 32 76 60 75" opacity="0.42" />
          <path d="M0 60C24 60 30 104 60 105" opacity="0.42" />
        </svg>

        <ul className="flex shrink-0 flex-col justify-between gap-3 py-1">
          {OUTCOMES.map((o) => (
            <li key={o.label} className="flex items-center gap-2">
              <Glyph path={o.path} />
              <span className="label text-[0.625rem]">{o.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
