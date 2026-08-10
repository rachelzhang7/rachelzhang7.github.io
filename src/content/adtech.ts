/**
 * AdTech – depth.
 *
 * The page makes three claims and lets the layout carry them:
 *   1. real depth across several parts of advertising systems,
 *   2. a trajectory – data foundations to intelligence to automation,
 *   3. a point of view on where GenAI takes the industry.
 *
 * Scope discipline: the hero deliberately names the four areas actually worked
 * in. It must never be widened back to "across the advertising stack", which
 * would claim every major ads subsystem.
 *
 * Disclosure rules for anything added here: no internal metrics, no unreleased
 * features, no roadmap, no proprietary implementation detail, no customer names.
 * Describe product contribution and system understanding; never imply authorship
 * of underlying models or infrastructure where the role was product leadership.
 */

export const adtechIntro = {
  eyebrow: "Ad Tech",
  /** Split so the final word can carry the page's one blue emphasis. */
  headline: {
    lead: "I build advertising systems to understand how they",
    emphasis: "decide",
  },
  body: "Working across signals, measurement, Creative AI, and commerce ads automation has given me different views into how advertising systems work – and made me increasingly interested in how better context, intelligence, and feedback can lead to better decisions.",
};

/**
 * Three lessons, one horizontal band. Each is a claim (serif) plus the
 * observation behind it (sans). One word in each carries the accent, and those
 * three words – signals, system, judgment – are the page's argument in
 * miniature.
 */
export type Lesson = {
  /** Selects the glyph drawn beside the claim. */
  glyph: "field" | "system" | "rise";
  lead: string;
  emphasis: string;
  tail: string;
  body: string;
};

export const lessons: Lesson[] = [
  {
    glyph: "field",
    lead: "Better learning starts with better ",
    emphasis: "signals",
    tail: ".",
    body: "What the system can observe shapes what it can learn.",
  },
  {
    glyph: "system",
    lead: "Performance is a ",
    emphasis: "system",
    tail: " property.",
    body: "Creative, delivery, auction, optimization, and conversion interact.",
  },
  {
    glyph: "rise",
    lead: "Automation depends on context and ",
    emphasis: "judgment",
    tail: ".",
    body: "Better context expands what machines can decide well.",
  },
];

/**
 * Selected work – three chapters, not six cards. The column order IS the
 * argument, so nothing here may be sorted by recency or importance.
 */
export type Chapter = {
  index: string;
  name: string;
  /** observe -> understand -> act. Three words is the whole trajectory. */
  idea: string;
  /** Names the visual component rendered above the projects. */
  visual: "data" | "intelligence" | "automation";
  /** Read by screen readers in place of the diagram. */
  alt: string;
  projects: { title: string; body: string }[];
};

export const chapters: Chapter[] = [
  {
    index: "01",
    name: "Data",
    idea: "Help the system observe.",
    visual: "data",
    alt: "Browser events from web and app, together with server-side events, converge into a stream of signals feeding ad platforms such as Meta Ads and TikTok Ads, which in turn feed ads models, optimization and delivery.",
    projects: [
      {
        title: "Server-Side Signals",
        body: "Reliable, controllable signal sharing.",
      },
      {
        title: "Events API Gateway",
        body: "Making server-side signal adoption more accessible.",
      },
    ],
  },
  {
    index: "02",
    name: "Intelligence",
    idea: "Help the system understand.",
    visual: "intelligence",
    alt: "A single beverage product enters an AI generation step, which fans out into several distinct ad creatives – beach, sky and tropical scenes, some still and some video.",
    projects: [
      {
        title: "AI Creative Generation",
        body: "Turning merchant context into creative possibilities.",
      },
      {
        title: "AI Evaluation Systems",
        body: "Building better feedback for generated creative.",
      },
    ],
  },
  {
    index: "03",
    name: "Automation",
    idea: "Help the system act.",
    visual: "automation",
    alt: "A merchant channel-app workflow showing automatically generated creative options, campaign objective, budget and targeting, and a publish action – beside a conversational AI copilot answering a question about last week's ad performance.",
    projects: [
      {
        title: "AI Copilot × Ads",
        body: "Bringing richer business context into advertising assistance.",
      },
      {
        title: "Commerce Ads Automation",
        body: "Moving merchant intent toward ready-to-review ads.",
      },
    ],
  },
];

/** Every paper below is a real, published, externally linked source. */
export type Paper = {
  title: string;
  authors: string;
  year: string;
  href: string;
};

/**
 * Ordered to trace the trajectory being watched, not by date:
 * retrieval and ranking -> generative recommendation -> recommendation as
 * generation.
 */
export const papers: Paper[] = [
  {
    title: "Generative Recommendation for Large-Scale Advertising (GR4AD)",
    authors: "Ben Xue et al.",
    year: "2026",
    href: "https://arxiv.org/abs/2602.22732",
  },
  {
    title:
      "Recommendation as Generation: Unifying Personalized Video Generation and Recommendation at Industrial Scale",
    authors: "Yanhua Cheng et al.",
    year: "2026",
    href: "https://arxiv.org/abs/2606.25496",
  },
  {
    title: "LLM Retrieval for Stable and Predictable Ad Recommendations",
    authors: "Vinodh Kumar Sunkara et al.",
    year: "2026",
    href: "https://arxiv.org/abs/2605.21969",
  },
];

/**
 * Industry trends – perspective, not evidence. Deliberately lighter than
 * Selected Work: one claim, one diagram, one line. No paragraphs.
 */
export const trends = {
  intro: "What I'm watching as AI reshapes advertising.",
  items: [
    {
      index: "01",
      title: "Creative becomes part of the optimization space.",
      note: "Generation expands what the system can explore.",
      alt: "One creative expands into a grid of generated variants, which resolves into a single adaptive creative.",
    },
    {
      index: "02",
      title: "From choosing what exists to generating what should exist.",
      alt: "A four-step progression: retrieve, choose candidates; rank, choose what fits; generate, create new possibilities; recommend and generate, decide what should exist.",
    },
    {
      index: "03",
      title: "AI creates a new path between intent and conversion.",
      note: "What happens to signal, attribution, and measurement when AI sits between intent and conversion?",
      alt: "Intent enters an AI assistant, which branches out to discovering, recommending, comparing and buying.",
    },
  ],
};

/**
 * Writing. A list from the start so a second row can be added later without
 * touching the layout, and the year stays small metadata beside the title
 * rather than a heading of its own.
 */
export const writing = {
  label: "Writing",
  entries: [
    {
      title: "GenAI Era Ad Platforms – Hype vs. Reality: What I Really Think",
      year: "2025",
      meta: "Perspective · Generative AI · Advertising",
      href: "https://www.linkedin.com/pulse/genai-era-ad-platforms-hype-reality-what-i-really-think-rachel-zhang-klcuc/?trackingId=8FS%2BHjRWRVypjFTEQ7zOrA%3D%3D",
      cta: "Read on LinkedIn",
    },
  ],
};
