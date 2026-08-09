import type { TerritoryKey } from "@/content/site";
import { Rail } from "./Rail";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

type PageShellProps = {
  children: React.ReactNode;
  /**
   * Sets the live accent for the whole route. Exactly one accent exists per
   * page – no component below this line may reference a territory colour
   * directly, which is what mechanically enforces the 85–90% neutral rule.
   */
  territory?: TerritoryKey;
};

export function PageShell({ children, territory = "identity" }: PageShellProps) {
  return (
    <div data-territory={territory} className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-accent focus:bg-raised focus:px-4 focus:py-2 focus:text-sm focus:text-primary"
      >
        Skip to content
      </a>
      <Rail />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
