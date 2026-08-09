import type { TerritoryKey } from "./site";

/**
 * Experiments – builder evidence.
 *
 * This page answers one skeptical question: does she actually make things?
 * So the unit here is a *build*, described as problem → thing built →
 * contribution → what it changed. Awards are metadata, never the headline.
 *
 * `published: false` entries are scaffolding for work Rachel has done but
 * hasn't written up yet. They are filtered out of the render, so the page
 * always shows a short list of real things rather than a grid of empty slots.
 * Flip the flag once the copy is real.
 */

export type Experiment = {
  slug: string;
  title: string;
  /** Mono eyebrow: the domain this experiment probes. */
  category: string;
  /** What was wrong or unknown before the build. */
  problem: string;
  /** The artifact itself. */
  built: string;
  /** Her specific contribution – matters most when the build was a team one. */
  contribution: string;
  /** What the build taught, which is the real output of an experiment. */
  learning: string;
  stack: string[];
  /** Context like "Hackathon, 2025" – deliberately small in the layout. */
  meta?: string;
  published: boolean;
};

export const experimentsIntro = {
  eyebrow: "Experiments · Prototypes · Hackathons",
  headline: "Ideas become clearer when you build them.",
  body: [
    "I use prototypes as a way of thinking. Writing a spec forces you to describe a thing; building it forces you to find out whether the thing actually works.",
    "These are weekend builds, hackathon projects, and technical experiments. Some are rough. That's the point – they exist to answer a question, and the answer is usually not the one I expected.",
  ],
};

export const experiments: Experiment[] = [
  {
    slug: "trust-receipt",
    title: "Trust Receipt",
    category: "Trustworthy AI",
    problem:
      "AI systems produce confident answers with no way to see what was actually checked. A user is asked to either trust the whole output or none of it.",
    built:
      "A prototype that makes an AI output inspectable – surfacing which sources were consulted, which claims were verified against them, which were human-reviewed, and which remain uncertain.",
    contribution:
      "Designed the provenance model and the receipt interface, and built the prototype end to end.",
    learning:
      "Showing uncertainty made people trust the system more, not less. The failure mode of AI interfaces isn't being wrong – it's being unfalsifiable.",
    stack: ["Provenance", "Evaluation", "AI Interfaces"],
    published: true,
  },
  {
    slug: "ad-ai-pulse",
    title: "Ad AI Pulse",
    category: "Agentic AI",
    problem:
      "Changes in advertising and AI arrive as a firehose of fragmented announcements. Knowing what happened is easy; knowing what it means for your particular role is the hard part.",
    built:
      "An AI-native intelligence system that ingests changes across the advertising and AI landscape and turns them into role-specific interpretation – what shifted, why it matters to you, and what decision it implies.",
    contribution:
      "Defined the agent architecture and the role-conditioning model, and built the ingestion and synthesis pipeline.",
    learning:
      "Summarisation was never the bottleneck. Relevance was. The useful unit of output is a decision, not a digest.",
    stack: ["Agents", "Synthesis", "AdTech Intelligence"],
    published: true,
  },

  // ---------------------------------------------------------------------
  // Scaffolding below. Real builds, copy not yet written – see CONTENT.md.
  // Set `published: true` once each is filled in.
  // ---------------------------------------------------------------------
  {
    slug: "placeholder-multimodal",
    title: "",
    category: "Multimodal AI",
    problem: "",
    built: "",
    contribution: "",
    learning: "",
    stack: [],
    published: false,
  },
  {
    slug: "placeholder-eval",
    title: "",
    category: "Evaluation",
    problem: "",
    built: "",
    contribution: "",
    learning: "",
    stack: [],
    published: false,
  },
];

export const publishedExperiments = experiments.filter((e) => e.published);

export const experimentsTerritory: TerritoryKey = "experiments";
