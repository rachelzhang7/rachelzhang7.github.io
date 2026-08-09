import type { Metadata, Viewport } from "next";
import { Newsreader, Archivo, IBM_Plex_Mono } from "next/font/google";
import { site, socials } from "@/content/site";
import "./globals.css";

/**
 * Three voices, one rule:
 *   a CLAIM is serif, an ARGUMENT is sans, a MEASUREMENT is mono.
 *
 * A reader never learns this consciously, but after two pages they can tell
 * what kind of information they're looking at before reading a word.
 */

/**
 * Explicit static weights throughout. The variable cuts of Archivo and
 * Newsreader are 128KB and 85KB respectively because they carry every weight
 * (and, for Archivo, a width axis) – this site uses four weights total, so
 * static files are roughly a third of the bytes over the wire. On a site whose
 * main job is loading fast on a phone from a search result, that trade is
 * worth more than optical sizing.
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500"],
  display: "swap",
});

// Not variable – ship only the two weights actually used.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – ${site.role}`,
    template: `%s – ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Rachel Zhang",
    "product manager",
    "AdTech",
    "AI products",
    "Creative AI",
    "advertising systems",
    "startup",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  // No `alternates.canonical` here on purpose. A default of "/" is inherited by
  // any page that doesn't override it, which told search engines that /adtech
  // and /about were duplicates of the homepage and suppressed them. Each route
  // sets its own.
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    // title/description/url are deliberately omitted so Next derives them from
    // each page's own metadata. Setting them here made all eight pages share
    // the homepage's card.
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#090A0D",
  colorScheme: "dark",
};

/**
 * Person schema. This is what makes a Google result for "Rachel Zhang" show
 * something structured rather than a stray sentence – the whole reason the
 * site exists is to be found before a meeting.
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  description: site.description,
  knowsAbout: [
    "Digital advertising systems",
    "AdTech infrastructure",
    "AI product management",
    "Generative AI",
    "Commerce platforms",
  ],
  // "Rachel Zhang" is a high-collision name. sameAs is what lets a search
  // engine bind this page to the same person as these profiles.
  sameAs: socials
    .filter((s) => !s.placeholder && s.href.startsWith("http"))
    .map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-territory="identity"
      className={`${newsreader.variable} ${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        {/* Runs before the rest of <body> paints. Scroll-reveal targets are
            only hidden when JS is confirmed present, so with JS disabled or
            broken the page renders fully visible instead of blank. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.js="1"`,
          }}
        />
        <script
          type="application/ld+json"
          // Static, author-controlled content – no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
