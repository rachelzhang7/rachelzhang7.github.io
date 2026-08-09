/**
 * Future Ventures – entrepreneurial evidence.
 *
 * The discipline of this page is what it *excludes*. Startup ideas are cheap,
 * so nothing appears here without evidence attached: a prototype, user
 * research, a market thesis, collaborators, or something actually shipped.
 * One or two substantial entries beats six speculative ones.
 */

export type VentureStage = "building" | "exploring" | "past";

export type Venture = {
  slug: string;
  name: string;
  stage: VentureStage;
  /** The one-line thesis. */
  thesis: string;
  /** The longer argument – why this, why now. */
  body: string[];
  /**
   * The evidence that earns this venture a place on the page. Without at least
   * one entry here, it doesn't belong on the site.
   */
  evidence: string[];
  published: boolean;
};

export const stageLabels: Record<VentureStage, string> = {
  building: "Building",
  exploring: "Exploring",
  past: "Past",
};

export const venturesIntro = {
  eyebrow: "Future Ventures",
  headline: "From building products to building possibilities.",
  body: [
    "For most of my career I built products inside companies. This is the part where I find out what I'd build on my own.",
    "Ideas are cheap, so nothing appears on this page without evidence behind it – a prototype, research, a thesis I've tested, or something shipped. This section will stay short until that's no longer true.",
  ],
};

export const ventures: Venture[] = [
  {
    slug: "aubric",
    name: "Aubric",
    stage: "building",
    thesis:
      "Infrastructure for verifiable, trustworthy AI in advertising.",
    body: [
      "Advertising is becoming a system where AI makes an increasing share of the decisions – what to make, who to show it to, what to spend. The industry has no shared way to verify what those systems did or why.",
      "Aubric is my attempt at that missing layer: making AI-driven advertising decisions inspectable, attributable, and accountable to the businesses paying for them.",
    ],
    evidence: [
      "Working prototype extending the provenance model from Trust Receipt",
      "Market thesis grounded in years inside advertising infrastructure",
    ],
    published: true,
  },
];

export const publishedVentures = ventures.filter((v) => v.published);

export const venturesByStage = (stage: VentureStage) =>
  publishedVentures.filter((v) => v.stage === stage);
