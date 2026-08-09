import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { HeroTrace } from "@/components/HeroTrace";
import { WorkVisual } from "@/components/WorkVisual";
import { territories, territoryByKey } from "@/content/territories";
import { closing, credentials, hero, selectedWork, workIntro } from "@/content/home";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <PageShell territory="identity">
      {/* ---------------------------------------------------------------
          HERO – positioning, answered in 10–15 seconds.
          --------------------------------------------------------------- */}
      <Section mark="01 · Identity" className="pt-14 sm:pt-20">
        {/* Opposing composition: textual weight on one side, visual weight on
            the other. On phones it stacks in reading order, type first. */}
        <div className="grid items-center gap-12 lg:grid-cols-[58fr_42fr] lg:gap-14">
          <div>
            <p className="label beat beat-1 text-accent">{hero.eyebrow}</p>

            <h1 className="display beat beat-2 mt-7 text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.08] text-primary">
              {hero.headline.lead}{" "}
              {/* Accent as a 1px rule, never as coloured display type. Real
                  text-decoration rather than a positioned bar, so it skips the
                  descenders and never collides with the following line. */}
              <span className="[text-decoration-line:underline] [text-decoration-color:var(--accent)] [text-decoration-thickness:1px] [text-underline-offset:0.14em]">
                {hero.headline.emphasis}
              </span>{" "}
              {hero.headline.trail}
            </h1>

            {hero.body.map((line) => (
              <p
                key={line}
                className="beat beat-3 measure mt-8 text-base leading-relaxed text-secondary sm:text-lg"
              >
                {line}
              </p>
            ))}

            <div className="beat beat-4 mt-10 flex flex-wrap items-center gap-3">
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

          {/* The counterweight. Given real height so it reads as a field the
              line moves through, rather than a graphic sitting under the copy. */}
          <div className="beat beat-5 h-[18rem] sm:h-[22rem] lg:h-[min(74vh,38rem)]">
            <HeroTrace />
          </div>
        </div>

        {/* Credibility strip, hung on the rule that closes the hero. */}
        <dl className="beat beat-5 mt-16 grid grid-cols-1 gap-px border-y border-hair bg-hair sm:mt-24 sm:grid-cols-3">
          {credentials.map((c) => (
            <div key={c.value} className="flex items-baseline gap-3 bg-canvas px-1 py-4">
              <dt className="text-sm text-primary">{c.value}</dt>
              <dd className="label">{c.label}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ---------------------------------------------------------------
          THE WORK – three territories, not a card grid.
          --------------------------------------------------------------- */}
      <Section mark="02 · The work" className="mt-32 sm:mt-44">
        <SectionHead
          eyebrow={workIntro.eyebrow} />
        <div className="mt-16">
          {territories.map((t, i) => (
            <Reveal key={t.key} delay={i * 60}>
              <Link
                href={t.href}
                data-territory={t.key}
                className="group block border-t border-hair py-10 transition-colors duration-150 hover:border-accent-2-rule"
              >
                <div className="grid gap-6 lg:grid-cols-[6rem_1fr_auto] lg:items-baseline lg:gap-10">
                  {/* Large numbering, but neutral: the figure gives the row
                      its scale and rhythm, not its colour. The dimension
                      label is the one word worth remembering, so it carries
                      the violet. */}
                  <div className="flex items-baseline gap-5 lg:block">
                    <span className="font-mono text-[2.75rem] leading-[0.85] text-quiet transition-colors duration-200 group-hover:text-tertiary sm:text-[3.5rem]">
                      {t.index}
                    </span>
                    <span className="mt-4 block font-mono text-[0.8125rem] uppercase tracking-[0.18em] text-accent">
                      {t.dimension}
                    </span>
                  </div>

                  <div>
                    <h3 className="display text-[2rem] text-primary sm:text-[2.5rem]">
                      {t.title}
                    </h3>
                    {/* The claim, on its own line rather than trailing the
                        title inline – one idea per line reads faster and the
                        accessible name stays clean. */}
                    <p className="mt-3 text-base text-tertiary sm:text-lg">
                      {t.headline}
                    </p>
                    <p className="measure mt-5 text-sm leading-relaxed text-secondary sm:text-base">
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
          SELECTED WORK – proof, without becoming a catalogue.
          --------------------------------------------------------------- */}
      <Section mark="03 · Selected work" className="mt-32 sm:mt-44">
        <SectionHead
          eyebrow="Selected work"
          headline="A few things I've been building."
        />

        {/* Artifact-led, not a card grid. The work occupies most of the row and
            the writing does one job: say what the thing is and why it matters.
            Rows alternate so the page has rhythm rather than a repeated module. */}
        <div className="mt-16 flex flex-col gap-24 sm:gap-32">
          {selectedWork.map((work, i) => {
            const pillar = territoryByKey[work.territory as keyof typeof territoryByKey];
            const flipped = i % 2 === 1;
            return (
              <Reveal key={work.title}>
                <article
                  className={cn(
                    "grid items-center gap-8 lg:gap-16",
                    flipped
                      ? "lg:grid-cols-[1fr_1.35fr]"
                      : "lg:grid-cols-[1.35fr_1fr]",
                  )}
                >
                  <figure
                    className={cn(
                      "bg-sunken",
                      flipped ? "lg:order-2" : undefined,
                    )}
                  >
                    {work.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={work.image}
                        alt=""
                        className="block w-full"
                        style={{ aspectRatio: "16 / 10" }}
                      />
                    ) : (
                      <WorkVisual variant={work.visual} className="w-full" />
                    )}
                  </figure>

                  <div>
                    {pillar && (
                      <p className="label">
                        <span className="text-accent">{pillar.index}</span>{" "}
                        {pillar.dimension}
                      </p>
                    )}

                    <h3 className="display mt-5 text-[1.75rem] text-primary sm:text-[2.25rem]">
                      {work.title}
                    </h3>

                    <p className="mt-3 text-sm text-tertiary">{work.kind}</p>

                    <p className="measure mt-6 text-base leading-relaxed text-secondary">
                      {work.blurb}
                    </p>

                    <Link
                      href={work.href}
                      className="label group mt-8 inline-flex items-center gap-2 text-tertiary transition-colors duration-150 hover:text-accent-2"
                    >
                      {work.cta}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          CLOSING – the reason the other four pages cohere.
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
                    className="text-tertiary transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-2"
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
