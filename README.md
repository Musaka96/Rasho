# Rastko Blagojevic — Portfolio

A fast, dependency-free portfolio website inspired by the dark/orange aesthetic of
[blur.com](https://www.blur.com/). Pure static HTML/CSS/JS — no build step, no
framework — so it deploys instantly on Vercel and is trivial to edit.

## Live structure

```
index.html                 Home: hero, work grid, about, contact
projects/<slug>.html       One page per project (preview art + write-up)
assets/<slug>-*.svg        Self-contained gradient preview art
styles.css                 Design system (colors, layout, components)
script.js                  Nav, mobile menu, scroll reveals
generate.mjs               Source-of-truth generator (see below)
vercel.json                Static hosting + asset caching config
```

## Editing content

All project content lives in one place: the `projects` array at the top of
[`generate.mjs`](generate.mjs). To add or edit a project, change that data and
regenerate the HTML + art:

```bash
node generate.mjs
```

This rewrites `index.html`, every page in `projects/`, and the SVG art in
`assets/`. Commit the regenerated files.

To swap the placeholder art for real screenshots, drop image files into
`assets/` and point the `<img src>` in the relevant `projects/*.html` (or update
the `svg()`/image logic in `generate.mjs`) at them.

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
# then open http://localhost:3000
```
