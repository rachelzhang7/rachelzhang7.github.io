import type { TerritoryKey } from "./site";

/**
 * The four threads that structure the site.
 *
 * These are not categories of work – they are dimensions of one person, in a
 * deliberate order: depth, then making, then taste, then ownership. The
 * homepage renders them as editorial panels; the nav and page headers reuse the
 * same accent + numbering so a visitor always knows which territory they're in.
 */

export type Territory = {
  key: TerritoryKey;
  /** Zero-padded index used as a typographic element, not decoration. */
  index: string;
  title: string;
  /** One word naming the dimension this territory proves. */
  dimension: string;
  href: string;
  /** The claim, in the client's voice. Reads as a sentence, not a slogan. */
  headline: string;
  body: string;
  cta: string;
};

export const territories: Territory[] = [
  {
    key: "adtech",
    index: "01",
    title: "AdTech",
    dimension: "Depth",
    href: "/adtech/",
    headline: "I know a domain deeply.",
    body: "Years spent building inside the machinery of digital advertising – across the systems that connect data, intelligence, creative, and automation.",
    cta: "Explore AdTech",
  },
  {
    key: "experiments",
    index: "02",
    title: "Experiments",
    dimension: "Building",
    href: "/experiments/",
    headline: "I build. Repeatedly.",
    body: "Hackathons and rapid experiments where I turn ideas into working products – often under extreme time constraints.",
    cta: "Explore Experiments",
  },
  {
    key: "creative",
    index: "03",
    title: "Creative AI",
    dimension: "Taste",
    href: "/creative-ai/",
    headline: "I explore and develop taste.",
    body: "Music, video, visual storytelling, and design – exploring AI not only as a tool, but as a new creative medium.",
    cta: "Explore Creative AI",
  },
];

export const territoryByKey = Object.fromEntries(
  territories.map((t) => [t.key, t]),
) as Record<"adtech" | "experiments" | "creative", Territory>;
