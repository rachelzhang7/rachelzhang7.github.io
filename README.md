# rachelzhang7.github.io

Personal site for Rachel Zhang — AI · AdTech · Creative AI.

Live at **https://rachelzhang7.github.io**

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production static export into `out/` |
| `npm run verify` | Asserts the export is sound (run after `build`) |
| `npm run preview` | Serves the built `out/` on :3001 — a faithful preview of production |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

`npm run dev` will happily render things that break a static export. **`npm run
build` is the real gate**, which is why CI runs it on every pull request.

## Editing content

All copy lives in typed modules under `src/content/`. You should never need to
touch a component to add a project or change a headline.

**→ See [CONTENT.md](./CONTENT.md)** for the editing guide and the short list of
things that still need your input.

## How it's built

Next.js 16 App Router, statically exported, deployed to GitHub Pages by GitHub
Actions. Tailwind CSS v4 over a CSS custom-property token system. No animation
library — every effect is CSS plus one `IntersectionObserver`.

**→ See [BUILD_PLAN.md](./BUILD_PLAN.md)** for the architecture, the design
system, and why Next.js rather than Jekyll.

## Deployment

Every push to `main` builds, verifies, and publishes automatically.

**One-time setup:** in **Settings → Pages → Build and deployment**, set
**Source** to **GitHub Actions**. The default is "Deploy from a branch", which
ignores the workflow entirely.

Pull requests run the same lint / typecheck / build / verify gates without
deploying.
