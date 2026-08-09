import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import {
  adtechIntro,
  caseStudies,
  howIThink,
  systemIntro,
  whatsNext,
} from "@/content/adtech";
import { SystemSpine } from "./SystemSpine";

export const metadata: Metadata = {
  title: "AdTech",
  description: adtechIntro.body[0],
  alternates: { canonical: "/adtech/" },
  openGraph: { url: "/adtech/" },
};

/**
 * The page's own index. Rendered once as a contents strip under the header and
 * reused as the anchor targets, so the section marks that feed the rail and the
 * links a reader can click can never drift apart.
 */
const contents = [
  { id: "system", mark: "02", label: "The system" },
  { id: "work", mark: "03", label: "Selected work" },
  { id: "thinking", mark: "04", label: "How I think" },
  { id: "next", mark: "05", label: "What's next" },
];

export default function AdTech() {
  return (
    <PageShell territory="adtech">
      {/* ---------------------------------------------------------------
          HEADER – the claim, then the two paragraphs that qualify it.
          --------------------------------------------------------------- */}
      <Section mark="01 · AdTech" className="pt-16 sm:pt-24">
        <p className="label beat beat-1 text-accent">{adtechIntro.eyebrow}</p>

        <h1 className="display beat beat-2 mt-8 text-balance text-[clamp(2.25rem,6vw,4rem)] leading-[1.08] text-primary">
          {adtechIntro.headline}
        </h1>

        <div className="beat beat-3 mt-12 grid gap-8 lg:grid-cols-2 lg:gap-16">
          {adtechIntro.body.map((line) => (
            <p key={line} className="measure text-base leading-relaxed text-secondary">
              {line}
            </p>
          ))}
        </div>

        {/* Contents. A specification opens with its index. */}
        <div className="beat beat-4 mt-14">
          <div className="hairline rule-draw" />
          <nav aria-label="On this page">
            <ul className="grid grid-cols-2 gap-px bg-hair sm:grid-cols-4">
              {contents.map((item) => (
                <li key={item.id} className="bg-canvas">
                  <a
                    href={`#${item.id}`}
                    className="group flex items-baseline gap-3 py-4 pr-4 transition-colors duration-150"
                  >
                    <span className="label transition-colors duration-150 group-hover:text-accent-2">
                      {item.mark}
                    </span>
                    <span className="text-sm text-secondary transition-colors duration-150 group-hover:text-primary">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hairline" />
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          THE SYSTEM – five stages on one rule. Rules and type, no boxes.
          --------------------------------------------------------------- */}
      <Section id="system" mark="02 · The system" className="mt-28 sm:mt-40">
        <SectionHead
          eyebrow="The system"
        >
          <p className="measure mt-6 text-base leading-relaxed text-secondary">
            {systemIntro.body}
          </p>
        </SectionHead>

        <Reveal className="mt-14">
          <SystemSpine />
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          SELECTED WORK – a ledger with fixed column stops, not a card grid.
          Each row is one problem, read left to right: index, what it was,
          what was built, what was hard, what it touched.
          --------------------------------------------------------------- */}
      <Section id="work" mark="03 · Selected work" className="mt-28 sm:mt-40">
        <SectionHead
          eyebrow="Selected work" />
        <div className="mt-14">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={Math.min(i, 4) * 60}>
              <article className="group border-t border-hair py-10 transition-colors duration-150 hover:border-accent-2-rule">
                <div className="grid gap-x-8 gap-y-6 lg:grid-cols-[3rem_14rem_minmax(0,1fr)_9rem]">
                  {/* index */}
                  <p className="font-mono text-2xl leading-none text-tertiary transition-colors duration-150 group-hover:text-accent-2">
                    {study.index}
                  </p>

                  {/* title + category + the problem */}
                  <div>
                    <p className="label">{study.category}</p>
                    <h3 className="display mt-4 text-xl text-primary sm:text-2xl">
                      {study.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-tertiary">
                      {study.problem}
                    </p>
                  </div>

                  {/* summary, then the insight given its own margin rule */}
                  <div>
                    <p className="measure text-base leading-relaxed text-secondary">
                      {study.summary}
                    </p>
                    <div className="mt-6 border-l border-hair pl-5 transition-colors duration-150 group-hover:border-strong">
                      <p className="label">Insight</p>
                      <p className="measure mt-3 text-sm leading-[1.75] text-secondary">
                        {study.insight}
                      </p>
                    </div>
                  </div>

                  {/* Tags, stacked in the right margin like a spec sheet.
                      Each carries a 1px keyline: longer tags wrap to two lines
                      in this column, and without it "Ads Infrastructure" reads
                      as two separate tags. Neutral rather than accent – three
                      keylines across six studies would spend the page's whole
                      accent budget on decoration. */}
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 lg:block lg:space-y-2">
                    {study.tags.map((tag) => (
                      <li
                        key={tag}
                        className="label border-l border-strong pl-2.5 leading-[1.5]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-hair" />
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          HOW I THINK – the one place on the site that asks to be read
          rather than scanned: one narrow measure, generous leading.
          --------------------------------------------------------------- */}
      <Section id="thinking" mark="04 · How I think" className="mt-28 sm:mt-40">
        <SectionHead
          eyebrow={howIThink.eyebrow}
          headline={howIThink.headline}
        />

        <Reveal className="mt-12">
          <div className="measure border-l border-hair pl-6 sm:pl-10">
            {howIThink.body.map((paragraph, i) => (
              <p
                key={paragraph}
                className={
                  i === 0
                    ? "text-[1.0625rem] leading-[1.85] text-primary"
                    : "mt-7 text-[1.0625rem] leading-[1.85] text-secondary"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          WHAT'S NEXT – the progression, with the last term carrying the
          accent as a 1px underline rather than as coloured display type.
          --------------------------------------------------------------- */}
      <Section id="next" mark="05 · What's next" className="mt-28 sm:mt-40">
        <SectionHead
          eyebrow={whatsNext.eyebrow} />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            {whatsNext.body.map((line) => (
              <p
                key={line}
                className="measure mt-5 text-base leading-relaxed text-secondary first:mt-0"
              >
                {line}
              </p>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <ol className="flex flex-col gap-4">
              {whatsNext.progression.map((term, i) => {
                const isLast = i === whatsNext.progression.length - 1;
                return (
                  <li key={term} className="flex items-baseline gap-4">
                    <span className="label w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={
                        isLast
                          ? "display text-[clamp(1.5rem,3.2vw,2.25rem)] text-primary [text-decoration-color:var(--accent)] [text-decoration-line:underline] [text-decoration-thickness:1px] [text-underline-offset:0.16em]"
                          : "display text-[clamp(1.5rem,3.2vw,2.25rem)] text-quiet"
                      }
                    >
                      {term}
                    </span>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <div className="hairline" />
          <div className="flex flex-col gap-8 pt-10 lg:flex-row lg:items-baseline lg:justify-between lg:gap-16">
            <p className="display measure-tight text-balance text-[clamp(1.5rem,3vw,2.25rem)] text-primary">
              {whatsNext.closing}
            </p>
            <Link
              href="/experiments/"
              className="group inline-flex shrink-0 items-center gap-3 self-start border border-strong px-5 py-3 text-sm text-secondary transition-colors duration-150 hover:border-accent hover:text-primary"
            >
              Experiments
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </Section>
    </PageShell>
  );
}
