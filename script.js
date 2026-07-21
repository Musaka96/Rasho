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
