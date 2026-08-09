/**
 * About – deliberately outside the primary information architecture.
 *
 * The four territories carry the argument. This page exists for the visitor who
 * has already decided they're interested and wants the person behind it, plus a
 * conventional résumé for the times a conventional résumé is what's wanted.
 */

export const aboutIntro = {
  eyebrow: "About",
  headline:
    "I'm interested in what happens when understanding and making get closer together.",
  body: [
    "For most of my career, my job was deciding what should be built and working with teams to make it real. I spent those years inside advertising – signals, catalogs, creative, delivery, and the interfaces advertisers actually use. It's an industry that rewards understanding systems, because almost nothing in it works in isolation.",
    "AI is changing where that boundary sits. A product person can now move much further across the stack: from an observation to a prototype, from a prototype to an experience, and sometimes from an experience to a business. I've spent the last few years finding out how far I can take that myself.",
    "So I build. Hackathon weekends, late-night prototypes, music, and now something of my own. The work on this site is the evidence, arranged by what it demonstrates rather than by who I worked for.",
  ],
};

/**
 * Principles, not values. Each should be arguable – if nobody could disagree
 * with it, it isn't telling a visitor anything.
 */
export const principles = [
  {
    title: "Abstraction has a cost",
    body: "Hide too little and the product stays complicated. Hide too much and people lose understanding, agency, and trust. Most product judgment lives in that trade.",
  },
  {
    title: "Prototypes are arguments",
    body: "A spec describes a thing. A prototype finds out whether it works. I'd rather lose an argument to a build than win one in a document.",
  },
  {
    title: "Show the uncertainty",
    body: "Systems that admit what they don't know earn more trust than systems that never do. This holds for AI outputs and for product roadmaps.",
  },
  {
    title: "Depth earns the right to breadth",
    body: "Years inside one industry is what makes an opinion about the next one worth anything.",
  },
];

export const connect = {
  headline: "Let's connect.",
  body: "Always glad to meet builders, thinkers, and curious people – especially anyone working on AI, advertising infrastructure, or the messy space between creativity and systems.",
};

/**
 * Set `href` once a PDF exists at that path. Until then the résumé link is
 * hidden rather than rendering as a dead download.
 */
export const resume = {
  href: "/resume.pdf",
  available: false,
  note: "Résumé available on request.",
};
