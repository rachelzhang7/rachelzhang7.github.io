import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { MediaFrame } from "@/components/MediaFrame";
import { EmphText } from "@/components/EmphText";
import { cn } from "@/lib/cn";
import {
  adCreative,
  creativeClosing,
  creativeIntro,
  mediums,
  music,
  notes,
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
    <span className="label inline-flex items-center gap-2 text-accent-2 transition-colors duration-150 group-hover:text-accent">
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
  return (
    <PageShell territory="creative">
      {/* ---------------------------------------------------------------
          01 WHY – why I create with AI.
          --------------------------------------------------------------- */}
      <Section mark="01 · Why" className="pt-14 sm:pt-20">
        <p className="label beat beat-1 text-accent-2">{creativeIntro.eyebrow}</p>

        <h1 className="display beat beat-2 mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.06] text-primary">
          <EmphText text={creativeIntro.headline} emph={["medium"]} />
        </h1>

        <div className="beat beat-3 mt-10 flex max-w-2xl flex-col gap-4">
          {creativeIntro.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-base leading-relaxed text-secondary sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* The anchor line. Deliberately the loudest thing in the hero. */}
        <p className="display beat beat-4 mt-14 text-balance text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.12] text-accent-2">
          {creativeIntro.anchor}
        </p>
      </Section>

      {/* ---------------------------------------------------------------
          02 WORK – three mediums as one index, then each in turn.
          --------------------------------------------------------------- */}
      <Section mark="02 · Work" className="mt-24 sm:mt-32">
        {/* The medium index: three columns, one rule each. */}
        <Reveal>
          <div className="grid grid-cols-1 border-t border-hair sm:grid-cols-3">
            {mediums.map((m, i) => (
              <div
                key={m.name}
                className={cn(
                  "py-5",
                  i > 0 && "sm:border-l sm:border-hair sm:pl-8",
                  i === 0 && "sm:pr-8",
                )}
              >
                <p className="font-mono text-[0.8125rem] uppercase tracking-[0.18em] text-primary">
                  {m.name}
                </p>
                <p className="mt-1 text-sm text-secondary">{m.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* MUSIC – one paragraph on the left, three numbered tracks across. */}
        <Reveal className="mt-16">
          <div className="grid gap-10 border-t border-hair pt-8 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
            <div>
              <p className="label text-accent-2">{music.label}</p>
              <p className="measure-tight mt-4 text-sm leading-relaxed text-secondary sm:text-base">
                {music.headline} {music.intro}
              </p>
              <a
                href={music.profile}
                {...EXTERNAL}
                className="group mt-5 inline-flex min-h-11 items-center"
              >
                <Out>All songs on Suno</Out>
              </a>
            </div>

            <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              {music.tracks.map((track, i) => (
                <div key={track.href} className="group flex flex-col">
                  <MediaFrame
                    label={track.title}
                    tone="music"
                    ratio="1 / 1"
                    src={track.image}
                    alt={`Cover art for ${track.title}`}
                  />
                  <p className="label mt-5 text-accent-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="display mt-2 text-[1.125rem] leading-snug text-primary sm:text-[1.25rem]">
                    {track.title}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">
                    {track.description}
                  </p>
                  <a
                    href={track.href}
                    {...EXTERNAL}
                    className="group mt-4 inline-flex min-h-9 items-center"
                  >
                    <Out>Listen on Suno</Out>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* VISUALS – one line on the left, two artworks side by side. */}
        <Reveal className="mt-16">
          <div className="grid gap-10 border-t border-hair pt-8 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
            <div>
              <p className="label text-accent-2">{visuals.label}</p>
              <p className="measure-tight mt-4 text-sm leading-relaxed text-secondary sm:text-base">
                {visuals.headline}
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
              {visuals.works.map((w) => (
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

        {/* AD CREATIVE – the video and the campaign, beside the question. */}
        <Reveal className="mt-16">
          <div className="grid gap-10 border-t border-hair pt-8 lg:grid-cols-[1fr_3fr] lg:gap-16">
            <div>
              <p className="label text-accent-2">{adCreative.label}</p>
              <p className="measure-tight mt-4 text-sm leading-relaxed text-secondary sm:text-base">
                {adCreative.headline}
              </p>
            </div>

            {/* The clip and the campaign side by side, tops aligned. The
                portrait clip is fixed to a compact size so it never runs
                taller than the campaign strip. */}
            <div className="grid items-start gap-10 sm:grid-cols-2 sm:gap-10">
              {/* IZZE – the real clip. Metadata-only preload keeps the file
                  off the initial page load; it downloads on play. */}
              <div>
                <video
                  controls
                  preload="metadata"
                  playsInline
                  className="block h-56 w-32 bg-sunken object-contain"
                >
                  <source src={adCreative.izze.video} type="video/mp4" />
                </video>
                <p className="label mt-5 normal-case tracking-[0.08em] text-tertiary">
                  {adCreative.izze.title}
                </p>
                <p className="label mt-2 normal-case leading-[1.6] tracking-[0.08em] text-quiet">
                  {adCreative.izze.tool}
                </p>
                <p className="measure-tight mt-3 text-sm leading-relaxed text-secondary">
                  {adCreative.izze.description}
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
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------
          03 NOTES – field notes, not a blog CMS. Four columns, one rule.
          --------------------------------------------------------------- */}
      <Section mark="03 · Notes" className="mt-24 sm:mt-32">
        <Reveal>
          <div className="border-t border-hair pt-8">
            <p className="label text-accent-2">{notes.label}</p>
            <p className="measure mt-5 text-sm leading-relaxed text-secondary sm:text-base">
              {notes.intro}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {notes.articles.map((a) => (
              <a
                key={a.href}
                href={a.href}
                {...EXTERNAL}
                className="group flex flex-col border-t border-hair py-7"
              >
                <span className="flex items-baseline gap-3">
                  <span className="label text-accent-2">{a.topic}</span>
                  {a.year && <span className="label text-quiet">{a.year}</span>}
                </span>
                <span className="display mt-4 flex-1 text-[1.125rem] leading-[1.28] text-primary transition-colors duration-150 group-hover:text-accent sm:text-[1.25rem]">
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
      <Section mark="Closing" className="mt-24 sm:mt-32">
        <Reveal>
          <div className="border-t border-hair pt-12">
            <p className="display text-balance text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.14] text-accent-2">
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
