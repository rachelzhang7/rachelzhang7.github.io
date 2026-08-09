import { MediaFrame } from "./MediaFrame";

/**
 * The hero's visual counterweight.
 *
 * One dominant surface with two cropped fragments overlapping it at different
 * depths, sitting in a violet/blue bloom. The point is to establish visual
 * identity and hint at the range of the work – product, prototype, creative –
 * before a single project is named.
 *
 * The fragments are deliberately cropped by the frame edges rather than fully
 * visible: work continuing past the boundary reads as a body of work, where
 * three complete rectangles read as three items.
 */
export function HeroComposition() {
  return (
    <div className="group relative aspect-[5/5.4] w-full sm:aspect-[5/4.6] lg:aspect-[5/5.6]">
      {/* Atmosphere. Sits behind everything and extends past the frames so the
          light looks like it belongs to the page, not to the boxes. */}
      {/* Bleeds vertically only. A horizontal bleed pushed the document past
          the viewport at 390px – the glow was 37px wider than the phone. The
          gradient radii are enlarged to compensate, so it still reads as light
          spilling past the frames. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -inset-y-[12%]"
        style={{
          background:
            "radial-gradient(78% 56% at 62% 32%, color-mix(in oklab, var(--accent) 24%, transparent), transparent 72%), radial-gradient(68% 50% at 26% 74%, color-mix(in oklab, var(--accent-2) 18%, transparent), transparent 70%)",
        }}
      />

      {/* Dominant surface: the product work. Sits furthest back. */}
      <div className="absolute right-0 top-0 z-10 w-[82%]">
        <MediaFrame
          label="Product / Interface"
          tone="product"
          ratio="16 / 10"
          className="shadow-2xl shadow-black/70"
        />
      </div>

      {/* Building work, overlapping the dominant surface's lower left so the
          two read as stacked planes rather than two separate pictures. */}
      <div className="absolute left-0 top-[38%] z-20 w-[46%]">
        <MediaFrame
          label="Prototype"
          tone="prototype"
          ratio="4 / 3"
          className="shadow-2xl shadow-black/70"
        />
      </div>

      {/* Creative work: smallest, warmest, anchoring the bottom right. */}
      <div className="absolute bottom-0 right-[4%] z-30 w-[32%]">
        <MediaFrame
          label="Creative"
          tone="creative"
          ratio="1 / 1"
          className="shadow-2xl shadow-black/70"
        />
      </div>
    </div>
  );
}
