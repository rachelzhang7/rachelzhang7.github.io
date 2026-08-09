/**
 * AdTech – expertise.
 *
 * Case studies are written as *problems*, not résumé bullets, and every
 * outcome is deliberately qualitative. Nothing here should require a
 * confidentiality review: no metrics, no internal names, no roadmap.
 */

export type CaseStudy = {
  slug: string;
  index: string;
  /** The lens this problem sits under, shown as a mono eyebrow. */
  category: string;
  /** The problem, phrased as the thing that was hard. */
  problem: string;
  /** The project name. */
  title: string;
  /** What was built or led. */
  summary: string;
  /** The part that shows how she thinks – the non-obvious difficulty. */
  insight: string;
  tags: string[];
};

export const adtechIntro = {
  eyebrow: "AdTech · Commerce · AI",
  headline: "Building products inside the machinery of digital advertising.",
  body: [
    "I've spent much of my product career working on advertising – from signals and measurement to creative AI, commerce integrations, and advertiser experiences.",
    "What keeps the space interesting isn't any single feature. It's the system underneath: how data becomes understanding, understanding becomes a prediction, and a prediction becomes an action that creates value for a business.",
  ],
};

/**
 * The system diagram's stages. Rendered as a horizontal spine on desktop and a
 * vertical one on mobile, with each stage's constraint stated plainly.
 */
export const systemStages = [
  { name: "Signals", claim: "determine what the system can understand." },
  { name: "Commerce", claim: "determines what it can sell." },
  { name: "Creative", claim: "determines what people see." },
  { name: "Delivery", claim: "determines who sees it, and when." },
  { name: "Experience", claim: "determines whether an advertiser can work any of this." },
];

export const systemIntro = {
  headline: "Advertising is a connected system.",
  body: "A better ad rarely comes from improving one surface in isolation. Most of my work has lived somewhere inside these connections.",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sidekick",
    index: "01",
    category: "Commerce × AI",
    problem: "Bringing AI assistance into the merchant workflow",
    title: "TikTok × Shopify Sidekick",
    summary:
      "Exploring how an AI copilot can help merchants understand and operate advertising without forcing them to learn the underlying complexity of an ads platform.",
    insight:
      "The interesting problem wasn't simply connecting two AI systems. It was deciding what an assistant should know, what it should be allowed to do, and how to make useful advertising intelligence available inside the workflow where merchants already operate.",
    tags: ["AI Interfaces", "Commerce", "Agent Systems"],
  },
  {
    slug: "ad-creation",
    index: "02",
    category: "Advertiser Experience",
    problem: "Making the first ad dramatically easier to create",
    title: "Shopify Ad Creation",
    summary:
      "Redesigned the advertising creation experience inside the Shopify channel to remove friction between store setup and actually launching an ad.",
    insight:
      "The work required thinking across UI, asynchronous platform dependencies, creative inputs, catalog readiness, and campaign systems rather than treating ad creation as an isolated form.",
    tags: ["Product Design", "Commerce", "Ads Infrastructure"],
  },
  {
    slug: "creative-ai",
    index: "03",
    category: "Creative AI",
    problem: "Moving creative generation closer to performance",
    title: "AI-Powered Advertising Creative",
    summary:
      "Worked on products that use generative AI to help advertisers produce and adapt creative for advertising.",
    insight:
      "The deeper product question was not whether AI could generate more content. It was how generation could become part of an advertising system – connected to advertiser intent, platform intelligence, creative quality, and eventually performance.",
    tags: ["Generative AI", "Creative", "Advertising"],
  },
  {
    slug: "signals",
    index: "04",
    category: "Signals",
    problem: "Improving what an advertising system can understand",
    title: "Advertiser Signal Infrastructure",
    summary:
      "Worked on products that help advertisers send higher-quality conversion and customer signals into advertising systems.",
    insight:
      "Signals are mostly invisible to the person seeing an ad, but they determine much of what happens downstream – measurement, optimization, attribution, and ultimately how effectively an advertiser can spend.",
    tags: ["Signals", "Measurement", "Data Infrastructure"],
  },
  {
    slug: "catalog",
    index: "05",
    category: "Commerce Infrastructure",
    problem: "Turning a store catalog into advertising infrastructure",
    title: "Commerce Catalog Systems",
    summary:
      "Worked across merchant catalog ingestion, synchronization, market configuration, diagnostics, and the connection between commerce data and advertising products.",
    insight:
      "What looks like “sync my products” from the merchant side becomes a distributed systems problem underneath – identity, availability, variants, markets, freshness, errors, and downstream eligibility all have to remain coherent.",
    tags: ["Catalog", "Commerce", "Platform Infrastructure"],
  },
  {
    slug: "automation",
    index: "06",
    category: "Automation",
    problem: "Reducing the expertise required to advertise",
    title: "Automated Advertising Experiences",
    summary:
      "Worked on products that progressively move complexity away from advertisers – using platform intelligence to simplify setup, creative decisions, targeting, optimization, and campaign management.",
    insight:
      "The product tension is fundamental: automation can create enormous leverage, but every decision removed from the advertiser also changes their sense of understanding and control.",
    tags: ["Automation", "Optimization", "Advertiser UX"],
  },
];

export const howIThink = {
  eyebrow: "How I think about AdTech",
  headline: "The best advertising products hide complexity without hiding intelligence.",
  body: [
    "Over time, I've become less interested in individual advertising features and more interested in the interfaces between systems.",
    "A merchant shouldn't need to understand event schemas to send good signals. They shouldn't need to understand catalog architecture to advertise their products. And increasingly, they shouldn't need to understand every campaign primitive to make a good advertising decision.",
    "But abstraction has a cost. Hide too little and the product remains complicated. Hide too much and advertisers lose understanding, agency, and trust.",
    "AI makes this tradeoff more interesting. For the first time, we can build interfaces that don't merely remove complexity – they can potentially explain it, reason through it, and help people make better decisions.",
    "That's the part of advertising I'm most interested in building now.",
  ],
};

export const whatsNext = {
  eyebrow: "What I'm exploring next",
  headline: "From advertising automation to advertising intelligence.",
  body: [
    "The previous generation of advertising products automated tasks.",
    "I think the next generation will increasingly automate reasoning – understanding a business, diagnosing what is limiting performance, generating possible actions, predicting their consequences, and helping an advertiser decide what to do next.",
  ],
  /** Rendered as a progression, with the final term emphasised. */
  progression: ["configuration", "automation", "conversation", "intelligence"],
  closing: "And it changes what an advertising product can be.",
};
