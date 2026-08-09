import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import type { Work } from "@/content/creative";
import { creativeIntro, publishedWorks } from "@/content/creative";
import { Plate, plateFormat } from "./Plate";

export const metadata: Metadata = {
  title: "Creative AI",
  description: creativeIntro.body[0],
  alternates: { canonical: "/creative-ai/" },
  openGraph: { url: "/creative-ai/" },
};

/**
 * Creative AI – the gallery.
 *
 * Every other page argues. This one shows, and then gets out of the way: a
 * three-line header, then plates with a rule, a title and two sentences. The
 * layout alternates side to side and the plate proportion follows each work's
 * span, so the page is read as a hang rather than scanned as a grid.
 *
 * Plates carry roughly twice the vertical air of any other page on the site.
 * That is the point – space is what tells a visitor this is work being shown,
 * not work being sold.
 */

/** Plate width at lg. Below that every plate is full-bleed to the measure. */
const plateWidth: Record<Work["span"], string> = {
  wide: "lg:w-[62%]",
  square: "lg:w-[52%]",
  tall: "lg:w-[40%]",
};

export default function CreativeAI() {
  return (
    <PageShell territory="creative">
      {/* ---------------------------------------------------------------
          HEADER – three lines and a rule. Deliberately the smallest
          header on the site.
          --------------------------------------------------------------- */}
      <Section mark="01 · Creative AI" className="pt-16 sm:pt-24">
        <div className="beat beat-1 flex items-baseline justify-between gap-6">
          <p className="label text-accent">{creativeIntro.eyebrow}</p>
          <p className="label">
            {String(publishedWorks.length).padStart(2, "0")} plates
          </p>
        </div>
        <div className="hairline rule-draw mt-3" />

        <h1 className="display beat beat-2 mt-10 max-w-[22ch] text-[clamp(2.25rem,6vw,4rem)] text-primary">
          {creativeIntro.headline}
        </h1>

        <div className="beat beat-3 mt-8">
          {creativeIntro.body.map((line) => (
            <p
              key={line}
              className="measure mt-4 text-base leading-relaxed text-secondary"
            >
              {line}
            </p>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          PLATES – one section each, so the rail indexes the hang.
          --------------------------------------------------------------- */}
      {publishedWorks.map((work, i) => {
        const n = String(i + 1).padStart(2, "0");
        const flip = i % 2 === 1;
        const last = i === publishedWorks.length - 1;

        return (
          <Section
            key={work.slug}
            id={work.slug}
            mark={`${String(i + 2).padStart(2, "0")} · ${work.title}`}
            className={i === 0 ? "mt-28 sm:mt-36" : "mt-40 sm:mt-48 lg:mt-56"}
          >
            {/* The plate rule: metadata at both termini, the way a chart
                axis is labelled. */}
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <p className="label">
                  <span className="text-accent">Plate {n}</span>
                  <span aria-hidden="true" className="px-2">
                    /
                  </span>
                  {work.medium}
                </p>
                <p className="label">{plateFormat[work.span]}</p>
              </div>
              <div className="hairline mt-3" />
            </Reveal>

            <div
              className={cn(
                "mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-end lg:gap-[clamp(2.5rem,6vw,5rem)]",
                flip && "lg:flex-row-reverse",
              )}
            >
              <Reveal className={plateWidth[work.span]}>
                <Plate
                  visual={work.visual}
                  span={work.span}
                  image={work.image}
                  title={work.title}
                />
              </Reveal>

              <Reveal delay={80} className="lg:flex-1">
                <h2 className="display text-[clamp(1.75rem,3.2vw,2.5rem)] text-primary">
                  {work.title}
                </h2>
                <p className="measure-tight mt-5 text-base leading-relaxed text-secondary">
                  {work.note}
                </p>
              </Reveal>
            </div>

            {/* The gallery closes on a rule, the way it opened. */}
            {last && (
              <>
                <div className="hairline mt-24 sm:mt-32" />
                <p className="label mt-3">End of plates</p>
              </>
            )}
          </Section>
        );
      })}
    </PageShell>
  );
}
