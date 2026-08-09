import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { territoryByKey } from "@/content/territories";
import {
  publishedVentures,
  stageLabels,
  venturesByStage,
  venturesIntro,
  type VentureStage,
} from "@/content/ventures";

/**
 * Future Ventures — entrepreneurial evidence.
 *
 * The design problem here is that exactly one venture is published, and that is
 * deliberate. So the page is built as a *ledger*, not a grid: three stage bands
 * in a fixed order, each opened by a full-width rule and a mono stage label with
 * its count. A stage with nothing in it still prints its label and states, in
 * one mono line, that it is empty — which reads as a taxonomy being kept honest
 * rather than as a section that failed to load. Six speculative entries would
 * fill more pixels and prove less.
 *
 * Nothing on this page sits on a filled surface. The whole layout is rules,
 * whitespace and typographic scale, which is what lets one entry hold a page.
 */

export const metadata: Metadata = {
  title: "Future Ventures",
  description: territoryByKey.ventures.body,
  alternates: { canonical: "/future-ventures/" },
};

/** Fixed order — the ledger's columns never reshuffle based on what's in it. */
const stageOrder: VentureStage[] = ["building", "exploring", "past"];

const pad = (n: number) => String(n).padStart(2, "0");

export default function FutureVentures() {
  return (
    <PageShell territory="ventures">
      {/* ---------------------------------------------------------------
          HEADER — a long silence before the first line, on purpose.
          --------------------------------------------------------------- */}
      <Section mark="01 · Ventures" className="pt-24 sm:pt-40 lg:pt-52">
        <div className="beat beat-1 flex items-baseline justify-between gap-6">
          <p className="label text-accent">{venturesIntro.eyebrow}</p>
          {/* The count is stated, not hidden. One entry is the argument. */}
          <p className="label">{pad(publishedVentures.length)} published</p>
        </div>
        <div className="hairline rule-draw mt-3" />

        <h1 className="display beat beat-2 mt-12 max-w-[16ch] text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.06] text-primary sm:mt-16">
          {venturesIntro.headline}
        </h1>

        <div className="beat beat-3 mt-10 sm:mt-14">
          {venturesIntro.body.map((line) => (
            <p
              key={line}
              className="measure mt-5 text-base leading-relaxed text-secondary sm:text-lg"
            >
              {line}
            </p>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          STAGE BANDS — building / exploring / past, always in that order.
          --------------------------------------------------------------- */}
      {stageOrder.map((stage, i) => {
        const entries = venturesByStage(stage);
        const occupied = entries.length > 0;

        return (
          <Section
            key={stage}
            mark={`${pad(i + 2)} · ${stageLabels[stage]}`}
            className="mt-32 sm:mt-48"
          >
            <Reveal>
              <div className="hairline" />
              <div className="mt-4 flex items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  {/* The only mark of colour a band gets: 5×5px. */}
                  {occupied && (
                    <span
                      aria-hidden="true"
                      className="h-[5px] w-[5px] shrink-0 bg-accent"
                    />
                  )}
                  <h2
                    className={
                      occupied ? "label text-primary" : "label ml-[calc(5px+0.75rem)]"
                    }
                  >
                    {stageLabels[stage]}
                  </h2>
                </div>
                <p className="label">{pad(entries.length)}</p>
              </div>
            </Reveal>

            {occupied ? (
              entries.map((venture) => (
                <Reveal key={venture.slug} delay={80} className="mt-16 sm:mt-24">
                  <article>
                    <h3 className="display text-[clamp(2.75rem,9vw,5rem)] leading-[0.98] text-primary">
                      {venture.name}
                    </h3>

                    {/* The thesis, at pull-quote scale and a deliberately
                        narrow measure so it breaks like a claim, not a
                        paragraph. */}
                    <p className="display mt-8 max-w-[24ch] text-[clamp(1.5rem,3.6vw,2.375rem)] leading-[1.16] text-primary sm:mt-10">
                      {venture.thesis}
                    </p>

                    <div className="mt-12 sm:mt-16">
                      {venture.body.map((para) => (
                        <p
                          key={para}
                          className="measure-tight mt-5 text-base leading-relaxed text-secondary"
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* EVIDENCE — the whole credibility argument, so it is
                        typeset at body scale on the primary colour rather than
                        demoted to fine print. */}
                    {venture.evidence.length > 0 && (
                      <div className="mt-16 sm:mt-24">
                        <div className="flex items-baseline justify-between gap-6">
                          <h4 className="label text-accent">Evidence</h4>
                          <p className="label">{pad(venture.evidence.length)}</p>
                        </div>

                        {/* Each row is `display: grid`, which strips the
                            implicit list-item role in WebKit — so the list
                            semantics are stated explicitly. */}
                        <ul role="list" className="mt-6 border-t border-hair">
                          {venture.evidence.map((item, k) => (
                            <li
                              key={item}
                              className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 border-b border-hair py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:py-7"
                            >
                              <span className="label pt-[0.35rem]">{pad(k + 1)}</span>
                              <span className="measure text-base leading-snug text-primary sm:text-lg">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                </Reveal>
              ))
            ) : (
              /* Not a placeholder for something missing — a statement that the
                 bar has not been met yet. One line, mono, nothing else. */
              <Reveal delay={80}>
                <p className="label mt-10 sm:mt-14">Nothing at this stage yet</p>
              </Reveal>
            )}
          </Section>
        );
      })}
    </PageShell>
  );
}
