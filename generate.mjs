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

// SVG placeholder art: gradient + soft grid + big label. Self-contained.
function svg(project, label, variant) {
  const { c1, c2, title } = project;
  const w = 1280;
  const h = 800;
  const rot = variant * 47;
  const gid = `g${project.id}${variant}`.replace(/[^a-z0-9]/gi, "");
  const dots = [];
  for (let i = 0; i < 5; i++) {
    const cx = 180 + ((variant * 260 + i * 230) % 1000);
    const cy = 120 + ((variant * 140 + i * 170) % 620);
    const r = 40 + ((i * variant + 3) % 5) * 26;
    dots.push(
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" opacity="${
        0.04 + (i % 3) * 0.02
      }"/>`
    );
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${rot} .5 .5)">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <pattern id="${gid}grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="#0a0a0c"/>
  <rect width="${w}" height="${h}" fill="url(#${gid})" opacity="0.9"/>
  <g style="mix-blend-mode:soft-light">${dots.join("")}</g>
  <rect width="${w}" height="${h}" fill="url(#${gid}grid)"/>
  <rect x="0" y="0" width="${w}" height="${h}" fill="#000" opacity="0.22"/>
  <text x="72" y="${h - 150}" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="600" fill="#ffffff" opacity="0.72">${title}</text>
  <text x="72" y="${h - 70}" font-family="Inter, Arial, sans-serif" font-size="96" font-weight="800" letter-spacing="-3" fill="#ffffff">${label}</text>
  <circle cx="${w - 96}" cy="96" r="14" fill="#ffffff" opacity="0.9"/>
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
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23ff6a00'/%3E%3Ctext x='16' y='23' font-family='Arial' font-size='19' font-weight='bold' text-anchor='middle' fill='%23000'%3ER%3C/text%3E%3C/svg%3E"/>
  <link rel="stylesheet" href="{{root}}styles.css"/>
</head>
<body>`;
}

function nav(root) {
  return `  <header class="nav">
    <div class="container">
      <a class="brand" href="${root || "./"}index.html">
        <span class="mark">R</span> Rastko Blagojevic
      </a>
      <nav class="nav-links">
        <a href="${root}index.html#work">Work</a>
        <a href="${root}index.html#about">About</a>
        <a href="${root}index.html#contact">Contact</a>
        <a class="btn btn-primary" href="mailto:${SITE.email}">Let's talk</a>
      </nav>
      <button class="nav-toggle" aria-label="Menu">&#9776;</button>
    </div>
  </header>`;
}

function footer(root) {
  return `  <footer class="footer" id="contact">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="brand" href="${root}index.html"><span class="mark">R</span> Rastko Blagojevic</a>
          <p>${SITE.role}. Designing and building calm, high-craft product experiences.</p>
        </div>
        <div class="footer-cols">
          <div class="footer-col">
            <h5>Explore</h5>
            <a href="${root}index.html#work">Work</a>
            <a href="${root}index.html#about">About</a>
            <a href="${root}index.html#contact">Contact</a>
          </div>
          <div class="footer-col">
            <h5>Connect</h5>
            <a href="mailto:${SITE.email}">Email</a>
            <a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span data-year>2025</span> ${SITE.name}. All rights reserved.</span>
        <span>Built with care · Deployed on Vercel</span>
      </div>
    </div>
  </footer>
  <script src="${root}script.js"></script>
</body>
</html>`;
}

// ------------------------------ Home page --------------------------------

function homeCard(p) {
  return `        <a class="card reveal" href="projects/${p.id}.html">
          <div class="card-media">
            <img src="assets/${p.id}-cover.svg" alt="${p.title} preview" loading="lazy"/>
            <span class="card-tag">${p.category.split(" · ")[0]}</span>
          </div>
          <div class="card-body">
            <h3>${p.title}</h3>
            <p>${p.tagline}</p>
            <div class="card-foot">
              <span class="card-year">${p.category.split(" · ")[1] || ""} · ${p.year}</span>
              <span class="card-link">View project <span class="arrow">→</span></span>
            </div>
          </div>
        </a>`;
}

function homePage() {
  const cards = projects.map(homeCard).join("\n");
  return `${head(
    `${SITE.name} — ${SITE.role}`,
    `Portfolio of ${SITE.name}, ${SITE.role}. Selected work across fintech, commerce, data and developer tools.`
  ).replace(/{{root}}/g, "./")}
${nav("./")}
  <main>
    <section class="hero">
      <div class="container">
        <span class="hero-badge"><span class="dot"></span> Available for select projects — 2026</span>
        <h1>Design that feels <span class="accent">effortless.</span> Engineering that holds up.</h1>
        <p class="hero-lead">I'm ${SITE.name}, a ${SITE.role.toLowerCase()} crafting fast, considered products — from first sketch to shipped code.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#work">View selected work →</a>
          <a class="btn btn-ghost" href="mailto:${SITE.email}">Get in touch</a>
        </div>
        <div class="hero-stats">
          <div class="stat reveal"><div class="num">8<span class="accent">+</span></div><div class="label">Years of craft</div></div>
          <div class="stat reveal"><div class="num">40<span class="accent">+</span></div><div class="label">Products shipped</div></div>
          <div class="stat reveal"><div class="num">12</div><div class="label">Teams enabled</div></div>
          <div class="stat reveal"><div class="num">4</div><div class="label">Design awards</div></div>
        </div>
      </div>
    </section>

    <div class="marquee">
      <div class="marquee-track">
        <span>Fintech</span><span>·</span><span>Commerce</span><span>·</span><span>Data</span><span>·</span><span>Developer Tools</span><span>·</span><span>Design Systems</span><span>·</span><span>Mobile</span><span>·</span>
        <span>Fintech</span><span>·</span><span>Commerce</span><span>·</span><span>Data</span><span>·</span><span>Developer Tools</span><span>·</span><span>Design Systems</span><span>·</span><span>Mobile</span><span>·</span>
      </div>
    </div>

    <section class="section" id="work">
      <div class="container">
        <div class="section-head reveal">
          <div>
            <span class="eyebrow">Selected work</span>
            <h2>Products, systems &amp; the details<br/>in between.</h2>
          </div>
          <p>A selection of recent work. Each project pairs a clear product story with the craft behind it.</p>
        </div>
        <div class="work-grid">
${cards}
        </div>
      </div>
    </section>

    <section class="section" id="about">
      <div class="container">
        <div class="section-head reveal">
          <div>
            <span class="eyebrow">About</span>
            <h2>I bridge design and code<br/>so nothing gets lost.</h2>
          </div>
        </div>
        <div class="proj-layout">
          <div class="prose reveal">
            <p>For the last eight years I've worked at the seam between design and engineering — the place where good ideas usually break down. I care about the whole path: the research that frames a problem, the interface that solves it, and the code that ships it without compromise.</p>
            <p>My work spans fintech, commerce, data and developer tooling, but the through-line is constant: reduce noise, respect attention, and sweat the details that make software feel trustworthy. I design in Figma, build in React, and I'm happiest owning a feature end to end.</p>
          </div>
          <div class="side-card reveal">
            <h4>Capabilities</h4>
            <div class="side-list">
              <div class="row"><span>Product design</span><span>Expert</span></div>
              <div class="row"><span>Design systems</span><span>Expert</span></div>
              <div class="row"><span>Frontend (React)</span><span>Advanced</span></div>
              <div class="row"><span>Prototyping</span><span>Advanced</span></div>
              <div class="row"><span>User research</span><span>Proficient</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <span class="eyebrow" style="justify-content:center">Let's build</span>
        <h2>Have a product worth doing right?</h2>
        <p>I take on a small number of projects at a time so each gets real focus. If that sounds like what you need, let's talk.</p>
        <a class="btn btn-primary" href="mailto:${SITE.email}">Start a conversation →</a>
      </div>
    </section>
  </main>
${footer("./")}`;
}

// ----------------------------- Project page ------------------------------

function projectPage(p, idx) {
  const next = projects[(idx + 1) % projects.length];
  const metaHtml = `
        <div class="meta-item"><div class="k">Role</div><div class="v">${p.role}</div></div>
        <div class="meta-item"><div class="k">Timeline</div><div class="v">${p.timeline}</div></div>
        <div class="meta-item"><div class="k">Client</div><div class="v">${p.client}</div></div>
        <div class="meta-item"><div class="k">Year</div><div class="v">${p.year}</div></div>`;
  const features = p.features
    .map((f) => `            <li>${f}</li>`)
    .join("\n");
  const stack = p.stack
    .map((s) => `<span class="pill">${s}</span>`)
    .join("\n              ");
  const metrics = p.metrics
    .map(
      (m) =>
        `              <div class="row"><span>${m[0]}</span><span>${m[1]}</span></div>`
    )
    .join("\n");
  const gallery = p.gallery
    .map(
      (g, i) =>
        `          <figure${i === 2 ? ' class="wide"' : ""}>
            <img src="../assets/${p.id}-${i + 1}.svg" alt="${p.title} — ${g.label}" loading="lazy"/>
            <figcaption>${g.cap}</figcaption>
          </figure>`
    )
    .join("\n");

  return `${head(
    `${p.title} — ${SITE.name}`,
    p.tagline
  ).replace(/{{root}}/g, "../")}
${nav("../")}
  <main>
    <section class="proj-hero">
      <div class="container">
        <a class="back-link" href="../index.html#work">← All work</a>
        <span class="eyebrow">${p.category}</span>
        <h1>${p.title}</h1>
        <p class="proj-tagline">${p.tagline}</p>
        <div class="proj-meta">${metaHtml}
        </div>
        <div class="proj-cover reveal">
          <img src="../assets/${p.id}-cover.svg" alt="${p.title} cover"/>
        </div>
      </div>
    </section>

    <section class="proj-body">
      <div class="container">
        <div class="proj-layout">
          <div class="prose">
            <h2>Overview</h2>
            ${p.overview.map((o) => `<p>${o}</p>`).join("\n            ")}
            <h2>What I built</h2>
            <ul>
${features}
            </ul>
          </div>
          <div>
            <div class="side-card reveal">
              <h4>Stack</h4>
              <div class="tag-row">
              ${stack}
              </div>
            </div>
            <div class="side-card reveal">
              <h4>Impact</h4>
              <div class="side-list">
${metrics}
              </div>
            </div>
          </div>
        </div>

        <div class="gallery">
${gallery}
        </div>
      </div>
    </section>

    <section class="next-proj">
      <div class="container">
        <a href="${next.id}.html">
          <div>
            <div class="label">Next project</div>
            <h3>${next.title} →</h3>
          </div>
          <span class="btn btn-ghost">View →</span>
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
