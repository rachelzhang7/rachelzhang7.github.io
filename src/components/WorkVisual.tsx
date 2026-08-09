import type { SelectedWork } from "@/content/home";

/**
 * Generated schematics standing in for screenshots that don't exist yet.
 *
 * These deliberately encode the actual mechanic of each project rather than
 * being abstract line art — an investor who knows the space reads decorative
 * diagrams as filler and quietly discounts the page.
 *
 * Every one is wrapped in a fixed aspect ratio, so dropping in a real capture
 * later changes zero layout. See CONTENT.md.
 */

type Props = { variant: SelectedWork["visual"]; className?: string };

const stroke = "var(--line-strong)";
const faint = "var(--line-hair)";

export function WorkVisual({ variant, className }: Props) {
  return (
    <div
      className={className}
      style={{ aspectRatio: "16 / 10" }}
      data-slot="capture"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 200" className="h-full w-full">
        {shapes[variant]}
      </svg>
    </div>
  );
}

const shapes: Record<SelectedWork["visual"], React.ReactNode> = {
  /** A merchant question resolving into a recommendation and a metric lift. */
  conversation: (
    <g fill="none" strokeWidth={1}>
      <rect x={16} y={22} width={116} height={26} stroke={stroke} />
      <rect x={16} y={56} width={132} height={38} stroke={faint} />
      <line x1={24} y1={34} x2={100} y2={34} stroke={faint} />
      <line x1={24} y1={68} x2={132} y2={68} stroke={faint} />
      <line x1={24} y1={80} x2={112} y2={80} stroke={faint} />
      <rect x={16} y={150} width={132} height={24} stroke={stroke} />
      <line x1={24} y1={162} x2={92} y2={162} stroke={faint} />
      <rect
        x={126}
        y={154}
        width={16}
        height={16}
        stroke="var(--accent)"
        strokeWidth={1.5}
      />
      {/* Performance panel */}
      <rect x={172} y={22} width={132} height={152} stroke={faint} />
      <polyline
        points="182,150 200,138 216,142 232,120 250,124 268,96 294,74"
        stroke="var(--accent)"
        strokeWidth={1.5}
      />
      <line x1={172} y1={56} x2={304} y2={56} stroke={faint} />
      <line x1={238} y1={22} x2={238} y2={56} stroke={faint} />
    </g>
  ),

  /** Claims checked against sources, with the residual uncertainty shown. */
  receipt: (
    <g fill="none" strokeWidth={1}>
      <rect x={28} y={20} width={150} height={160} stroke={stroke} />
      {[46, 66, 86, 106, 126].map((y, i) => (
        <g key={y}>
          <rect
            x={42}
            y={y - 6}
            width={10}
            height={10}
            stroke={i < 4 ? "var(--accent)" : faint}
            strokeWidth={i < 4 ? 1.5 : 1}
          />
          <line x1={62} y1={y} x2={i === 4 ? 122 : 160} y2={y} stroke={faint} />
        </g>
      ))}
      <line x1={42} y1={148} x2={164} y2={148} stroke={stroke} />
      <circle cx={244} cy={100} r={38} stroke={faint} />
      <path
        d="M244 62 a38 38 0 0 1 30 61"
        stroke="var(--accent)"
        strokeWidth={2}
      />
    </g>
  ),

  /** Fragmented signal resolving into a few decisions that matter. */
  pulse: (
    <g fill="none" strokeWidth={1}>
      <rect x={16} y={20} width={288} height={160} stroke={faint} />
      <polyline
        points="28,150 52,142 76,156 100,118 124,132 148,86 172,104 196,64 220,82 244,48 268,66 292,36"
        stroke="var(--accent)"
        strokeWidth={1.5}
      />
      {[100, 196, 268].map((x, i) => (
        <rect
          key={x}
          x={x - 3}
          y={[118, 64, 66][i] - 3}
          width={6}
          height={6}
          stroke="var(--accent)"
          strokeWidth={1.5}
        />
      ))}
      {[60, 100, 140].map((y) => (
        <line key={y} x1={16} y1={y} x2={304} y2={y} stroke={faint} opacity={0.6} />
      ))}
    </g>
  ),

  /** A spectrum — sound as a visual medium. */
  gallery: (
    <g fill="none" strokeWidth={1}>
      {Array.from({ length: 34 }, (_, i) => {
        const x = 20 + i * 8.5;
        const h =
          26 +
          52 * Math.abs(Math.sin(i * 0.42)) +
          22 * Math.abs(Math.sin(i * 1.13 + 0.7));
        return (
          <line
            key={i}
            x1={x}
            y1={100 - h / 2}
            x2={x}
            y2={100 + h / 2}
            stroke={i % 7 === 3 ? "var(--accent)" : stroke}
            strokeWidth={i % 7 === 3 ? 1.5 : 1}
          />
        );
      })}
    </g>
  ),

  /** A verification lattice — structure you can inspect from any face. */
  lattice: (
    <g fill="none" strokeWidth={1}>
      <path d="M160 40 L232 82 L232 160 L160 202 L88 160 L88 82 Z" stroke={faint} />
      <path
        d="M160 40 L160 118 L232 160 M160 118 L88 160"
        stroke={stroke}
      />
      <path
        d="M160 78 L196 100 L196 142 L160 164 L124 142 L124 100 Z"
        stroke="var(--accent)"
        strokeWidth={1.5}
      />
      <circle cx={160} cy={118} r={3} fill="var(--accent)" stroke="none" />
    </g>
  ),
};
