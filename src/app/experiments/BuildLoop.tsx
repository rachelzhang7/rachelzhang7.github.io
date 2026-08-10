import { buildLoop } from "@/content/experiments";
import { cn } from "@/lib/cn";

/**
 * The product loop: problem, design, build, test, learn – drawn as a cycle
 * rather than a line, because the point is that it comes back around.
 *
 * `Build` is marked because that is the stage GenAI changed, and the reason the
 * rest of this page exists. The icons are plain geometry, not invented product
 * detail, and every label is real text so it reflows and stays selectable.
 *
 * Below lg the dashed enclosure and the arrows drop away and the stages become
 * a simple grid: the same five words, without a diagram that cannot fit.
 */

const ICONS: Record<string, React.ReactNode> = {
  Problem: (
    <>
      <circle cx="12" cy="12" r="5.5" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
    </>
  ),
  Design: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M8.5 15.5 15.5 8.5" />
    </>
  ),
  Build: (
    <>
      <path d="M9.5 8.5 6 12l3.5 3.5" />
      <path d="M14.5 8.5 18 12l-3.5 3.5" />
    </>
  ),
  Test: (
    <>
      <circle cx="9" cy="10" r="2.6" />
      <circle cx="16" cy="10.5" r="2" />
      <path d="M4.5 17.5c.9-2.2 2.6-3.3 4.5-3.3s3.6 1.1 4.5 3.3" />
      <path d="M15 14.4c1.6.1 2.9 1.1 3.6 2.7" />
    </>
  ),
  Learn: (
    <>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.6-5.7" />
      <path d="M19.7 4.5v4h-4" />
    </>
  ),
};

export function BuildLoop() {
  return (
    <div>
      <ol className="grid grid-cols-3 gap-y-7 sm:grid-cols-5 lg:flex lg:items-start lg:gap-0 lg:rounded-[2rem] lg:border lg:border-dashed lg:border-strong lg:px-8 lg:py-9">
        {buildLoop.stages.map((stage, i) => {
          const active = stage === buildLoop.active;
          return (
            <li
              key={stage}
              className="flex flex-col items-center lg:flex-1 lg:flex-row lg:items-start"
            >
              <div className="flex flex-col items-center gap-3 lg:w-full">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border transition-colors",
                    active ? "border-accent-2" : "border-strong",
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={cn(
                      "h-5 w-5",
                      active ? "text-accent-2" : "text-tertiary",
                    )}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[stage]}
                  </svg>
                </span>
                <span
                  className={cn(
                    "label text-center",
                    active ? "text-accent-2" : "text-tertiary",
                  )}
                >
                  {stage}
                </span>
              </div>

              {/* Connector. Decorative, and only where there is a next stage. */}
              {i < buildLoop.stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden pt-[1.15rem] text-quiet lg:block"
                >
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <p className="label mt-6 normal-case leading-[1.6] tracking-[0.08em] text-quiet lg:text-right">
        {buildLoop.caption}
      </p>
    </div>
  );
}
