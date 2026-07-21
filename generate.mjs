// ==========================================================================
// Static site generator — Rastko Blagojevic, 3D Character & Texture Artist.
// Layout & mood modelled on the live blur.com (Blur Studio): full-bleed
// cinematic project panels, near-monochrome with a cyan accent, thin
// wide-tracked titles, crosshair + head logo, scroll-progress bar.
// Run:  node generate.mjs   ->  index.html, projects/*.html, assets/*.svg
// ==========================================================================
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

// ------------------------------- Data ------------------------------------

const SITE = {
  name: "Rastko Blagojevic",
  role: "3D Character & Texture Artist",
  disciplines: "MetaHuman · Character Art · Look Development",
  email: "rastko.blagojevic@gmail.com",
  github: "https://github.com/Musaka96",
  artstation: "https://www.artstation.com/",
  location: "Belgrade / Remote",
};

const projects = [
  {
    id: "echo",
    title: "Echo",
    client: "Personal",
    discipline: "Digital Human",
    year: "2025",
    c1: "#2fe6e6",
    c2: "#1b4a63",
    tagline:
      "A real-time digital human built in MetaHuman and pushed far past the preset — custom sculpt, hand-authored skin, and a groom that holds up in close-up.",
    role: "Character Art · Look Dev · Groom",
    software: ["MetaHuman Creator", "ZBrush", "Substance 3D Painter", "XGen", "Unreal Engine 5", "Marmoset Toolbag"],
    brief: [
      "Echo started as a question: how human can a real-time MetaHuman feel once you stop trusting the presets? I rebuilt the face from a custom ZBrush sculpt, wrapped it back onto the MetaHuman topology, and hand-authored the skin so pores, blood flow and micro-detail read under hard light.",
      "The groom was rebuilt in XGen and ported to Unreal's strand-based hair, with look dev and lighting finished in-engine so everything you see runs at frame rate — no offline cheats.",
    ],
    breakdown: [
      "Custom high-poly face sculpt in ZBrush over a MetaHuman base.",
      "Wrap + retopology back onto MetaHuman-compatible topology.",
      "Multi-layer PBR skin with SSS authored in Substance 3D Painter.",
      "Strand groom built in XGen, converted to UE5 hair cards & strands.",
      "Real-time look dev, lighting and final frames in Unreal Engine 5.",
    ],
    stats: [
      ["Rig", "MetaHuman"],
      ["Skin", "4K PBR + SSS"],
      ["Hair", "Strand-based"],
      ["Engine", "UE5 · Lumen"],
    ],
  },
  {
    id: "revenant",
    title: "Revenant",
    client: "AAA — NDA",
    discipline: "Hero Character",
    year: "2025",
    c1: "#ff5a3c",
    c2: "#3a2320",
    tagline:
      "A hero game character taken from concept to in-engine — heavy hard-surface armor over a damaged body, built to survive extreme close-ups.",
    role: "Character Art · Hard-Surface · Texturing",
    software: ["ZBrush", "Maya", "Substance 3D Painter", "Marmoset Toolbag", "Marvelous Designer"],
    brief: [
      "Revenant is a hero asset built to the standard a cinematic camera demands: every buckle, scar and worn edge holds up when the lens gets close. The silhouette was locked in ZBrush before a single production-ready polygon existed.",
      "Cloth was simulated in Marvelous Designer, hard-surface armor blockmeshed in Maya, and the whole character unified through a layered, story-driven texture pass — this armor has clearly been worn, broken and repaired.",
    ],
    breakdown: [
      "Silhouette and forms explored as a ZBrush high-poly.",
      "Cloth and straps simulated in Marvelous Designer.",
      "Game-res retopology, UVs and bakes through Maya + Marmoset.",
      "Story-driven PBR texturing with edge wear and damage passes.",
      "Real-time presentation and lighting in Marmoset Toolbag.",
    ],
    stats: [
      ["Tris", "128k"],
      ["Textures", "4K · 3 UDIM"],
      ["Maps", "Albedo/Rough/Metal/Normal"],
      ["Target", "Real-time"],
    ],
  },
  {
    id: "sandveil",
    title: "Sandveil",
    client: "Personal",
    discipline: "Creature Design",
    year: "2024",
    c1: "#e8a43c",
    c2: "#4a3618",
    tagline:
      "An original desert creature — anatomy-first sculpt, layered skin shading, and a look dev pass that sells weight, dust and dry heat.",
    role: "Creature Art · Sculpt · Texturing",
    software: ["ZBrush", "Substance 3D Painter", "Mari", "Blender", "Marmoset Toolbag"],
    brief: [
      "Sandveil is a personal creature study driven by believable anatomy — I wanted muscle, cartilage and keratin to read as one connected organism rather than a collection of details.",
      "Skin was textured across Mari and Substance for scale-level control, then look-developed with dust build-up in the crevices and a dry, sun-bleached sheen that grounds the creature in its environment.",
    ],
    breakdown: [
      "Anatomy-driven high-poly sculpt and detail pass in ZBrush.",
      "UV layout and displacement extraction for render.",
      "Layered skin, scales and keratin authored in Mari + Substance.",
      "Dust, wear and subsurface look dev.",
      "Lighting and beauty renders in Marmoset Toolbag.",
    ],
    stats: [
      ["Sculpt", "38M ZBrush"],
      ["Textures", "8K UDIM"],
      ["Maps", "Displacement + SSS"],
      ["Render", "Marmoset"],
    ],
  },
  {
    id: "hollow-king",
    title: "Hollow King",
    client: "Indie Title",
    discipline: "Stylized Character",
    year: "2024",
    c1: "#9b6cff",
    c2: "#241b3a",
    tagline:
      "A stylized hero for an indie game — exaggerated forms, hand-painted-feel PBR, and a clean real-time budget without losing the sculpt's character.",
    role: "Character Art · Stylized Texturing",
    software: ["ZBrush", "3D-Coat", "Substance 3D Painter", "Maya", "Marmoset Toolbag"],
    brief: [
      "Hollow King leans into stylization — big confident shapes, chunky armor and a face with real personality. The challenge was carrying that charm from a detailed sculpt down to a tight real-time budget.",
      "Textures blend a hand-painted sensibility with PBR correctness, so the character keeps its illustrative warmth while still reacting properly to dynamic light in engine.",
    ],
    breakdown: [
      "Stylized high-poly sculpt with exaggerated forms in ZBrush.",
      "Retopology in 3D-Coat / Maya to a lean game budget.",
      "Hand-painted-feel PBR texturing in Substance 3D Painter.",
      "Material definition and trim detailing.",
      "Presentation and turntables in Marmoset Toolbag.",
    ],
    stats: [
      ["Tris", "64k"],
      ["Textures", "2K PBR"],
      ["Style", "Stylized-PBR"],
      ["Target", "Real-time"],
    ],
  },
  {
    id: "atelier",
    title: "Atelier",
    client: "Studio Commission",
    discipline: "Hard-Surface · Environment",
    year: "2024",
    c1: "#5aa8ff",
    c2: "#1c2a3a",
    tagline:
      "A hero hard-surface prop set for an environment — precise mechanical modeling, trim-sheet efficiency, and grounded, weathered materials.",
    role: "Hard-Surface · Materials · Lighting",
    software: ["Maya", "Substance 3D Painter", "Substance 3D Designer", "Marmoset Toolbag", "Unreal Engine 5"],
    brief: [
      "Atelier is a hero prop set — the kind of mechanical objects a camera lingers on. Every panel line and fastener was modeled with intent so the forms read as engineered, not decorated.",
      "Materials were built as reusable trim sheets and smart materials in Substance, then dressed with grime, oxidation and use so the set feels like it has a history the moment it appears in shot.",
    ],
    breakdown: [
      "Precise hard-surface modeling and blockout in Maya.",
      "Trim-sheet and tiling material authoring in Substance 3D Designer.",
      "High-to-low bakes and unique detail texturing.",
      "Weathering, grime and edge-wear passes.",
      "Lighting and presentation in Marmoset + UE5.",
    ],
    stats: [
      ["Approach", "Trim + unique"],
      ["Textures", "4K PBR"],
      ["Maps", "Full PBR set"],
      ["Engine", "UE5 · Nanite"],
    ],
  },
  {
    id: "genesis",
    title: "Genesis",
    client: "VFX — NDA",
    discipline: "Digital Double",
    year: "2023",
    c1: "#3ce6a4",
    c2: "#173a30",
    tagline:
      "A scan-based digital double — photogrammetry cleaned and rebuilt into a production-ready MetaHuman for film-grade close-ups.",
    role: "Digital Double · Scan Processing · Look Dev",
    software: ["Wrap", "ZBrush", "MetaHuman Creator", "Mari", "Maya", "Unreal Engine 5"],
    brief: [
      "Genesis turns a raw photogrammetry scan into a dependable digital double. The scan data was cleaned, re-wrapped to a controllable topology, and reconciled with a MetaHuman rig so it could be posed and animated reliably.",
      "Texture detail from the scan was preserved and extended in Mari, then look-developed for realistic skin response under film-grade lighting in Unreal Engine 5.",
    ],
    breakdown: [
      "Photogrammetry cleanup and re-wrap in Wrap.",
      "Detail recovery and pore-level sculpt in ZBrush.",
      "MetaHuman rig reconciliation for pose and animation.",
      "Scan-derived skin textures extended in Mari.",
      "Film-grade skin look dev and lighting in Unreal Engine 5.",
    ],
    stats: [
      ["Source", "Photogrammetry"],
      ["Rig", "MetaHuman"],
      ["Skin", "8K scan-based"],
      ["Engine", "UE5"],
    ],
  },
];

// ------------------------------ Helpers ----------------------------------

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
  console.log("wrote", path);
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

// ----------------------- Placeholder render art -------------------------
// Cheap, self-contained SVGs that read like 3D render stills. Kinds:
//   hero/beauty = rim-lit sculptural form, wire = wireframe sphere,
//   clay = neutral matcap clay, texture = PBR channel breakdown.
// The artist swaps these for real renders by replacing the files.

const W = 1600, H = 900;

function frameLabels(uid, title, kind, cyan = true) {
  const tc = kind.toUpperCase();
  return `
  <g stroke="#f2f2f0" stroke-opacity="0.4" stroke-width="1.4">
    <path d="M56 40 v26 M43 53 h26"/>
    <path d="M${W - 56} 40 v26 M${W - 69} 53 h26"/>
  </g>
  <text x="56" y="${H - 96}" font-family="'Roboto Mono', monospace" font-size="20" letter-spacing="4" fill="#f2f2f0" opacity="0.65">${esc(title).toUpperCase()}</text>
  <text x="56" y="${H - 54}" font-family="'Roboto Mono', monospace" font-size="30" letter-spacing="6" fill="${cyan ? "#2fe6e6" : "#f2f2f0"}">${tc}</text>
  <text x="${W - 56}" y="${H - 54}" text-anchor="end" font-family="'Roboto Mono', monospace" font-size="20" letter-spacing="3" fill="#2fe6e6">● 4K</text>`;
}

function formDefs(uid, c1, c2) {
  return `
    <linearGradient id="bg${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c2}"/>
      <stop offset="0.55" stop-color="#0c0d10"/>
      <stop offset="1" stop-color="#050506"/>
    </linearGradient>
    <radialGradient id="rim${uid}" cx="40%" cy="32%" r="75%">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="0.18" stop-color="${c1}" stop-opacity="0.95"/>
      <stop offset="0.55" stop-color="${c2}"/>
      <stop offset="1" stop-color="#050506" stop-opacity="0.6"/>
    </radialGradient>
    <radialGradient id="glow${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${c1}" stop-opacity="0.7"/>
      <stop offset="1" stop-color="${c1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig${uid}" cx="50%" cy="46%" r="80%">
      <stop offset="0" stop-color="#000" stop-opacity="0"/>
      <stop offset="0.78" stop-color="#000" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.78"/>
    </radialGradient>
    <filter id="soft${uid}"><feGaussianBlur stdDeviation="22"/></filter>
    <filter id="soft2${uid}"><feGaussianBlur stdDeviation="60"/></filter>`;
}

// A soft rim-lit sculptural bust-like form filling the frame, tinted per project.
function formShape(uid, c1, c2) {
  const cx = W * 0.5, cy = H * 0.52;
  return `
  <g filter="url(#soft2${uid})">
    <ellipse cx="${cx - 260}" cy="${cy - 120}" rx="360" ry="300" fill="url(#glow${uid})"/>
    <ellipse cx="${cx + 340}" cy="${cy + 160}" rx="420" ry="340" fill="url(#glow${uid})" opacity="0.7"/>
  </g>
  <g filter="url(#soft${uid})">
    <ellipse cx="${cx}" cy="${cy}" rx="380" ry="430" fill="url(#rim${uid})"/>
    <ellipse cx="${cx - 30}" cy="${cy + 340}" rx="300" ry="180" fill="url(#rim${uid})"/>
    <ellipse cx="${cx + 150}" cy="${cy - 220}" rx="130" ry="150" fill="${c1}" opacity="0.4"/>
  </g>
  <ellipse cx="${cx - 120}" cy="${cy - 180}" rx="60" ry="80" fill="#ffffff" opacity="0.5" filter="url(#soft${uid})"/>`;
}

function svgHero(p, kind) {
  const uid = (p.id + kind).replace(/[^a-z0-9]/gi, "");
  const { c1, c2, title } = p;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${formDefs(uid, c1, c2)}</defs>
  <rect width="${W}" height="${H}" fill="url(#bg${uid})"/>
  ${formShape(uid, c1, c2)}
  <rect width="${W}" height="${H}" fill="url(#vig${uid})"/>
  ${frameLabels(uid, title, kind)}
</svg>`;
}

function svgWire(p) {
  const uid = (p.id + "wire").replace(/[^a-z0-9]/gi, "");
  const { c1, title } = p;
  const cx = W * 0.5, cy = H * 0.5, R = 300;
  let lines = "";
  // longitude arcs
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const rx = Math.abs(Math.cos((t - 0.5) * Math.PI)) * R;
    lines += `<ellipse cx="${cx}" cy="${cy}" rx="${rx.toFixed(1)}" ry="${R}" fill="none" stroke="${c1}" stroke-opacity="0.32" stroke-width="1.2"/>`;
  }
  // latitude lines
  for (let i = 1; i < 10; i++) {
    const t = i / 10;
    const y = cy - R + t * 2 * R;
    const rx = Math.sqrt(Math.max(0, 1 - Math.pow((y - cy) / R, 2))) * R;
    lines += `<ellipse cx="${cx}" cy="${y}" rx="${rx.toFixed(1)}" ry="${(rx * 0.28).toFixed(1)}" fill="none" stroke="${c1}" stroke-opacity="0.24" stroke-width="1.2"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><radialGradient id="v${uid}" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.9"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="#0a0c0d"/>
  <circle cx="${cx}" cy="${cy}" r="${R}" fill="${c1}" opacity="0.05"/>
  ${lines}
  <rect width="${W}" height="${H}" fill="url(#v${uid})"/>
  ${frameLabels(uid, title, "wireframe")}
</svg>`;
}

function svgClay(p) {
  const uid = (p.id + "clay").replace(/[^a-z0-9]/gi, "");
  const { title } = p;
  const cx = W * 0.5, cy = H * 0.54;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="clay${uid}" cx="40%" cy="32%" r="75%">
      <stop offset="0" stop-color="#d8d8d4"/><stop offset="0.5" stop-color="#8a8a86"/><stop offset="1" stop-color="#2a2a2c"/>
    </radialGradient>
    <filter id="cs${uid}"><feGaussianBlur stdDeviation="20"/></filter>
    <radialGradient id="cv${uid}" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.88"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#141416"/>
  <ellipse cx="${cx}" cy="${cy + 360}" rx="300" ry="46" fill="#000" opacity="0.5" filter="url(#cs${uid})"/>
  <g filter="url(#cs${uid})">
    <ellipse cx="${cx}" cy="${cy}" rx="320" ry="370" fill="url(#clay${uid})"/>
    <ellipse cx="${cx}" cy="${cy + 290}" rx="250" ry="140" fill="url(#clay${uid})"/>
  </g>
  <rect width="${W}" height="${H}" fill="url(#cv${uid})"/>
  ${frameLabels(uid, title, "clay / ao")}
</svg>`;
}

function svgTexture(p) {
  const uid = (p.id + "tex").replace(/[^a-z0-9]/gi, "");
  const { c1, title } = p;
  const cols = 16, rows = 9, s = 100;
  let checker = "";
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++)
      if ((x + y) % 2 === 0)
        checker += `<rect x="${x * s}" y="${y * s}" width="${s}" height="${s}" fill="#ffffff" opacity="0.04"/>`;
  const chans = ["ALBEDO", "NORMAL", "ROUGH", "METAL"];
  let swatches = "";
  chans.forEach((c, i) => {
    const bx = 60 + i * 250;
    const by = H - 300;
    const fills = [c1, "#8a9bd8", "#9a9a96", "#c9b98a"];
    swatches += `<rect x="${bx}" y="${by}" width="200" height="130" fill="${fills[i]}" opacity="0.5" rx="4"/>
      <text x="${bx}" y="${by + 158}" font-family="'Roboto Mono', monospace" font-size="16" letter-spacing="2" fill="#f2f2f0" opacity="0.7">${c}</text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#0d0d0f"/>
  ${checker}
  <g stroke="${c1}" stroke-opacity="0.18" stroke-width="1">
    ${Array.from({ length: cols + 1 }, (_, i) => `<path d="M${i * s} 0V${H}"/>`).join("")}
    ${Array.from({ length: rows + 1 }, (_, i) => `<path d="M0 ${i * s}H${W}"/>`).join("")}
  </g>
  ${swatches}
  ${frameLabels(uid, title, "pbr / 4k")}
</svg>`;
}

function buildAssets(p) {
  write(`assets/${p.id}-cover.svg`, svgHero(p, "beauty"));
  write(`assets/${p.id}-beauty.svg`, svgHero(p, "beauty · 02"));
  write(`assets/${p.id}-wire.svg`, svgWire(p));
  write(`assets/${p.id}-clay.svg`, svgClay(p));
  write(`assets/${p.id}-texture.svg`, svgTexture(p));
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

// The head-silhouette style logo mark (references Blur's head logo idea).
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
        <a href="${root}index.html#about"><span class="mi">03</span> About</a>
        <a href="${root}index.html#contact"><span class="mi">04</span> Contact</a>
      </nav>
      <div class="menu-foot">
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <a href="${SITE.artstation}" target="_blank" rel="noopener">ArtStation ↗</a>
        <a href="${SITE.github}" target="_blank" rel="noopener">GitHub ↗</a>
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
      <a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a>
      <a href="${root}index.html#work">Work</a>
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
        <div class="panel-media"><img src="assets/${p.id}-cover.svg" alt="${esc(p.title)} — ${esc(p.discipline)}" loading="lazy"/></div>
        <div class="panel-shade"></div>
        <div class="panel-content">
          <div class="panel-tag"><span class="idx">${num}</span> ${esc(p.discipline)}</div>
          <h2 class="panel-title">${esc(p.title)}</h2>
          <div class="panel-meta">${esc(p.client)} — ${p.year}</div>
        </div>
        <span class="panel-view">View project ↗</span>
      </a>`;
}

function homePage() {
  const panels = projects.map(panel).join("\n");
  return `${head(
    `${SITE.name} — ${SITE.role}`,
    `${SITE.name}, ${SITE.role}. ${SITE.disciplines}. Selected 3D character art, texturing and MetaHuman work.`
  ).replace(/{{root}}/g, "./")}
${nav("./")}
  <main>
    <section class="hero-panel">
      <div class="hero-grid"></div>
      <div class="hero-content">
        <div class="hero-tag">Showreel — 2025</div>
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
        <p class="about-lead">I build <em>believable</em> characters and surfaces — from a first ZBrush sculpt to a real-time <em>MetaHuman</em> that holds up in close-up.</p>
        <div class="about-cols">
          <div class="about-body">
            <p>I'm ${SITE.name}, a ${SITE.role.toLowerCase()} focused on high-fidelity character art, PBR texturing and digital humans. I work across the full asset pipeline — sculpt, retopology, UVs, bakes, look development and real-time integration.</p>
            <p>My toolset centers on ZBrush, Substance 3D, Maya, Marvelous Designer, Mari, MetaHuman Creator, Marmoset Toolbag and Unreal Engine 5. I care most about the details that make a surface feel real: how light enters skin, how an edge wears, how a material remembers its history.</p>
          </div>
          <div class="about-side">
            <div class="ab-block">
              <h4>Disciplines</h4>
              <ul>
                <li>Character &amp; Creature Art</li>
                <li>Digital Humans / MetaHuman</li>
                <li>PBR &amp; Hand-Painted Texturing</li>
                <li>Hard-Surface Modeling</li>
                <li>Look Development &amp; Lighting</li>
              </ul>
            </div>
            <div class="ab-block">
              <h4>Software</h4>
              <ul>
                <li>ZBrush · Maya · Blender</li>
                <li>Substance 3D Painter / Designer · Mari</li>
                <li>Marvelous Designer · XGen</li>
                <li>MetaHuman Creator · Wrap</li>
                <li>Marmoset Toolbag · Unreal Engine 5</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="contact">
      <span class="sec-label">Contact</span>
      <h2>Let's build<br/>something <em>real.</em></h2>
      <a class="contact-mail" href="mailto:${SITE.email}">${SITE.email} ↗</a>
      <div class="contact-links">
        <a href="${SITE.artstation}" target="_blank" rel="noopener">ArtStation</a>
        <a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a>
        <a href="#work">Work</a>
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
    ["Discipline", p.discipline],
    ["Role", p.role],
    ["Year", p.year],
  ]
    .map((m) => `          <div class="meta-item"><div class="k">${m[0]}</div><div class="v">${esc(m[1])}</div></div>`)
    .join("\n");
  const breakdown = p.breakdown.map((b) => `              <li>${esc(b)}</li>`).join("\n");
  const stats = p.stats
    .map((s) => `          <div class="stat"><div class="n">${esc(s[1])}</div><div class="l">${esc(s[0])}</div></div>`)
    .join("\n");
  const software = p.software.map((s) => `<span class="chip">${esc(s)}</span>`).join("\n            ");
  const gallery = [
    ["beauty", "Beauty render"],
    ["wire", "Wireframe / topology"],
    ["clay", "Clay / ambient occlusion"],
    ["texture", "PBR texture breakdown"],
  ]
    .map(
      (g, i) =>
        `        <figure class="reveal">
          <img src="../assets/${p.id}-${g[0]}.svg" alt="${esc(p.title)} — ${g[1]}" loading="lazy"/>
          <figcaption><span class="idx">0${i + 1}</span>${g[1]}</figcaption>
        </figure>`
    )
    .join("\n");

  return `${head(`${p.title} — ${SITE.name}`, p.tagline).replace(/{{root}}/g, "../")}
${nav("../")}
  <main>
    <section class="proj-hero">
      <div class="proj-cover"><img src="../assets/${p.id}-cover.svg" alt="${esc(p.title)}"/></div>
      <div class="proj-hero-in">
        <a class="back" href="../index.html#work">← Index</a>
        <div class="proj-tag"><span class="idx">${String(idx + 1).padStart(2, "0")}</span> ${esc(p.discipline)}</div>
        <h1>${esc(p.title)}</h1>
        <div class="proj-client">${esc(p.client)} — ${p.year}</div>
      </div>
      <div class="hero-scroll"><span>Scroll</span><span class="line"></span></div>
    </section>

    <section class="proj-meta">
${meta}
    </section>

    <section class="proj-intro">
      <p class="tagline">${esc(p.tagline)}</p>
      <div class="prose">
        ${p.brief.map((b) => `<p>${esc(b)}</p>`).join("\n        ")}
        <h3>Pipeline</h3>
        <ul>
${breakdown}
        </ul>
        <h3>Software</h3>
        <div class="chips">
            ${software}
        </div>
      </div>
    </section>

    <section class="stat-strip">
${stats}
    </section>

    <section class="gallery">
${gallery}
    </section>

    <a class="next-proj" href="${next.id}.html">
      <span class="np-label">Next Project ↗</span>
      <span class="np-title">${esc(next.title)}</span>
      <span class="np-disc">${esc(next.discipline)}</span>
    </a>
  </main>
${footer("../")}`;
}

// ------------------------------- Emit ------------------------------------

write("index.html", homePage());
projects.forEach((p, idx) => {
  write(`projects/${p.id}.html`, projectPage(p, idx));
  buildAssets(p);
});
console.log("\nDone —", SITE.name, "·", projects.length, "projects");
