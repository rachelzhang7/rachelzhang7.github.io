import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * Content is grouped by rules and whitespace, never by cards. A section is a
 * region bounded by a labelled hairline – the way a chart axis is labelled –
 * which is what stops the site reading as a dashboard.
 */

type SectionProps = {
  children: React.ReactNode;
  /** Feeds the rail's section index. Keep it short: "02 · Experiments". */
  mark: string;
  className?: string;
  id?: string;
};

export function Section({ children, mark, className, id }: SectionProps) {
  return (
    <section
      id={id}
      data-section={mark}
      className={cn("shell scroll-mt-24 lg:pl-[calc(var(--rail-w)+1rem)]", className)}
    >
      {children}
    </section>
  );
}

type SectionHeadProps = {
  /** Mono eyebrow – always a measurement or a category, never a claim. */
  eyebrow: string;
  /** The claim. Set in the serif. */
  headline?: string;
  /** Right-hand terminus of the rule, the way an axis carries a value. */
  terminus?: string;
  children?: React.ReactNode;
};

export function SectionHead({
  eyebrow,
  headline,
  terminus,
  children,
}: SectionHeadProps) {
  return (
    <Reveal>
      <div className="flex items-baseline justify-between gap-6">
        <p className="label text-accent">{eyebrow}</p>
        {terminus && <p className="label">{terminus}</p>}
      </div>
      <div className="hairline rule-draw mt-3" />
      {/* Deliberately modest. A section heading names a region; the work
          inside it is the thing worth looking at. Nothing that labels a
          section may be set larger than what it labels. */}
      {headline && (
        <h2 className="display mt-7 text-balance text-2xl text-primary sm:text-[1.875rem]">
          {headline}
        </h2>
      )}
      {children}
    </Reveal>
  );
}
