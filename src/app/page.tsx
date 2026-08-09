import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { HeroTrace } from "@/components/HeroTrace";
import { WorkVisual } from "@/components/WorkVisual";
import { territories } from "@/content/territories";
import { closing, credentials, hero, selectedWork, workIntro } from "@/content/home";

export default function Home() {
  return (
    <PageShell territory="identity">
      {/* ---------------------------------------------------------------
          HERO — positioning, answered in 10–15 seconds.
          --------------------------------------------------------------- */}
      <Section mark="01 · Identity" className="pt-16 sm:pt-24">
        <p className="label beat beat-1 text-accent">{hero.eyebrow}</p>

        <h1 className="display beat beat-2 mt-8 text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.08] text-primary">
          {hero.headline.lead}{" "}
          {/* Accent as a 1px rule, never as coloured display type. Real
              text-decoration rather than a positioned bar, so it skips the
              descenders and never collides with the following line. */}
          <span className="[text-decoration-line:underline] [text-decoration-color:var(--accent)] [text-decoration-thickness:1px] [text-underline-offset:0.14em]">
            {hero.headline.emphasis}
          </span>{" "}
          {hero.headline.trail}
        </h1>

        <div className="beat beat-3 mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[34rem]">
            {hero.body.map((line) => (
              <p
                key={line}
                className="mt-4 text-base leading-relaxed text-secondary sm:text-lg"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {hero.actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.primary
                    ? "group inline-flex items-center gap-3 border border-accent px-5 py-3 text-sm text-primary transition-colors duration-150 hover:bg-accent-ring"
                    : "group inline-flex items-center gap-3 border border-strong px-5 py-3 text-sm text-secondary transition-colors duration-150 hover:border-line-hover hover:text-primary"
                }
              >
                {action.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* The trace is the hero's largest element, and it reads as one
            instrument spanning the full measure. */}
        <div className="beat beat-4 mt-14">
          <HeroTrace />
        </div>

        {/* Credibility strip, sitting on the trace's baseline rule so it reads
            as part of the same instrument rather than a floating widget. */}
        <dl className="beat beat-5 grid grid-cols-1 gap-px border-y border-hair bg-hair sm:grid-cols-3">
          {credentials.map((c) => (
            <div key={c.value} className="flex items-baseline gap-3 bg-canvas px-1 py-4">
              <dt className="text-sm text-primary">{c.value}</dt>
              <dd className="label">{c.label}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ---------------------------------------------------------------
          THE WORK — four editorial panels, not a card grid.
          --------------------------------------------------------------- */}
      <Section mark="02 · The work" className="mt-32 sm:mt-44">
        <SectionHead
          eyebrow={workIntro.eyebrow}
          headline={workIntro.headline}
          terminus="04 threads"
        >
          <p className="measure mt-6 text-base leading-relaxed text-secondary">
            {workIntro.body}
          </p>
        </SectionHead>

        <div className="mt-16">
          {territories.map((t, i) => (
            <Reveal key={t.key} delay={i * 60}>
              <Link
                href={t.href}
                data-territory={t.key}
                className="group block border-t border-hair py-10 transition-colors duration-150 hover:border-accent-rule"
              >
                <div className="grid gap-6 lg:grid-cols-[6rem_1fr_auto] lg:items-baseline lg:gap-10">
                  <div className="flex items-baseline gap-4 lg:block">
                    <span className="font-mono text-2xl text-tertiary transition-colors duration-150 group-hover:text-accent">
                      {t.index}
                    </span>
                    <span className="label mt-2 block text-accent">
                      {t.dimension}
                    </span>
                  </div>

                  <div>
                    <h3 className="display text-2xl text-primary sm:text-[1.75rem]">
                      {t.title}
                      <span className="ml-3 align-middle text-base text-tertiary">
                        {t.headline}
                      </span>
                    </h3>
                    <p className="measure mt-4 text-sm leading-relaxed text-secondary sm:text-base">
                      {t.body}
                    </p>
                  </div>

                  <span className="label inline-flex items-center gap-2 text-tertiary transition-colors duration-150 group-hover:text-primary">
                    {t.cta}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
          <div className="border-t border-hair" />
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          SELECTED WORK — proof, without becoming a catalogue.
          --------------------------------------------------------------- */}
      <Section mark="03 · Selected work" className="mt-32 sm:mt-44">
        <SectionHead
          eyebrow="Selected work"
          headline="A few things I've been building."
          terminus={`${selectedWork.length} projects`}
        />

        <div className="mt-14 grid gap-px border border-hair bg-hair md:grid-cols-2 lg:grid-cols-3">
          {selectedWork.map((work) => (
            <Link
              key={work.title}
              href={work.href}
              data-territory={work.territory}
              className={`group flex flex-col bg-canvas p-6 transition-colors duration-150 hover:bg-raised ${
                work.feature ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <WorkVisual
                variant={work.visual}
                className="mb-6 w-full border border-hair bg-sunken"
              />

              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display text-xl text-primary sm:text-2xl">
                  {work.title}
                </h3>
                {work.status && <span className="label text-accent">{work.status}</span>}
              </div>

              <p className="label mt-3">{work.tags.join(" · ")}</p>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-secondary">
                {work.blurb}
              </p>

              <span className="label mt-6 inline-flex items-center gap-2 text-tertiary transition-colors duration-150 group-hover:text-accent">
                {work.cta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          CLOSING — the reason the other four pages cohere.
          --------------------------------------------------------------- */}
      <Section mark="04 · Closing" className="mt-32 sm:mt-44">
        <div className="hairline rule-draw" />
        <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            <blockquote>
              <p className="display text-balance text-[clamp(1.75rem,3.6vw,2.75rem)] text-primary">
                {closing.quote}
              </p>
            </blockquote>
            {closing.body.map((line) => (
              <p
                key={line}
                className="measure mt-5 text-base leading-relaxed text-secondary"
              >
                {line}
              </p>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <div className="grid gap-px bg-hair">
              {closing.actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-start justify-between gap-6 bg-canvas p-6 transition-colors duration-150 hover:bg-raised"
                >
                  <span>
                    <span className="block text-base text-primary">
                      {action.label}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-secondary">
                      {action.note}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-tertiary transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
    </PageShell>
  );
}
