import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { territories } from "@/content/territories";

export const metadata = {
  title: "Not found",
  description: "That page doesn't exist.",
  // The root layout opts the site into indexing; this page must opt back out,
  // or 404.html emits both `noindex` and `index, follow` and search engines
  // pick whichever they like.
  robots: { index: false, follow: false },
};

/**
 * Exported to out/404.html, which GitHub Pages serves for any unmatched path
 * with a real 404 status. It's a static document and cannot read the requested
 * path server-side, so it points onward rather than apologising for a URL it
 * can't name.
 */
export default function NotFound() {
  return (
    <PageShell territory="identity">
      <Section mark="404" className="py-32">
        <p className="label text-accent">Error 404</p>
        <div className="hairline mt-3" />
        <h1 className="display mt-10 text-[clamp(2.25rem,6vw,4rem)] leading-[1.08] text-primary">
          There&rsquo;s nothing at this address.
        </h1>
        <p className="measure mt-6 text-base leading-relaxed text-secondary">
          The page may have moved, or the link may be wrong. These are the four
          places worth starting from.
        </p>

        <ul className="mt-14 border-t border-hair">
          {territories.map((t) => (
            <li key={t.key}>
              <Link
                href={t.href}
                data-territory={t.key}
                className="group flex items-baseline gap-6 border-b border-hair py-5 transition-colors hover:border-accent-rule"
              >
                <span className="font-mono text-sm text-tertiary transition-colors group-hover:text-accent">
                  {t.index}
                </span>
                <span className="display text-xl text-primary">{t.title}</span>
                <span className="label ml-auto hidden sm:block">
                  {t.dimension}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="label mt-12 inline-flex items-center gap-2 text-tertiary transition-colors hover:text-primary"
        >
          ← Back to the homepage
        </Link>
      </Section>
    </PageShell>
  );
}
