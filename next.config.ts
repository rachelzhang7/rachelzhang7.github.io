import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * This repo is a *user* pages site (rachelzhang7.github.io), so it is served
 * from the domain root. That means no `basePath` / `assetPrefix` is needed —
 * those are only required for *project* pages served from /repo-name.
 *
 * `trailingSlash: true` makes every route emit `out/<route>/index.html`, which
 * is the shape GitHub Pages' static file server resolves most predictably.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // The Next.js image optimizer is a server feature and cannot run on Pages.
  images: { unoptimized: true },

  // Surface type errors at build time rather than shipping past them.
  // (Next 16 removed the `eslint` key; linting is its own CI step.)
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
