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
   * second states the direction.
   */
  headline: {
    lead: "I've spent my career shaping products – what to build, why it matters, and how it reaches people.",
    trail: "Now I'm learning to build more of them myself.",
  },
  /** One paragraph. No company names, no skill lists, no years. */
  body: "My work spans product, AI, advertising, and technology. GenAI is expanding how much of the product journey I can now own – from identifying the problem and shaping the experience to prototyping, building, and testing it.",
  actions: [
    { label: "Let's connect", href: "/about/#connect", primary: true },
  ],
};

/**
 * What the work is moving toward. The three statements are the direction; the
 * paragraph is the ground; the three links are the evidence, in the site's own
 * pillar order – depth, then agency, then taste.
 */
export const workingToward = {
  eyebrow: "What I'm working toward",
  statements: [
    "Know a domain deeply.",
    "Build products with taste.",
    "Develop judgment – not just specify.",
  ],
  body: "AdTech is where I've spent years. I'm widening the part of the product work to sharpen creative judgment – learning how complex systems can behave, and what feels useful, clear, and worth making.",
  pillars: [
    { index: "01", label: "Depth", href: "/adtech/" },
    { index: "02", label: "Agency", href: "/experiments/" },
    { index: "03", label: "Taste", href: "/creative-ai/" },
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
    },
    {
      title: "Product Building",
      note: "How product tools change what's testable – and how automation and optimization keep expanding what a small team can build.",
      cta: "See Experiments",
      href: "/experiments/",
    },
    {
      title: "Creative AI",
      note: "How generative tools change the role of the creator – and what still depends on human taste.",
      cta: "Explore Creative AI",
      href: "/creative-ai/",
    },
  ],
};

/** Four statements, one argument: building is cheap now, judgment isn't. */
export const learned = {
  eyebrow: "What I've learned",
  statements: [
    "Building faster makes better systems.",
    "AI expands what can be generated.",
    "Taste decides what's worth keeping.",
    "Context matters more, not less.",
  ],
};

/** What lies outside the work. One paragraph, one door. */
export const beyond = {
  eyebrow: "Beyond products",
  body: "Outside product and technology, I'm drawn to architecture, art, music, especially languages, and the ways culture shapes how people create and live.",
  cta: "More about me",
  href: "/about/",
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
