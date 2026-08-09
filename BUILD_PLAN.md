# Build plan

Personal site for Rachel Zhang, at `rachelzhang7.github.io`.

Its job is narrow and specific: when an investor, founder, or potential partner
looks her up before a meeting, this is what they find. Not a job-search
portfolio, and not an illustrated résumé.

---

## 1. Stack decision — Next.js, not Jekyll

**Next.js 16 (App Router) → static export → GitHub Actions → GitHub Pages.**

Jekyll is the obvious default for a `*.github.io` repo, and it's the wrong tool
here:

| | Jekyll | Next.js static export |
| --- | --- | --- |
| Five pages sharing one design system | Liquid includes; no type safety | Real components, typed props |
| Per-territory accent, one token system | Hand-managed CSS | CSS custom properties + Tailwind v4 `@theme` |
| Content edited without touching markup | Front matter, untyped | Typed modules in `src/content/` — a missing field fails the build |
| Generated SVG visuals | Awkward | Computed at build time, serialised into the HTML |
| Deploy target | Pages native | Pages via Actions artifact |

The deciding factor is that this design is component-driven and interactive
(the calibration rail, the scroll reveals, the hero trace, per-route accents).
Liquid templating would fight that the whole way. The cost of Next here is a
build step, which GitHub Actions runs anyway.

**No `basePath`.** This is a *user* pages repo, served from the domain root.
`basePath`/`assetPrefix` are only needed for *project* pages under `/repo-name`.

**`trailingSlash: true`.** Every route emits `out/<route>/index.html`, the shape
GitHub Pages resolves most predictably. With `false`, a URL a human might
reasonably type resolves to a hard 404.

**No `.nojekyll`.** Jekyll only runs on the legacy branch-based publishing path,
never on an Actions artifact deploy — and since `upload-pages-artifact` v4,
dotfiles are excluded from the artifact anyway, so the file wouldn't even ship.

---

## 2. Information architecture

Not chronology, not employers. Five pages that progressively reveal dimensions
of one person:

```
Homepage        identity      "This is how I think."
  ↓
/adtech         expertise     "This is what I deeply understand."
  ↓
/experiments    builder       "This is evidence I can build."
  ↓
/creative-ai    taste         "This is what I find interesting and beautiful."
  ↓
/future-ventures ownership    "This is where I'm trying to take all of it."

/about — deliberately outside the primary IA, plus the conventional résumé path.
```

The progression is the argument. The pages are not five unrelated buckets.

---

## 3. Design system

**Register:** a technical instrument, rendered editorially. Near-black ground
with a paper grain so it reads as inked paper rather than a dark-mode surface;
hairline rules doing the structural work that cards would otherwise do.

**Three voices, one self-enforcing rule** — a reader never learns it
consciously, but after two pages they can tell what kind of information they're
looking at before reading a word:

| Voice | Face | Carries |
| --- | --- | --- |
| A **claim** | Newsreader (serif) | Headlines, pull quotes |
| An **argument** | Archivo (sans) | Running body copy |
| A **measurement** | IBM Plex Mono | Every number, date, tag, index, status |

All three are SIL OFL and self-hosted via `next/font` at build time — no runtime
CDN request. Explicit static weights, not variable cuts: the variable Archivo
and Newsreader files are 128KB and 85KB because they carry every weight, and
this site uses four. Total shipped: **84KB**, down from 420KB.

**Colour.** Near-black `#090A0D` ground, warm white `#EDE9E1` type (deliberately
not `#FFF`), muted greys. Five territory accents, each desaturated a step or two
below the default Tailwind ramps — the saturated versions are exactly the hues
that read as AI-startup. Every accent clears 4.5:1 on the ground, so it's legal
as small mono text without an exception.

**Accent as metadata, not theme.** This is the rule the whole system hangs on.
~85–90% of every page is neutral. Exactly one accent is live per route, set once
via `data-territory` on the page shell; no component below that line references
a territory colour. Accent is permitted *only* in mono labels ≤0.75rem, 1px
rules, indicator marks ≤6×6px, hover/focus states, and at most one data stroke
per diagram. Never as a surface fill, a gradient, a button background, or on
type above 0.875rem.

**One grid, inhabited differently.** 1240px content max, 12 columns, plus a
fixed 72px calibration rail outside them. Each page uses it differently so the
site isn't experientially monotonous: AdTech is a ledger, Experiments is
irregular modules, Creative AI is alternating plates, Future Ventures is a
single narrow measure.

**Signature: the calibration rail.** A persistent 72px left column — ruler,
scroll indicator, and section index at once. It's the one element on every page
and the largest concentration of accent anywhere on the site (~25 square
pixels). Below 1024px there's no room for it, so it hides and the header's
bottom edge becomes the progress indicator — an honest reduction rather than a
rotated copy that would steal 44px of viewport from phone visitors.

**Motion.** No animation library. Every effect is CSS plus one
`IntersectionObserver`, which saved ~35KB gzipped on a site whose main use case
is loading fast on a phone from a search result. Above-the-fold entrance runs as
CSS keyframes with `animation-delay`, so it plays before hydration and never
blocks LCP. One scroll-reveal recipe used everywhere. Nothing bounces —
instruments don't bounce. `prefers-reduced-motion` resolves everything to its
final state rather than merely cancelling animations, so nothing is ever
stranded invisible.

---

## 4. The hero

The mockup's converging-particle-network image is AI-generated, unusable, and
the single most tired visual in this genre. Rebuilt as an oscilloscope trace on
a graticule, carrying the same idea (many signals → understanding → expression).

Three things keep it from being ornament:

1. The four markers **are** the navigation to the four territories.
2. The path is deterministic and computed at build time, so it serialises into
   the HTML as a static `d` string — no runtime maths, no canvas, no `rAF`, no
   layout shift, and byte-identical across builds.
3. It sweeps once and stops. No idle shimmer.

---

## 5. CI/CD

**`ci.yml`** — on every PR and non-main push: install → lint → typecheck →
production export build → verify.

**`deploy.yml`** — on push to `main`: the same gates, then publish to Pages.
A broken build never reaches the live site just because it was pushed to main.
Deploys queue rather than cancel, since cancelling mid-deploy can leave the site
half-published.

Action versions are pinned to current majors, verified against the GitHub API
rather than copied from a blog post: `checkout@v7`, `setup-node@v7`,
`configure-pages@v6`, `upload-pages-artifact@v5`, `deploy-pages@v5`.

**`scripts/verify-export.mjs`** exists because its failure modes are *silent* —
build green, site deployed, something quietly broken:

- Every route produced a document, and `404.html` exists. (Next has regressed on
  the `trailingSlash: true` + 404 interaction before, and the upstream issues
  were closed as *stale*, not fixed — so it stays asserted rather than trusted.)
- **No `/_next/image` references.** With `output: 'export'` and no
  `images.unoptimized`, `next/image` builds successfully and emits a URL to a
  route that doesn't exist in the export. Every image 404s in production with no
  warning and green CI. This is the worst trap in the whole stack.
- No `REPLACE-ME` placeholder links reached the HTML.
- `sitemap.xml` and `robots.txt` are present.

---

## 6. Content

All copy lives in typed modules under `src/content/`. Adding a project is a data
edit, never a JSX edit. Every content type carries a `published` flag so
half-written work can sit in the file without showing an empty slot — a short
page of real work is stronger than a full grid of placeholders.

See **CONTENT.md** for the editing guide and the list of what still needs real
input.

**Confidentiality:** the AdTech page is written at the level of problems and
system design — no metrics, no internal names, no roadmap. Nothing on it should
need a review.

**Nothing is invented.** No fabricated metrics, awards, dates, or collaborators
appear anywhere. On a site whose entire aesthetic is measurement, a single
decorative number that looks like a claim and isn't would do more damage than a
plain website would have.

---

## 7. Activating Pages

One manual step, in the GitHub UI:

**Settings → Pages → Build and deployment → Source → "GitHub Actions"**

The default is "Deploy from a branch", which ignores the workflow entirely. Once
switched, every push to `main` publishes.
