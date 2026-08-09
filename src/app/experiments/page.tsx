import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { WorkVisual } from "@/components/WorkVisual";
import { cn } from "@/lib/cn";
import type { SelectedWork } from "@/content/home";
import type { Experiment } from "@/content/experiments";
import { experimentsIntro, publishedExperiments } from "@/content/experiments";
import { territoryByKey } from "@/content/territories";

/**
 * Experiments — builder evidence.
 *
 * This page has one job: make it obvious that things actually got built. So it
 * is deliberately the least polished page on the site — a laboratory notebook
 * rather than a case-study deck. Two devices carry that:
 *
 *   1. Every rule here is 1px DASHED. It is the only page where the rule style
 *      changes, and it is what makes the page read as working notes.
 *   2. The entries sit on the shared 12-column grid at different spans and
 *      different vertical offsets, so nothing baseline-aligns across the page —
 *      but every left edge still lands on a column line, so the irregularity
 *      reads as a notebook, not as a broken layout.
 *
 * Only published entries render (`publishedExperiments`), which today is two.
 * The layout is tuned for a short list: a full-width log with an index at the
 * top, not a grid that needs six items before it looks finished.
 */

export const metadata: Metadata = {
  title: "Experiments",
  description: territoryByKey.experiments.body,
  alternates: { canonical: "/experiments/" },
  openGraph: { url: "/experiments/" },
};

/**
 * Placement on the 12-column grid. Left edges snap to column lines; spans and
 * vertical offsets differ so no two entries share a baseline. The cycle is
 * four long so a growing list keeps varying, but the first two values are the
 * ones actually tuned — they are what a visitor sees today.
 *
 * Everything is `lg:` prefixed: below the rail breakpoint the offsets collapse
 * to zero and each entry is simply full width.
 */
const PLACEMENTS = [
  { col: "lg:col-start-1 lg:col-end-10", offset: "" },
  { col: "lg:col-start-4 lg:col-end-13", offset: "lg:mt-44" },
  { col: "lg:col-start-2 lg:col-end-11", offset: "lg:mt-32" },
  { col: "lg:col-start-5 lg:col-end-13", offset: "lg:mt-48" },
];

/**
 * Schematics are only drawn where one exists that encodes the real mechanic of
 * that build. An unmapped entry renders no figure rather than decorative line
 * art standing in for evidence.
 */
const FIGURES: Record<string, SelectedWork["visual"]> = {
  "trust-receipt": "receipt",
  "ad-ai-pulse": "pulse",
};

/** The four questions the page exists to answer, in reading order. */
function fieldsOf(e: Experiment) {
  return [
    { label: "Problem", value: e.problem, payload: false },
    { label: "Built", value: e.built, payload: false },
    { label: "My contribution", value: e.contribution, payload: false },
    { label: "What it taught", value: e.learning, payload: true },
  ].filter((f) => f.value);
}

/** Two-digit typeset figure. Every number on this page is a measurement. */
const pad = (n: number) => String(n).padStart(2, "0");
/** Zero-based position → its printed entry number. */
const idx = (i: number) => pad(i + 1);

export default function ExperimentsPage() {
  const entries = publishedExperiments;
  const ventures = territoryByKey.ventures;

  return (
    <PageShell territory="experiments">
      {/* ---------------------------------------------------------------
          HEADER — what this page is, and the index of what's in it.
          --------------------------------------------------------------- */}
      <Section mark="01 · Experiments" className="pt-16 sm:pt-24">
        <p className="label beat beat-1 text-accent">{experimentsIntro.eyebrow}</p>

        <h1 className="display beat beat-2 mt-8 text-[clamp(2.25rem,6vw,4rem)] leading-[1.06] text-primary">
          {experimentsIntro.headline}
        </h1>

        <div className="beat beat-3 mt-10 max-w-[36rem]">
          {experimentsIntro.body.map((line) => (
            <p key={line} className="mt-4 text-base leading-relaxed text-secondary">
              {line}
            </p>
          ))}
        </div>

        {/* The index. With a short list this is what makes the page feel like a
            notebook with contents rather than a page that ran out of items. */}
        <nav aria-label="Index of experiments" className="beat beat-4 mt-14">
          <div className="flex items-baseline justify-between gap-6">
            <p className="label">Index</p>
            <p className="label">{pad(entries.length)} entries</p>
          </div>
          <div className="rule-draw mt-3 border-t border-dashed border-strong" />
          <ol>
            {entries.map((e, i) => (
              <li key={e.slug} className="border-b border-dashed border-hair">
                <a
                  href={`#${e.slug}`}
                  className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4"
                >
                  <span className="label w-8 shrink-0 text-accent">{idx(i)}</span>
                  <span className="text-sm text-primary transition-colors duration-150 group-hover:text-accent">
                    {e.title}
                  </span>
                  <span className="label ml-auto transition-colors duration-150 group-hover:text-primary">
                    {e.category}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Section>

      {/* ---------------------------------------------------------------
          THE LOG — each entry as a module of dashed rules and labelled
          fields. Four fields, always in the same order, so the page can be
          scanned vertically by field rather than read end to end.
          --------------------------------------------------------------- */}
      <Section mark="02 · Build log" className="mt-28 sm:mt-36">
        <SectionHead eyebrow="Build log" terminus={`${pad(entries.length)} written up`} />

        <div className="mt-16 lg:mt-20">
          {entries.map((e, i) => {
            const place = PLACEMENTS[i % PLACEMENTS.length];
            const figure = FIGURES[e.slug];

            return (
              <div
                key={e.slug}
                className={cn(
                  "lg:grid lg:grid-cols-12 lg:gap-x-6",
                  i > 0 && "mt-24 sm:mt-32",
                  i > 0 && place.offset,
                )}
              >
                <Reveal className={place.col}>
                  <article id={e.slug} className="scroll-mt-28">
                    {/* Module head: category, and the entry's own number. */}
                    <div className="flex items-baseline justify-between gap-6 border-t border-dashed border-strong pt-5">
                      <p className="label text-accent">{e.category}</p>
                      {e.meta && <p className="label">{e.meta}</p>}
                    </div>

                    <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-2xl leading-none text-tertiary">
                          {idx(i)}
                        </span>
                        {/* h2: the build-log section head carries no headline
                            of its own, so each entry is a top-level subsection
                            and the heading order stays h1 → h2. */}
                        <h2 className="display text-2xl text-primary sm:text-3xl">
                          {e.title}
                        </h2>
                      </div>

                      {figure && (
                        <figure
                          aria-hidden="true"
                          className="w-full max-w-[15rem] shrink-0"
                        >
                          <WorkVisual
                            variant={figure}
                            className="w-full border border-dashed border-hair bg-sunken"
                          />
                          <figcaption className="label mt-2">
                            Fig. {idx(i)}
                          </figcaption>
                        </figure>
                      )}
                    </div>

                    {/* The four fields. Mono label left, argument right — a
                        notebook field list, not a card. */}
                    <dl className="mt-10">
                      {fieldsOf(e).map((f) => (
                        <div
                          key={f.label}
                          className="grid gap-2 border-t border-dashed border-hair py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
                        >
                          <dt className="label flex items-center gap-2 sm:pt-1">
                            {f.payload && (
                              <span
                                aria-hidden="true"
                                className="inline-block h-[5px] w-[5px] shrink-0 bg-accent"
                              />
                            )}
                            {f.label}
                          </dt>
                          <dd
                            className={cn(
                              "measure text-sm leading-relaxed sm:text-base",
                              f.payload ? "text-primary" : "text-secondary",
                            )}
                          >
                            {f.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {e.stack.length > 0 && (
                      <p className="label border-t border-dashed border-hair pt-5">
                        {e.stack.join(" · ")}
                      </p>
                    )}
                  </article>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          ONWARD — where the experiments are heading.
          --------------------------------------------------------------- */}
      <Section mark="03 · Onward" className="mt-32 sm:mt-44">
        <SectionHead
          eyebrow="Next"
          headline={ventures.headline}
          terminus={`${ventures.index} · ${ventures.dimension}`}
        >
          <p className="measure mt-6 text-base leading-relaxed text-secondary">
            {ventures.body}
          </p>
          <Link
            href={ventures.href}
            className="group mt-8 inline-flex items-center gap-3 border border-dashed border-strong px-5 py-3 text-sm text-secondary transition-colors duration-150 hover:border-accent-rule hover:text-primary"
          >
            {ventures.cta}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </SectionHead>
      </Section>
    </PageShell>
  );
}
