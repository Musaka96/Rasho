// ==========================================================================
// Static site generator — Rastko Blagojevic, 3D Character & Texture Artist.
// Content from his CV + Closed Portfolio. Layout modelled on blur.com
// (Blur Studio): full-bleed cinematic panels, near-monochrome, cyan accent,
// thin wide titles, crosshair + head logo, scroll-progress bar.
// Run:  node generate.mjs  ->  index.html, projects/*.html, studio-work.html
// Real render images live in assets/ (JPEG); this script does not create them.
// ==========================================================================
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

// ------------------------------- Site ------------------------------------

const SITE = {
  name: "Rastko Blagojevic",
  role: "3D Character & Texture Artist",
  disciplines: "Character Art · Creature Sculpting · Texturing",
  location: "Novi Sad, Serbia",
  email: "rastko.blagojevic.1@gmail.com",
  phone: "+381 62 855 9466",
  artstation: "https://www.artstation.com/mokosha",
  linkedin: "https://www.linkedin.com/in/rastko-blagojevic-6b654020b/",
  github: "https://github.com/Musaka96",
};

const SKILLS = [
  "Autodesk Maya", "ZBrush", "XGen", "Blender", "Marvelous Designer",
  "Substance Painter", "Mari", "Marmoset", "Wrap3D", "Adobe Photoshop",
  "Affinity", "Unreal Engine",
];

// --------------------------- Portfolio projects --------------------------
// gallery = caption per assets/<id>-<n>.jpg (in order). Cover = <id>-cover.jpg.

const projects = [
  {
    id: "project-holland",
    title: "Project Holland",
    client: "Airship Interactive",
    discipline: "Character Art · NPC Heads",
    year: "2024",
    tagline:
      "A library of production NPC heads for an unannounced AAA title — a diverse cast of sculpts and skin built on one consistent facial topology.",
    role: "3D Character Artist — modeling & texturing",
    software: ["ZBrush", "Maya", "Wrap3D", "Mari", "Substance Painter", "Photoshop"],
    brief: [
      "Project Holland is a set of believable NPC heads spanning ages and ethnicities, all authored on a shared facial topology so they stay riggable and consistent across the game.",
      "Each head was sculpted for accurate anatomy, then given hand-authored PBR skin — pore-level detail, subsurface response and realistic variation — so the whole cast reads as one coherent, production-ready population.",
    ],
    pipeline: [
      "Base-mesh conforming and sculpt refinement in ZBrush.",
      "Topology conforming / wrap onto a shared facial base (Wrap3D, Maya).",
      "PBR skin authored across Mari and Substance Painter.",
      "Look dev and beauty passes over neutral studio lighting.",
    ],
    gallery: [
      "Textured head — front &amp; three-quarter",
      "Sculpt &amp; profile",
      "Child head — Sub-Saharan African variation",
      "Head variation — beauty over clay",
      "Feminine head — texture &amp; sculpt passes",
    ],
  },
  {
    id: "hellhound",
    title: "Hellhound",
    client: "Personal",
    discipline: "Creature Texturing",
    year: "2024",
    tagline:
      "A hairless hound demon — a texturing study in raw skin, scarred ritual markings and dry, veined muscle.",
    role: "Texturing &amp; Look Development",
    software: ["ZBrush", "Mari", "Substance Painter", "Photoshop"],
    brief: [
      "Hellhound is a texturing-focused piece: the sculpt exists to carry the skin. The goal was a convincing hairless creature hide — thin over bone, thick and folded at the joints, marked with pale ritual scarring.",
      "Layered maps drive subsurface, roughness break-up and micro-detail so the surface shifts believably from taut snout to loose, veined body under studio light.",
    ],
    pipeline: [
      "Detail sculpt and skin pass in ZBrush.",
      "UDIM texturing across Mari and Substance Painter.",
      "Ritual scarring and albedo break-up in Photoshop.",
      "Subsurface and roughness look dev with material spheres.",
    ],
    gallery: ["Full body — material response study"],
  },
  {
    id: "wip-creatures",
    title: "Creature Studies",
    client: "Personal — WIP",
    discipline: "Creature Modeling &amp; Texturing",
    year: "2025",
    tagline:
      "Ongoing creature work — from a horned quadruped's full model, topology and UVs to an elongated multi-limbed biped in clay.",
    role: "Modeling · Retopology · UVs · Texturing",
    software: ["ZBrush", "Maya", "Mari", "Substance Painter", "Photoshop"],
    brief: [
      "A running set of original creatures explored end to end — silhouette and anatomy first, then clean production topology and UVs ready for texture.",
      "The horned quadruped shows the full pipeline from textured beauty to wireframe and unwrapped shells; the elongated biped is an in-progress anatomy and proportion study in clay.",
    ],
    pipeline: [
      "Concept-driven high-poly sculpt in ZBrush.",
      "Production retopology and UV layout in Maya.",
      "Texture authoring in Mari / Substance Painter.",
      "Look dev over neutral lighting with calibration charts.",
    ],
    gallery: [
      "Horned quadruped — topology &amp; UV layout",
      "Biped creature — clay, front",
      "Biped creature — clay, three-quarter",
      "Biped creature — clay, side",
    ],
  },
  {
    id: "canine-anatomy",
    title: "Canine Anatomy",
    client: "Personal — Study",
    discipline: "Anatomy · Sculpting",
    year: "2025",
    tagline:
      "An anatomy study of a hound — from the surface sculpt down to the full muscular écorché beneath it.",
    role: "Sculpting — Henning Sanden mentorship",
    software: ["ZBrush"],
    brief: [
      "This study pairs a finished surface sculpt with its underlying musculature, built to understand how the forms of a lean hound are driven by the anatomy underneath.",
      "Completed during a creature-modeling mentorship with Henning Sanden, the focus was accurate muscle origins and insertions translating into believable surface tension and silhouette.",
    ],
    pipeline: [
      "Reference gathering and proportion blockout.",
      "Muscular écorché sculpt in ZBrush.",
      "Surface / skin pass over the anatomy.",
      "Multi-angle presentation renders.",
    ],
    gallery: [
      "Muscular écorché — lateral",
      "Écorché — full body",
      "Surface sculpt — three-quarter",
      "Surface sculpt — profile",
    ],
  },
  {
    id: "hardsurface",
    title: "Alpine Boot",
    client: "Personal",
    discipline: "Hard-Surface Sculpting",
    year: "2023",
    tagline:
      "A hard-surface study — a mountaineering boot broken down into shells, buckles and soles, sculpted entirely in ZBrush.",
    role: "Hard-Surface Sculpting",
    software: ["ZBrush"],
    brief: [
      "A hard-surface exercise built for clean, mechanical forms: precise panel breaks, believable buckles and clasps, and a sole that reads as engineered rubber.",
      "Every component was sculpted to hold up in close-up, with crisp bevels and controlled detail across the shell, cuff and hardware.",
    ],
    pipeline: [
      "Blockout of major shells and volumes in ZBrush.",
      "Hard-surface detailing — panels, buckles, stitching.",
      "Component breakdown (cuff, sole, hardware).",
      "Turnaround presentation renders.",
    ],
    gallery: [
      "Full turnaround",
      "Cuff &amp; shin components",
      "Sole detail",
    ],
  },
];

// ------------------------ Studio credits (from CV) -----------------------

const credits = [
  {
    studio: "Team From Earth",
    role: "3D Character Artist",
    period: "Jan 2026 — Present · Remote",
    titles: [
      ["Unannounced Project", "TBA", "Character modeling / texturing"],
    ],
  },
  {
    studio: "Airship Interactive",
    role: "3D Character Artist",
    period: "Mar 2024 — Dec 2024 · Remote",
    titles: [
      ["Unannounced AAA Project", "TBA", "Character modeling / texturing"],
      ["Unannounced AAA Project", "TBA", "Blendshape modeling"],
    ],
  },
  {
    studio: "3Lateral / Epic Games",
    role: "Technical Modeler",
    period: "Jul 2019 — Oct 2023 · Novi Sad, Serbia",
    titles: [
      ["Death Stranding 2: On the Beach", "2025", "Scan matching · facial hair grooming"],
      ["MindsEye", "2025", "Scan matching"],
      ["Marvel's Spider-Man 2", "2023", "Scan matching"],
      ["Bluedot", "2023", "Facial hair grooming"],
      ["Death Stranding 2 (Cinematic)", "2022", "Facial hair grooming"],
      ["Horizon II: Forbidden West — Burning Shores", "2022", "Texturing · scan matching"],
      ["Horizon II: Forbidden West", "2022", "Texturing · scan matching"],
      ["The Dark Pictures: The Devil in Me", "2022", "Scan matching"],
      ["The Matrix Awakens", "2021", "Scan matching"],
      ["The Dark Pictures: House of Ashes", "2021", "Scan matching"],
      ["Senua's Saga: Hellblade II (Cinematic)", "2020", "4D data cleanup"],
      ["MetaHuman Creator", "2020", "Scan matching · texturing"],
      ["Marvel's Spider-Man: Miles Morales", "2020", "Scan matching"],
    ],
  },
];

const education = [
  ["Henning Sanden — Creature Modeling Mentorship", "Jan–Mar 2025 · Online"],
  ["Gael Kerchenbaum — Creature Texturing Mentorship", "Dec 2023 · Online"],
  ["Univerzitet Metropolitan — BA Graphic Design", "2015–2020 · Niš (unfinished)"],
];

// ------------------------------ Helpers ----------------------------------

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
  console.log("wrote", path);
}

// -------------------------- Shared fragments -----------------------------

function head(title, desc) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <meta name="description" content="${desc}"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:type" content="website"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23070708'/%3E%3Cg stroke='%232fe6e6' stroke-width='2'%3E%3Cpath d='M16 6v20M6 16h20'/%3E%3C/g%3E%3C/svg%3E"/>
  <link rel="stylesheet" href="{{root}}styles.css"/>
</head>
<body>`;
}

function logoMark() {
  return `<svg class="logo-head" viewBox="0 0 40 40" width="30" height="30" aria-hidden="true"><path d="M8 34c0-9 3-14 9-16 3-1 4-3 4-6 0-4 3-7 7-6 5 1 8 6 8 12 0 12-7 22-19 22H8z" fill="currentColor"/></svg>`;
}

function nav(root) {
  return `  <div class="scroll-progress"><span></span></div>
  <span class="crosshair tl"></span>
  <span class="crosshair br"></span>
  <header class="nav">
    <button class="menu-btn" aria-label="Menu"><span class="plus">+</span></button>
    <a class="brand" href="${root || "./"}index.html">
      <span class="brand-name">Rastko&nbsp;Blagojevic</span>
      ${logoMark()}
    </a>
  </header>
  <div class="menu-overlay" hidden>
    <div class="menu-inner">
      <nav class="menu-links">
        <a href="${root}index.html"><span class="mi">01</span> Home</a>
        <a href="${root}index.html#work"><span class="mi">02</span> Work</a>
        <a href="${root}studio-work.html"><span class="mi">03</span> Studio Credits</a>
        <a href="${root}index.html#about"><span class="mi">04</span> About</a>
        <a href="${root}index.html#contact"><span class="mi">05</span> Contact</a>
      </nav>
      <div class="menu-foot">
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <a href="${SITE.artstation}" target="_blank" rel="noopener">ArtStation ↗</a>
        <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a>
      </div>
    </div>
  </div>`;
}

function footer(root) {
  return `  <footer class="footer">
    <div class="foot-row">
      <span>© <span data-year>2025</span> ${SITE.name}</span>
      <span>${SITE.role}</span>
      <span>${SITE.location}</span>
    </div>
    <div class="foot-links">
      <a href="mailto:${SITE.email}">Email</a>
      <a href="${SITE.artstation}" target="_blank" rel="noopener">ArtStation</a>
      <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      <a href="${root}studio-work.html">Credits</a>
    </div>
  </footer>
  <script src="${root}script.js"></script>
</body>
</html>`;
}

// ------------------------------ Home page --------------------------------

function panel(p, idx) {
  const num = String(idx + 1).padStart(2, "0");
  return `      <a class="panel" href="projects/${p.id}.html" data-parallax>
        <div class="panel-media"><img src="assets/${p.id}-cover.jpg" alt="${p.discipline}" loading="lazy"/></div>
        <div class="panel-shade"></div>
        <div class="panel-content">
          <div class="panel-tag"><span class="idx">${num}</span> ${p.client}</div>
          <h2 class="panel-title">${p.discipline}</h2>
          <div class="panel-meta">${p.year}</div>
        </div>
        <span class="panel-view">View project ↗</span>
      </a>`;
}

function creditTeaser() {
  // Flat list of shipped titles for the homepage teaser (studio work).
  const shipped = credits
    .flatMap((c) => c.titles.map((t) => ({ ...{ title: t[0], year: t[1] }, studio: c.studio })))
    .filter((t) => t.year !== "TBA");
  const rows = shipped
    .map(
      (t) =>
        `        <a class="credit-row" href="studio-work.html"><span class="cr-title">${t.title}</span><span class="cr-studio">${t.studio}</span><span class="cr-year">${t.year}</span></a>`
    )
    .join("\n");
  return `    <section id="studio" class="studio-teaser">
      <div class="studio-inner">
        <div class="studio-head">
          <div>
            <span class="sec-label">Studio Credits</span>
            <p class="studio-lead">Shipped titles from six years as a technical modeler &amp; character artist at <em>3Lateral / Epic Games</em> and <em>Airship Interactive</em>.</p>
          </div>
          <a class="studio-all" href="studio-work.html">All credits ↗</a>
        </div>
        <div class="credit-list">
${rows}
        </div>
      </div>
    </section>`;
}

function homePage() {
  const panels = projects.map(panel).join("\n");
  const skills = SKILLS.map((s) => `<span class="chip">${s}</span>`).join("\n            ");
  return `${head(
    `${SITE.name} — ${SITE.role}`,
    `${SITE.name}, ${SITE.role} based in ${SITE.location}. Character art, creature sculpting and texturing, with AAA credits including Death Stranding 2, Spider-Man 2 and Horizon Forbidden West.`
  ).replace(/{{root}}/g, "./")}
${nav("./")}
  <main>
    <section class="hero-panel">
      <div class="hero-grid"></div>
      <div class="hero-content">
        <div class="hero-tag">Portfolio — 2025</div>
        <h1>${SITE.name.split(" ")[0]}<br/>${SITE.name.split(" ")[1]}</h1>
        <div class="hero-role">${SITE.role}</div>
        <div class="hero-sub">${SITE.disciplines}</div>
      </div>
      <div class="hero-scroll"><span>Scroll</span><span class="line"></span></div>
    </section>

    <section id="work" class="panels">
      <div class="panels-head">
        <span class="ph-label">Selected Work</span>
        <span class="ph-count">[ ${String(projects.length).padStart(2, "0")} PROJECTS ]</span>
      </div>
${panels}
    </section>

    <section id="about" class="about">
      <div class="about-inner">
        <span class="sec-label">About</span>
        <p class="about-lead">I sculpt and texture <em>believable</em> characters and creatures — from AAA production heads to personal creature studies.</p>
        <div class="about-cols">
          <div class="about-body">
            <p>I'm ${SITE.name}, a ${SITE.role.toLowerCase()} based in ${SITE.location}. I spent six years as a technical modeler at <strong>3Lateral / Epic Games</strong> — scan matching, texturing and grooming on titles like Death Stranding 2, Marvel's Spider-Man 2, Horizon Forbidden West and MetaHuman Creator — and now focus on character and creature art.</p>
            <p>I've studied creature modeling and texturing under Henning Sanden and Gael Kerchenbaum, and work across the full asset pipeline: sculpt, retopology, UVs, and PBR texturing.</p>
          </div>
          <div class="about-side">
            <h4>Software</h4>
            <div class="chips">
            ${skills}
            </div>
          </div>
        </div>
      </div>
    </section>

${creditTeaser()}

    <section id="contact" class="contact">
      <span class="sec-label">Contact</span>
      <h2>Let's build<br/>something <em>real.</em></h2>
      <a class="contact-mail" href="mailto:${SITE.email}">${SITE.email} ↗</a>
      <div class="contact-links">
        <a href="${SITE.artstation}" target="_blank" rel="noopener">ArtStation</a>
        <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
        <a href="studio-work.html">Studio Credits</a>
      </div>
    </section>
  </main>
${footer("./")}`;
}

// ----------------------------- Project page ------------------------------

function projectPage(p, idx) {
  const next = projects[(idx + 1) % projects.length];
  const meta = [
    ["Client", p.client],
    ["Role", p.role],
    ["Year", p.year],
  ]
    .map((m) => `          <div class="meta-item"><div class="k">${m[0]}</div><div class="v">${m[1]}</div></div>`)
    .join("\n");
  const pipeline = p.pipeline.map((b) => `              <li>${b}</li>`).join("\n");
  const software = p.software.map((s) => `<span class="chip">${s}</span>`).join("\n            ");
  const gallery = p.gallery
    .map(
      (cap, i) =>
        `        <figure class="reveal">
          <img src="../assets/${p.id}-${i + 1}.jpg" alt="${p.discipline} — ${cap.replace(/&amp;/g, "and")}" loading="lazy"/>
          <figcaption><span class="idx">0${i + 1}</span>${cap}</figcaption>
        </figure>`
    )
    .join("\n");

  return `${head(`${p.discipline.replace(/&amp;/g, "&")} — ${SITE.name}`, p.tagline).replace(/{{root}}/g, "../")}
${nav("../")}
  <main>
    <section class="proj-hero">
      <div class="proj-cover"><img src="../assets/${p.id}-cover.jpg" alt="${p.discipline}"/></div>
      <div class="proj-hero-in">
        <a class="back" href="../index.html#work">← Index</a>
        <div class="proj-tag"><span class="idx">${String(idx + 1).padStart(2, "0")}</span> ${p.client}</div>
        <h1>${p.discipline}</h1>
        <div class="proj-client">${p.year}</div>
      </div>
      <div class="hero-scroll"><span>Scroll</span><span class="line"></span></div>
    </section>

    <section class="proj-meta">
${meta}
    </section>

    <section class="proj-intro">
      <p class="tagline">${p.tagline}</p>
      <div class="prose">
        ${p.brief.map((b) => `<p>${b}</p>`).join("\n        ")}
        <h3>Pipeline</h3>
        <ul>
${pipeline}
        </ul>
        <h3>Software</h3>
        <div class="chips">
            ${software}
        </div>
      </div>
    </section>

    <section class="gallery">
${gallery}
    </section>

    <a class="next-proj" href="${next.id}.html">
      <span class="np-label">Next Project ↗</span>
      <span class="np-title">${next.discipline}</span>
      <span class="np-disc">${next.client} — ${next.year}</span>
    </a>
  </main>
${footer("../")}`;
}

// --------------------------- Studio credits page -------------------------

function studioPage() {
  const groups = credits
    .map((c) => {
      const rows = c.titles
        .map(
          (t) =>
            `          <div class="cw-row"><span class="cw-title">${t[0]}</span><span class="cw-work">${t[2]}</span><span class="cw-year">${t[1]}</span></div>`
        )
        .join("\n");
      return `      <div class="cw-group">
        <div class="cw-studio">
          <h3>${c.studio}</h3>
          <div class="cw-role">${c.role}</div>
          <div class="cw-period">${c.period}</div>
        </div>
        <div class="cw-list">
${rows}
        </div>
      </div>`;
    })
    .join("\n");
  const edu = education
    .map((e) => `        <div class="cw-row"><span class="cw-title">${e[0]}</span><span class="cw-year">${e[1]}</span></div>`)
    .join("\n");
  return `${head(`Studio Credits — ${SITE.name}`, `Shipped game and film credits by ${SITE.name}, technical modeler and character artist.`).replace(/{{root}}/g, "./")}
${nav("./")}
  <main>
    <section class="cw-hero">
      <a class="back" href="index.html#studio">← Index</a>
      <span class="sec-label">Studio Credits</span>
      <h1>Shipped<br/>Work</h1>
      <p class="cw-intro">Six years of production credits — scan matching, texturing, grooming and character work across AAA games and cinematics.</p>
    </section>

    <section class="cw-body">
${groups}

      <div class="cw-group">
        <div class="cw-studio">
          <h3>Education</h3>
          <div class="cw-role">Mentorships &amp; degree</div>
        </div>
        <div class="cw-list">
${edu}
        </div>
      </div>
    </section>

    <a class="next-proj" href="index.html#work">
      <span class="np-label">Back to work ↗</span>
      <span class="np-title">Portfolio</span>
      <span class="np-disc">${SITE.disciplines}</span>
    </a>
  </main>
${footer("./")}`;
}

// ------------------------------- Emit ------------------------------------

write("index.html", homePage());
write("studio-work.html", studioPage());
projects.forEach((p, idx) => write(`projects/${p.id}.html`, projectPage(p, idx)));
console.log("\nDone —", SITE.name, "·", projects.length, "projects + studio credits");
