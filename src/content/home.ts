import type { TerritoryKey } from "./site";

/**
 * Homepage – identity.
 *
 * The job of this page is positioning, answered in 10–15 seconds: a product
 * builder working across AI, AdTech and Creative AI, with unusual depth in
 * advertising but ambitions broader than advertising. It is not a catalogue.
 */

export const hero = {
  /** Where she operates. The pillars below say what makes it distinctive. */
  eyebrow: "Advertising × AI × Creativity",
  /**
   * Split so the display type breaks exactly where it should, and so one
   * phrase can carry the accent underline.
   */
  headline: {
    lead: "I build at the intersection of",
    emphasis: "advertising, AI,",
    trail: "and creativity.",
  },
  /** One paragraph. No company names, no skill lists, no years. */
  body: [
    "I've built products across advertising data, commerce, creative, and automation – alongside hands-on experiments with AI products and generative creativity.",
  ],
  actions: [
    { label: "Explore my work", href: "/adtech/", primary: true },
    { label: "Let's connect", href: "/about/#connect", primary: false },
  ],
};

/**
 * The three states the hero visual argues for, labelled beneath it. These are
 * the conceptual spine of the whole site: many signals become understanding,
 * understanding becomes expression.
 */
export const heroStates = [
  { label: "Systems", note: "Complexity at scale" },
  { label: "Intelligence", note: "Signals into understanding" },
  { label: "Creation", note: "Ideas expressed, value created" },
];

/** Small credibility strip under the hero. Kept to three, kept factual. */
export const credentials = [
  { value: "Ex-TikTok", label: "Product leadership" },
  { value: "5× AI hackathon winner", label: "2024 – 2026" },
  { value: "Builder", label: "Prototypes to products" },
];

/**
 * The three pillars are the site's mental model. The heading states it as the
 * framework rather than describing it, because the thing a visitor should
 * remember is the framework itself.
 *
 * No intro paragraph: these exist for orientation, not explanation. The
 * evidence lives on the three destination pages.
 */
export const workIntro = {
  eyebrow: "The work",
  headline: "Depth × Building × Taste.",
};

/**
 * Exactly three, one per pillar.
 *
 * The homepage shows evidence, not an inventory – the three destination pages
 * carry the full body of work. Each entry should say what the artifact is and
 * why it matters, in one sentence. Anything longer belongs on its own page.
 */
export type SelectedWork = {
  title: string;
  /** Which pillar this is evidence for. Drives the mono tag on the artifact. */
  territory: TerritoryKey;
  /** What kind of thing it is – not a skill list. */
  kind: string;
  blurb: string;
  href: string;
  cta: string;
  /** Drives which generated schematic stands in until a real capture exists. */
  visual: "conversation" | "receipt" | "pulse" | "gallery" | "lattice";
  /**
   * Path under /public once a real screenshot, still or mockup exists.
   * A real artifact should always replace the schematic – see CONTENT.md.
   */
  image?: string;
};

export const selectedWork: SelectedWork[] = [
  {
    title: "AI Copilot × Commerce",
    territory: "adtech",
    kind: "Product · Shipped",
    blurb:
      "Conversational intelligence inside the merchant workflow, turning a complex campaign system into something navigable in plain language.",
    href: "/adtech/",
    cta: "See the work",
    visual: "conversation",
  },
  {
    title: "Trust Receipt",
    territory: "experiments",
    kind: "Prototype",
    blurb:
      "A way to make an AI answer inspectable: what was checked, what supports it, and what is still uncertain.",
    href: "/experiments/",
    cta: "See the build",
    visual: "receipt",
  },
  {
    title: "Original Music",
    territory: "creative",
    kind: "Sound · Composition",
    blurb:
      "Writing with AI as a collaborator rather than a generator, and keeping the parts neither of us would have reached alone.",
    href: "/creative-ai/",
    cta: "See the work",
    visual: "gallery",
  },
  // One per pillar, deliberately. Ad AI Pulse and the rest live on their own
  // pages; Aubric is absent because Future Ventures is not part of this
  // architecture, and its entry is preserved in src/content/ventures.ts.
];

export const closing = {
  /**
   * The most important copy on the site. It's the reason the other four pages
   * cohere into an argument rather than five buckets.
   */
  quote: "AI is shrinking the distance between having an idea and making it real.",
  body: [
    "For most of my career, my job was deciding what should be built and working with teams to make it real.",
    "A product person can now move much further across the stack – from an observation to a prototype, from a prototype to an experience, and sometimes from an experience to a business.",
    "That's the direction I'm exploring now.",
  ],
  actions: [
    {
      label: "More about me",
      note: "My background, principles, and how I think.",
      href: "/about/",
    },
    {
      label: "Let's connect",
      note: "Always excited to meet builders, thinkers, and curious people.",
      href: "/about/#connect",
    },
  ],
};
