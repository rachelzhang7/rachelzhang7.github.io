import { layers } from "@/content/adtech";

/**
 * The page's mental model: Data to Intelligence to Automation.
 *
 * Three stages hung off one continuous hairline, so the progression is carried
 * by the layout and the copy never has to restate it. Desktop reads left to
 * right; below lg the same chain rotates onto a vertical rule, keeping the
 * reading order and the structure identical rather than becoming a different
 * diagram.
 *
 * Deliberately not an SVG: the claims are real sentences that must reflow, wrap
 * and stay selectable at 375px.
 */
export function MentalModel() {
  return (
    <ol className="grid grid-cols-1 lg:grid-cols-3">
      {layers.map((layer, i) => (
        <li
          key={layer.name}
          className="relative border-l border-hair pb-10 pl-6 last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pr-10 lg:pt-8"
        >
          {/* The node on the rule. */}
          <span
            aria-hidden="true"
            className="absolute left-[-3px] top-1 h-[5px] w-[5px] bg-accent lg:left-0 lg:top-[-3px]"
          />

          <p className="label">
            <span className="text-accent">{layer.index}</span>{" "}
            {/* The arrow belongs to the relationship, not the item, so it only
                appears between stages – never after the last one. */}
            {i < layers.length - 1 && (
              <span aria-hidden="true" className="ml-2 text-quiet">
                →
              </span>
            )}
          </p>

          <h3 className="display mt-4 text-[1.75rem] text-primary sm:text-[2rem]">
            {layer.name}
          </h3>

          <p className="measure-tight mt-3 text-base leading-relaxed text-secondary">
            {layer.claim}
          </p>

          {/* `.label` is line-height 1; this line wraps in the third column, so it
              needs real leading or the two lines butt together. */}
          <p className="label mt-5 normal-case leading-[1.6] tracking-[0.08em]">
            {layer.scope}
          </p>
        </li>
      ))}
    </ol>
  );
}
