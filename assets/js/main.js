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
    initPublications();
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

  /* ---------------------------------------------------------------------------
     Publications — loaded from JSON, sortable (most cited / most recent)
     --------------------------------------------------------------------------- */
  function initPublications() {
    var list = document.getElementById("pub-list");
    if (!list) return;
    var countEl = document.getElementById("pub-count");
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-pub-sort]"));

    function esc(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    var pubs = [];
    var sorters = {
      cited: function (a, b) { return (b.citations - a.citations) || (b.year - a.year) || a.title.localeCompare(b.title); },
      recent: function (a, b) { return (b.year - a.year) || (b.citations - a.citations) || a.title.localeCompare(b.title); }
    };

    function render(mode) {
      var sorted = pubs.slice().sort(sorters[mode] || sorters.cited).slice(0, 10);
      list.innerHTML = sorted.map(function (p) {
        var year = p.year > 0 ? p.year : "";
        var venue = p.venue ? esc(p.venue) + (year ? ", " + year : "") : (year ? String(year) : "");
        // Citation count is shown only in the "most cited" view.
        var cites = (mode === "cited" && p.citations > 0)
          ? ' · <span class="pub-cite__cites">' + p.citations + " citation" + (p.citations === 1 ? "" : "s") + "</span>"
          : "";
        // Highlight RCM members within the author list.
        var authors = esc(p.authors || "");
        var members = p.members || [];
        if (members.length) {
          authors = authors.replace(
            new RegExp("\\b(" + members.join("|") + ")\\b", "g"),
            '<strong class="pub-author--rcm">$1</strong>'
          );
        }
        var title = p.url
          ? '<a class="pub-cite__title" href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>"
          : '<span class="pub-cite__title">' + esc(p.title) + "</span>";
        var meta = authors + (venue ? " — " + venue : "") + cites;
        return '<li class="pub-cite">' + title + '<p class="pub-cite__meta">' + meta + "</p></li>";
      }).join("");
      list.setAttribute("aria-busy", "false");
    }

    function activate(mode) {
      buttons.forEach(function (b) {
        var on = b.getAttribute("data-pub-sort") === mode;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      render(mode);
    }

    buttons.forEach(function (b) {
      b.addEventListener("click", function () { activate(b.getAttribute("data-pub-sort")); });
    });

    if (!window.fetch) {
      list.innerHTML =
        '<li class="pub-cite pub-cite--loading">Publications require a modern browser — see each member’s Google Scholar profile, linked on their team card.</li>';
      return;
    }

    fetch("assets/data/publications.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) {
        pubs = (data && data.publications) || [];
        if (countEl) countEl.textContent = pubs.length;
        if (!pubs.length) {
          list.innerHTML = '<li class="pub-cite pub-cite--loading">No publications found.</li>';
          return;
        }
        activate("cited");
      })
      .catch(function () {
        list.innerHTML =
          '<li class="pub-cite pub-cite--loading">Publications couldn’t be loaded — see each member’s Google Scholar profile, linked on their team card.</li>';
        list.setAttribute("aria-busy", "false");
      });
  }
})();
