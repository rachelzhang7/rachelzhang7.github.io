import type { TerritoryKey } from "./site";

/**
 * The four threads that structure the site.
 *
 * These are not categories of work — they are dimensions of one person, in a
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
    headline: "Building inside the machinery of digital advertising.",
    body: "Products across commerce, signals, creative AI, automation, and advertiser experience — shaped by years working on advertising systems at scale.",
    cta: "Explore AdTech",
  },
  {
    key: "experiments",
    index: "02",
    title: "Experiments",
    dimension: "Making",
    href: "/experiments/",
    headline: "Ideas become clearer when you build them.",
    body: "Hackathons, prototypes, and technical experiments exploring agents, multimodal AI, trust, evaluation, interfaces, and new ways humans work with intelligent systems.",
    cta: "Explore Experiments",
  },
  {
    key: "creative",
    index: "03",
    title: "Creative AI",
    dimension: "Taste",
    href: "/creative-ai/",
    headline: "AI is not only a tool. It's becoming a medium.",
    body: "Experiments in music, visual storytelling, design, and generative creativity — exploring what happens when technology expands what an individual can express.",
    cta: "Explore Creative AI",
  },
  {
    key: "ventures",
    index: "04",
    title: "Future Ventures",
    dimension: "Ownership",
    href: "/future-ventures/",
    headline: "From building products to building possibilities.",
    body: "Independent products and early-stage ventures where I'm testing whether an idea can become something people genuinely want.",
    cta: "Explore Ventures",
  },
];

export const territoryByKey = Object.fromEntries(
  territories.map((t) => [t.key, t]),
) as Record<Exclude<TerritoryKey, "identity">, Territory>;
