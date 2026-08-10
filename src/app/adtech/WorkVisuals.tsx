/**
 * The three Selected Work visuals: observe, understand, act.
 *
 * All three share one 320x272 design grid so the chapters keep equal baselines
 * and the project lists beneath them start on the same line.
 *
 * These are conceptual illustrations, drawn from scratch as SVG. They are not
 * screenshots, and they deliberately contain no proprietary architecture, no
 * real metrics and no trademarked logos – platform names appear as plain text
 * only, which is how you refer to a platform, not how you badge one. Every
 * figure carries an accessible description; the small type inside is texture
 * and is never the only place a fact appears.
 */

const VB = "0 0 320 272";

/* ── shared atoms ──────────────────────────────────────────────────────── */

/** Panel ground, matched to the site's raised surface. */
const SURFACE = "#0f131a";
const SURFACE_HI = "#151a23";
const EDGE = "#232935";

function Grid({ id }: { id: string }) {
  return (
    <>
      <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M16 0H0v16" fill="none" stroke="#141922" strokeWidth="0.5" />
      </pattern>
      <rect width="320" height="272" fill={`url(#${id})`} opacity="0.7" />
    </>
  );
}

/**
 * A coconut-water can. One shape, re-tinted per scene – which is exactly the
 * point of the Intelligence chapter: one product, many renderings.
 */
function Can({
  x,
  y,
  s = 1,
  body = "#eef4f2",
  band = "#1f8f7a",
}: {
  x: number;
  y: number;
  s?: number;
  body?: string;
  band?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="0" y="2" width="14" height="30" rx="4" fill={body} />
      <rect x="0" y="12" width="14" height="11" fill={band} />
      <rect x="2" y="15" width="10" height="1.4" rx="0.7" fill={body} opacity="0.85" />
      <rect x="2" y="18.4" width="6.5" height="1.1" rx="0.55" fill={body} opacity="0.6" />
      <rect x="3" y="0" width="8" height="3.4" rx="1.4" fill="#c7d2d0" />
      {/* Highlight down the left side, so it reads as a cylinder. */}
      <rect x="1.6" y="4" width="1.6" height="26" rx="0.8" fill="#fff" opacity="0.5" />
    </g>
  );
}

/** The play badge that marks a video variant. */
function Play({ x, y, r = 7 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#0a0d12" opacity="0.55" />
      <circle cx={x} cy={y} r={r} fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.9" />
      <path
        d={`M${x - r * 0.28} ${y - r * 0.4}L${x + r * 0.45} ${y}L${x - r * 0.28} ${y + r * 0.4}Z`}
        fill="#fff"
      />
    </g>
  );
}

/* ── 01 · DATA ─────────────────────────────────────────────────────────── */

/** Left-hand sources: a browser window and two app surfaces. */
function SourceCard({ x, y, kind }: { x: number; y: number; kind: "browser" | "list" }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="60" height="40" rx="3" fill={SURFACE_HI} stroke={EDGE} strokeWidth="0.8" />
      <path d="M0 9h60" stroke={EDGE} strokeWidth="0.8" />
      <circle cx="6" cy="4.6" r="1.3" fill="#2f3744" />
      <circle cx="11" cy="4.6" r="1.3" fill="#2f3744" />
      {kind === "browser" ? (
        <>
          <rect x="6" y="14" width="48" height="20" rx="2" fill="#1b222d" />
          <path d="M10 30l9-9 6 6 7-8 12 11z" fill="#28405c" />
          <circle cx="44" cy="19" r="2.6" fill="#3d5f86" />
        </>
      ) : (
        <>
          <rect x="6" y="14" width="14" height="14" rx="2" fill="#1b222d" />
          <rect x="24" y="15" width="30" height="2.6" rx="1.3" fill="#26303d" />
          <rect x="24" y="20" width="22" height="2.6" rx="1.3" fill="#212a35" />
          <rect x="24" y="25" width="26" height="2.6" rx="1.3" fill="#212a35" />
        </>
      )}
    </g>
  );
}

function PlatformChip({ x, y, name }: { x: number; y: number; name: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="92" height="23" rx="4" fill={SURFACE_HI} stroke={EDGE} strokeWidth="0.8" />
      {/* A neutral mark, not a trademark. The name is the identifier. */}
      <circle cx="12" cy="11.5" r="5.2" fill="none" stroke="var(--accent-2)" strokeWidth="1.1" />
      <circle cx="12" cy="11.5" r="1.7" fill="var(--accent-2)" />
      <text x="24" y="14.6" className="font-sans" fontSize="8.4" fill="#c9cfd8">
        {name}
      </text>
    </g>
  );
}

export function DataVisual() {
  // Three ribbons carrying events from the sources into the platforms.
  const ribbons = [
    "M74 66C110 66 128 58 150 58C176 58 190 60 212 60",
    "M74 120C112 120 130 86 152 82C178 77 192 76 212 74",
    "M74 172C116 172 132 104 154 98C180 91 194 90 212 88",
  ];

  return (
    <svg viewBox={VB} className="h-auto w-full">
      <rect width="320" height="272" rx="6" fill="#0b0f15" />
      <Grid id="dv-grid" />

      {/* column headings */}
      <g className="font-mono" fontSize="7.6" fill="#8b93a0" letterSpacing="0.06em">
        <text x="12" y="14">WEB &amp; APP</text>
        <text x="12" y="24" fill="#5f6774">(BROWSER)</text>
        <text x="106" y="14">SERVER &amp; EVENTS</text>
        <text x="106" y="24" fill="#5f6774">(SERVER-SIDE)</text>
        <text x="212" y="14">AD PLATFORMS</text>
      </g>

      <SourceCard x={12} y={42} kind="browser" />
      <SourceCard x={12} y={96} kind="list" />
      <SourceCard x={12} y={150} kind="list" />

      {/* server-side event rows */}
      <g>
        {[52, 74, 96].map((y, i) => (
          <g key={y} transform={`translate(104 ${y})`}>
            <rect width="72" height="16" rx="3" fill={SURFACE_HI} stroke={EDGE} strokeWidth="0.7" />
            <circle cx="9" cy="8" r="2.4" fill="var(--accent-2)" opacity={0.85 - i * 0.18} />
            <rect x="16" y="5" width="34" height="2.2" rx="1.1" fill="#2b3441" />
            <rect x="16" y="9.6" width="22" height="2.2" rx="1.1" fill="#232b36" />
          </g>
        ))}
      </g>

      {/* the flow itself */}
      <g fill="none" stroke="var(--accent-2)" strokeLinecap="round">
        {ribbons.map((d, i) => (
          <path
            key={i}
            d={d}
            strokeWidth={1.1}
            opacity={0.5 - i * 0.08}
            strokeDasharray="3 5"
            className="flow"
            style={{ animationDelay: `${i * 320}ms` }}
          />
        ))}
        {ribbons.map((d, i) => (
          <path key={`g${i}`} d={d} strokeWidth={3.2} opacity={0.07} />
        ))}
      </g>

      <PlatformChip x={212} y={48} name="Meta Ads" />
      <PlatformChip x={212} y={78} name="TikTok Ads" />

      {/* downstream: signals feed the model, the model feeds delivery back */}
      <path
        d="M258 101v18"
        stroke="var(--accent-2)"
        strokeWidth="1"
        opacity="0.45"
        strokeDasharray="3 4"
        className="flow"
      />
      <path d="M255 117l3 5 3-5z" fill="var(--accent-2)" opacity="0.55" />

      <g transform="translate(196 122)">
        <rect width="112" height="88" rx="5" fill={SURFACE} stroke={EDGE} strokeWidth="0.8" />
        <text x="10" y="17" className="font-mono" fontSize="7.6" fill="#8b93a0" letterSpacing="0.06em">
          ADS MODEL /
        </text>
        <text x="10" y="27" className="font-mono" fontSize="7.6" fill="#8b93a0" letterSpacing="0.06em">
          OPTIMIZATION
        </text>
        {[
          [12, 26],
          [30, 36],
          [48, 30],
          [66, 48],
          [84, 60],
        ].map(([x, h]) => (
          <rect
            key={x}
            x={x}
            y={76 - h}
            width="12"
            height={h}
            rx="1.5"
            fill="var(--accent-2)"
            opacity={0.22 + h / 140}
          />
        ))}
      </g>

      {/* the feedback loop – optimization returning to what gets observed */}
      <path
        d="M196 190C150 196 96 200 62 204C40 207 30 214 30 224"
        fill="none"
        stroke="var(--accent-2)"
        strokeWidth="0.9"
        opacity="0.34"
        strokeDasharray="2 5"
        className="flow"
        style={{ animationDirection: "reverse" }}
      />
      <path d="M27 220l3 6 3-6z" fill="var(--accent-2)" opacity="0.45" />
      <text x="42" y="238" className="font-mono" fontSize="7" fill="#5f6774" letterSpacing="0.08em">
        DELIVERY FEEDBACK
      </text>
    </svg>
  );
}

/* ── 02 · INTELLIGENCE ─────────────────────────────────────────────────── */

type Scene = "beach" | "palm" | "sky" | "grove";

function CreativeCard({
  x,
  y,
  scene,
  video,
}: {
  x: number;
  y: number;
  scene: Scene;
  video?: boolean;
}) {
  const W = 88;
  const H = 104;
  const clip = `cc-${scene}`;
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <clipPath id={clip}>
          <rect width={W} height={H} rx="4" />
        </clipPath>
        <linearGradient id={`${clip}-sky`} x1="0" y1="0" x2="0" y2="1">
          {scene === "beach" && (
            <>
              <stop offset="0%" stopColor="#7fd4e8" />
              <stop offset="100%" stopColor="#dff2ee" />
            </>
          )}
          {scene === "palm" && (
            <>
              <stop offset="0%" stopColor="#ffd39b" />
              <stop offset="100%" stopColor="#ff9d6e" />
            </>
          )}
          {scene === "sky" && (
            <>
              <stop offset="0%" stopColor="#2f6fb5" />
              <stop offset="100%" stopColor="#a8d8ef" />
            </>
          )}
          {scene === "grove" && (
            <>
              <stop offset="0%" stopColor="#0e5c47" />
              <stop offset="100%" stopColor="#39a06d" />
            </>
          )}
        </linearGradient>
      </defs>

      <g clipPath={`url(#${clip})`}>
        <rect width={W} height={H} fill={`url(#${clip}-sky)`} />

        {scene === "beach" && (
          <>
            <circle cx="66" cy="22" r="10" fill="#fff3c9" opacity="0.85" />
            <path d={`M0 66h${W}v${H - 66}H0z`} fill="#e8d3a8" />
            <ellipse cx="44" cy="66" rx="46" ry="6" fill="#bfe6dd" opacity="0.7" />
          </>
        )}
        {scene === "palm" && (
          <>
            <circle cx="24" cy="26" r="9" fill="#fff1cf" opacity="0.9" />
            <path d={`M0 74h${W}v${H - 74}H0z`} fill="#c98a5c" />
            <g stroke="#1d4433" strokeWidth="2.4" fill="none" strokeLinecap="round">
              <path d="M70 74V38" />
              <path d="M70 38c-8-6-16-6-21 0" />
              <path d="M70 38c8-6 16-5 20 2" />
              <path d="M70 38c-3-8 1-14 8-16" />
            </g>
          </>
        )}
        {scene === "sky" && (
          <>
            <ellipse cx="24" cy="30" rx="18" ry="8" fill="#fff" opacity="0.65" />
            <ellipse cx="62" cy="48" rx="22" ry="9" fill="#fff" opacity="0.45" />
            <ellipse cx="40" cy="88" rx="34" ry="10" fill="#fff" opacity="0.35" />
          </>
        )}
        {scene === "grove" && (
          <>
            <g stroke="#0a3b2c" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9">
              <path d="M14 104V54" />
              <path d="M14 54c-7-5-11-3-14 2" />
              <path d="M14 54c7-6 13-4 16 1" />
              <path d="M78 104V62" />
              <path d="M78 62c6-5 11-3 13 2" />
            </g>
            <ellipse cx="44" cy="96" rx="38" ry="9" fill="#0a3b2c" opacity="0.35" />
          </>
        )}

        <Can
          x={36}
          y={scene === "beach" ? 40 : 44}
          s={1.5}
          band={
            scene === "grove" ? "#0f7a52" : scene === "palm" ? "#e2703a" : "#1f8f7a"
          }
        />
        {video && <Play x={W - 14} y={H - 14} r={7} />}
      </g>
      <rect width={W} height={H} rx="4" fill="none" stroke={EDGE} strokeWidth="0.8" />
    </g>
  );
}

export function IntelligenceVisual() {
  const cards: { x: number; y: number; scene: Scene; video?: boolean }[] = [
    { x: 124, y: 24, scene: "beach" },
    { x: 220, y: 24, scene: "palm", video: true },
    { x: 124, y: 142, scene: "sky", video: true },
    { x: 220, y: 142, scene: "grove", video: true },
  ];

  return (
    <svg viewBox={VB} className="h-auto w-full">
      <defs>
        <radialGradient id="iv-orb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e6f2ff" stopOpacity="0.95" />
          <stop offset="34%" stopColor="var(--accent-2)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="272" rx="6" fill="#0b0f15" />
      <Grid id="iv-grid" />

      {/* the merchant's one product */}
      <g transform="translate(10 118)">
        <rect width="34" height="46" rx="4" fill={SURFACE_HI} stroke={EDGE} strokeWidth="0.8" />
        <Can x={10} y={7} s={1} />
      </g>
      <path
        d="M46 141h16"
        stroke="var(--accent-2)"
        strokeWidth="1"
        opacity="0.5"
        strokeDasharray="3 4"
        className="flow"
      />

      {/* generation */}
      <circle cx="84" cy="141" r="40" fill="url(#iv-orb)" />
      <circle cx="84" cy="141" r="17" fill="#0d1620" stroke="var(--accent-2)" strokeWidth="1.2" />
      <text
        x="84"
        y="145"
        textAnchor="middle"
        className="font-mono"
        fontSize="11"
        fill="#dceeff"
        letterSpacing="0.06em"
      >
        AI
      </text>

      {/* one product, many possibilities */}
      <g fill="none" stroke="var(--accent-2)" strokeLinecap="round">
        {[
          "M101 133C110 118 112 84 124 74",
          "M103 137C116 128 200 66 220 60",
          "M103 148C116 160 110 186 124 196",
          "M101 152C114 176 202 208 220 212",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            strokeWidth="1"
            opacity="0.45"
            strokeDasharray="3 5"
            className="flow"
            style={{ animationDelay: `${i * 260}ms` }}
          />
        ))}
      </g>

      {cards.map((c) => (
        <CreativeCard key={c.scene} {...c} />
      ))}
    </svg>
  );
}

/* ── 03 · AUTOMATION ───────────────────────────────────────────────────── */

/** A thumbnail of a generated creative, small enough to read as a choice. */
function Thumb({ x, y, scene }: { x: number; y: number; scene: Scene }) {
  const id = `th-${scene}`;
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <clipPath id={id}>
          <rect width="40" height="48" rx="3" />
        </clipPath>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={
              scene === "beach"
                ? "#7fd4e8"
                : scene === "palm"
                  ? "#ffd39b"
                  : scene === "sky"
                    ? "#3f7cbe"
                    : "#12694f"
            }
          />
          <stop
            offset="100%"
            stopColor={
              scene === "beach"
                ? "#dff2ee"
                : scene === "palm"
                  ? "#ff9d6e"
                  : scene === "sky"
                    ? "#a8d8ef"
                    : "#3aa46f"
            }
          />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="40" height="48" fill={`url(#${id}-g)`} />
        <ellipse cx="20" cy="44" rx="20" ry="7" fill="#0a3b2c" opacity="0.22" />
        <Can x={14} y={12} s={0.85} band={scene === "palm" ? "#e2703a" : "#1f8f7a"} />
      </g>
      <rect width="40" height="48" rx="3" fill="none" stroke={EDGE} strokeWidth="0.7" />
      <circle cx="33" cy="41" r="5" fill="var(--accent-2)" />
      <path
        d="M30.6 41l1.7 1.8 3.2-3.4"
        fill="none"
        stroke="#08111c"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function ConfigRow({ x, y, label, value }: { x: number; y: number; label: string; value: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <text y="12" className="font-sans" fontSize="7.4" fill="#8b93a0">
        {label}
      </text>
      <rect x="72" width="102" height="16" rx="3" fill={SURFACE_HI} stroke={EDGE} strokeWidth="0.7" />
      <text x="79" y="11.4" className="font-sans" fontSize="7.4" fill="#c9cfd8">
        {value}
      </text>
      <path
        d="M164 5l3 3-3 3"
        fill="none"
        stroke="#6b7482"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function Bubble({
  x,
  y,
  w,
  h,
  mine,
  lines,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  mine?: boolean;
  lines: string[];
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={w}
        height={h}
        rx="4"
        fill={mine ? "var(--accent-2)" : SURFACE_HI}
        stroke={mine ? "none" : EDGE}
        strokeWidth="0.7"
        opacity={mine ? 0.92 : 1}
      />
      {lines.map((t, i) => (
        <text
          key={t}
          x="6"
          y={12 + i * 9}
          className="font-sans"
          fontSize="6.6"
          fill={mine ? "#07121e" : "#b6bdc7"}
        >
          {t}
        </text>
      ))}
    </g>
  );
}

export function AutomationVisual() {
  return (
    <svg viewBox={VB} className="h-auto w-full">
      <rect width="320" height="272" rx="6" fill="#0b0f15" />
      <Grid id="av-grid" />

      {/* ── merchant workflow ── */}
      <g transform="translate(6 10)">
        <rect width="192" height="252" rx="5" fill={SURFACE} stroke={EDGE} strokeWidth="0.8" />

        {/* merchant identity – a generic storefront mark, never a wordmark */}
        <rect x="10" y="10" width="13" height="13" rx="3" fill="#1f7a4d" />
        <path
          d="M13.4 14.2h6.2M14.2 14.2v4.6h4.6v-4.6"
          fill="none"
          stroke="#dff5e8"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <text x="28" y="20" className="font-sans" fontSize="8.4" fill="#c9cfd8">
          Shopify merchant
        </text>

        <path d="M10 30h172" stroke={EDGE} strokeWidth="0.8" />

        <text x="10" y="44" className="font-sans" fontSize="9" fill="#ede9e1">
          TikTok Channel App
        </text>
        <path
          d="M175 38l7 7M182 38l-7 7"
          stroke="#5f6774"
          strokeWidth="1"
          strokeLinecap="round"
        />

        <text x="10" y="60" className="font-mono" fontSize="7" fill="#7d8592" letterSpacing="0.1em">
          AI GENERATED FOR YOU
        </text>

        <Thumb x={10} y={68} scene="beach" />
        <Thumb x={56} y={68} scene="palm" />
        <Thumb x={102} y={68} scene="sky" />
        <Thumb x={148} y={68} scene="grove" />

        <text x="10" y="136" className="font-mono" fontSize="7" fill="#7d8592" letterSpacing="0.1em">
          CAMPAIGN CONFIGURATION
        </text>

        <ConfigRow x={10} y={144} label="Objective" value="Conversions" />
        <ConfigRow x={10} y={166} label="Budget" value="Daily budget" />
        <ConfigRow x={10} y={188} label="Targeting" value="Auto" />

        <rect x="10" y="216" width="172" height="22" rx="4" fill="var(--accent-2)" />
        <text
          x="96"
          y="230.5"
          textAnchor="middle"
          className="font-sans"
          fontSize="8.6"
          fill="#06121f"
        >
          Review and publish
        </text>
      </g>

      {/* ── copilot ── */}
      <g transform="translate(206 10)">
        <rect width="108" height="252" rx="5" fill={SURFACE} stroke={EDGE} strokeWidth="0.8" />
        <text x="9" y="20" className="font-sans" fontSize="8" fill="#ede9e1">
          Sidekick
        </text>
        <text x="9" y="30" className="font-mono" fontSize="6.6" fill="#7d8592" letterSpacing="0.08em">
          AI COPILOT
        </text>
        <path d="M9 38h90" stroke={EDGE} strokeWidth="0.8" />

        <Bubble
          x={24}
          y={46}
          w={76}
          h={26}
          mine
          lines={["How did my ads", "perform last week?"]}
        />
        <Bubble
          x={9}
          y={78}
          w={88}
          h={44}
          lines={["Spend and conversions", "both rose week over", "week; efficiency held", "roughly steady."]}
        />
        <Bubble x={30} y={128} w={70} h={17} mine lines={["What drove it?"]} />
        <Bubble
          x={9}
          y={151}
          w={90}
          h={44}
          lines={["Two video variants took", "most of the delivery,", "and the broad audience", "expanded reach."]}
        />
        <Bubble
          x={9}
          y={201}
          w={90}
          h={26}
          lines={["Next: give the stronger", "variants more budget."]}
        />

        <rect
          x="9"
          y="233"
          width="90"
          height="16"
          rx="3"
          fill={SURFACE_HI}
          stroke={EDGE}
          strokeWidth="0.7"
        />
        <text x="15" y="244" className="font-sans" fontSize="6.6" fill="#5f6774">
          Ask anything
        </text>
        <path
          d="M86 244l6-6M87 238h5v5"
          fill="none"
          stroke="var(--accent-2)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export const WORK_VISUALS = {
  data: DataVisual,
  intelligence: IntelligenceVisual,
  automation: AutomationVisual,
} as const;
