# Rastko Blagojevic — 3D Character & Texture Artist

Portfolio website for a 3D character / texture / MetaHuman artist, with a
cinematic layout and mood modelled on [blur.com](https://www.blur.com/)
(Blur Studio): full-bleed project panels, near-monochrome with a cyan accent,
thin wide-tracked titles, a crosshair + head logo, and a scroll-progress bar.

Pure static HTML/CSS/JS — **no build step, no framework, no tools**. You edit
the files directly and swap images; Vercel serves them as-is.

## Editing

See **[HOW-TO-EDIT.md](HOW-TO-EDIT.md)** — adding a project is: copy a folder,
swap the images, edit the text, paste one card on the home page.

## Structure

```
index.html                       Home: hero + project cards + studio credits + about + contact
studio-work.html                 Full studio-credits page
projects/
  _TEMPLATE/                     Blank project — copy this to make a new one
    index.html                   The project page (text to edit)
    images/                      cover.jpg (tile + hero) + 01.jpg, 02.jpg… (gallery)
  <project-name>/                One self-contained folder per project (same shape)
    index.html
    images/
styles.css                       Design system (colors, layout, components)
script.js                        Menu, scroll-progress bar, panel parallax, reveals
vercel.json                      Static hosting + image caching config
```

Each project is fully self-contained in its own folder, so you can copy a
folder to duplicate a project and swap its images independently.

## Deploying on Vercel

1. Push this repo to GitHub (`Musaka96/Rasho`).
2. In Vercel: **Add New → Project → Import** the `Rasho` repository.
3. Framework preset: **Other**. Build command: *(leave empty)*.
   Output directory: `.` (the repository root).
4. Deploy. Every future `git push` to `main` auto-deploys.

No environment variables or build step are required.

## Local preview

Just **double-click `index.html`** to open it in your browser — everything is
plain HTML with relative image paths, so it works straight from disk.
