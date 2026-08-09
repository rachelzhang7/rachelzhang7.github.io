import { systemStages } from "@/content/adtech";

/**
 * The system spine — a diagram made of rules and type, nothing else.
 *
 * Desktop: five stages hung off one continuous horizontal hairline, each node
 * marked by a 5px square on the rule, the way a chart axis carries ticks.
 * Mobile: the same chain rotated onto a vertical spine, so the reading order
 * and the structure stay identical rather than becoming a different diagram.
 *
 * Deliberately not an SVG: the stage claims are real sentences and must reflow,
 * wrap and be selectable at 375px.
 */
export function SystemSpine() {
  return (
    <ol className="grid grid-cols-1 lg:grid-cols-5">
      {systemStages.map((stage, i) => (
        <li
          key={stage.name}
          className="relative border-l border-hair pb-9 pl-5 last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0"
        >
          {/* The node, 5×5. Only the first one carries the accent — it marks
              where the chain starts. The rest are neutral ticks, so the whole
              diagram spends the same accent budget as a single indicator. */}
          <span
            aria-hidden="true"
            className={`absolute left-[-3px] top-0 block h-[5px] w-[5px] lg:left-0 lg:top-[-3px] ${
              i === 0 ? "bg-accent" : "bg-strong"
            }`}
          />

          <div className="lg:pr-8 lg:pt-7">
            <p className="label">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-3 font-mono text-sm uppercase tracking-[0.1em] text-primary">
              {stage.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {stage.claim}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
