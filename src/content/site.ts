/**
 * Single source of truth for identity, navigation and contact details.
 *
 * Everything a visitor sees about "who this is" flows from here, so changing a
 * handle or a headline is a one-line edit rather than a search across JSX.
 */

export const site = {
  name: "Rachel Zhang",
  /** Used in the wordmark; kept separate so the nav can render it distinctly. */
  shortName: "Rachel Zhang",
  domain: "rachelzhang7.github.io",
  url: "https://rachelzhang7.github.io",

  /** Appears in <title> templates and search results. */
  role: "Product leader and hands-on builder",
  tagline: "AI · AdTech · Creative AI",

  /**
   * The meta description. Written for a human reading a search result, not for
   * keyword density – this is often the first sentence an investor ever reads.
   */
  description:
    "Rachel Zhang builds at the intersection of advertising, AI, and creativity – products across advertising data, commerce, creative and automation, alongside hands-on AI experiments and generative creative work.",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Territory key drives the accent colour used for hover and active states. */
  territory?: TerritoryKey;
};

/**
 * Four items, deliberately. The three pillars plus home.
 *
 * About is not a primary destination – it lives at the bottom of the homepage.
 * Future Ventures is not part of this architecture.
 */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "AdTech", href: "/adtech/", territory: "adtech" },
  { label: "Experiments", href: "/experiments/", territory: "experiments" },
  { label: "Creative AI", href: "/creative-ai/", territory: "creative" },
];

export type TerritoryKey =
  | "identity"
  | "adtech"
  | "experiments"
  | "creative"
  | "ventures";

export type SocialLink = {
  label: string;
  href: string;
  /** Shown in the connect panel under the label. */
  handle: string;
  /**
   * Set to true for links that still need a real URL. The build prints a
   * warning for these so they can't silently ship as dead links.
   */
  placeholder?: boolean;
};

export const socials: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:rachelzhangjoachim@gmail.com",
    handle: "rachelzhangjoachim@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rachel-zhang/",
    handle: "/in/rachel-zhang",
  },
  {
    label: "GitHub",
    href: "https://github.com/rachelzhang7",
    handle: "@rachelzhang7",
  },
  {
    label: "X",
    href: "https://x.com/RachelZ2154",
    handle: "@RachelZ2154",
  },
];
