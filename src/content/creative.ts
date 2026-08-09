/**
 * Creative AI – taste and curiosity.
 *
 * This page is a small gallery, not a portfolio. The organising question is not
 * "what business impact did this have" but "what happens when AI becomes a
 * medium for human expression". Copy stays short on purpose: a title, the
 * artifact, and at most two sentences.
 */

export type Work = {
  slug: string;
  title: string;
  /** Medium, shown as a mono label. */
  medium: string;
  /** Two sentences maximum. Resist explaining. */
  note: string;
  /**
   * Visual treatment for the generated placeholder artwork. Each maps to a
   * different generative pattern so the gallery doesn't read as one repeated
   * texture. Swap for a real asset by setting `image`.
   */
  visual: "spectrum" | "bloom" | "strata" | "weave" | "orbit" | "grain";
  /** Path under /public once a real asset exists. Overrides `visual`. */
  image?: string;
  /** Controls the masonry rhythm – the gallery is deliberately irregular. */
  span: "tall" | "wide" | "square";
  published: boolean;
};

export const creativeIntro = {
  eyebrow: "Creative AI",
  headline: "AI is not only a tool. It's becoming a medium.",
  body: [
    "What happens when AI becomes a medium for human expression rather than a way to produce more content faster?",
    "These are experiments in music, image, and story – made to find out what an individual can now express alone.",
  ],
};

export const works: Work[] = [
  {
    slug: "music",
    title: "Original Music",
    medium: "Sound · Composition",
    note: "Writing with AI as a collaborator rather than a generator. The interesting moments are the ones where it suggests something I wouldn't have chosen but can't argue with.",
    visual: "spectrum",
    span: "wide",
    published: true,
  },
  {
    slug: "visual",
    title: "Visual Studies",
    medium: "Image · Generative",
    note: "Iterating on a single visual idea until the model and I converge on something neither of us started with.",
    visual: "bloom",
    span: "tall",
    published: true,
  },
  {
    slug: "storytelling",
    title: "Storytelling",
    medium: "Narrative · Multimodal",
    note: "Short-form narrative built across text, image and sound, testing how far one person can carry a whole production.",
    visual: "strata",
    span: "square",
    published: true,
  },
];

export const publishedWorks = works.filter((w) => w.published);
