import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { EmphText } from "@/components/EmphText";
import { cn } from "@/lib/cn";
import {
  beyond,
  closing,
  exploring,
  hero,
  learned,
  workingToward,
} from "@/content/home";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

/** Shared by every link on the page, so the arrow behaves identically. */
function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-1"
    >
      →
    </span>
  );
}

/** The section label that every section on this page shares. */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="label border-t border-hair pt-6 text-accent-2">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <PageShell territory="identity">
      {/* The hero introduces the point of view beside the photograph that
          grounds it in a real person, rather than an abstract product claim. */}
      <Section mark="01 · Identity" className="pt-12 sm:pt-20">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.92fr_1.18fr] lg:items-start lg:gap-14">
          <div className="max-w-[36rem]">
            <p className="label beat beat-1 text-accent-2">{hero.eyebrow}</p>

            <h1 className="display beat beat-2 mt-8 text-[clamp(2rem,4.75vw,3.5rem)] leading-[1.06] text-primary">
              <EmphText text={hero.headline.lead} emph={hero.headline.emph.lead} />
              <span className="mt-4 block">
                <EmphText text={hero.headline.trail} emph={hero.headline.emph.trail} />
              </span>
            </h1>

            <p className="beat beat-3 measure mt-8 text-base leading-relaxed text-secondary sm:mt-10 sm:text-lg">
              {hero.body}
            </p>

            <div className="beat beat-4 mt-8 sm:mt-10">
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
                  <Arrow />
                </Link>
              ))}
            </div>
          </div>

          <MediaFrame
            label="Hero"
            ratio="5 / 6"
            src={hero.image.src}
            alt={hero.image.alt}
            className="beat beat-2 lg:mt-1"
          />
        </div>
      </Section>

      {/* The three pillars work as a compact editorial index: each one names a
          direction, explains it, and takes the reader to the evidence. */}
      <Section mark="02 · Working toward" className="mt-16 sm:mt-20">
        <Reveal>
          <SectionLabel>{workingToward.eyebrow}</SectionLabel>
        </Reveal>

        <Reveal className="mt-8">
          <div className="grid grid-cols-1 border-y border-hair sm:grid-cols-3">
            {workingToward.pillars.map((pillar, i) => (
              <Link
                key={pillar.href}
                href={pillar.href}
                className={cn(
                  "group flex min-h-0 flex-col border-b border-hair px-0 py-6 transition-colors duration-150 last:border-b-0 hover:bg-raised sm:min-h-56 sm:border-b-0 sm:px-8 sm:py-7",
                  i > 0 && "sm:border-l sm:border-hair",
                  i === 0 && "sm:pr-8",
                )}
              >
                <span className="display text-[clamp(1.5rem,2.2vw,1.9rem)] leading-[1.12] text-primary transition-colors duration-150 group-hover:text-accent-2">
                  {pillar.statement}
                </span>
                <span className="mt-4 max-w-[27ch] text-sm leading-relaxed text-secondary">
                  {pillar.note}
                </span>
                <span className="label mt-auto flex items-center gap-3 pt-6 text-accent-2">
                  {pillar.index} <span aria-hidden="true">/</span> {pillar.label}
                  <span className="ml-auto text-base transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* These are entry points, not cards: each image previews a different
          kind of work before the reader commits to a destination. */}
      <Section mark="03 · Exploring" className="mt-16 sm:mt-20">
        <Reveal>
          <SectionLabel>{exploring.eyebrow}</SectionLabel>
        </Reveal>

        <Reveal className="mt-8">
          <div className="grid gap-8 border-y border-hair py-7 sm:grid-cols-3 sm:gap-0 sm:py-0">
            {exploring.columns.map((column, i) => (
              <div
                key={column.title}
                className={cn(
                  "group flex flex-col border-b border-hair pb-8 last:border-b-0 sm:border-b-0 sm:pb-0",
                  i > 0 && "sm:border-l sm:border-hair sm:px-8 sm:py-7",
                  i === 0 && "sm:pr-8 sm:py-7",
                )}
              >
                <MediaFrame
                  label={column.title}
                  src={column.image}
                  alt={column.alt}
                  ratio="4 / 3"
                  className="mb-6"
                />
                <p className="display text-[1.45rem] text-primary">{column.title}</p>
                <p className="measure mt-3 text-sm leading-relaxed text-secondary">{column.note}</p>
                <Link
                  href={column.href}
                  className="group label mt-6 inline-flex items-center gap-2 text-tertiary transition-colors duration-150 hover:text-accent-2"
                >
                  {column.cta} <Arrow />
                </Link>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          WHAT I'VE LEARNED – four statements, one argument: building is
          cheap now, judgment isn't.
          --------------------------------------------------------------- */}
      <Section mark="04 · Learned" className="mt-16 sm:mt-20">
        <Reveal>
          <SectionLabel>{learned.eyebrow}</SectionLabel>
        </Reveal>

        <Reveal className="mt-8">
          <div className="grid gap-0 border-y border-hair sm:grid-cols-3 sm:gap-0 sm:py-7">
            {learned.statements.map((statement, i) => (
              <p
                key={statement}
                className={cn(
                  "display border-b border-hair py-6 text-balance text-[1.25rem] leading-[1.25] text-primary last:border-b-0 sm:border-b-0 sm:py-0 sm:text-[1.375rem]",
                  i > 0 && "sm:border-l sm:border-hair sm:pl-8",
                )}
              >
                {statement}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          BEYOND PRODUCTS – the person outside the work. One paragraph,
          one door.
          --------------------------------------------------------------- */}
      <Section mark="05 · Beyond" className="mt-16 sm:mt-20">
        <Reveal>
          <SectionLabel>{beyond.eyebrow}</SectionLabel>
        </Reveal>

        <Reveal className="mt-8">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.8fr_1.7fr] lg:items-center lg:gap-16">
            <div className="flex flex-col gap-6 lg:pr-4">
              <p className="measure text-base leading-relaxed text-secondary sm:text-lg">
                {beyond.body}
              </p>
              <Link
                href={beyond.href}
                className="group label inline-flex items-center gap-2 text-accent-2 transition-colors duration-150 hover:text-accent"
              >
                {beyond.cta} <Arrow />
              </Link>
            </div>
            <MediaFrame
              label="Beyond"
              ratio="3.2 / 1"
              src={beyond.image.src}
              alt={beyond.image.alt}
            />
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          CLOSING – the reason the page is a direction, not a résumé.
          --------------------------------------------------------------- */}
      <Section mark="Closing" className="mt-16 sm:mt-20">
        <Reveal>
          <div className="hairline rule-draw" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-center lg:gap-16">
            <blockquote>
              <p className="display text-balance text-[clamp(1.75rem,3.4vw,2.5rem)] text-primary">
                {closing.quote}
              </p>
            </blockquote>

            <div className="flex flex-col sm:border-l sm:border-hair sm:pl-8">
              {closing.actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center justify-between gap-6 py-4 transition-colors duration-150 hover:text-accent-2"
                >
                  <span>
                    <span className="text-base text-primary">{action.label}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-tertiary transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-2"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>
    </PageShell>
  );
}
