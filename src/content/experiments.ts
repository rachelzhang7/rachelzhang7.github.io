/**
 * Experiments – a curated builder journal, organised by year.
 *
 * Not a résumé and not a hackathon archive. Each entry is a real thing that was
 * built, carried by its real artifact.
 *
 * Rules for anything added here: no invented screenshots, capabilities, metrics,
 * awards, links or status labels. An award appears only where one was actually
 * given. A `href` appears only where a real link exists.
 */

export type Experiment = {
  slug: string;
  name: string;
  /** The idea in one line. */
  headline: string;
  /** What it actually does. One paragraph, not a case study. */
  description: string;
  /** Understated category footer. Not a tag list. */
  footer: string;
  /** Real asset under /public/media/experiments. */
  image: string;
  /** Only where one was actually awarded. */
  award?: string;
  /** Only where a real link exists. */
  href?: string;
  /** The question the build was actually testing. Featured entries only. */
  question?: string;
};

export type Year = {
  year: string;
  /** Given the editorial alternating treatment. */
  featured: Experiment[];
  /** Subordinate, revealed on interaction. */
  more: Experiment[];
};

export const experimentsIntro = {
  eyebrow: "Experiments · Prototypes · Hackathons",
  /** Split so the emphasised word can carry italic and the accent. */
  headline: { lead: "I build to", emphasis: "understand" },
  body: [
    "GenAI has shortened the distance between a product idea and something real.",
    "Building has become part of how I do product discovery.",
  ],
};

/**
 * The product loop, and how much of it is now hers to own. `active` marks the
 * stage GenAI changed most – the reason the rest of the page exists.
 */
export const buildLoop = {
  stages: ["Problem", "Design", "Build", "Test", "Learn"],
  active: "Build",
  caption: "Expanding how much of the loop I can own.",
};

/** What the building has actually taught. Three claims, no more. */
export const principles = [
  {
    title: "Ideas become evidence faster.",
    body: "I can make an assumption tangible in hours or days, put it in front of people, and learn from reality instead of debating it in the abstract.",
  },
  {
    title: "Building got cheaper. Judgment didn't.",
    body: "What to build, for whom, and why it should exist matter more when implementation is abundant.",
  },
  {
    title: "Prototype speed isn't product quality.",
    body: "AI compresses implementation, but coherence, reliability, UX, and taste still require iteration and judgment.",
  },
];

/**
 * Years render newest first. Adding a year means adding an entry here – the
 * page reads this array and needs no structural change. A year with no entries
 * is filtered out rather than rendered as an empty marker.
 */
export const years: Year[] = [
  {
    year: "2026",
    featured: [
      {
        slug: "ad-ai-pulse",
        name: "Ad AI Pulse",
        headline:
          "Personalized intelligence for people navigating AI × advertising.",
        description:
          "Personalized intelligence for people navigating AI × advertising.",
        footer: "AI Intelligence · AdTech",
        image: "/media/experiments/ad-ai-pulse.jpg",
        question:
          "Can AI turn an overwhelming information stream into decisions that matter to someone's work?",
      },
      {
        slug: "beam",
        name: "Beam",
        headline:
          "Turn an idea into something people can react to – before building the product.",
        description:
          "Turn an early idea into something people can react to before building the full product.",
        footer: "AI Storytelling · Feedback Loops",
        image: "/media/experiments/beam.jpg",
        question:
          "Can AI-generated artifacts make product validation faster and more concrete?",
      },
      {
        slug: "creative-war-room",
        name: "Creative War Room",
        headline:
          "What if AI didn't just generate creative – but argued about what was worth making?",
        description:
          "A multi-agent system for debating and refining creative ideas.",
        footer: "Multi-Agent Systems · Creative AI",
        image: "/media/experiments/creative-war-room.jpg",
        question:
          "When generation becomes cheap, can multiple AI perspectives improve judgment rather than just produce more options?",
      },
    ],
    more: [
      {
        slug: "anchor",
        name: "Anchor",
        headline: "Catch the moment when intention starts to drift.",
        description:
          "An ambient agent for smart glasses that detects likely behavioral drift during a focus session and intervenes with one deliberately simple question – “On purpose?”",
        footer: "Ambient AI · Smart Glasses",
        image: "/media/experiments/anchor.jpg",
        award: "AGI House · Best G2 Glass Integration",
      },
      {
        slug: "trust-receipt",
        name: "Trust Receipt",
        headline: "Proof behind every AI action.",
        description:
          "A runtime trust layer that verifies identity, authority, intent, policy and provenance as AI agents act – then generates a persistent receipt explaining why an outcome can be trusted.",
        footer: "Agent Infrastructure · AI Trust",
        image: "/media/experiments/trust-receipt.jpg",
      },
      {
        slug: "cortex",
        name: "Cortex",
        headline: "Find where understanding breaks – before trying to teach.",
        description:
          "An AI learning diagnostic that reconstructs a learner's reasoning, identifies the first point of divergence, tests the suspected misconception through adaptive questioning, and prescribes the smallest next learning step.",
        footer: "AI Learning · Reasoning Systems",
        image: "/media/experiments/cortex.jpg",
      },
    ],
  },
];

/** The page ends on this. The final mark carries the accent. */
export const experimentsClosing = {
  lead: "Build to bring ideas closer to reality",
};

/**
 * The thesis behind Creative War Room. Surfaced quietly beside the project
 * rather than given a section of its own.
 */
export const creativeWarRoomThesis =
  "Generation is becoming cheap. Judgment is the bottleneck.";

/**
 * Further real assets, kept for deeper project pages later. Deliberately not
 * rendered here – the composition is stronger with one image per project.
 */
export const archivedAssets: Record<string, string[]> = {
  "ad-ai-pulse": ["/media/experiments/ad-ai-pulse-full.jpg"],
  beam: ["/media/experiments/beam-workflow.jpg"],
  "creative-war-room": ["/media/experiments/creative-war-room-ui.jpg"],
  anchor: ["/media/experiments/anchor-flow.jpg"],
};
