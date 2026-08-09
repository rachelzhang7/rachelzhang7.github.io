/**
 * AdTech – depth.
 *
 * One thesis, six proofs, one forward-looking question.
 *
 * The whole page turns on a single mental model: DATA to INTELLIGENCE to
 * AUTOMATION. That is not a map of the advertising stack – it is the set of
 * layers this work actually touched, and the model that came out of it.
 *
 * Disclosure rules for anything added here: no internal metrics, no unreleased
 * features, no roadmap, no proprietary implementation detail, no customer names.
 * Describe product contribution and system understanding; never imply authorship
 * of underlying models or infrastructure where the role was product leadership.
 */

export const adtechIntro = {
  eyebrow: "AdTech · Commerce · AI",
  headline: "From data to intelligence to automation.",
  body: "I've worked across multiple layers of advertising systems – from signals and data infrastructure to Creative AI and increasingly automated commerce advertising. Across these systems, I've become interested in one question: how do we give machines enough context, intelligence, and trust to take on more of the work?",
};

/**
 * Exactly three. Conceptual clarity, not completeness – auction, ranking,
 * billing and delivery are deliberately absent, because this describes where
 * the work happened rather than diagramming the industry.
 */
export type Layer = {
  index: string;
  name: string;
  claim: string;
  scope: string;
};

export const layers: Layer[] = [
  {
    index: "01",
    name: "Data",
    claim: "Give the system better context.",
    scope: "Signals · Measurement · Infrastructure",
  },
  {
    index: "02",
    name: "Intelligence",
    claim: "Turn context into better decisions and creative.",
    scope: "Generation · Evaluation · Decisioning",
  },
  {
    index: "03",
    name: "Automation",
    claim: "Turn those decisions into actions.",
    scope: "Commerce Systems · AI Copilots · Agentic Workflows",
  },
];

/** The one explicit lesson on the page. The six projects supply the rest. */
export const thesis = {
  statement: "Better automation rarely starts with automation.",
  body: "It starts with better data, better intelligence, and clearer boundaries for what machines should decide.",
};

export type Project = {
  slug: string;
  /** Which layer of the model this is evidence for. Drives the grid column. */
  layer: "Data" | "Intelligence" | "Automation";
  title: string;
  /** One substantive description. Depth comes from specificity, not length. */
  description: string;
  /** Small footer metadata. Not a tag list. */
  meta: string;
  /** Present only where the work is ongoing. */
  status?: string;
  /** Names the asset that will eventually replace the placeholder. */
  media: string;
  /** Path under /public once a real capture exists. */
  image?: string;
};

/**
 * Ordered for a three-column grid filling row by row, so the columns read
 * Data | Intelligence | Automation and the layout reinforces the model instead
 * of the copy restating it.
 *
 * Each project answers a different product question, and they must not collapse
 * back into generic capability buckets:
 *   Server-Side Signals   – how does stronger signal infrastructure reach more
 *                           advertisers through ecosystem distribution?
 *   Events API Gateway    – what is the right tradeoff between implementation
 *                           ease and reliability, transparency and control?
 *   AI Creative Generation– how little input can become enough context?
 *   AI Evaluation Systems – how do we align machine evaluation with human
 *                           judgment and real outcomes?
 *   AI Copilot × Ads      – how does richer context move an LLM from retrieval
 *                           toward reasoning?
 *   Commerce Ads Automation – how much decision-making can the system absorb?
 */
export const projects: Project[] = [
  {
    slug: "server-side-signals",
    layer: "Data",
    title: "Server-Side Signals",
    description:
      "Making signal sharing more reliable and controllable through server-side integrations – while lowering adoption barriers through partner integrations such as Shopify and Google Tag Manager.",
    meta: "Server-Side Signals · Partner Integrations",
    media: "Signal flow",
  },
  {
    slug: "ai-creative-generation",
    layer: "Intelligence",
    title: "AI Creative Generation",
    description:
      "Generating multiple ad-ready creative variants from a single merchant URL – using business context and platform intelligence to reduce the creative expertise, production resources, and manual work required to start advertising.",
    meta: "Creative AI · Generation Systems",
    media: "URL to variants",
  },
  {
    slug: "ai-copilot-ads",
    layer: "Automation",
    title: "AI Copilot × Ads",
    description:
      "Giving an AI copilot richer context from merchant business data and advertising performance – evolving from natural-language retrieval and Q&A toward an intelligence layer that can reason about how a merchant grows.",
    meta: "AI Copilot · Context & Reasoning",
    status: "Now",
    media: "Copilot interface",
  },
  {
    slug: "events-api-gateway",
    layer: "Data",
    title: "Events API Gateway",
    description:
      "Creating a middle path between browser pixels and full server-to-server integrations – combining easier cloud deployment with greater reliability, transparency, and control over what data is shared.",
    meta: "Cloud Signals · Partner Infrastructure",
    media: "Architecture tradeoff",
  },
  {
    slug: "ai-evaluation-systems",
    layer: "Intelligence",
    title: "AI Evaluation Systems",
    description:
      "Building evaluation systems that combine granular quality dimensions, human ratings, automated scorers, and real-world performance signals – improving human–machine alignment and feeding better evaluation back into model learning.",
    meta: "AI Evaluation · Human–Machine Alignment",
    media: "Evaluation loop",
  },
  {
    slug: "commerce-ads-automation",
    layer: "Automation",
    title: "Commerce Ads Automation",
    description:
      "Generating ready-to-review ads directly from merchant catalog data – creating creative and selecting key setup decisions automatically, while preserving the option to customize before submission.",
    meta: "Commerce Ads · Automated Creation",
    status: "Now",
    media: "Catalog to review",
  },
];

export const whatsNext = {
  eyebrow: "What I'm exploring next",
  headline: "From automating tasks to automating reasoning.",
  body: "The previous generation of advertising products automated tasks. I'm interested in what happens as they begin to automate reasoning – understanding a business, diagnosing constraints, considering possible actions, and helping decide what should happen next.",
  /** The page ends on the question. Nothing follows it. */
  question: {
    lead: "The question becomes less",
    less: "What can we automate?",
    join: "and more",
    more: "What should the system understand, decide, and act on – and what should remain with the human?",
  },
};
