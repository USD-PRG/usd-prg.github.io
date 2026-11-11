/* =========================================================================
   USD Perception & Robotics Group — site behaviour
   ========================================================================= */
(function () {
  "use strict";

  /* ------------------------------------------------------------- icons --- */
  const ICONS = {
    arrow:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.15c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.04 1.77 2.72 1.26 3.38.96.11-.75.41-1.26.74-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.8 1.08.8 2.18v3.23c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.9 9.9h4.16V21H2.9V9.9Zm7.05 0h3.99v1.52h.06a4.38 4.38 0 0 1 3.94-2.16c4.21 0 4.99 2.77 4.99 6.37V21h-4.16v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.59V21h-4.16V9.9Z"/></svg>',
    scholar:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2 1 8l11 6 9-4.9V17h2V8L12 2Zm-7 9.7V17c0 2.2 3.13 4 7 4s7-1.8 7-4v-5.3l-7 3.8-7-3.8Z"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/></svg>',
    globe:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg>',
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>',
    pin:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    chip:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6.5" y="6.5" width="11" height="11" rx="2"/><path d="M10 2.5v3M14 2.5v3M10 18.5v3M14 18.5v3M2.5 10h3M2.5 14h3M18.5 10h3M18.5 14h3"/></svg>',
    cube:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2.5 8.5 4.8v9.4L12 21.5 3.5 16.7V7.3L12 2.5Z"/><path d="m3.7 7.4 8.3 4.7 8.3-4.7M12 21.4V12"/></svg>',
    eye:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3.1"/></svg>',
    bot:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M8.5 13h.01M15.5 13h.01M9.5 16.5h5"/></svg>',
    drone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5.5" cy="5.5" r="2.5"/><circle cx="18.5" cy="5.5" r="2.5"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/><path d="m7.5 7.5 9 9M16.5 7.5l-9 9"/><rect x="10" y="10" width="4" height="4" rx="1"/></svg>',
  };

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const ESC_MAP = {
    "&": "&" + "amp;",
    "<": "&" + "lt;",
    ">": "&" + "gt;",
    "\u0022": "&" + "quot;",
    "\u0027": "&" + "#39;",
  };

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ESC_MAP[c]);

  /* --------------------------------------------------------------- nav --- */
  function initNav() {
    const header = $(".site-header");
    const nav = $(".nav");
    const toggle = $(".nav-toggle");

    const onScroll = () => {
      if (!header) return;
      header.classList.toggle("is-stuck", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      $$(".nav-links a").forEach((a) => {
        a.addEventListener("click", () => {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    // mark the current page
    const path = window.location.pathname.split("/").pop() || "index.html";
    $$(".nav-links a").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;
      if (href === path || (path === "" && href === "index.html")) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ------------------------------------------------------------ reveal --- */
  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    items.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------ payload --- */
  function fillSiteText() {
    $$("[data-site]").forEach((el) => {
      const key = el.getAttribute("data-site");
      if (typeof SITE !== "undefined" && SITE[key] != null) {
        if (el.tagName === "A") el.setAttribute("href", el.getAttribute("href") || SITE[key]);
        else el.textContent = SITE[key];
      }
    });

    $$("[data-email]").forEach((el) => {
      const email = (typeof SITE !== "undefined" && SITE.email) || "";
      if (el.tagName === "A") el.href = "mailto:" + email;
      else el.textContent = email;
    });

    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------------- research --- */
  function researchCard(item, delay) {
    return (
      '<a class="r-card reveal" href="research.html#' + esc(item.id) + '" data-delay="' + delay + '">' +
        '<div class="r-card-media">' +
          '<img src="' + esc(item.image) + '" alt="' + esc(item.title) + ' abstract visualisation" loading="lazy" decoding="async">' +
          '<span class="r-card-num">' + esc(item.number) + '</span>' +
        '</div>' +
        '<div class="r-card-body">' +
          '<h3>' + esc(item.title) + '</h3>' +
          '<p>' + esc(item.short) + '</p>' +
          '<span class="link-arrow">Explore ' + ICONS.arrow + '</span>' +
        '</div>' +
      '</a>'
    );
  }

  function renderResearchGrid() {
    const host = $("#research-grid");
    if (!host || typeof RESEARCH === "undefined") return;
    host.innerHTML = RESEARCH.slice(0, 5)
      .map((item, i) => researchCard(item, (i % 3) + 1))
      .join("");
  }

  function renderThrusts() {
    const host = $("#thrusts");
    if (!host || typeof RESEARCH === "undefined") return;

    host.innerHTML = RESEARCH.map((item) => {
      const bullets = item.bullets
        .map((b) => "<li>" + esc(b) + "</li>")
        .join("");
      const tags = item.tags
        .map((t) => '<span class="tag">' + esc(t) + "</span>")
        .join("");

      return (
        '<section class="thrust reveal" id="' + esc(item.id) + '">' +
          '<div class="thrust-body">' +
            '<p class="thrust-kicker">Thrust ' + esc(item.number) + "</p>" +
            "<h2>" + esc(item.title) + "</h2>" +
            "<p>" + esc(item.body) + "</p>" +
            '<ul class="tick-list">' + bullets + "</ul>" +
            '<div class="pub-tags" style="margin-top:1.35rem">' + tags + "</div>" +
          "</div>" +
          '<div class="thrust-media">' +
            '<img src="' + esc(item.image) + '" alt="' + esc(item.title) + ' visualisation" loading="lazy" decoding="async">' +
          "</div>" +
        "</section>"
      );
    }).join("");
  }

  /* ------------------------------------------------------------- people --- */
  const GROUP_LABELS = {
    faculty: "Faculty",
    postdoc: "Postdoctoral Researchers",
    phd: "Ph.D. Students",
    masters: "Masters Students",
    undergrad: "Undergraduate Researchers",
    alumni: "Alumni",
  };
  const GROUP_ORDER = ["faculty", "postdoc", "phd", "masters", "undergrad", "alumni"];
  const AVATAR_TINTS = [
    "linear-gradient(145deg,#e9c98d,#c9a86a)",
    "linear-gradient(145deg,#8fd3ff,#4fa8dd)",
    "linear-gradient(145deg,#b9aaff,#8272e0)",
    "linear-gradient(145deg,#9df0cd,#5fc4a0)",
    "linear-gradient(145deg,#ffb3a8,#e07f72)",
    "linear-gradient(145deg,#cfe0ff,#8fb2e8)",
  ];

  function initials(name) {
    const parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function personLinks(links) {
    if (!links) return "";
    const out = [];
    if (links.email) {
      out.push('<a class="icon-link" href="mailto:' + esc(links.email) + '" aria-label="Email" title="Email">' + ICONS.mail + "</a>");
    }
    if (links.github) {
      out.push('<a class="icon-link" href="' + esc(links.github) + '" aria-label="GitHub" title="GitHub" target="_blank" rel="noopener">' + ICONS.github + "</a>");
    }
    if (links.scholar) {
      out.push('<a class="icon-link" href="' + esc(links.scholar) + '" aria-label="Google Scholar" title="Google Scholar" target="_blank" rel="noopener">' + ICONS.scholar + "</a>");
    }
    if (links.linkedin) {
      out.push('<a class="icon-link" href="' + esc(links.linkedin) + '" aria-label="LinkedIn" title="LinkedIn" target="_blank" rel="noopener">' + ICONS.linkedin + "</a>");
    }
    if (links.website) {
      out.push('<a class="icon-link" href="' + esc(links.website) + '" aria-label="Website" title="Website" target="_blank" rel="noopener">' + ICONS.globe + "</a>");
    }
    return out.length ? '<div class="person-links">' + out.join("") + "</div>" : "";
  }

  function personCard(p, index, extraClass) {
    const tint = AVATAR_TINTS[index % AVATAR_TINTS.length];
    const avatar = p.avatar
      ? '<img src="' + esc(p.avatar) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async">'
      : esc(initials(p.name));

    return (
      '<article class="person ' + (extraClass || "") + '">' +
        '<div class="avatar" style="background:' + tint + '">' + avatar + "</div>" +
        '<div class="person-body">' +
          "<h3>" + esc(p.name) + "</h3>" +
          '<p class="person-role">' + esc(p.role || "") + "</p>" +
          (p.focus ? '<p class="person-note">' + esc(p.focus) + "</p>" : "") +
          personLinks(p.links) +
        "</div>" +
      "</article>"
    );
  }

  function renderPeople() {
    const host = $("#people-list");
    if (!host) return;

    const people = typeof PEOPLE !== "undefined" ? PEOPLE : [];
    const open = typeof OPEN_ROLES !== "undefined" ? OPEN_ROLES : [];

    if (!people.length && !open.length) {
      host.innerHTML =
        '<div class="empty-state"><strong>Roster coming soon</strong>' +
        "<p>Our founding members are joining for the 2026–27 academic year. In the meantime, we are actively recruiting — see the open positions below.</p></div>";
      return;
    }

    let html = "";
    let counter = 0;

    GROUP_ORDER.forEach((group) => {
      const members = people.filter((p) => (p.group || "phd") === group);
      if (!members.length) return;

      html +=
        '<section class="people-group">' +
          '<div class="people-group-head">' +
            "<h2>" + esc(GROUP_LABELS[group] || group) + "</h2>" +
            "<span>" + members.length + " " + (members.length === 1 ? "member" : "members") + "</span>" +
          "</div>" +
          '<div class="grid grid-3">' +
            members
              .map((p, i) => personCard(p, counter++, p.featured || group === "faculty" ? "person--director" : ""))
              .join("") +
          "</div>" +
        "</section>";
    });

    const ungrouped = people.filter((p) => GROUP_ORDER.indexOf(p.group || "phd") === -1);
    if (ungrouped.length) {
      html +=
        '<section class="people-group">' +
          '<div class="people-group-head"><h2>Affiliates</h2></div>' +
          '<div class="grid grid-3">' +
            ungrouped.map((p, i) => personCard(p, counter++, "")).join("") +
          "</div>" +
        "</section>";
    }

    if (open.length) {
      html +=
        '<section class="people-group">' +
          '<div class="people-group-head">' +
            "<h2>Open Positions</h2>" +
            '<span><a class="link-arrow" href="apply.html">Apply ' + ICONS.arrow + "</a></span>" +
          "</div>" +
          '<div class="grid grid-3">' +
            open
              .map(
                (o) =>
                  '<article class="person person--open">' +
                    '<div class="avatar">+</div>' +
                    '<div class="person-body">' +
                      "<h3>" + esc(o.role) + "</h3>" +
                      '<p class="person-note">' + esc(o.note) + "</p>" +
                      '<div class="person-links"><a class="mini-link" href="apply.html">Apply →</a></div>' +
                    "</div>" +
                  "</article>"
              )
              .join("") +
          "</div>" +
        "</section>";
    }

    host.innerHTML = html;
  }

  /* ------------------------------------------------------------- news --- */
  function renderNews() {
    const host = $("#news-list");
    if (!host || typeof NEWS === "undefined") return;
    if (!NEWS.length) {
      host.innerHTML = '<div class="empty-state"><strong>No announcements yet</strong><p>Check back soon.</p></div>';
      return;
    }
    host.innerHTML = NEWS.map(
      (n) =>
        '<article class="news-item">' +
          '<p class="news-date">' + esc(n.date) + "</p>" +
          "<div><h3>" + esc(n.title) + "</h3>" +
          (n.body ? "<p>" + esc(n.body) + "</p>" : "") +
          "</div>" +
        "</article>"
    ).join("");
  }

  /* ----------------------------------------------------- publications --- */
  function pubHtml(p, index) {
    const authors = (p.authors || [])
      .map((a) => (a.charAt(0) === "*" ? '<span class="me">' + esc(a.slice(1)) + "</span>" : esc(a)))
      .join(", ");

    const links = p.links || {};
    const linkLabels = { pdf: "PDF", arxiv: "arXiv", code: "Code", video: "Video", project: "Project", slides: "Slides" };
    const linkHtml = Object.keys(linkLabels)
      .filter((k) => links[k])
      .map(
        (k) =>
          '<a class="mini-link" href="' + esc(links[k]) + '" target="_blank" rel="noopener">' + linkLabels[k] + "</a>"
      )
      .join("");

    const bib = p.bibtex
      ? '<button class="mini-link" type="button" data-bibtex="' + esc(p.bibtex) + '">BibTeX</button>'
      : "";

    const tags = (p.tags || []).map((t) => '<span class="tag">' + esc(t) + "</span>").join("");

    return (
      '<article class="pub" data-title="' + esc((p.title || "").toLowerCase()) +
        '" data-tags="' + esc((p.tags || []).join("|").toLowerCase()) + '">' +
        '<div class="pub-num">' + String(index + 1).padStart(2, "0") + "</div>" +
        "<div>" +
          "<h3>" + (links.pdf || links.arxiv
            ? '<a href="' + esc(links.pdf || links.arxiv) + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>"
            : esc(p.title)) + "</h3>" +
          '<p class="pub-meta">' + authors +
            (p.venue ? " · <em>" + esc(p.venue) + "</em>" : "") +
            (p.year ? " · " + esc(p.year) : "") +
          "</p>" +
          '<div class="pub-tags">' +
            (p.venueShort ? '<span class="tag tag--venue">' + esc(p.venueShort) + "</span>" : "") +
            tags + linkHtml + bib +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderPublications() {
    const host = $("#pub-list");
    if (!host) return;

    const pubs = typeof PUBLICATIONS !== "undefined" ? PUBLICATIONS : [];
    const chipsHost = $("#pub-chips");
    const search = $("#pub-search");
    const countEl = $("#pub-count");

    if (!pubs.length) {
      if (chipsHost) chipsHost.innerHTML = "";
      host.innerHTML =
        '<div class="empty-state"><strong>Publications coming soon</strong>' +
        "<p>We are a newly founded group — our first papers are in preparation. This page will fill up as work is published.</p>" +
        '<a class="btn btn--ghost btn--sm" href="research.html">See what we work on ' + ICONS.arrow + "</a></div>";
      if (countEl) countEl.textContent = "0 papers";
      if (search) search.closest(".search-field").style.display = "none";
      return;
    }

    const sorted = pubs.slice().sort((a, b) => (b.year || 0) - (a.year || 0));
    let activeTag = "all";

    const draw = () => {
      const q = (search && search.value ? search.value : "").trim().toLowerCase();
      const filtered = sorted.filter((p) => {
        const matchQ =
          !q ||
          (p.title || "").toLowerCase().includes(q) ||
          (p.authors || []).join(" ").toLowerCase().includes(q) ||
          (p.venue || "").toLowerCase().includes(q);
        const matchTag =
          activeTag === "all" ||
          (p.tags || []).some((t) => t.toLowerCase() === activeTag);
        return matchQ && matchTag;
      });

      if (!filtered.length) {
        host.innerHTML = '<div class="empty-state"><strong>No matching papers</strong><p>Try a different search or filter.</p></div>';
      } else {
        let html = "";
        let currentYear = null;
        let i = 0;
        filtered.forEach((p, idx) => {
          if (p.year !== currentYear) {
            currentYear = p.year;
            if (html) html += "";
            html += '<h2 class="pub-year">' + esc(currentYear || "—") + "<small>" +
              filtered.filter((q2) => q2.year === currentYear).length + " papers</small></h2>";
            i = 0;
          }
          html += pubHtml(p, i++);
        });
        host.innerHTML = html;
      }

      if (countEl) {
        countEl.textContent = filtered.length + (filtered.length === 1 ? " paper" : " papers");
      }
    };

    // tag chips
    if (chipsHost) {
      const tags = [];
      sorted.forEach((p) => (p.tags || []).forEach((t) => {
        if (tags.indexOf(t) === -1) tags.push(t);
      }));
      chipsHost.innerHTML =
        '<button class="chip" type="button" aria-pressed="true" data-tag="all">All</button>' +
        tags.map((t) => '<button class="chip" type="button" aria-pressed="false" data-tag="' + esc(t.toLowerCase()) + '">' + esc(t) + "</button>").join("");

      chipsHost.addEventListener("click", (e) => {
        const btn = e.target.closest(".chip");
        if (!btn) return;
        activeTag = btn.getAttribute("data-tag");
        $$(".chip", chipsHost).forEach((c) => c.setAttribute("aria-pressed", String(c === btn)));
        draw();
      });
    }

    if (search) search.addEventListener("input", draw);
    draw();
  }

  /* -------------------------------------------------------------- toast --- */
  function toast(message) {
    let el = $(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
    }
    el.textContent = message;
    requestAnimationFrame(() => el.classList.add("is-visible"));
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("is-visible"), 2600);
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-bibtex]");
    if (!btn) return;
    const text = btn.getAttribute("data-bibtex");
    const done = () => toast("BibTeX copied to clipboard");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => toast("Copy failed — select the text manually"));
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (err) { toast("Copy failed"); }
      document.body.removeChild(ta);
    }
  });

  /* -------------------------------------------------------------- apply --- */
  function initApplyForm() {
    const form = $("#apply-form");
    if (!form) return;

    const status = $("#apply-status");

    const setStatus = (message, isError) => {
      if (!status) return;
      status.textContent = message;
      status.classList.add("is-visible");
      status.classList.toggle("is-error", !!isError);
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus("Please complete the required fields before submitting.", true);
        return;
      }

      const data = new FormData(form);
      const get = (k) => (data.get(k) || "").toString().trim();
      const interests = Array.from(form.querySelectorAll('input[name="interest"]:checked'))
        .map((i) => i.value)
        .join(", ") || "Not specified";

      const lines = [
        "New application — USD Perception & Robotics Group",
        "",
        "Name: " + get("name"),
        "Email: " + get("email"),
        "Affiliation: " + (get("affiliation") || "—"),
        "Department / Major: " + (get("department") || "—"),
        "Position sought: " + (get("position") || "—"),
        "Expected start: " + (get("start") || "—"),
        "Research interests: " + interests,
        "",
        "Links:",
        "  Portfolio: " + (get("portfolio") || "—"),
        "  GitHub: " + (get("github") || "—"),
        "  LinkedIn: " + (get("linkedin") || "—"),
        "",
        "Background:",
        get("background") || "—",
        "",
        "Statement of interest:",
        get("statement") || "—",
      ];

      const subject = "PRG application — " + (get("name") || "New applicant") + " — " + (get("position") || "");
      const body = lines.join("\n");
      const email = (typeof SITE !== "undefined" && SITE.email) || "";

      const mailto = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      const copyPromise =
        navigator.clipboard && navigator.clipboard.writeText
          ? navigator.clipboard.writeText(body).catch(() => {})
          : Promise.resolve();

      copyPromise.then(() => {
        setStatus(
          "Your application is ready. We copied it to your clipboard and opened your email client — just hit send. If nothing opened, email " +
            email + " directly.",
          false
        );
        window.location.href = mailto;
      });

      // Show a confirmation panel with a manual fallback for good measure.
      const preview = $("#apply-preview");
      const previewBody = $("#apply-preview-body");
      if (preview && previewBody) {
        previewBody.textContent = body;
        preview.hidden = false;
      }
    });

    // Pre-select "position" from a ?role= query param (used by People page links)
    const params = new URLSearchParams(window.location.search);
    const role = params.get("role");
    const position = form.querySelector("#position");
    if (role && position) {
      Array.from(position.options).forEach((o) => {
        if (o.value.toLowerCase().indexOf(role.toLowerCase()) !== -1) position.value = o.value;
      });
    }
  }

  /* --------------------------------------------------------------- boot --- */
  function boot() {
    fillSiteText();
    initNav();
    renderResearchGrid();
    renderThrusts();
    renderPeople();
    renderNews();
    renderPublications();
    initApplyForm();
    initReveal();

    $$("[data-icon]").forEach((el) => {
      const key = el.getAttribute("data-icon");
      if (ICONS[key]) el.innerHTML = ICONS[key];
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
