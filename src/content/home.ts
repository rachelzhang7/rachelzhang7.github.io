/**
 * Homepage – identity.
 *
 * The job of this page is positioning, answered in 10–15 seconds: a product
 * builder with years inside advertising systems, now widening the part of the
 * product work she can own herself. It is a statement of direction, not a
 * catalogue – the three pillar pages carry the evidence.
 */

export const hero = {
  /** Where she operates. The pillars below say what makes it distinctive. */
  eyebrow: "Product Builder",
  /**
   * Two sentences, set as one serif block. The first states the record; the
   * second states the direction. Words listed under `emph` render in the
   * accent blue, per the mockup.
   */
  headline: {
    lead: "I've spent my career shaping products – what to build, why it matters, and how it reaches people.",
    trail: "Now I'm learning to build more of them myself.",
    emph: {
      lead: ["why", "how"],
      trail: ["build"],
    },
  },
  /** One paragraph. No company names, no skill lists, no years. */
  body: "My work spans product, AI, advertising, and technology. GenAI is expanding how much of the product journey I can now own – from identifying the problem and shaping the experience to prototyping, building, and testing it.",
  actions: [
    { label: "Let's connect", href: "/about/#connect", primary: true },
  ],
  /** Photo on the right of the hero. Real asset under /public/media/home. */
  image: {
    src: "/media/home/hero.webp",
    alt: "Rachel Zhang",
  },
};

/**
 * What the work is moving toward. The three statements are the direction; the
 * three links are the evidence, in the site's own pillar order – depth, then
 * agency, then taste.
 */
export const workingToward = {
  eyebrow: "What I'm working toward",
  pillars: [
    {
      index: "01",
      label: "Depth",
      statement: "Know a domain deeply.",
      note: "AdTech is where I've spent years learning how complex systems behave.",
      href: "/adtech/",
    },
    {
      index: "02",
      label: "Agency",
      statement: "Build, not just specify.",
      note: "I'm widening the part of the product loop I can personally execute.",
      href: "/experiments/",
    },
    {
      index: "03",
      label: "Taste",
      statement: "Develop taste.",
      note: "I use creative work to sharpen judgment about what feels clear, useful, and worth making.",
      href: "/creative-ai/",
    },
  ],
};

/**
 * The three threads currently being explored. Each column states what the
 * exploration is, then names the page that carries the evidence.
 */
export const exploring = {
  eyebrow: "What I'm exploring now",
  columns: [
    {
      title: "Advertising",
      note: "How generative AI changes how advertising systems work – and how businesses interact with advertising systems.",
      cta: "Explore AdTech",
      href: "/adtech/",
      image: "/media/experiments/ad-ai-pulse.jpg",
      alt: "A blue generative advertising interface study",
    },
    {
      title: "Product Building",
      note: "How product tools change what's testable – and how automation and optimization keep expanding what a small team can build.",
      cta: "See Experiments",
      href: "/experiments/",
      image: "/media/experiments/beam.jpg",
      alt: "A product experiment visualized as a luminous system",
    },
    {
      title: "Creative AI",
      note: "How generative tools change the role of the creator – and what still depends on human taste.",
      cta: "Explore Creative AI",
      href: "/creative-ai/",
      image: "/media/creative-ai/art-gathering.jpg",
      alt: "A colorful generative artwork",
    },
  ],
};

/** Three statements, one argument: building is cheap now, judgment isn't. */
export const learned = {
  eyebrow: "What I've learned",
  statements: [
    "Better systems start with better context.",
    "Building faster makes product judgment more important, not less.",
    "AI expands what can be generated. Taste decides what is worth keeping.",
  ],
};

/** What lies outside the work. One paragraph, one door. */
export const beyond = {
  eyebrow: "Beyond products",
  body: "Outside product and technology, I'm drawn to architecture, art, music, especially languages, and the ways culture shapes how people create and live.",
  cta: "More about me",
  href: "/about/",
  /** Wide photo beside the paragraph. Real asset under /public/media/home. */
  image: {
    src: "/media/home/beyond.webp",
    alt: "Photo from Rachel's life outside product work",
  },
};

export const closing = {
  /** The most important copy on the site. One line, then one door. */
  quote:
    "I like meeting people who are building, thinking deeply, and exploring what comes next.",
  actions: [
    {
      label: "Let's connect",
      note: "Always excited to meet builders, thinkers, and curious people.",
      href: "/about/#connect",
    },
  ],
};
