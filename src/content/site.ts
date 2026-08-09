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
   * keyword density — this is often the first sentence an investor ever reads.
   */
  description:
    "Rachel Zhang builds products at the intersection of technology, creativity, and human behavior — advertising systems at scale, AI prototypes, creative experiments, and early-stage ventures.",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Territory key drives the accent colour used for hover and active states. */
  territory?: TerritoryKey;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "AdTech", href: "/adtech/", territory: "adtech" },
  { label: "Experiments", href: "/experiments/", territory: "experiments" },
  { label: "Creative AI", href: "/creative-ai/", territory: "creative" },
  { label: "Future Ventures", href: "/future-ventures/", territory: "ventures" },
  { label: "About", href: "/about/" },
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
    href: "https://www.linkedin.com/in/REPLACE-ME",
    handle: "/in/REPLACE-ME",
    placeholder: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/rachelzhang7",
    handle: "@rachelzhang7",
  },
  {
    label: "X",
    href: "https://x.com/REPLACE-ME",
    handle: "@REPLACE-ME",
    placeholder: true,
  },
];
