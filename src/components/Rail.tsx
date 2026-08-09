"use client";

import { useScrollProgress } from "@/lib/useScrollProgress";

/**
 * The calibration rail – the site's structural signature.
 *
 * A persistent 72px column pinned to the left edge that acts as ruler,
 * progress indicator and section index at once. It is the one element present
 * on every page, and the single largest concentration of accent anywhere on
 * the site (roughly 25 square pixels).
 *
 * Pages drive it by marking their sections with `data-section="LABEL"`.
 *
 * Below 1024px there isn't room for it, so it hides and the header's 1px
 * progress line carries the same information. That's an honest reduction
 * rather than a rotated copy that would steal 44px of viewport from the
 * visitors most likely to be arriving from a search result on a phone.
 */
export function Rail() {
  const { progress, section } = useScrollProgress(true);

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-[var(--rail-w)] lg:block"
    >
      {/* No ruler ticks. A measurement scale that measures nothing is
          decoration pretending to be instrumentation – the spine, the position
          and the section name are the parts that carry real information. */}

      {/* The spine. */}
      <div className="absolute inset-y-0 right-0 w-px bg-hair" />

      {/* The indicator. Transform-only so it stays on the compositor. */}
      <div
        className="absolute right-[-2px] top-0 h-[5px] w-[5px] bg-accent transition-transform duration-150 ease-out"
        style={{
          transform: `translateY(calc(${progress} * (100dvh - 5px)))`,
          boxShadow: "0 0 0 3px var(--accent-ring)",
        }}
      />

      {/* Section identity, set vertically so it fits the 72px column. */}
      {section && (
        <div
          className="label absolute left-5 top-32"
          style={{ writingMode: "vertical-rl" }}
        >
          {section}
        </div>
      )}

    </aside>
  );
}
