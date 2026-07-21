// ==========================================================================
// Static site generator for Rastko Blagojevic's portfolio.
// Run:  node generate.mjs
// Emits: index.html, projects/*.html, assets/*.svg
// Output is committed and served statically by Vercel (no build step needed).
// ==========================================================================
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

// ------------------------------- Data ------------------------------------

const SITE = {
  name: "Rastko Blagojevic",
  role: "Product Designer & Frontend Engineer",
  email: "hello@rastko.design",
  github: "https://github.com/Musaka96",
};

const projects = [
  {
    id: "aurora-finance",
    title: "Aurora Finance",
    category: "Fintech · Web App",
    year: "2025",
    c1: "#ff6a00",
    c2: "#ff1f6b",
    tagline:
      "A real-time trading and portfolio platform designed for clarity under pressure — turning volatile data into calm, confident decisions.",
    role: "Lead Product Designer",
    timeline: "6 months",
    client: "Aurora Labs",
    stack: ["React", "TypeScript", "D3.js", "WebSocket", "Figma"],
    overview: [
      "Aurora Finance needed to move fast without feeling frantic. Traders judge a platform in milliseconds, so every surface had to be legible at a glance while still exposing the depth power-users demand.",
      "I led design from research through shipped code, building a dark, high-contrast interface where live market data reads instantly. A modular dashboard lets users compose the exact view they trade against, and a unified color system encodes gain, loss and risk consistently across every chart.",
    ],
    features: [
      "Real-time streaming charts rendered at 60fps with progressive data loading.",
      "Composable dashboard with drag-to-arrange widgets and saved layouts.",
      "Accessible color system that stays readable for color-blind users.",
      "Sub-100ms interaction budget enforced across the whole trading view.",
    ],
    gallery: [
      { label: "Dashboard", cap: "Composable portfolio dashboard with live P&L." },
      { label: "Trade Ticket", cap: "One-tap trade ticket with risk preview." },
      { label: "Analytics", cap: "Deep-dive analytics and historical replay." },
    ],
    metrics: [
      ["Engagement", "+38%"],
      ["Time to trade", "-52%"],
      ["Retention", "+21%"],
    ],
  },
  {
    id: "nebula-commerce",
    title: "Nebula Commerce",
    category: "E-commerce · Platform",
    year: "2025",
    c1: "#7c3aed",
    c2: "#2563eb",
    tagline:
      "A headless commerce experience where every storefront feels custom-built, yet ships from one shared design system.",
    role: "Design Systems Lead",
    timeline: "8 months",
    client: "Nebula Inc.",
    stack: ["Next.js", "Storybook", "GraphQL", "Stripe", "Tailwind"],
    overview: [
      "Nebula powers hundreds of brands from a single platform, so the challenge wasn't one storefront — it was a system flexible enough for all of them without collapsing into chaos.",
      "I built a token-driven design system with theming baked in at the primitive level. Merchants restyle an entire store from a handful of tokens, while the checkout, cart and product flows stay conversion-optimized and consistent underneath.",
    ],
    features: [
      "Token-based theming that repaints a full storefront in seconds.",
      "Conversion-tuned checkout with a 3-step guest flow.",
      "120+ documented components in a live Storybook.",
      "Edge-rendered product pages with sub-second loads.",
    ],
    gallery: [
      { label: "Storefront", cap: "Themeable storefront built from shared tokens." },
      { label: "Product", cap: "Product detail with variant-aware gallery." },
      { label: "Checkout", cap: "Three-step guest checkout with Stripe." },
    ],
    metrics: [
      ["Conversion", "+27%"],
      ["Cart drop-off", "-34%"],
      ["Brands live", "140+"],
    ],
  },
  {
    id: "vortex-analytics",
    title: "Vortex Analytics",
    category: "Data · SaaS",
    year: "2024",
    c1: "#06b6d4",
    c2: "#10b981",
    tagline:
      "Self-serve analytics that lets non-technical teams ask hard questions of their data — and actually understand the answers.",
    role: "Product Designer",
    timeline: "5 months",
    client: "Vortex",
    stack: ["Vue", "ClickHouse", "ECharts", "Node", "Figma"],
    overview: [
      "Most analytics tools assume you already speak SQL. Vortex bet the opposite: that the next million dashboards would be built by marketers, founders and ops leads.",
      "I designed a query builder that feels like a conversation, not a code editor. Users compose questions in plain language, preview results instantly, and drop them onto shareable boards — with guardrails that keep the underlying data honest.",
    ],
    features: [
      "Visual query builder with natural-language field search.",
      "Instant chart previews as filters change, no run button.",
      "Shareable, embeddable boards with role-based access.",
      "Smart chart suggestions based on the shape of the data.",
    ],
    gallery: [
      { label: "Explorer", cap: "No-code explorer with live preview." },
      { label: "Board", cap: "Shareable board of pinned insights." },
      { label: "Report", cap: "Scheduled report with narrative summaries." },
    ],
    metrics: [
      ["Self-serve queries", "+63%"],
      ["Onboarding time", "-45%"],
      ["Weekly actives", "+40%"],
    ],
  },
  {
    id: "prism-design-system",
    title: "Prism",
    category: "Design System · Tooling",
    year: "2024",
    c1: "#ec4899",
    c2: "#f59e0b",
    tagline:
      "An open design system and component library that keeps 12 product teams in sync — from Figma variables to shipped code.",
    role: "Design Engineer",
    timeline: "Ongoing",
    client: "Internal",
    stack: ["React", "Radix", "Style Dictionary", "Figma API", "CSS"],
    overview: [
      "As the org scaled past a dozen teams, every product started drifting — its own buttons, its own spacing, its own idea of 'primary'. Prism was the reset.",
      "I built the pipeline that turns a single source of truth in Figma into typed tokens, themed CSS variables and accessible React primitives. One change to a token now flows automatically into every product, documented and versioned.",
    ],
    features: [
      "Figma-to-code token pipeline via Style Dictionary.",
      "Fully accessible primitives built on Radix UI.",
      "Automated visual regression on every pull request.",
      "Live docs generated straight from component source.",
    ],
    gallery: [
      { label: "Tokens", cap: "Design tokens synced from Figma variables." },
      { label: "Components", cap: "Accessible primitives with usage docs." },
      { label: "Theming", cap: "Light, dark and brand themes from one core." },
    ],
    metrics: [
      ["Teams aligned", "12"],
      ["UI bugs", "-58%"],
      ["Ship velocity", "+31%"],
    ],
  },
  {
    id: "helio-travel",
    title: "Helio Travel",
    category: "Mobile · Travel",
    year: "2023",
    c1: "#3b82f6",
    c2: "#22d3ee",
    tagline:
      "A trip-planning app that turns the mess of tabs, screenshots and group chats into one shared, living itinerary.",
    role: "Product Designer",
    timeline: "4 months",
    client: "Helio",
    stack: ["React Native", "Expo", "Mapbox", "Supabase", "Figma"],
    overview: [
      "Planning a trip with friends is chaos — half the decisions live in a group chat, the other half in someone's screenshots. Helio pulls it all into one place.",
      "I designed a collaborative itinerary where anyone can drop suggestions on a map, vote on plans and watch the trip assemble itself day by day. The interface stays warm and playful without ever getting in the way of the logistics.",
    ],
    features: [
      "Collaborative map with drag-to-plan day timelines.",
      "Group voting on stays, food and activities.",
      "Offline-first itinerary that works without signal.",
      "Auto-generated packing and budget summaries.",
    ],
    gallery: [
      { label: "Map", cap: "Collaborative planning map with pins." },
      { label: "Itinerary", cap: "Day-by-day timeline with live sync." },
      { label: "Wallet", cap: "Shared budget and expense splitting." },
    ],
    metrics: [
      ["Trips planned", "18k+"],
      ["Group invites", "+72%"],
      ["App rating", "4.8★"],
    ],
  },
  {
    id: "monolith-cms",
    title: "Monolith CMS",
    category: "Developer Tools · CMS",
    year: "2023",
    c1: "#22c55e",
    c2: "#84cc16",
    tagline:
      "A content platform editors love and developers trust — structured content, live preview, and zero fear of breaking the site.",
    role: "Design Engineer",
    timeline: "7 months",
    client: "Monolith",
    stack: ["SolidJS", "Postgres", "tRPC", "S3", "Figma"],
    overview: [
      "Content teams and engineers usually pull in opposite directions: editors want freedom, developers want structure. Monolith was designed so both win.",
      "I shaped an editing experience around structured content blocks with true live preview, so writers see exactly what ships. Under the hood, everything is typed and versioned, giving developers a schema they can rely on.",
    ],
    features: [
      "Block-based editor with real-time on-page preview.",
      "Typed content schemas with safe migrations.",
      "Draft, review and scheduled-publish workflow.",
      "Instant media library backed by edge storage.",
    ],
    gallery: [
      { label: "Editor", cap: "Block editor with inline live preview." },
      { label: "Schema", cap: "Typed content models and relations." },
      { label: "Workflow", cap: "Review and scheduled-publish pipeline." },
    ],
    metrics: [
      ["Publish time", "-49%"],
      ["Content errors", "-61%"],
      ["Editor NPS", "+44"],
    ],
  },
];

// ------------------------------ Helpers ----------------------------------

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
  console.log("wrote", path);
}

// Cinematic still placeholder: muted duotone, heavy vignette, film grain,
// grid, crosshair marks, timecode + label. Self-contained SVG.
function svg(project, label, variant) {
  const { c1, c2, title } = project;
  const w = 1600;
  const h = 900;
  const rot = 20 + variant * 34;
  const uid = `${project.id}${variant}`.replace(/[^a-z0-9]/gi, "");
  const tc = `00:0${(variant % 6) + 1}:${String(12 + variant * 7).padStart(2, "0")}:${String((variant * 13) % 24).padStart(2, "0")}`;
  const beams = [];
  for (let i = 0; i < 3; i++) {
    const x = 200 + ((variant * 300 + i * 520) % 1200);
    beams.push(
      `<ellipse cx="${x}" cy="${300 + i * 120}" rx="${420 - i * 60}" ry="${200}" fill="url(#glow${uid})" opacity="${0.5 - i * 0.12}"/>`
    );
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  <defs>
    <linearGradient id="duo${uid}" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${rot} .5 .5)">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="glow${uid}" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${c1}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${c1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig${uid}" cx="50%" cy="46%" r="72%">
      <stop offset="0" stop-color="#000" stop-opacity="0"/>
      <stop offset="0.7" stop-color="#000" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.9"/>
    </radialGradient>
    <pattern id="grid${uid}" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="#0c0c0e"/>
  <rect width="${w}" height="${h}" fill="url(#duo${uid})" opacity="0.42"/>
  <g style="mix-blend-mode:screen">${beams.join("")}</g>
  <rect width="${w}" height="${h}" fill="url(#grid${uid})"/>
  <rect width="${w}" height="${h}" fill="url(#vig${uid})"/>
  <g stroke="#e7e7e2" stroke-opacity="0.5" stroke-width="1.4">
    <path d="M60 46 v28 M46 60 h28"/>
    <path d="M${w - 60} 46 v28 M${w - 74} 60 h28"/>
  </g>
  <text x="60" y="${h - 118}" font-family="'Roboto Mono', monospace" font-size="22" letter-spacing="4" fill="#e7e7e2" opacity="0.7">${title.toUpperCase()}</text>
  <text x="58" y="${h - 52}" font-family="Archivo, Arial, sans-serif" font-size="104" font-weight="800" letter-spacing="-4" fill="#f2f2ee" text-transform="uppercase">${label.toUpperCase()}</text>
  <text x="${w - 60}" y="${h - 52}" text-anchor="end" font-family="'Roboto Mono', monospace" font-size="22" letter-spacing="3" fill="#c9a24e">${tc}</text>
  <text x="${w - 60}" y="82" text-anchor="end" font-family="'Roboto Mono', monospace" font-size="18" letter-spacing="3" fill="#e7e7e2" opacity="0.6">REC ●</text>
</svg>`;
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
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;600;700;800;900&family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet"/>
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23141416'/%3E%3Cg stroke='%23c9a24e' stroke-width='2'%3E%3Cpath d='M16 7v18M7 16h18'/%3E%3C/g%3E%3C/svg%3E"/>
  <link rel="stylesheet" href="{{root}}styles.css"/>
</head>
<body>`;
}

function nav(root) {
  return `  <span class="crosshair tl"></span>
  <span class="crosshair tr"></span>
  <span class="crosshair bl"></span>
  <span class="crosshair br"></span>
  <header class="nav">
    <div class="container">
      <a class="brand" href="${root || "./"}index.html">
        <span class="plus">+</span> Rastko&nbsp;Blagojevic
      </a>
      <nav class="nav-links">
        <a href="${root}index.html#work">Work</a>
        <a href="${root}index.html#about">About</a>
        <a href="${root}index.html#feed">Feed</a>
        <a href="${root}index.html#contact">Contact</a>
      </nav>
      <button class="nav-toggle" aria-label="Menu">&#9776;</button>
    </div>
  </header>`;
}

function footer(root) {
  return `  <footer class="footer">
    <div class="container">
      <span>© <span data-year>2025</span> ${SITE.name}</span>
      <div class="col">
        <a href="mailto:${SITE.email}">Email</a>
        <a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a>
        <a href="#">LinkedIn</a>
        <a href="${root}index.html#work">Work</a>
      </div>
      <span>Design &amp; Engineering · ${SITE.role.split(" & ")[0]}</span>
    </div>
  </footer>
  <script src="${root}script.js"></script>
</body>
</html>`;
}

// ------------------------------ Home page --------------------------------

function projectRow(p, idx) {
  const num = String(idx + 1).padStart(2, "0");
  const discipline = p.category.split(" · ")[1] || p.category;
  return `        <a class="proj-row" href="projects/${p.id}.html" data-img="assets/${p.id}-cover.svg">
          <span class="proj-num">${num}</span>
          <span class="proj-title">${p.title}</span>
          <span class="proj-client">${p.client}<br/>${discipline}</span>
          <span class="proj-year">${p.year}</span>
          <span class="proj-thumb"><img src="assets/${p.id}-cover.svg" alt="${p.title}" loading="lazy"/></span>
        </a>`;
}

function homePage() {
  const rows = projects.map(projectRow).join("\n");
  return `${head(
    `${SITE.name} — ${SITE.role}`,
    `Portfolio of ${SITE.name}, ${SITE.role}. Selected work across fintech, commerce, data and developer tools.`
  ).replace(/{{root}}/g, "./")}
${nav("./")}
  <div class="hover-preview"><img src="assets/${projects[0].id}-cover.svg" alt=""/></div>
  <main>
    <section class="hero">
      <div class="hero-grid"></div>
      <div class="hero-glow"></div>
      <div class="container">
        <div class="hero-top">
          <span class="label">Portfolio — Est. 2018</span>
          <span class="label">${SITE.role}</span>
          <span class="label">Belgrade / Remote</span>
        </div>
        <h1>Design<br/><span class="thin">that feels</span> <em>effortless</em><br/>Built to <em>last.</em></h1>
        <div class="hero-lead">
          <p>I'm ${SITE.name} — a ${SITE.role.toLowerCase()} crafting fast, cinematic, high-craft products from first frame to shipped code.</p>
          <span class="arrow">↓</span>
        </div>
      </div>
    </section>

    <div class="marquee">
      <div class="marquee-track">
        <span>Product Design</span><span class="dot">+</span><span>Design Systems</span><span class="dot">+</span><span>Frontend Engineering</span><span class="dot">+</span><span>Prototyping</span><span class="dot">+</span><span>Brand</span><span class="dot">+</span><span>Motion</span><span class="dot">+</span>
        <span>Product Design</span><span class="dot">+</span><span>Design Systems</span><span class="dot">+</span><span>Frontend Engineering</span><span class="dot">+</span><span>Prototyping</span><span class="dot">+</span><span>Brand</span><span class="dot">+</span><span>Motion</span><span class="dot">+</span>
      </div>
    </div>

    <section class="section" id="work">
      <div class="container">
        <div class="section-head">
          <h2>Selected Work</h2>
          <span class="idx">[ ${String(projects.length).padStart(2, "0")} PROJECTS / 2023—2025 ]</span>
        </div>
        <div class="projects">
${rows}
        </div>
      </div>
    </section>

    <section class="section" id="about">
      <div class="container">
        <div class="section-head">
          <h2>About</h2>
          <span class="idx">[ 001 / STUDIO ]</span>
        </div>
        <div class="about-grid">
          <p class="lead reveal">For eight years I've worked at the seam between <em>design</em> and <em>engineering</em> — the place where good ideas usually break down — and made it the place they come together.</p>
          <div class="about-body reveal">
            <p>My work spans fintech, commerce, data and developer tooling, but the through-line is constant: reduce noise, respect attention, and sweat the details that make software feel trustworthy and alive.</p>
            <p>I design in Figma, build in React, and I'm happiest owning a feature end to end — from the first rough frame to the last shipped pixel.</p>
            <div class="capabilities">
              <div class="cap-row"><span>Product Design</span><span>Expert</span></div>
              <div class="cap-row"><span>Design Systems</span><span>Expert</span></div>
              <div class="cap-row"><span>Frontend / React</span><span>Advanced</span></div>
              <div class="cap-row"><span>Prototyping &amp; Motion</span><span>Advanced</span></div>
              <div class="cap-row"><span>User Research</span><span>Proficient</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta" id="contact">
      <div class="container">
        <span class="label">Let's build something</span>
        <h2>Have a project<br/>worth doing right?<br/><a href="mailto:${SITE.email}">Get in touch ↗</a></h2>
        <p>I take on a small number of projects at a time so each gets real focus.</p>
      </div>
    </section>
  </main>
${footer("./")}`;
}

// ----------------------------- Project page ------------------------------

function projectPage(p, idx) {
  const next = projects[(idx + 1) % projects.length];
  const metaHtml = `
          <div class="meta-item"><div class="k">Client</div><div class="v">${p.client}</div></div>
          <div class="meta-item"><div class="k">Role</div><div class="v">${p.role}</div></div>
          <div class="meta-item"><div class="k">Timeline</div><div class="v">${p.timeline}</div></div>
          <div class="meta-item"><div class="k">Year</div><div class="v">${p.year}</div></div>`;
  const features = p.features.map((f) => `              <li>${f}</li>`).join("\n");
  const stat = p.metrics
    .map(
      (m) =>
        `          <div class="stat"><div class="n">${m[1]}</div><div class="l">${m[0]}</div></div>`
    )
    .join("\n");
  const stackLine = p.stack.join("  ·  ");
  const gallery = p.gallery
    .map(
      (g, i) =>
        `          <figure class="reveal">
            <img src="../assets/${p.id}-${i + 1}.svg" alt="${p.title} — ${g.label}" loading="lazy"/>
            <figcaption><span class="idx">0${i + 1}</span>${g.cap}</figcaption>
          </figure>`
    )
    .join("\n");

  return `${head(`${p.title} — ${SITE.name}`, p.tagline).replace(/{{root}}/g, "../")}
${nav("../")}
  <main>
    <section class="proj-hero">
      <div class="cover"><img src="../assets/${p.id}-cover.svg" alt="${p.title} cover"/></div>
      <div class="container">
        <a class="back-link" href="../index.html#work">← Index</a>
        <span class="label cat">${p.category}</span>
        <h1>${p.title}</h1>
      </div>
    </section>

    <div class="container">
      <div class="proj-meta">${metaHtml}
      </div>
    </div>

    <section class="proj-body">
      <div class="container">
        <div class="proj-intro">
          <p class="tagline">${p.tagline.replace(/—/g, "<em>—</em>")}</p>
          <div class="prose">
            <h3>Overview</h3>
            ${p.overview.map((o) => `<p>${o}</p>`).join("\n            ")}
            <h3>What I built</h3>
            <ul>
${features}
            </ul>
            <h3>Stack</h3>
            <p>${stackLine}</p>
          </div>
        </div>

        <div class="stat-strip">
${stat}
        </div>
      </div>
    </section>

    <section class="gallery-wrap">
      <div class="container">
        <div class="gallery">
${gallery}
        </div>
      </div>
    </section>

    <section class="next-proj">
      <div class="container">
        <a href="${next.id}.html">
          <div>
            <div class="label k">Next Project ↗</div>
            <h3>${next.title}</h3>
          </div>
          <span class="proj-num">${String(((idx + 1) % projects.length) + 1).padStart(2, "0")}</span>
        </a>
      </div>
    </section>
  </main>
${footer("../")}`;
}

// ------------------------------- Emit ------------------------------------

write("index.html", homePage());

projects.forEach((p, idx) => {
  write(`projects/${p.id}.html`, projectPage(p, idx));
  write(`assets/${p.id}-cover.svg`, svg(p, "Cover", 0));
  p.gallery.forEach((g, i) => {
    write(`assets/${p.id}-${i + 1}.svg`, svg(p, g.label, i + 1));
  });
});

console.log("\nDone. Generated site for", SITE.name);
