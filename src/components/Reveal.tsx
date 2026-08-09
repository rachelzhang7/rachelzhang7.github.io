"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger within a group. Keep total stagger under ~240ms. */
  delay?: number;
};

/**
 * The site's single scroll-reveal recipe, used everywhere so the whole thing
 * feels calibrated rather than busy.
 *
 * Deliberately not a motion library: this is the only JS-driven animation on
 * the site, and one IntersectionObserver is a few hundred bytes against ~35KB
 * gzipped for a full animation runtime.
 *
 * Safety: the element is only hidden when `data-js` confirms JS is running
 * (see the inline script in the root layout), and the observer disconnects
 * after firing once, so nothing can be stranded invisible.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect the OS setting: show immediately, never animate position.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.reveal = "in";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "in";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal="pending"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
