import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
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
    <p className="label border-t border-hair pt-6">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <PageShell territory="identity">
      {/* ---------------------------------------------------------------
          HERO – the record and the direction, as one long editorial line.
          Nothing competes with it: no composition, no strip, no buttons.
          --------------------------------------------------------------- */}
      <Section mark="01 · Identity" className="pt-12 sm:pt-20">
        <div className="max-w-[36rem]">
          <p className="label beat beat-1 text-accent">{hero.eyebrow}</p>

          <h1 className="display beat beat-2 mt-8 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.06] text-primary">
            {hero.headline.lead}
            <span className="mt-4 block">{hero.headline.trail}</span>
          </h1>

          <p className="beat beat-3 measure mt-10 text-base leading-relaxed text-secondary sm:text-lg">
            {hero.body}
          </p>

          <div className="beat beat-4 mt-10">
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
      </Section>

      {/* ---------------------------------------------------------------
          WHAT I'M WORKING TOWARD – the direction, stated as three claims.
          The three pillar links are the evidence, in the site's own order:
          depth, then agency, then taste.
          --------------------------------------------------------------- */}
      <Section mark="02 · Working toward" className="mt-24 sm:mt-32">
        <Reveal>
          <SectionLabel>{workingToward.eyebrow}</SectionLabel>
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex flex-col gap-6">
            {workingToward.statements.map((statement) => (
              <p
                key={statement}
                className="display text-balance text-[clamp(1.625rem,3.2vw,2.375rem)] leading-[1.12] text-primary"
              >
                {statement}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <p className="measure text-base leading-relaxed text-secondary">
            {workingToward.body}
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid grid-cols-1 border-t border-hair sm:grid-cols-3">
            {workingToward.pillars.map((pillar, i) => (
              <Link
                key={pillar.href}
                href={pillar.href}
                className={cn(
                  "group flex items-baseline gap-4 border-b border-hair py-5 transition-colors duration-150 hover:bg-raised sm:border-b-0",
                  i > 0 && "sm:border-l",
                )}
              >
                <span className="label text-accent">{pillar.index}</span>
                <span className="display flex-1 text-[1.375rem] text-primary transition-colors duration-150 group-hover:text-accent-2">
                  {pillar.label}
                </span>
                <span className="text-tertiary transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-2">
                  →
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          WHAT I'M EXPLORING NOW – three threads, one grid. Each column
          states the exploration, then names the page that proves it.
          --------------------------------------------------------------- */}
      <Section mark="03 · Exploring" className="mt-20 sm:mt-28">
        <Reveal>
          <SectionLabel>{exploring.eyebrow}</SectionLabel>
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid gap-10 border-t border-hair pt-8 sm:grid-cols-3 sm:gap-0 sm:pt-0">
            {exploring.columns.map((column, i) => (
              <div
                key={column.title}
                className={cn(
                  "flex flex-col",
                  i > 0 && "sm:border-l sm:border-hair sm:px-8",
                  i === 0 && "sm:pr-8",
                )}
              >
                <p className="font-mono text-[0.8125rem] uppercase tracking-[0.18em] text-accent">
                  {column.title}
                </p>
                <p className="measure mt-4 text-sm leading-relaxed text-secondary sm:text-base">
                  {column.note}
                </p>
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
      <Section mark="04 · Learned" className="mt-20 sm:mt-28">
        <Reveal>
          <SectionLabel>{learned.eyebrow}</SectionLabel>
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid gap-8 border-t border-hair pt-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-0 lg:pt-0">
            {learned.statements.map((statement, i) => (
              <p
                key={statement}
                className={cn(
                  "display text-balance text-[1.25rem] leading-[1.25] text-primary sm:text-[1.375rem]",
                  i > 0 && "lg:border-l lg:border-hair lg:pl-8",
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
      <Section mark="05 · Beyond" className="mt-20 sm:mt-28">
        <Reveal>
          <SectionLabel>{beyond.eyebrow}</SectionLabel>
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-baseline lg:gap-16">
            <p className="measure text-base leading-relaxed text-secondary sm:text-lg">
              {beyond.body}
            </p>
            <Link
              href={beyond.href}
              className="group label inline-flex items-center gap-2 text-tertiary transition-colors duration-150 hover:text-accent-2"
            >
              {beyond.cta} <Arrow />
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          CLOSING – the reason the page is a direction, not a résumé.
          --------------------------------------------------------------- */}
      <Section mark="Closing" className="mt-24 sm:mt-32">
        <Reveal>
          <div className="hairline rule-draw" />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <blockquote>
              <p className="display text-balance text-[clamp(1.75rem,3.4vw,2.5rem)] text-primary">
                {closing.quote}
              </p>
            </blockquote>

            <div className="flex flex-col">
              {closing.actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-start justify-between gap-6 border-t border-hair py-6 transition-colors duration-150 hover:border-accent-2-rule"
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
                    className="text-tertiary transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-2"
                  >
                    →
                  </span>
                </Link>
              ))}
              <div className="border-t border-hair" />
            </div>
          </div>
        </Reveal>
      </Section>
    </PageShell>
  );
}
