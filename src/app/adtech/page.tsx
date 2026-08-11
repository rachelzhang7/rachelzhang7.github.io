import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import {
  adtechIntro,
  chapters,
  lessons,
  papers,
  trends,
  trendsTimeline,
  writing,
  type Lesson,
} from "@/content/adtech";
import { HeroField } from "./HeroField";
import { WORK_VISUALS } from "./WorkVisuals";
import { CreativeSpace, GenerativeProgression, IntentPath } from "./TrendVisuals";

export const metadata: Metadata = {
  title: "AdTech",
  description: adtechIntro.body,
  alternates: { canonical: "/adtech/" },
  openGraph: { url: "/adtech/" },
};

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Column separators. Padding is symmetric and identical on every column, and
 * the grid cancels the outer half with a negative margin – asymmetric padding
 * makes the columns different content widths, which makes the diagrams
 * different heights, which the subgrid then has to pad out with dead air.
 *
 * The class strings are literal on purpose – Tailwind scans source text, so an
 * interpolated `lg:pl-${n}` is never emitted and the padding silently vanishes.
 */
function column(i: number) {
  return cn("lg:px-6", i > 0 && "lg:border-l lg:border-hair");
}

/** Same rules, tighter gutters – the trend diagrams need the width back. */
function trendColumn(i: number) {
  return cn("lg:px-5", i > 0 && "lg:border-l lg:border-hair");
}

/* ── lesson glyphs ─────────────────────────────────────────────────────── */

/** Small, geometric, and doing real work: a field of signals, a system with a
 *  centre, a rising trajectory. Not icon-container decoration. */
function LessonGlyph({ kind }: { kind: Lesson["glyph"] }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className="h-8 w-8 shrink-0 text-accent-2 sm:h-9 sm:w-9"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "field" &&
        [0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <circle
              key={`${r}-${c}`}
              cx={7 + c * 11}
              cy={7 + r * 11}
              r="2"
              fill="currentColor"
              stroke="none"
              opacity={0.35 + (r + c) * 0.11}
            />
          )),
        )}

      {kind === "system" && (
        <>
          <circle cx="18" cy="18" r="15" strokeWidth="1" opacity="0.3" />
          <circle cx="18" cy="18" r="10" strokeWidth="1" opacity="0.55" />
          <circle cx="18" cy="18" r="5" strokeWidth="1.2" />
          <circle cx="18" cy="18" r="2.2" fill="currentColor" stroke="none" />
        </>
      )}

      {kind === "rise" && (
        <>
          <path d="M4 30 30 6" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M19 6h11v11" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

export default function AdTech() {
  return (
    <PageShell territory="adtech">
      {/* ---------------------------------------------------------------
          01 · HERO – the claim, and the field it refers to. The visual is
          atmosphere with a thesis, never an architecture diagram.
          --------------------------------------------------------------- */}
      <Section mark="01 · AdTech" className="pt-10 sm:pt-14">
        <div className="grid items-center gap-10 lg:min-h-[58vh] lg:grid-cols-[53fr_47fr] lg:gap-10">
          <div>
            <p className="label beat beat-1 text-accent-2">{adtechIntro.eyebrow}</p>

            <h1 className="display beat beat-2 mt-6 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.07] text-primary">
              {adtechIntro.headline.lead}{" "}
              <span className="italic text-accent-2">
                {adtechIntro.headline.emphasis}
              </span>
              <span className="text-accent-2">.</span>
            </h1>

            <p className="beat beat-3 measure-tight mt-8 text-sm leading-relaxed text-secondary sm:text-base">
              {adtechIntro.body}
            </p>
          </div>

          {/* Source order already puts the claim first on mobile. The field
              bleeds toward the edge the way it does in the mockup; 4vw always
              stays inside the shell gutter, so it can never cause overflow. */}
          <div className="beat beat-4 lg:-mr-[4vw]">
            <HeroField />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          02 · WHAT THE WORK HAS TAUGHT ME – one horizontal band, three
          claims, equal tops. Typography only; no cards, no numbering.
          --------------------------------------------------------------- */}
      <Section mark="02 · What the work taught" className="mt-16 sm:mt-24">
        <Reveal>
          <div className="hairline rule-draw" />
          <h2 className="display mt-8 text-[clamp(1.5rem,3vw,2rem)] text-primary">
            What the work has taught me.
          </h2>
        </Reveal>

        <Reveal className="mt-10 sm:mt-12">
          <div className="grid gap-10 lg:-mx-6 lg:grid-cols-3 lg:gap-0">
            {lessons.map((l, i) => (
              <div key={l.emphasis} className={cn("flex gap-4 sm:gap-5", column(i))}>
                <LessonGlyph kind={l.glyph} />
                <div className="min-w-0">
                  <p className="display text-[1.125rem] leading-[1.28] text-primary sm:text-[1.25rem]">
                    {l.lead}
                    <span className="text-accent-2">{l.emphasis}</span>
                    {l.tail}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-secondary">{l.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          03 · SELECTED WORK – three chapters, not six cards. The column
          order IS the argument: observe, understand, act.
          --------------------------------------------------------------- */}
      <Section mark="03 · Selected work" className="mt-20 sm:mt-28">
        <Reveal>
          <div className="hairline rule-draw" />
          <h2 className="display mt-8 text-[clamp(1.5rem,3vw,2rem)] text-primary">
            Selected Work
          </h2>
          <p className="measure mt-4 text-sm leading-relaxed text-secondary sm:text-base">
            My work has gradually moved from data foundations toward intelligence
            and automation.
          </p>
          {/* Said once, plainly, so three repeated captions aren't needed. */}
          <p className="label mt-5 normal-case leading-[1.6] tracking-[0.08em] text-quiet">
            The diagrams below are conceptual illustrations, not product screenshots.
          </p>
        </Reveal>

        {/* Subgrid, so the four bands – label, idea, diagram, projects – share
            one set of row heights across all three chapters. A min-height guess
            breaks the moment one title wraps to an extra line. */}
        <div className="mt-12 grid gap-x-8 gap-y-16 lg:-mx-6 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto] lg:gap-0">
          {chapters.map((c, i) => {
            const Visual = WORK_VISUALS[c.visual];
            return (
              <Reveal key={c.index} delay={Math.min(i, 3) * 70}
                className={cn("lg:row-span-4 lg:grid lg:grid-rows-subgrid", column(i))}>
                <div className="flex items-center gap-4">
                  <p className="label text-accent-2">{c.index}</p>
                  <p className="label text-accent-2">{c.name}</p>
                  {/* The trajectory, drawn between chapters rather than stated. */}
                  {i < chapters.length - 1 && (
                    <svg
                      viewBox="0 0 44 8"
                      className="ml-auto hidden h-2 w-11 text-strong lg:block"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M0 4h42M38.5 1 42 4l-3.5 3" />
                    </svg>
                  )}
                </div>

                <p className="display mt-4 text-[1.0625rem] leading-[1.3] text-tertiary">
                  {c.idea}
                </p>

                <figure className="mt-5" role="img" aria-label={c.alt}>
                  <Visual />
                </figure>

                <ul className="mt-7 flex flex-col gap-6">
                  {c.projects.map((p) => (
                    <li key={p.title} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.5rem] h-[5px] w-[5px] shrink-0 rounded-full bg-accent-2"
                      />
                      <div className="min-w-0">
                        <h3 className="display text-[1.0625rem] leading-[1.25] text-primary">
                          {p.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-secondary">
                          {p.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          04 · INDUSTRY TRENDS – perspective, not evidence. All three start
          on the same baseline, under a heading that spans the section.
          --------------------------------------------------------------- */}
      <Section mark="04 · Industry trends" className="mt-20 sm:mt-28">
        <Reveal>
          <div className="hairline rule-draw" />
          <h2 className="display mt-8 text-[clamp(1.5rem,3vw,2rem)] text-primary">
            Industry Trends
          </h2>
          <p className="measure mt-4 text-sm leading-relaxed text-secondary sm:text-base">
            {trends.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:-mx-5 lg:grid-cols-[0.9fr_1.25fr_0.85fr] lg:grid-rows-[auto_auto_auto] lg:gap-x-0 lg:gap-y-0">
          {trends.items.map((t, i) => (
            <Reveal key={t.index} delay={Math.min(i, 3) * 70}
              className={cn("lg:row-span-3 lg:grid lg:grid-rows-subgrid", trendColumn(i))}>
              {/* Fixed-height heading block: this is what keeps 01/02/03 on one
                  baseline when their titles wrap to different depths. */}
              <div className="flex items-baseline gap-3">
                <span className="label text-accent-2">{t.index}</span>
                <h3 className="display text-[1.125rem] leading-[1.3] text-primary sm:text-[1.1875rem]">
                  {t.title}
                </h3>
              </div>

              <div className="mt-6 self-start" role="img" aria-label={t.alt}>
                {i === 0 && <CreativeSpace />}
                {i === 1 && <GenerativeProgression />}
                {i === 2 && <IntentPath />}
              </div>

              {/* 02 carries the sources instead of a closing line. */}
              {i === 1 ? (
                <div className="mt-8">
                  <p className="label text-accent-2">Research signals</p>
                  <ul className="mt-3">
                    {papers.map((p) => (
                      <li key={p.href}>
                        <a
                          href={p.href}
                          {...EXTERNAL}
                          className="group flex items-baseline gap-3 border-t border-hair py-3.5"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.8125rem] leading-[1.35] text-secondary transition-colors duration-150 group-hover:text-accent-2">
                              {p.title}
                            </span>
                            <span className="label mt-2 block normal-case leading-[1.5] tracking-[0.08em] text-quiet">
                              {p.authors} · {p.year}
                            </span>
                          </span>
                          <span
                            aria-hidden="true"
                            className="label shrink-0 text-quiet transition-colors duration-150 group-hover:text-accent-2"
                          >
                            &#8599;
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-7 text-sm leading-relaxed text-secondary">{t.note}</p>
              )}
            </Reveal>
          ))}
        </div>

        {/* The trajectory under the trends – one generated creative, then
            generation at scale. The question it ends on is the page's thesis. */}
        <Reveal className="mt-16 sm:mt-20">
          <div className="border-t border-hair pt-8">
            <p className="label text-accent-2">{trendsTimeline.caption}</p>

            <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-0">
              {trendsTimeline.stages.map((stage, i) => (
                <div
                  key={stage.label}
                  className={cn(
                    "relative",
                    i > 0 && "sm:border-l sm:border-hair sm:pl-8",
                  )}
                >
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="label absolute -left-3 top-0 hidden text-quiet sm:block"
                    >
                      →
                    </span>
                  )}
                  <span className="label text-quiet">{stage.year}</span>
                  <p className="display mt-3 text-[1.25rem] leading-[1.25] text-primary sm:text-[1.375rem]">
                    {stage.label}
                  </p>
                  <p className="measure mt-3 text-sm leading-relaxed text-secondary">
                    {stage.note}
                  </p>
                </div>
              ))}
            </div>

            <p className="display measure mt-12 text-balance text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-primary">
              {trendsTimeline.question}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          05 · WRITING – one editorial row. A list from the start, so a
          second entry needs no layout change and the year stays metadata.
          --------------------------------------------------------------- */}
      <Section mark="05 · Writing" className="mt-20 sm:mt-28">
        <Reveal>
          <div className="hairline rule-draw" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[auto_1fr] lg:gap-12">
            <h2 className="display text-[1.375rem] text-accent-2 lg:border-r lg:border-hair lg:pr-12">
              {writing.label}
            </h2>

            <ul className="flex flex-col">
              {writing.entries.map((e) => (
                <li key={e.href}>
                  <a
                    href={e.href}
                    {...EXTERNAL}
                    className="group flex flex-wrap items-baseline gap-x-8 gap-y-4 py-1"
                  >
                    <span className="w-full sm:w-auto sm:min-w-0 sm:flex-1">
                      <span className="display text-[1.125rem] leading-[1.3] text-primary transition-colors duration-150 group-hover:text-accent-2 sm:text-[1.25rem]">
                        {e.title}
                      </span>{" "}
                      <span className="label ml-1 text-quiet">{e.year}</span>
                      <span className="label mt-3 block normal-case leading-[1.5] tracking-[0.08em] text-quiet">
                        {e.meta}
                      </span>
                    </span>
                    <span className="label inline-flex shrink-0 items-center gap-2 text-tertiary transition-colors duration-150 group-hover:text-accent-2">
                      {e.cta}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        &#8599;
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>
    </PageShell>
  );
}
