import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Emitted as a static sitemap.xml during `next build` with output: 'export'.
 *
 * Priorities are relative, not absolute — the homepage carries the positioning
 * and AdTech carries the depth, so those lead.
 */
export const dynamic = "force-static";

const routes: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/adtech/", priority: 0.9 },
  { path: "/experiments/", priority: 0.9 },
  { path: "/creative-ai/", priority: 0.8 },
  { path: "/future-ventures/", priority: 0.8 },
  { path: "/about/", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
