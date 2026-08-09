"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, site } from "@/content/site";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { cn } from "@/lib/cn";

/**
 * Navigation that recedes into the page.
 *
 * Four items, no product-style CTA button, and no persistent chrome at the top
 * of the document. Colour here is role-based: blue marks anything interactive,
 * and the single yellow square after the wordmark is the site's one piece of
 * punctuation.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { progress } = useScrollProgress();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    // The header should recede into the page rather than sit on top of it like
    // a product navbar. At the top of the document it is fully transparent
    // with no rule; the ground and the hairline fade in only once the reader
    // has scrolled and content would otherwise pass underneath it.
    <header
      data-scrolled={progress > 0.001 ? "true" : undefined}
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        progress > 0.001
          ? "border-hair bg-canvas/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[var(--content-max)] items-center justify-between gap-6 px-[var(--page-gutter)] lg:pl-[calc(var(--rail-w)+1rem)]">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2"
          aria-label={`${site.name} – home`}
        >
          <span className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-primary">
            {site.shortName}
          </span>
          {/* The site's one piece of yellow. A single mark, on every page,
              functioning as punctuation after the name. */}
          <span
            aria-hidden="true"
            className="h-[5px] w-[5px] bg-accent-hi transition-transform duration-200 group-hover:scale-125"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-territory={item.territory}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "group relative px-3 py-2 text-[0.8125rem] transition-colors duration-150",
                isActive(item.href)
                  ? "text-primary"
                  : "text-secondary hover:text-primary",
              )}
            >
              {item.label}
              {/* Blue: this is an interactive affordance, not an identity.
                  Every destination underlines the same way. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 bottom-1 h-px origin-left bg-accent-2 transition-transform duration-200 ease-[var(--ease-instrument)]",
                  isActive(item.href)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </Link>
          ))}
        </nav>

        <Link
          href="/about/#connect"
          className="group hidden shrink-0 items-center gap-2 py-2 text-[0.8125rem] text-secondary transition-colors duration-150 hover:text-primary sm:flex"
        >
          Let&rsquo;s connect
          <span
            aria-hidden="true"
            className="text-tertiary transition-colors duration-150 group-hover:text-accent-2"
          >
            &#8599;
          </span>
        </Link>

        {/* Mobile navigation. A native <details> disclosure so the menu works
            with zero JavaScript and gets keyboard behaviour for free. */}
        <details className="relative md:hidden [&[open]_.chev]:rotate-45">
          <summary className="label flex cursor-pointer list-none items-center gap-2 py-2 text-primary marker:hidden [&::-webkit-details-marker]:hidden">
            Menu
            <span className="chev transition-transform duration-200" aria-hidden="true">
              +
            </span>
          </summary>
          <nav
            aria-label="Primary"
            className="absolute right-0 top-full z-50 mt-2 w-56 border border-hair bg-raised p-2 shadow-2xl shadow-black/50"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-secondary hover:text-primary",
                )}
              >
                <span
                  aria-hidden="true"
                  data-territory={item.territory}
                  className={cn(
                    "h-[5px] w-[5px] shrink-0",
                    isActive(item.href) ? "bg-accent" : "bg-strong",
                  )}
                />
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>

      {/* On phones the rail can't fit, so the header's own bottom edge becomes
          the calibrated progress indicator. Same information, no stolen
          viewport height. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent-2 lg:hidden"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  );
}
