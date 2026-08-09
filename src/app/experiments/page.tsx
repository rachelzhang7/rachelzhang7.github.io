import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import {
  creativeWarRoomThesis,
  experimentsIntro,
  years,
  type Experiment,
} from "@/content/experiments";
import { territoryByKey } from "@/content/territories";

export const metadata: Metadata = {
  title: "Experiments",
  description: experimentsIntro.body,
  alternates: { canonical: "/experiments/" },
  openGraph: { url: "/experiments/" },
};

/**
 * Intrinsic dimensions of the real assets, so every image reserves its space
 * before it loads and the page never shifts.
 */
const DIMS: Record<string, [number, number]> = {
  "/media/experiments/ad-ai-pulse.jpg": [1600, 828],
  "/media/experiments/beam.jpg": [1600, 1066],
  "/media/experiments/creative-war-room.jpg": [1440, 810],
  "/media/experiments/anchor.jpg": [1440, 960],
  "/media/experiments/trust-receipt.jpg": [1440, 960],
  "/media/experiments/cortex.jpg": [1440, 960],
};

function Artifact({
  experiment,
  priority = false,
  className,
}: {
  experiment: Experiment;
  priority?: boolean;
  className?: string;
}) {
  const [w, h] = DIMS[experiment.image] ?? [1440, 960];
  return (
    <figure className={cn("overflow-hidden bg-sunken", className)}>
      {/* Plain <img>: the image optimizer has no server to run on in a static
          export. Each artifact keeps its own visual identity – no tint, no
          filter, nothing imposed by the site's palette. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={experiment.image}
        alt={`${experiment.name} – product visual`}
        width={w}
        height={h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full transition-transform duration-700 ease-[var(--ease-instrument)] group-hover:scale-[1.015]"
      />
    </figure>
  );
}

export default function ExperimentsPage() {
  const creative = territoryByKey.creative;
  // A year with no entries is not rendered, so the section numbering has to be
  // derived from what actually ships – otherwise removing a year leaves a gap.
  const shown = years.filter((y) => y.featured.length > 0 || y.more.length > 0);

  return (
    <PageShell territory="experiments">
      {/* ---------------------------------------------------------------
          HERO – deliberately short. The work starts almost immediately.
          --------------------------------------------------------------- */}
      <Section mark="01 · Experiments" className="pt-14 sm:pt-20">
        <p className="label beat beat-1 text-accent">{experimentsIntro.eyebrow}</p>

        <h1 className="display beat beat-2 mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.06] text-primary">
          {experimentsIntro.headline}
        </h1>

        <div className="beat beat-3 mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <p className="measure text-base leading-relaxed text-secondary sm:text-lg">
            {experimentsIntro.body}
          </p>
          <p className="measure-tight text-base leading-relaxed text-tertiary">
            {experimentsIntro.note}
          </p>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          YEARS – newest first. Each year is a chapter: a marker, the
          featured work, then a compact index of everything else.
          --------------------------------------------------------------- */}
      {shown.map((year, yi) => (
          <Section
            key={year.year}
            id={year.year}
            mark={`${String(yi + 2).padStart(2, "0")} · ${year.year}`}
            className={yi === 0 ? "mt-20 sm:mt-28" : "mt-24 sm:mt-32"}
          >
            {/* Year marker. Large, quiet, structural – it carries the
                chronology so no heading has to say "featured work". */}
            <Reveal>
              <div className="flex items-baseline gap-6 border-t border-hair pt-6">
                <h2 className="font-mono text-[2.5rem] leading-none text-quiet sm:text-[3.25rem]">
                  {year.year}
                </h2>
                <p className="label">
                  {year.featured.length + year.more.length} experiments
                </p>
              </div>
            </Reveal>

            {/* --- Featured: editorial alternating compositions ----------- */}
            {year.featured.map((exp, i) => {
              const flipped = i % 2 === 1;
              return (
                <Reveal key={exp.slug} className="mt-16 sm:mt-24">
                  <article id={exp.slug} className="group scroll-mt-28">
                    {/* The column widths swap with the order. Swapping order
                        alone would put the visual in the narrow column on every
                        flipped row, which inverts the intended 40/60. */}
                    <div
                      className={cn(
                        "grid items-center gap-8 lg:gap-14",
                        flipped
                          ? "lg:grid-cols-[1.6fr_1fr]"
                          : "lg:grid-cols-[1fr_1.6fr]",
                      )}
                    >
                      {/* Text always precedes the visual in the DOM, so mobile
                          stacks identically for every project. Only desktop
                          alternates. */}
                      <div className={flipped ? "lg:order-2" : undefined}>
                        <p className="label">
                          <span className="text-accent">
                            {String(i + 1).padStart(2, "0")}
                          </span>{" "}
                          {year.year}
                        </p>

                        <h3 className="display mt-4 text-[1.75rem] text-primary sm:text-[2.125rem]">
                          {exp.name}
                        </h3>

                        <p className="mt-4 text-base leading-relaxed text-tertiary sm:text-lg">
                          {exp.headline}
                        </p>

                        <p className="measure-tight mt-6 text-sm leading-relaxed text-secondary sm:text-base">
                          {exp.description}
                        </p>

                        {/* Surfaced quietly, not given a section of its own. */}
                        {exp.slug === "creative-war-room" && (
                          <p className="mt-6 border-l border-accent-rule pl-4 text-sm leading-relaxed text-tertiary">
                            {creativeWarRoomThesis}
                          </p>
                        )}

                        <p className="label mt-7 normal-case leading-[1.6] tracking-[0.08em] text-quiet">
                          {exp.footer}
                        </p>
                      </div>

                      <div className={flipped ? "lg:order-1" : undefined}>
                        <Artifact experiment={exp} priority={yi === 0 && i === 0} />
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}

            {/* --- More: a compact index. Native <details>, so it works with
                zero JavaScript and gets keyboard behaviour for free. ------ */}
            {year.more.length > 0 && (
              <Reveal className="mt-20 sm:mt-28">
                <p className="label border-t border-hair pt-6">
                  More from {year.year}
                </p>

                <div className="mt-2">
                  {year.more.map((exp) => (
                    <details
                      key={exp.slug}
                      id={exp.slug}
                      className="group scroll-mt-28 border-b border-hair"
                    >
                      <summary className="flex cursor-pointer list-none items-baseline gap-4 py-6 marker:hidden [&::-webkit-details-marker]:hidden">
                        <span className="display flex-1 text-[1.25rem] text-primary transition-colors duration-150 group-hover:text-accent-2 sm:text-[1.5rem]">
                          {exp.name}
                        </span>
                        <span className="label hidden normal-case tracking-[0.08em] text-quiet sm:block">
                          {exp.footer}
                        </span>
                        <span
                          aria-hidden="true"
                          className="ml-2 font-mono text-lg leading-none text-tertiary transition-transform duration-200 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>

                      <div className="grid gap-8 pb-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
                        <div>
                          <p className="text-base leading-relaxed text-tertiary">
                            {exp.headline}
                          </p>
                          <p className="measure-tight mt-4 text-sm leading-relaxed text-secondary">
                            {exp.description}
                          </p>
                          {exp.award && (
                            <p className="label mt-6 flex items-center gap-2 normal-case leading-[1.6] tracking-[0.08em] text-tertiary">
                              <span
                                aria-hidden="true"
                                className="h-[5px] w-[5px] shrink-0 bg-accent-hi"
                              />
                              {exp.award}
                            </p>
                          )}
                          <p className="label mt-5 normal-case leading-[1.6] tracking-[0.08em] text-quiet sm:hidden">
                            {exp.footer}
                          </p>
                        </div>
                        <Artifact experiment={exp} />
                      </div>
                    </details>
                  ))}
                </div>
              </Reveal>
            )}
          </Section>
        ))}

      {/* ---------------------------------------------------------------
          ONWARD – one directional line toward Creative AI.
          --------------------------------------------------------------- */}
      <Section
        mark={`${String(shown.length + 2).padStart(2, "0")} · Onward`}
        className="mt-24 sm:mt-32"
      >
        <Reveal>
          <Link
            href={creative.href}
            className="group flex flex-wrap items-baseline justify-between gap-6 border-t border-hair pt-10"
          >
            <span className="display text-[1.75rem] text-primary sm:text-[2.25rem]">
              See what I&rsquo;m making with Creative AI
            </span>
            <span className="label inline-flex items-center gap-2 text-tertiary transition-colors duration-150 group-hover:text-accent-2">
              {creative.dimension}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        </Reveal>
      </Section>
    </PageShell>
  );
}
