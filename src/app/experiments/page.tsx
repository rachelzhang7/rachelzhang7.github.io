import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import {
  experimentsClosing,
  experimentsIntro,
  principles,
  years,
  type Experiment,
} from "@/content/experiments";
import { BuildLoop } from "./BuildLoop";

export const metadata: Metadata = {
  title: "Experiments",
  description: experimentsIntro.body[0],
  alternates: { canonical: "/experiments/" },
  openGraph: { url: "/experiments/" },
};

/** Intrinsic dimensions, so every image reserves its space before it loads. */
const DIMS: Record<string, [number, number]> = {
  "/media/experiments/ad-ai-pulse.jpg": [1600, 828],
  "/media/experiments/beam.jpg": [1600, 1066],
  "/media/experiments/creative-war-room.jpg": [1440, 810],
  "/media/experiments/anchor.jpg": [1440, 960],
  "/media/experiments/trust-receipt.jpg": [1440, 960],
  "/media/experiments/cortex.jpg": [1440, 960],
};

function Artifact({ experiment, priority = false }: { experiment: Experiment; priority?: boolean }) {
  const [w, h] = DIMS[experiment.image] ?? [1440, 960];
  return (
    <figure className="overflow-hidden bg-sunken">
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
  const shown = years.filter((y) => y.featured.length > 0 || y.more.length > 0);

  return (
    <PageShell territory="experiments">
      {/* ---------------------------------------------------------------
          HERO – the claim on one side, the loop it refers to on the other.
          --------------------------------------------------------------- */}
      <Section mark="01 · Experiments" className="pt-12 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <p className="label beat beat-1 text-accent-2">{experimentsIntro.eyebrow}</p>

            <h1 className="display beat beat-2 mt-6 text-[clamp(2.5rem,5.6vw,4.25rem)] leading-[1.04] text-primary">
              {experimentsIntro.headline.lead}{" "}
              <span className="italic text-accent-2">
                {experimentsIntro.headline.emphasis}
              </span>
              <span className="text-accent-2">.</span>
            </h1>

            <div className="beat beat-3 mt-8 flex flex-col gap-4">
              {experimentsIntro.body.map((line) => (
                <p key={line} className="measure-tight text-base leading-relaxed text-secondary">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="beat beat-4">
            <BuildLoop />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          WHAT BUILDING IS TEACHING ME – three claims, split by rules.
          --------------------------------------------------------------- */}
      <Section mark="02 · What building teaches" className="mt-20 sm:mt-28">
        <Reveal>
          <p className="label border-t border-hair pt-6">What building is teaching me</p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-0">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className={cn(
                  "flex flex-col",
                  i > 0 && "lg:border-l lg:border-hair lg:pl-10",
                  i < principles.length - 1 && "lg:pr-10",
                )}
              >
                <h2 className="display text-[1.5rem] text-primary sm:text-[1.75rem]">
                  {p.title}
                </h2>
                <div className="mt-5 h-px w-10 bg-accent-2" aria-hidden="true" />
                <p className="mt-5 text-sm leading-relaxed text-secondary">{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          EXPERIMENTS IN PRACTICE – alternating, artifact-led.
          --------------------------------------------------------------- */}
      {shown.map((year, yi) => (
        <Section
          key={year.year}
          id={year.year}
          mark={`0${yi + 3} · ${year.year}`}
          className="mt-20 sm:mt-28"
        >
          <Reveal>
            <p className="label border-t border-hair pt-6">
              Experiments in practice · {year.year}
            </p>
          </Reveal>

          {year.featured.map((exp, i) => {
            const flipped = i % 2 === 1;
            return (
              <Reveal key={exp.slug} className="mt-12 sm:mt-16">
                <article id={exp.slug} className="group scroll-mt-28">
                  <div
                    className={cn(
                      "grid items-center gap-8 lg:gap-12",
                      flipped ? "lg:grid-cols-[1.5fr_1fr]" : "lg:grid-cols-[1fr_1.5fr]",
                    )}
                  >
                    {/* Text first in the DOM: mobile stacks the same way every
                        time, only desktop alternates. */}
                    <div className={flipped ? "lg:order-2" : undefined}>
                      <div className="flex items-baseline gap-5">
                        <span className="font-mono text-[2rem] leading-none text-accent-2 sm:text-[2.5rem]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="display text-[1.75rem] text-primary sm:text-[2.125rem]">
                          {exp.name}
                        </h3>
                      </div>

                      <p className="measure-tight mt-5 text-base leading-relaxed text-secondary">
                        {exp.description}
                      </p>

                      {exp.question && (
                        <div className="mt-7">
                          <p className="label text-accent-2">Question I was testing</p>
                          <p className="measure-tight mt-3 text-base leading-relaxed text-secondary">
                            {exp.question}
                          </p>
                        </div>
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

          {/* --- More: compact rows. Native <details>, zero JavaScript. ---- */}
          {year.more.length > 0 && (
            <Reveal className="mt-16 sm:mt-24">
              <p className="label border-t border-hair pt-6">More from {year.year}</p>

              <div className="mt-2">
                {year.more.map((exp, j) => {
                  const n = year.featured.length + j + 1;
                  return (
                    <details
                      key={exp.slug}
                      id={exp.slug}
                      className="group scroll-mt-28 border-b border-hair"
                    >
                      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-6 gap-y-2 py-5 marker:hidden [&::-webkit-details-marker]:hidden">
                        <span className="font-mono text-[1.375rem] leading-none text-accent-2">
                          {String(n).padStart(2, "0")}
                        </span>
                        <span className="display min-w-[8rem] flex-1 text-[1.25rem] text-primary transition-colors duration-150 group-hover:text-accent-2">
                          {exp.name}
                        </span>
                        <span className="label hidden normal-case tracking-[0.08em] text-quiet sm:block">
                          {exp.footer}
                        </span>
                        {exp.award && (
                          <span className="label hidden items-center gap-2 normal-case tracking-[0.08em] text-tertiary lg:flex">
                            <span aria-hidden="true" className="h-[5px] w-[5px] bg-accent-hi" />
                            {exp.award}
                          </span>
                        )}
                        <span
                          aria-hidden="true"
                          className="ml-auto font-mono text-lg leading-none text-tertiary transition-transform duration-200 group-open:rotate-45"
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
                            <p className="label mt-6 flex items-center gap-2 normal-case leading-[1.6] tracking-[0.08em] text-tertiary lg:hidden">
                              <span aria-hidden="true" className="h-[5px] w-[5px] shrink-0 bg-accent-hi" />
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
                  );
                })}
              </div>
            </Reveal>
          )}
        </Section>
      ))}

      {/* ---------------------------------------------------------------
          CLOSING – one line, centred, ending the page.
          --------------------------------------------------------------- */}
      <Section mark="Closing" className="mt-24 sm:mt-32">
        <Reveal>
          <p className="display text-balance text-center text-[clamp(1.875rem,4.4vw,3.25rem)] leading-[1.1] text-primary">
            {experimentsClosing.lead}
            <span className="text-accent-2">.</span>
          </p>
        </Reveal>
      </Section>
    </PageShell>
  );
}
