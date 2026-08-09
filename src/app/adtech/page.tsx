import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { MediaFrame, type MediaTone } from "@/components/MediaFrame";
import { adtechIntro, projects, thesis, whatsNext } from "@/content/adtech";
import { MentalModel } from "./MentalModel";

export const metadata: Metadata = {
  title: "AdTech",
  description: adtechIntro.body,
  alternates: { canonical: "/adtech/" },
  openGraph: { url: "/adtech/" },
};

/**
 * One tone per layer, so the three grid columns are distinguishable as
 * Data / Intelligence / Automation without anything being labelled twice.
 */
const LAYER_TONE: Record<string, MediaTone> = {
  Data: "product",
  Intelligence: "prototype",
  Automation: "creative",
};

export default function AdTech() {
  return (
    <PageShell territory="adtech">
      {/* ---------------------------------------------------------------
          HERO – the claim, and the one paragraph that qualifies it.
          --------------------------------------------------------------- */}
      <Section mark="01 · AdTech" className="pt-14 sm:pt-20">
        <p className="label beat beat-1 text-accent">{adtechIntro.eyebrow}</p>

        <h1 className="display beat beat-2 mt-6 text-balance text-[clamp(2.25rem,5.4vw,4rem)] leading-[1.08] text-primary">
          {adtechIntro.headline}
        </h1>

        <p className="beat beat-3 measure mt-8 text-base leading-relaxed text-secondary sm:text-lg">
          {adtechIntro.body}
        </p>
      </Section>

      {/* ---------------------------------------------------------------
          THE MODEL – three layers, carried by the layout rather than
          restated in copy.
          --------------------------------------------------------------- */}
      <Section mark="02 · The model" className="mt-20 sm:mt-28">
        <Reveal>
          <div className="hairline rule-draw" />
        </Reveal>
        <Reveal className="mt-12">
          <MentalModel />
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          THE THESIS – one intellectual pause before the evidence. The only
          explicit lesson on the page; the six projects carry the rest.
          --------------------------------------------------------------- */}
      <Section mark="03 · Thesis" className="mt-24 sm:mt-32">
        <Reveal>
          <div className="border-t border-hair pt-12 sm:pt-16">
            <p className="display text-balance text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.12] text-primary">
              {thesis.statement}
            </p>
            <p className="measure mt-6 text-base leading-relaxed text-secondary sm:text-lg">
              {thesis.body}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          SELECTED WORK – six proofs in a 3 x 2 grid whose columns are the
          model itself: Data | Intelligence | Automation.
          --------------------------------------------------------------- */}
      <Section mark="04 · Selected work" className="mt-24 sm:mt-32">
        <SectionHead eyebrow="Selected work" headline="Selected Work" />

        <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i, 4) * 60}>
              <article id={project.slug} className="group scroll-mt-28">
                <MediaFrame
                  label={project.media}
                  tone={LAYER_TONE[project.layer] ?? "product"}
                  ratio="16 / 10"
                  src={project.image}
                />

                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <p className="label text-accent">{project.layer}</p>
                  {project.status && <p className="label">{project.status}</p>}
                </div>

                <h3 className="display mt-3 text-[1.375rem] text-primary sm:text-[1.5rem]">
                  {project.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-secondary">
                  {project.description}
                </p>

                <p className="label mt-5 normal-case leading-[1.6] tracking-[0.08em] text-quiet">
                  {project.meta}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          WHAT'S NEXT – the page ends on the question. Nothing follows it.
          --------------------------------------------------------------- */}
      <Section mark="05 · What's next" className="mt-24 sm:mt-32">
        <Reveal>
          <div className="border-t border-hair pt-12 sm:pt-16">
            <p className="label text-accent">{whatsNext.eyebrow}</p>

            <h2 className="display mt-7 text-balance text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.12] text-primary">
              {whatsNext.headline}
            </h2>

            <p className="measure mt-7 text-base leading-relaxed text-secondary">
              {whatsNext.body}
            </p>

            <div className="mt-14 grid gap-8 border-t border-hair pt-10 lg:grid-cols-[auto_1fr] lg:gap-14">
              <p className="label">{whatsNext.question.lead}</p>
              <div>
                <p className="display text-[1.375rem] text-tertiary sm:text-[1.625rem]">
                  &ldquo;{whatsNext.question.less}&rdquo;
                </p>
                <p className="label mt-6">{whatsNext.question.join}</p>
                <p className="display measure mt-4 text-[1.5rem] text-primary sm:text-[1.875rem]">
                  &ldquo;{whatsNext.question.more}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </PageShell>
  );
}
