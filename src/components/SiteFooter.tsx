import Link from "next/link";
import { navItems, site, socials } from "@/content/site";

/**
 * Links still carrying a REPLACE-ME URL are filtered out rather than shipped
 * as dead links. See CONTENT.md – filling them in makes them appear.
 */
const liveSocials = socials.filter((s) => !s.placeholder);

export function SiteFooter() {
  // Baked at build time. CI rebuilds on every push, so this stays current.
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-hair sm:mt-20">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--page-gutter)] py-10 sm:py-12 lg:pl-[calc(var(--rail-w)+1rem)]">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div className="max-w-sm">
            <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-primary">
              {site.name}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-secondary">
              {site.tagline}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="Footer">
              <p className="label">Sections</p>
              <ul className="mt-4 space-y-2.5">
                {navItems.slice(1).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-secondary transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="label">Elsewhere</p>
              <ul className="mt-4 space-y-2.5">
                {liveSocials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="group inline-flex items-baseline gap-2 text-sm text-secondary transition-colors hover:text-primary"
                      {...(s.href.startsWith("http")
                        ? { target: "_blank", rel: "me noopener noreferrer" }
                        : {})}
                    >
                      {s.label}
                      <span
                        aria-hidden="true"
                        className="text-tertiary transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hair pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {year} {site.name}
          </p>
          {/* Not `text-quiet` – at 11px that token is 3.69:1, which fails
              WCAG AA and breaks the token's own rule (non-text, or >=24px).
              `.label`'s default tertiary is 4.71:1 and passes at any size. */}
          <p className="label">
            Built from scratch · Next.js · GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  );
}
