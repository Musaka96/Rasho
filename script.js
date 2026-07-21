// Rastko Blagojevic — portfolio interactions (Blur Studio inspired)
(function () {
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  // Sticky nav background on scroll
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  // Cursor-following hover preview for the project list (desktop)
  var preview = document.querySelector(".hover-preview");
  var previewImg = preview ? preview.querySelector("img") : null;
  var rows = document.querySelectorAll(".proj-row[data-img]");
  var fine = window.matchMedia("(pointer: fine)").matches;

  if (preview && previewImg && rows.length && fine) {
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function loop() {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      preview.style.left = cx + "px";
      preview.style.top = cy + "px";
      raf = requestAnimationFrame(loop);
    }
    rows.forEach(function (row) {
      row.addEventListener("mouseenter", function () {
        previewImg.src = row.getAttribute("data-img");
        preview.classList.add("show");
        if (!raf) loop();
      });
      row.addEventListener("mouseleave", function () {
        preview.classList.remove("show");
      });
    });
    document.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
    });
    document.querySelector(".projects").addEventListener("mouseleave", function () {
      preview.classList.remove("show");
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    });
  }

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
      { threshold: 0.12 }
    );
    revealables.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
