/* =============================================================================
   GATE RCM — main.js
   Vanilla JS, no dependencies.
   - Sticky-header shadow on scroll (.is-scrolled)
   - Mobile nav toggle (aria-expanded, click-outside, Esc, link-close)
   - Scroll reveal via IntersectionObserver (guarded by reduced-motion)
   - Active-section nav highlighting (aria-current)
   ========================================================================== */
(function () {
  "use strict";

  // Mark JS as available so CSS can opt into reveal animations only when JS runs.
  document.documentElement.classList.add("js");

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    initStickyHeader();
    initMobileNav();
    initScrollReveal();
    initActiveNav();
  });

  /* ---------------------------------------------------------------------------
     Sticky header shadow
     --------------------------------------------------------------------------- */
  function initStickyHeader() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    var ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------------
     Mobile nav
     --------------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("primaryNav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close when a nav link is chosen.
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    // Close on Escape.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close when clicking outside the header.
    document.addEventListener("click", function (e) {
      if (
        toggle.getAttribute("aria-expanded") === "true" &&
        !e.target.closest(".site-header")
      ) {
        setOpen(false);
      }
    });

    // Reset state if resized up to desktop while open.
    var desktop = window.matchMedia("(min-width: 900px)");
    var onChange = function () {
      if (desktop.matches) setOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* ---------------------------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------------------------- */
  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    // Reduced motion or no IO support: show everything immediately.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------------------------
     Active-section nav highlighting
     --------------------------------------------------------------------------- */
  function initActiveNav() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav a[href^="#"]')
    );
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = id && document.getElementById(id);
      if (section) {
        map[id] = link;
        sections.push(section);
      }
    });
    if (!sections.length) return;

    function setCurrent(id) {
      links.forEach(function (link) {
        if (map[id] === link) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        // Pick the entry nearest the top that is intersecting.
        var visible = entries
          .filter(function (e) { return e.isIntersecting; })
          .sort(function (a, b) {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });
        if (visible.length) {
          setCurrent(visible[0].target.id);
        }
      },
      // Trigger band near the top of the viewport, under the sticky header.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
