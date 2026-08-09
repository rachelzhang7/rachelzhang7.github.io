import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Emitted as a static sitemap.xml during `next build` with output: 'export'.
 *
 * Priorities are relative, not absolute — the homepage carries the positioning
 * and AdTech carries the depth, so those lead.
 */
export const dynamic = "force-static";

/**
 * The three pillars, plus home and about.
 *
 * /future-ventures/ still builds so an existing link doesn't 404, but it is
 * deliberately absent here: it is not part of this architecture and should not
 * be advertised to search engines.
 */
const routes: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/adtech/", priority: 0.9 },
  { path: "/experiments/", priority: 0.9 },
  { path: "/creative-ai/", priority: 0.8 },
  { path: "/about/", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
