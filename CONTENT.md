# Editing the site

Everything a visitor reads lives in `src/content/`. You should never need to
touch a React component to add a project, change a headline, or fix a link.

```
src/content/
  site.ts        identity, nav, contact links, meta description
  home.ts        hero, credentials, selected work, closing statement
  territories.ts the four threads (used by the homepage and every page header)
  adtech.ts      the six case studies, the system diagram, the essays
  experiments.ts the builds
  creative.ts    the gallery
  ventures.ts    Aubric and anything that follows it
```

Each file is typed, so if you miss a required field the build fails with a clear
message instead of shipping a half-empty card.

## Adding a project

Open the relevant file, copy the last entry in the array, and change the fields.
Every content type carries a `published` flag:

```ts
published: true   // renders on the site
published: false  // kept in the file, filtered out of the page
```

This is deliberate. It lets you keep a stub for work you've done but haven't
written up, without the page showing an obviously empty slot. A short page of
real work is stronger than a full grid of placeholders — that principle is
baked into the data layer.

## What still needs your input

These are the only places the site is not yet saying something true and
specific. Nothing here is invented — the fields are simply empty and filtered
out until you fill them.

| Where | What's needed |
| --- | --- |
| `experiments.ts` | Two empty scaffold entries (`placeholder-multimodal`, `placeholder-eval`). Fill in and set `published: true`, or delete them. |
| `creative.ts` | Each work renders generated artwork. Add a real image under `public/media/` and set `image: "/media/your-file.jpg"` to override. |
| `home.ts` → `credentials` | Confirm the "5× AI hackathon winner, 2024–2026" line is how you want it stated. |

### Adding a contact link

`site.ts` → `socials`. Any entry marked `placeholder: true` is filtered out of
the footer and the About page rather than shipping as a dead link, and CI fails
the build if a `REPLACE-ME` URL ever reaches the exported HTML. Drop the flag
once the URL is real and the link appears.

### Two headline options

`home.ts` ships with both hero lines written out:

- `hero.headline` — *"I build products at the intersection of technology,
  creativity, and human behavior."* This is the one currently rendering. It's
  broader and ages better as your work moves past advertising.
- `hero.headlineAlt` — *"I understand systems. Now I build them."* Shorter and
  more declarative, and it states the operator → builder arc directly.

To swap, pass `headlineAlt` where the homepage reads `headline`.

## Images

Drop files in `public/media/`. Reference them as `/media/filename.jpg`.

Image optimisation is disabled because GitHub Pages has no server to run it, so
**resize and compress before committing**. Aim for under 300 KB per image and no
wider than 1600px. Large images are the single easiest way to make this site
feel slow.

## Confidentiality

The AdTech copy is written at the level of problems and system design, with no
metrics, internal names, or roadmap. If you add to it, keep that bar — assume
anything on this page will be read by someone at a company you've worked for.
