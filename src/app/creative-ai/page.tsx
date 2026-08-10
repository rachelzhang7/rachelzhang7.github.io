import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import {
  adCreative,
  creativeClosing,
  creativeIntro,
  mediums,
  music,
  notes,
  transition,
  visuals,
} from "@/content/creative";

export const metadata: Metadata = {
  title: "Creative AI",
  description: creativeIntro.body[0],
  alternates: { canonical: "/creative-ai/" },
  openGraph: { url: "/creative-ai/" },
};

/** Every outbound link on this page goes somewhere real and external. */
const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

function Out({ children }: { children: React.ReactNode }) {
  return (
    <span className="label inline-flex items-center gap-2 text-tertiary transition-colors duration-150 group-hover:text-accent-2">
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        &#8599;
      </span>
    </span>
  );
}

export default function CreativeAI() {
  const [feature, ...rest] = visuals.works;

  return (
    <PageShell territory="creative">
      {/* ---------------------------------------------------------------
          01 WHY – why I create with AI.
          --------------------------------------------------------------- */}
      <Section mark="01 · Why" className="pt-14 sm:pt-20">
        <p className="label beat beat-1 text-accent">{creativeIntro.eyebrow}</p>

        <h1 className="display beat beat-2 mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.06] text-primary">
          {creativeIntro.headline}
        </h1>

        <div className="beat beat-3 mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <p className="text-base leading-relaxed text-secondary sm:text-lg">
            {creativeIntro.body[0]}
          </p>
          <div className="flex flex-col gap-5">
            {creativeIntro.body.slice(1).map((line) => (
              <p key={line} className="text-sm leading-relaxed text-tertiary sm:text-base">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* The anchor line. Deliberately the loudest thing in the hero. */}
        <p className="display beat beat-4 mt-14 text-balance text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.12] text-primary">
          {creativeIntro.anchor}
        </p>

        {/* Three mediums. Typography and rules only – not cards, no arrows. */}
        <ul className="beat beat-5 mt-14 grid grid-cols-1 border-t border-hair sm:grid-cols-3">
          {mediums.map((m) => (
            <li key={m.name} className="border-b border-hair py-5 sm:border-b-0 sm:pr-8">
              <p className="font-mono text-[0.8125rem] uppercase tracking-[0.18em] text-accent">
                {m.name}
              </p>
              <p className="mt-2 text-sm text-tertiary">{m.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------------
          02 WORK / MUSIC – an editorial playlist, not three cards.
          --------------------------------------------------------------- */}
      <Section mark="02 · Music" className="mt-24 sm:mt-32">
        <Reveal>
          <div className="grid gap-10 border-t border-hair pt-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <p className="label text-accent">{music.label}</p>
              <h2 className="display mt-5 text-[1.75rem] text-primary sm:text-[2.125rem]">
                {music.headline}
              </h2>
              <p className="measure-tight mt-5 text-sm leading-relaxed text-secondary sm:text-base">
                {music.intro}
              </p>
              <a
                href={music.profile}
                {...EXTERNAL}
                className="group mt-5 inline-flex min-h-11 items-center"
              >
                <Out>All songs on Suno</Out>
              </a>
            </div>

            <ol>
              {music.tracks.map((track, i) => (
                <li key={track.href}>
                  <a
                    href={track.href}
                    {...EXTERNAL}
                    className="group flex gap-5 border-b border-hair py-6 first:border-t"
                  >
                    <span className="label pt-1 text-quiet">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="display block text-[1.25rem] text-primary transition-colors duration-150 group-hover:text-accent-2 sm:text-[1.5rem]">
                        {track.title}
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-tertiary">
                        {track.description}
                      </span>
                      <span className="mt-4 block">
                        <Out>Listen on Suno</Out>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          02 WORK / VISUALS – a gallery wall. The art dominates; captions
          are deliberately tiny.
          --------------------------------------------------------------- */}
      <Section mark="02 · Visuals" className="mt-24 sm:mt-32">
        <Reveal>
          <div className="border-t border-hair pt-8">
            <p className="label text-accent">{visuals.label}</p>
            <h2 className="display measure mt-5 text-[1.75rem] text-primary sm:text-[2.125rem]">
              {visuals.headline}
            </h2>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
            {/* Feature */}
            <figure className="group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={feature.image}
                alt={feature.title}
                width={feature.width}
                height={feature.height}
                loading="eager"
                decoding="async"
                className="block h-auto w-full"
              />
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="label normal-case tracking-[0.08em] text-tertiary">
                  {feature.title}
                </span>
                <span className="hidden text-xs text-quiet sm:block">
                  {feature.description}
                </span>
              </figcaption>
            </figure>

            {/* The two smaller works, stacked */}
            <div className="flex flex-col gap-8 lg:gap-10">
              {rest.map((w) => (
                <figure key={w.title} className="group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={w.image}
                    alt={w.title}
                    width={w.width}
                    height={w.height}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                  <figcaption className="mt-4">
                    <span className="label block normal-case tracking-[0.08em] text-tertiary">
                      {w.title}
                    </span>
                    <span className="mt-1 block text-xs text-quiet">
                      {w.description}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          02 WORK / AD CREATIVE – video left, campaign contact sheet right.
          --------------------------------------------------------------- */}
      <Section mark="02 · Ad creative" className="mt-24 sm:mt-32">
        <Reveal>
          <div className="border-t border-hair pt-8">
            <p className="label text-accent">{adCreative.label}</p>
            <h2 className="display measure mt-5 text-[1.75rem] text-primary sm:text-[2.125rem]">
              {adCreative.headline}
            </h2>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            {/* IZZE – the real clip. Metadata-only preload keeps the file off
                the initial page load; it downloads when someone presses play. */}
            <div>
              {/* Portrait clip: capped so it does not run taller than the
                  viewport and dwarf the campaign beside it. */}
              <video
                controls
                preload="metadata"
                playsInline
                className="block max-h-[34rem] w-full bg-sunken object-contain"
              >
                <source src={adCreative.izze.video} type="video/mp4" />
              </video>
              <p className="label mt-5 normal-case tracking-[0.08em] text-tertiary">
                {adCreative.izze.title}
              </p>
              <p className="measure-tight mt-3 text-sm leading-relaxed text-secondary">
                {adCreative.izze.description}
              </p>
              <p className="label mt-4 normal-case leading-[1.6] tracking-[0.08em] text-quiet">
                {adCreative.izze.tool}
              </p>
            </div>

            {/* Celsius – one campaign, three frames. */}
            <div>
              <div className="grid grid-cols-3 gap-3">
                {adCreative.celsius.frames.map((f) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={f.image}
                    src={f.image}
                    alt={adCreative.celsius.title}
                    width={f.width}
                    height={f.height}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[3/4] w-full bg-sunken object-cover"
                  />
                ))}
              </div>
              <p className="label mt-5 normal-case tracking-[0.08em] text-tertiary">
                {adCreative.celsius.title}
              </p>
              <p className="measure-tight mt-3 text-sm leading-relaxed text-secondary">
                {adCreative.celsius.description}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          TRANSITION – one line, a lot of air. Nothing else.
          --------------------------------------------------------------- */}
      <Section mark="02 · Making" className="mt-28 sm:mt-40">
        <Reveal>
          <p className="display text-balance text-[clamp(1.75rem,4vw,3rem)] leading-[1.12] text-primary">
            {transition}
          </p>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          03 NOTES – field notes, not a blog CMS.
          --------------------------------------------------------------- */}
      <Section mark="03 · Notes" className="mt-28 sm:mt-40">
        <Reveal>
          <div className="border-t border-hair pt-8">
            <p className="label text-accent">{notes.label}</p>
            <h2 className="display mt-5 text-[1.75rem] text-primary sm:text-[2.125rem]">
              {notes.headline}
            </h2>
            <p className="measure mt-5 text-sm leading-relaxed text-secondary sm:text-base">
              {notes.intro}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid gap-x-12 sm:grid-cols-2">
            {notes.articles.map((a) => (
              <a
                key={a.href}
                href={a.href}
                {...EXTERNAL}
                className="group flex flex-col border-t border-hair py-7"
              >
                <span className="flex items-baseline gap-3">
                  <span className="label text-accent">{a.topic}</span>
                  {a.year && <span className="label text-quiet">{a.year}</span>}
                </span>
                <span className="display mt-4 flex-1 text-[1.125rem] leading-[1.28] text-primary transition-colors duration-150 group-hover:text-accent-2 sm:text-[1.25rem]">
                  {a.title}
                </span>
                <span className="mt-5">
                  <Out>Read on LinkedIn</Out>
                </span>
              </a>
            ))}
          </div>
          <div className="border-t border-hair" />
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          CLOSING.
          --------------------------------------------------------------- */}
      <Section mark="03 · Closing" className="mt-24 sm:mt-32">
        <Reveal>
          <div className="border-t border-hair pt-12">
            <p className="display text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.14] text-primary">
              {creativeClosing.lines[0]}
              <br />
              {creativeClosing.lines[1]}
            </p>
            <p className="label mt-8 normal-case leading-[1.6] tracking-[0.08em] text-quiet">
              {creativeClosing.small}
            </p>
            <div className="mt-8 flex flex-wrap gap-8">
              {creativeClosing.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  {...EXTERNAL}
                  className="group inline-flex min-h-11 items-center"
                >
                  <Out>{l.label}</Out>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>
    </PageShell>
  );
}
