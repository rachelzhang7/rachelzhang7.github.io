import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { HeroComposition } from "@/components/HeroComposition";
import { MediaFrame, type MediaTone } from "@/components/MediaFrame";
import { territories, territoryByKey } from "@/content/territories";
import { closing, credentials, hero, selectedWork, workIntro } from "@/content/home";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

/** Shared by every pillar and project link, so the arrow behaves identically. */
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

/**
 * Media tone per project. The tone belongs to the work, not to the template –
 * it is what stops three artifacts collapsing back into one look.
 */
const WORK_TONE: Record<string, MediaTone> = {
  adtech: "product",
  experiments: "prototype",
  creative: "music",
};

const WORK_LABEL: Record<string, string> = {
  adtech: "Product / Interface",
  experiments: "Prototype",
  creative: "Music / Artwork",
};

export default function Home() {
  const [depth, building, taste] = territories;

  return (
    <PageShell territory="identity">
      {/* ---------------------------------------------------------------
          HERO – identity on one side, the range of the work on the other.
          --------------------------------------------------------------- */}
      <Section mark="01 · Identity" className="pt-10 sm:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">
          <div>
            <p className="label beat beat-1 text-accent">{hero.eyebrow}</p>

            <h1 className="display beat beat-2 mt-6 text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.08] text-primary">
              {hero.headline.lead}{" "}
              <span className="[text-decoration-line:underline] [text-decoration-color:var(--accent)] [text-decoration-thickness:1px] [text-underline-offset:0.14em]">
                {hero.headline.emphasis}
              </span>{" "}
              {hero.headline.trail}
            </h1>

            {hero.body.map((line) => (
              <p
                key={line}
                className="beat beat-3 measure mt-7 text-base leading-relaxed text-secondary sm:text-lg"
              >
                {line}
              </p>
            ))}

            <div className="beat beat-4 mt-9 flex flex-wrap items-center gap-3">
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

          <div className="beat beat-5">
            <HeroComposition />
          </div>
        </div>

        <dl className="beat beat-5 mt-14 grid grid-cols-1 gap-px border-y border-hair bg-hair sm:grid-cols-3">
          {credentials.map((c) => (
            <div key={c.value} className="flex items-baseline gap-3 bg-canvas px-1 py-4">
              <dt className="text-sm text-primary">{c.value}</dt>
              <dd className="label">{c.label}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ---------------------------------------------------------------
          THE PILLARS – three territories, three different compositions:
          structured, then kinetic, then cinematic. One type system
          throughout, so they still read as one site.
          --------------------------------------------------------------- */}
      <Section mark="02 · The work" className="mt-24 sm:mt-32">
        <SectionHead eyebrow={workIntro.eyebrow} headline={workIntro.headline} />

        {/* 01 DEPTH – grid-locked and precise. One exact surface, aligned. */}
        <Reveal className="mt-14">
          <Link href={depth.href} className="group block border-t border-hair pt-8">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14">
              <MediaFrame label="Product / System" tone="product" ratio="16 / 10" />
              <div>
                <p className="label">
                  <span className="text-accent">{depth.index}</span>{" "}
                  {depth.dimension}
                </p>
                <h3 className="display mt-4 text-[2rem] text-primary sm:text-[2.5rem]">
                  {depth.title}
                </h3>
                <p className="mt-3 text-base text-tertiary sm:text-lg">
                  {depth.headline}
                </p>
                <p className="measure mt-5 text-sm leading-relaxed text-secondary sm:text-base">
                  {depth.body}
                </p>
                <span className="label mt-7 inline-flex items-center gap-2 text-tertiary transition-colors duration-150 group-hover:text-accent-2">
                  {depth.cta} <Arrow />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* 02 BUILDING – kinetic. Two surfaces at different sizes and offsets,
            deliberately not aligned to one another. */}
        <Reveal className="mt-14 sm:mt-20">
          <Link href={building.href} className="group block border-t border-hair pt-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
              <div className="lg:order-2">
                <div className="relative pb-[14%] pr-[16%]">
                  <MediaFrame label="Prototype" tone="prototype" ratio="4 / 3" />
                  <div className="absolute bottom-0 right-0 w-[54%]">
                    <MediaFrame
                      label="Build"
                      tone="product"
                      ratio="16 / 10"
                      className="shadow-2xl shadow-black/60"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:order-1">
                <p className="label">
                  <span className="text-accent">{building.index}</span>{" "}
                  {building.dimension}
                </p>
                <h3 className="display mt-4 text-[2rem] text-primary sm:text-[2.5rem]">
                  {building.title}
                </h3>
                <p className="mt-3 text-base text-tertiary sm:text-lg">
                  {building.headline}
                </p>
                <p className="measure mt-5 text-sm leading-relaxed text-secondary sm:text-base">
                  {building.body}
                </p>
                <span className="label mt-7 inline-flex items-center gap-2 text-tertiary transition-colors duration-150 group-hover:text-accent-2">
                  {building.cta} <Arrow />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* 03 TASTE – cinematic. The widest, least framed moment on the page. */}
        <Reveal className="mt-14 sm:mt-20">
          <Link href={taste.href} className="group block border-t border-hair pt-8">
            <MediaFrame
              label="Creative / Video"
              tone="creative"
              ratio="21 / 9"
              className="w-full"
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-baseline lg:gap-12">
              <p className="label">
                <span className="text-accent">{taste.index}</span> {taste.dimension}
              </p>
              <div>
                <h3 className="display text-[2rem] text-primary sm:text-[2.5rem]">
                  {taste.title}
                  <span className="ml-4 align-middle text-base text-tertiary sm:text-lg">
                    {taste.headline}
                  </span>
                </h3>
                <p className="measure mt-4 text-sm leading-relaxed text-secondary sm:text-base">
                  {taste.body}
                </p>
              </div>
              <span className="label inline-flex items-center gap-2 text-tertiary transition-colors duration-150 group-hover:text-accent-2">
                {taste.cta} <Arrow />
              </span>
            </div>
          </Link>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          SELECTED WORK – artifact-led. The media carries the section; the
          writing says what the thing is and why it matters, then stops.
          --------------------------------------------------------------- */}
      <Section mark="03 · Selected work" className="mt-24 sm:mt-32">
        <SectionHead
          eyebrow="Selected work"
          headline="A few things I've been building."
        />

        <div className="mt-12 flex flex-col gap-16 sm:gap-20">
          {selectedWork.map((work, i) => {
            const pillar =
              territoryByKey[work.territory as keyof typeof territoryByKey];
            const flipped = i % 2 === 1;
            // The last project runs full width: one wide moment stops the
            // section settling into an alternation you stop noticing.
            const full = i === selectedWork.length - 1;

            const meta = (
              <div>
                {pillar && (
                  <p className="label">
                    <span className="text-accent">{pillar.index}</span>{" "}
                    {pillar.dimension}
                  </p>
                )}
                <h3 className="display mt-4 text-[1.75rem] text-primary sm:text-[2.25rem]">
                  {work.title}
                </h3>
                <p className="mt-2 text-sm text-tertiary">{work.kind}</p>
                <p className="measure mt-5 text-base leading-relaxed text-secondary">
                  {work.blurb}
                </p>
                <span className="label mt-7 inline-flex items-center gap-2 text-tertiary transition-colors duration-150 group-hover:text-accent-2">
                  {work.cta} <Arrow />
                </span>
              </div>
            );

            const media = (
              <MediaFrame
                label={WORK_LABEL[work.territory] ?? "Artifact"}
                tone={WORK_TONE[work.territory] ?? "product"}
                ratio={full ? "21 / 9" : "16 / 10"}
                src={work.image}
              />
            );

            if (full) {
              return (
                <Reveal key={work.title}>
                  <Link href={work.href} className="group block">
                    {media}
                    <div className="mt-8 lg:max-w-[46rem]">{meta}</div>
                  </Link>
                </Reveal>
              );
            }

            return (
              <Reveal key={work.title}>
                <Link href={work.href} className="group block">
                  <div
                    className={
                      flipped
                        ? "grid gap-8 lg:grid-cols-[1fr_1.55fr] lg:items-center lg:gap-16"
                        : "grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-center lg:gap-16"
                    }
                  >
                    <div className={flipped ? "lg:order-2" : undefined}>{media}</div>
                    <div className={flipped ? "lg:order-1" : undefined}>{meta}</div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          CLOSING – the reason the three pillars cohere into an argument.
          --------------------------------------------------------------- */}
      <Section mark="04 · Closing" className="mt-20 sm:mt-28">
        <div className="hairline rule-draw" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <blockquote>
              <p className="display text-balance text-[clamp(1.75rem,3.4vw,2.5rem)] text-primary">
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
          </Reveal>
        </div>
      </Section>
    </PageShell>
  );
}
