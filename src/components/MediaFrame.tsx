import { cn } from "@/lib/cn";

/**
 * A designed media container.
 *
 * This is where real screenshots, prototype captures, video stills and artwork
 * will live. Until they arrive it renders as an atmospheric field with a quiet
 * label naming what belongs there.
 *
 * Deliberately NOT a schematic. The previous placeholders drew fake interface
 * chrome in the site's own stroke colours, which did two bad things at once:
 * they implied product detail that doesn't exist, and they made every artifact
 * share the shell's palette, so the work could never be more expressive than
 * the page around it. These frames carry their own light instead – that is what
 * lets the shell stay quiet while the work brings the energy.
 *
 * Passing `src` swaps in a real asset at the same ratio with no layout change.
 */

export type MediaTone = "product" | "prototype" | "creative" | "music";

type Props = {
  /** Names the asset that belongs here. Kept small and quiet. */
  label: string;
  tone?: MediaTone;
  /** CSS aspect-ratio, e.g. "16 / 10". */
  ratio?: string;
  /** Real asset path once one exists; overrides the placeholder field. */
  src?: string;
  alt?: string;
  className?: string;
  /** Media lifts very slightly when its row is hovered. */
  interactive?: boolean;
};

/**
 * Each tone is a different distribution of the same two accents, so the frames
 * read as a family rather than four unrelated treatments. Values are pushed
 * well past "subtle tint" on purpose – on a near-black ground a 6% wash is
 * invisible, and the page has been reading grey.
 */
const FIELDS: Record<MediaTone, string> = {
  product: [
    "radial-gradient(120% 90% at 22% 12%, color-mix(in oklab, var(--accent-2) 40%, transparent), transparent 62%)",
    "radial-gradient(100% 80% at 86% 92%, color-mix(in oklab, var(--accent) 44%, transparent), transparent 60%)",
  ].join(","),
  prototype: [
    "radial-gradient(110% 85% at 78% 16%, color-mix(in oklab, var(--accent) 40%, transparent), transparent 60%)",
    "radial-gradient(95% 80% at 14% 88%, color-mix(in oklab, var(--accent-2) 32%, transparent), transparent 58%)",
  ].join(","),
  creative: [
    "radial-gradient(120% 95% at 46% 34%, color-mix(in oklab, var(--accent) 48%, transparent), transparent 64%)",
    "radial-gradient(70% 60% at 88% 10%, color-mix(in oklab, var(--accent-hi) 30%, transparent), transparent 58%)",
    "radial-gradient(90% 80% at 8% 92%, color-mix(in oklab, var(--accent-2) 30%, transparent), transparent 60%)",
  ].join(","),
  music: [
    "radial-gradient(115% 90% at 34% 70%, color-mix(in oklab, var(--accent) 44%, transparent), transparent 62%)",
    "radial-gradient(80% 70% at 82% 22%, color-mix(in oklab, var(--accent-2) 36%, transparent), transparent 58%)",
  ].join(","),
};

export function MediaFrame({
  label,
  tone = "product",
  ratio = "16 / 10",
  src,
  alt = "",
  className,
  interactive = true,
}: Props) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden bg-sunken",
        interactive &&
          "transition-transform duration-500 ease-[var(--ease-instrument)] group-hover:scale-[1.015]",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <>
          {/* The field. This is the placeholder's whole content – colour and
              depth, no invented interface. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundImage: FIELDS[tone] }}
          />

          {/* A luminous top edge, the way light catches the lip of a screen. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 70%, transparent) 32%, color-mix(in oklab, var(--accent-2) 60%, transparent) 68%, transparent)",
            }}
          />

          {/* Grain, so the field reads as a surface rather than a gradient. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Top-left, not bottom-left: frames in the hero overlap each other
              from below, and a caption in the bottom corner gets covered. */}
          <figcaption className="absolute left-0 top-0 flex items-center gap-2 p-4">
            <span aria-hidden="true" className="h-[5px] w-[5px] bg-accent-hi" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-primary/55">
              {label}
            </span>
          </figcaption>
        </>
      )}

      {/* Hairline containment, so the field has an edge without becoming a card. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-white/[0.06]"
      />
    </figure>
  );
}
