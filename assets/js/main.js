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

  // Shared scroll-reveal observer, set up by initScrollReveal() and reused by
  // content that is rendered after load (e.g. the team grid) via revealObserve().
  var revealObserver = null;

  document.addEventListener("DOMContentLoaded", function () {
    initStickyHeader();
    initMobileNav();
    initScrollReveal();
    initActiveNav();
    initTeam();
    initPublications();
  });

  // Reveal a dynamically inserted element: observe it if the observer exists,
  // otherwise (reduced motion / no IO support) just show it immediately.
  function revealObserve(el) {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add("is-visible");
  }

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
    // Reduced motion or no IO support: show everything immediately and leave
    // revealObserver null so later content (revealObserve) also shows at once.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    revealObserver = new IntersectionObserver(
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

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
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
     Team — cards rendered from JSON (no personal data hardcoded in HTML)
     --------------------------------------------------------------------------- */
  function initTeam() {
    var grid = document.getElementById("team-grid");
    if (!grid) return;

    function esc(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    // Reused inline SVGs (mirror the markup the static cards used).
    var CAP_PATHS =
      '<path fill="currentColor" d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Z"/>' +
      '<path fill="currentColor" d="M6 13.18v3.32L12 20l6-3.5v-3.32l-6 3.27-6-3.27Z"/>';
    var LINKEDIN_PATH =
      '<path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.83v1.64h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.45c0-1.3-.02-2.97-1.81-2.97-1.81 0-2.09 1.41-2.09 2.87V21H9V9Z"/>';

    function scholarIcon() {
      return '<svg class="team-link__icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">' + CAP_PATHS + "</svg>";
    }
    function linkedinIcon() {
      return '<svg class="team-link__icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">' + LINKEDIN_PATH + "</svg>";
    }

    function uniChip(uni) {
      if (!uni || !uni.name) return "";
      var badge = uni.logo
        ? '<img class="uni-chip__logo" src="' + esc(uni.logo) + '" alt="" width="20" height="20" loading="lazy">'
        : '<svg class="uni-chip__cap" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">' + CAP_PATHS + "</svg>";
      return '<p class="uni-chip">' + badge + '<span class="uni-chip__name">' + esc(uni.name) + "</span></p>";
    }

    function links(member) {
      var l = member.links || {};
      var items = "";
      if (l.scholar) {
        items += '<li><a class="team-link" href="' + esc(l.scholar) + '" target="_blank" rel="noopener" aria-label="' +
          esc(member.name) + ' on Google Scholar">' + scholarIcon() + "</a></li>";
      }
      if (l.linkedin) {
        items += '<li><a class="team-link" href="' + esc(l.linkedin) + '" target="_blank" rel="noopener" aria-label="' +
          esc(member.name) + ' on LinkedIn">' + linkedinIcon() + "</a></li>";
      }
      return items ? '<ul class="team-links">' + items + "</ul>" : "";
    }

    function cardHtml(member) {
      var cls = "card card--team reveal" + (member.pi ? " card--team-pi" : "");
      return (
        '<li class="' + cls + '">' +
          '<div class="card--team__photo">' +
            '<img src="' + esc(member.photo) + '" alt="' + esc(member.name) +
            '" width="160" height="160" loading="lazy">' +
          "</div>" +
          '<h3 class="card--team__name">' + esc(member.name) + "</h3>" +
          '<p class="card--team__role">' + esc(member.role) + "</p>" +
          '<div class="card--team__meta">' +
            '<p class="card--team__bio">' + esc(member.bio) + "</p>" +
            uniChip(member.university) +
            links(member) +
          "</div>" +
        "</li>"
      );
    }

    function fail() {
      grid.innerHTML = '<li class="card card--team reveal is-visible">Team profiles couldn’t be loaded — please refresh.</li>';
      grid.setAttribute("aria-busy", "false");
    }

    if (!window.fetch) { fail(); return; }

    fetch("assets/data/team.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) {
        var members = (data && data.team) || [];
        if (!members.length) { fail(); return; }
        grid.innerHTML = members.map(cardHtml).join("");
        grid.setAttribute("aria-busy", "false");
        // Hook the freshly inserted cards into the scroll-reveal animation.
        grid.querySelectorAll(".reveal").forEach(revealObserve);
      })
      .catch(fail);
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
      var sorted = pubs.slice().sort(sorters[mode] || sorters.cited).slice(0, 7);
      list.innerHTML = sorted.map(function (p) {
        var year = p.year > 0 ? p.year : "";
        var venue = p.venue ? esc(p.venue) + (year ? ", " + year : "") : (year ? String(year) : "");
        // Citation count is shown only in the "most cited" view.
        var cites = (mode === "cited" && p.citations > 0)
          ? ' · <span class="pub-cite__cites">' + p.citations + " citation" + (p.citations === 1 ? "" : "s") + "</span>"
          : "";
        // Highlight RCM members within the author list — the whole name (leading initials/first
        // names + surname), not just the surname. Leading tokens require trailing whitespace, so a
        // match can never reach across the ", " that separates authors.
        var authors = esc(p.authors || "");
        var members = p.members || [];
        if (members.length) {
          authors = authors.replace(
            new RegExp("(?:[A-Z][\\w.'-]*\\s+)*(?:" + members.join("|") + ")\\b", "g"),
            '<strong class="pub-author--rcm">$&</strong>'
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
