import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { aboutIntro, connect, principles, resume } from "@/content/about";
import { socials } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: aboutIntro.body[0],
};

/**
 * Links still carrying a REPLACE-ME URL are filtered out rather than shipped as
 * dead links — and the string itself must never reach the exported HTML.
 */
const liveSocials = socials.filter((s) => !s.placeholder);

export default function About() {
  return (
    <PageShell territory="identity">
      {/* ---------------------------------------------------------------
          HEADER — the most personal writing on the site. One column, one
          measure, nothing competing with it.
          --------------------------------------------------------------- */}
      <Section mark="01 · About" className="pt-16 sm:pt-24">
        <p className="label beat beat-1 text-accent">{aboutIntro.eyebrow}</p>

        <h1 className="display beat beat-2 mt-8 max-w-[20ch] text-[clamp(2.25rem,6vw,4rem)] leading-[1.06] text-primary">
          {aboutIntro.headline}
        </h1>

        <div className="beat beat-3 mt-12 max-w-[38rem]">
          {aboutIntro.body.map((paragraph, i) => (
            <p
              key={paragraph}
              className={
                i === 0
                  ? "text-base leading-[1.75] text-secondary sm:text-lg"
                  : "mt-6 text-base leading-[1.75] text-secondary"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Terminating rule for the header. `beat` is deliberately absent —
            it sets the same `animation` property that `rule-draw` needs. */}
        <div className="hairline rule-draw mt-16" />
      </Section>

      {/* ---------------------------------------------------------------
          PRINCIPLES — four arguable claims, separated by rules. Each title
          is the section's heading; there is no invented framing above them.
          --------------------------------------------------------------- */}
      <Section mark="02 · Principles" className="mt-24 sm:mt-32">
        <SectionHead
          eyebrow="Principles"
          terminus={`${String(principles.length).padStart(2, "0")} claims`}
        />

        <div className="mt-12">
          {principles.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 60}>
              <article className="grid gap-4 border-t border-hair py-9 lg:grid-cols-[5rem_1fr] lg:gap-10">
                <p className="label text-accent lg:pt-2">
                  {String(i + 1).padStart(2, "0")}
                </p>

                <div>
                  <h2 className="display text-balance text-xl text-primary sm:text-[1.625rem]">
                    {principle.title}
                  </h2>
                  <p className="measure mt-4 text-sm leading-relaxed text-secondary sm:text-base">
                    {principle.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-hair" />
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          CONNECT — the id is a contract: the header button and the homepage
          both deep-link to /about/#connect.
          --------------------------------------------------------------- */}
      <Section id="connect" mark="03 · Connect" className="mt-24 sm:mt-32">
        <SectionHead
          eyebrow="Connect"
          terminus={`${String(liveSocials.length).padStart(2, "0")} channels`}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="display text-3xl text-primary sm:text-4xl">
              {connect.headline}
            </h2>
            <p className="measure mt-6 text-base leading-relaxed text-secondary">
              {connect.body}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul>
              {liveSocials.map((s) => {
                const external = s.href.startsWith("http");
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      {...(external
                        ? { target: "_blank", rel: "me noopener noreferrer" }
                        : { rel: "me" })}
                      className="group flex items-baseline justify-between gap-6 border-t border-hair py-5 transition-colors duration-150 hover:border-accent-rule"
                    >
                      <span className="min-w-0">
                        <span className="block text-base text-primary">
                          {s.label}
                        </span>
                        {/* Deliberately not `.label`: a handle is a mono
                            measurement, but uppercasing an address would
                            misrepresent it. */}
                        <span className="mt-2 block truncate font-mono text-xs tracking-[0.04em] text-tertiary transition-colors duration-150 group-hover:text-accent">
                          {s.handle}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-tertiary transition-colors duration-150 group-hover:text-primary"
                      >
                        {external ? "↗" : "→"}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-hair" />
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          RÉSUMÉ — the conventional path, kept honest: no link until the file
          actually exists.
          --------------------------------------------------------------- */}
      <Section mark="04 · Résumé" className="mt-24 sm:mt-32">
        <SectionHead
          eyebrow="Résumé"
          terminus={resume.available ? "PDF" : "On request"}
        >
          <div className="mt-10 border-t border-hair py-9">
            {/* The mono eyebrow already names this region; repeating the word
                in the serif would be decoration rather than information. */}
            <h2 className="sr-only">Résumé</h2>

            {resume.available ? (
              <a
                href={resume.href}
                className="group inline-flex items-center gap-3 border border-strong px-5 py-3 text-sm text-secondary transition-colors duration-150 hover:border-line-hover hover:text-primary"
              >
                Download the résumé
                {/* Hover is colour and a 1px rule only — the glyph points
                    down, so the site's horizontal arrow nudge does not
                    apply here. */}
                <span
                  aria-hidden="true"
                  className="text-tertiary transition-colors duration-150 group-hover:text-primary"
                >
                  ↓
                </span>
              </a>
            ) : (
              <p className="measure-tight text-base leading-relaxed text-secondary sm:text-lg">
                {resume.note}
              </p>
            )}
          </div>
          <div className="border-t border-hair" />
        </SectionHead>
      </Section>
    </PageShell>
  );
}
