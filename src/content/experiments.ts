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
  headline: "I build to understand.",
  body: "I use hackathons and prototypes to explore new technologies by turning ideas into working products – quickly, repeatedly, and often under tight constraints.",
  note: "Some experiments become products. Others become lessons. Both shape what I build next.",
};

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
          "Ad AI Pulse turns a noisy stream of AI and advertising signals into role-aware, project-aware intelligence – helping practitioners understand what changed, why it matters to their work, and what to do next.",
        footer: "AI Intelligence · AdTech",
        image: "/media/experiments/ad-ai-pulse.jpg",
      },
      {
        slug: "beam",
        name: "Beam",
        headline:
          "Turn an idea into something people can react to – before building the product.",
        description:
          "Beam turns early product ideas into audience-specific narrative and video artifacts, puts them in front of real people, captures their feedback, and uses that feedback to generate a better next version.",
        footer: "AI Storytelling · Feedback Loops",
        image: "/media/experiments/beam.jpg",
      },
      {
        slug: "creative-war-room",
        name: "Creative War Room",
        headline:
          "What if AI didn't just generate creative – but argued about what was worth making?",
        description:
          "Creative War Room puts specialized AI agents – strategist, creative director, copywriter, performance marketer, brand guardian, and legal reviewer – into a shared campaign room where they debate, challenge, veto, score, and refine ideas before they ship.",
        footer: "Multi-Agent Systems · Creative AI",
        image: "/media/experiments/creative-war-room.jpg",
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
