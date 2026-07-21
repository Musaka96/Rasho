# Rastko Blagojevic — 3D Character & Texture Artist

Portfolio website for a 3D character / texture / MetaHuman artist, with a
cinematic layout and mood modelled on [blur.com](https://www.blur.com/)
(Blur Studio): full-bleed project panels, near-monochrome with a cyan accent,
thin wide-tracked titles, a crosshair + head logo, and a scroll-progress bar.

Pure static HTML/CSS/JS — no build step, no framework — so it deploys instantly
on Vercel and is trivial to edit.

## Structure

```
index.html                 Home: full-viewport hero + full-bleed project panels + about + contact
projects/<slug>.html       One page per project (hero + pipeline + PBR gallery)
assets/<slug>-cover.svg    Beauty render used on the home panel + project hero
assets/<slug>-beauty.svg   Beauty render still
assets/<slug>-wire.svg     Wireframe / topology still
assets/<slug>-clay.svg     Clay / ambient-occlusion still
assets/<slug>-texture.svg  PBR texture-channel breakdown
styles.css                 Design system (colors, layout, components)
script.js                  Menu, scroll-progress bar, panel parallax, reveals
generate.mjs               Source-of-truth generator (see below)
vercel.json                Static hosting + asset caching config
```

The SVGs are **placeholder render stills**. Replace them with your real renders
(keep the same file names, or point the `<img src>` in the HTML at new files)
to make the site yours.

## Editing content

All project content lives in one place: the `projects` array at the top of
[`generate.mjs`](generate.mjs) — title, client, discipline, year, brief,
pipeline steps, stats and software. Edit that data and regenerate:

```bash
node generate.mjs
```

This rewrites `index.html`, every page in `projects/`, and the SVG art in
`assets/`. Commit the regenerated files.

Also update the placeholder contact details in the `SITE` object at the top of
`generate.mjs` (email, ArtStation URL) before going live.

## Deploying on Vercel

1. Push this repo to GitHub (already wired to `Musaka96/Rasho`).
2. In Vercel: **Add New → Project → Import** the `Rasho` repository.
3. Framework preset: **Other**. Build command: *(leave empty)*.
   Output directory: `.` (the repository root).
4. Deploy. Every future `git push` to `main` auto-deploys.

No environment variables or build step are required.

## Local preview

Any static server works, e.g.:

```bash
npx serve .
# then open the printed http://localhost:… URL
```
