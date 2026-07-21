// Rastko Blagojevic — 3D portfolio interactions (blur.com inspired)
(function () {
  var body = document.body;
  var menuBtn = document.querySelector(".menu-btn");
  var overlay = document.querySelector(".menu-overlay");

  // Menu overlay
  function closeMenu() {
    body.classList.remove("menu-open");
    if (overlay) setTimeout(function () { overlay.hidden = true; }, 400);
  }
  if (menuBtn && overlay) {
    menuBtn.addEventListener("click", function () {
      if (body.classList.contains("menu-open")) {
        closeMenu();
      } else {
        overlay.hidden = false;
        requestAnimationFrame(function () { body.classList.add("menu-open"); });
      }
    });
    overlay.addEventListener("click", function (e) {
      if (e.target.tagName === "A" || e.target === overlay) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Scroll-progress bar (cyan, top)
  var bar = document.querySelector(".scroll-progress span");
  // Parallax panels
  var parallax = Array.prototype.slice.call(document.querySelectorAll("[data-parallax] .panel-media img"));

  function onScroll() {
    var st = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (max > 0 ? (st / max) * 100 : 0) + "%";

    var vh = window.innerHeight;
    for (var i = 0; i < parallax.length; i++) {
      var img = parallax[i];
      var rect = img.parentElement.parentElement.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > vh + 100) continue;
      var progress = (rect.top + rect.height / 2 - vh / 2) / vh; // -1..1 ish
      img.style.transform = "translateY(" + (progress * 10).toFixed(2) + "%)";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  // Reveal on scroll
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealables.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("in"); });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

// Lightbox — click any project image to view it fullscreen
(function () {
  var figs = Array.prototype.slice.call(document.querySelectorAll(".gallery figure"));
  if (!figs.length) return;

  var items = figs.map(function (f) {
    var c = f.querySelector("figcaption");
    var cap = "";
    if (c) {
      var cl = c.cloneNode(true);
      var s = cl.querySelector(".idx");
      if (s) s.remove();
      cap = cl.textContent.trim();
    }
    return { img: f.querySelector("img"), cap: cap };
  });

  var box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.innerHTML =
    '<button class="lb-close" aria-label="Close">&#10005;</button>' +
    '<button class="lb-nav lb-prev" aria-label="Previous">&#8249;</button>' +
    '<button class="lb-nav lb-next" aria-label="Next">&#8250;</button>' +
    '<figure class="lb-figure"><img alt=""/><figcaption></figcaption></figure>' +
    '<div class="lb-count"></div>';
  document.body.appendChild(box);

  var lbImg = box.querySelector("img");
  var lbCap = box.querySelector("figcaption");
  var lbCount = box.querySelector(".lb-count");
  var idx = 0;

  function show(i) {
    idx = (i + items.length) % items.length;
    var it = items[idx];
    lbImg.src = it.img.currentSrc || it.img.src;
    lbImg.alt = it.img.alt || "";
    lbCap.textContent = it.cap;
    lbCount.textContent = idx + 1 + " / " + items.length;
  }
  function open(i) {
    show(i);
    box.hidden = false;
    document.body.classList.add("lb-open");
  }
  function close() {
    box.hidden = true;
    document.body.classList.remove("lb-open");
    lbImg.removeAttribute("src");
  }

  figs.forEach(function (f, i) {
    f.style.cursor = "zoom-in";
    f.addEventListener("click", function (e) {
      e.preventDefault();
      open(i);
    });
  });
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", function (e) {
    e.stopPropagation();
    show(idx - 1);
  });
  box.querySelector(".lb-next").addEventListener("click", function (e) {
    e.stopPropagation();
    show(idx + 1);
  });
  box.addEventListener("click", function (e) {
    if (e.target === box || e.target.tagName === "FIGURE") close();
  });
  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(idx - 1);
    else if (e.key === "ArrowRight") show(idx + 1);
  });
})();
