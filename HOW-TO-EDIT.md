# How to edit the site

No tools, no coding, no commands. You edit plain files and swap images.
Every project is its own folder inside **`projects/`**.

```
projects/
  _TEMPLATE/          ← the blank project you copy
    index.html          the page (text you edit)
    images/             the pictures for that project
      cover.jpg           big top image + the home-page tile
      01.jpg              gallery image 1
      02.jpg              gallery image 2
  hellhound/          ← a real project (same shape)
  project-holland/
  ...
index.html            ← the home page (the tiles / cards)
```

---

## Add a new project

1. **Copy the folder.** In `projects/`, copy the **`_TEMPLATE`** folder and
   paste it. Rename the copy to your project, e.g. **`dragon-bust`**.
   Use lowercase letters and dashes, **no spaces**.

2. **Swap the images.** Open the new `dragon-bust/images/` folder and replace:
   - **`cover.jpg`** — the main image (also shown as the tile on the home page)
   - **`01.jpg`, `02.jpg`, …** — the gallery images, in order

   Keep the same file names. Need more than 2 gallery images? Just add
   `03.jpg`, `04.jpg`, … (see step 3 for showing them).

3. **Edit the text.** Open `dragon-bust/index.html` in any text editor
   (Notepad works). Change the parts marked **`EDIT`** — the title, year,
   description, pipeline steps, software, and gallery captions.
   - To show a 3rd/4th gallery image, copy one `<figure>…</figure>` block,
     change `02.jpg` to `03.jpg`, and bump the little number.

4. **Show it on the home page.** Open **`index.html`**. Near the top of the
   project cards there's a block marked
   `▼▼▼ COPY FROM HERE ▼▼▼`. Copy that card, paste it just above the first
   existing card, and change the CAPS parts:
   - the folder name (it appears **twice** — in the link and the image path)
   - the label, title, and year
   - (optional) bump the `05 PROJECTS` count.

That's it. **To preview**, double-click `index.html` to open it in your
browser. **To publish**, save the files and push to GitHub — Vercel updates
the live site automatically.

---

## Reorder projects
On the home page (`index.html`), the cards show top-to-bottom in the order
they appear. Cut a card block and paste it higher or lower to reorder.

## Remove a project
Delete its card block from `index.html`, and delete its folder from `projects/`.

## Rename a project
Rename its folder, then update the two paths in its home-page card
(`projects/OLD-NAME/…` → `projects/NEW-NAME/…`).

---

## Notes
- `styles.css` = the look of the whole site. `script.js` = the small
  animations. You normally don't need to touch these.
- The **Studio Credits** page is `studio-work.html`, and the credits list on
  the home page is inside `index.html` — both are plain text you can edit
  directly.
- Don't rename `index.html` or the `images` folder inside a project — the
  links depend on those names.
