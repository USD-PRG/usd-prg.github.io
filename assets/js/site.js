/* USD Perception & Robotics Group — site behaviour
   Content lives in data.js. This file only renders it and runs the nav. */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var AMP = String.fromCharCode(38), LT = String.fromCharCode(60), GT = String.fromCharCode(62);
  var ESC = { "&": AMP + "amp;", "<": AMP + "lt;", ">": AMP + "gt;", "\"": AMP + "quot;", "'": AMP + "#39;" };
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) { return ESC[c]; });
  }

  var ARROW =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';

  /* ------------------------------------------------------------- nav --- */
  function initNav() {
    var nav = $(".nav");
    var toggle = $(".nav-toggle");
    if (!nav || !toggle) return;

    var links = $(".nav-links", nav);

    function closeMenu() {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    $$(".nav-links a", nav).forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMenu();
        $$(".nav-item", nav).forEach(function (item) {
          item.classList.remove("is-open");
          var btn = $(":scope > button", item);
          if (btn) btn.setAttribute("aria-expanded", "false");
        });
      }
    });

    $$(".nav-item", nav).forEach(function (item) {
      var btn = $(":scope > button", item);
      if (!btn) return;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
      });
    });

    document.addEventListener("click", function () {
      $$(".nav-item", nav).forEach(function (item) {
        item.classList.remove("is-open");
        var btn = $(":scope > button", item);
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    });

    var page = window.location.pathname.split("/").pop() || "index.html";
    $$(".nav-links a", nav).forEach(function (a) {
      if (a.getAttribute("href") !== page) return;
      a.setAttribute("aria-current", "page");
      var item = a.closest(".nav-item");
      if (!item) return;
      var btn = $(":scope > button", item);
      if (btn) btn.setAttribute("aria-current", "page");
    });
  }

  /* --------------------------------------------------------- site text --- */
  function fillSiteText() {
    if (typeof SITE === "undefined") return;
    $$("[data-site]").forEach(function (el) {
      var value = SITE[el.getAttribute("data-site")];
      if (value == null) return;
      if (el.tagName === "A") el.setAttribute("href", value);
      else el.textContent = value;
    });
    $$("[data-email]").forEach(function (el) {
      if (el.tagName === "A") el.setAttribute("href", "mailto:" + SITE.email);
      else el.textContent = SITE.email;
    });
    var year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------- research --- */
  function renderResearchList() {
    var host = $("#research-list");
    if (!host || host.children.length || typeof RESEARCH === "undefined") return;
    host.innerHTML = RESEARCH.map(function (item) {
      return (
        '<a class="row" href="research.html#' + esc(item.id) + '">' +
          "<div>" +
            '<h3 class="row-title">' + esc(item.title) + "</h3>" +
            "<p>" + esc(item.short) + "</p>" +
          "</div>" +
        "</a>"
      );
    }).join("");
  }

  function renderThrusts() {
    var host = $("#thrusts");
    if (!host || host.children.length || typeof RESEARCH === "undefined") return;
    host.innerHTML = RESEARCH.map(function (item) {
      var bullets = item.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("");
      return (
        '<section class="thrust" id="' + esc(item.id) + '">' +
          "<div>" +
            "<h2>" + esc(item.title) + "</h2>" +
            "<p>" + esc(item.body) + "</p>" +
            '<ul class="bullets">' + bullets + "</ul>" +
          "</div>" +
          '<figure class="thrust-image">' +
            '<img src="' + esc(item.image) + '" alt="" loading="lazy" decoding="async">' +
            "<figcaption>" + esc(item.caption || item.title) + "</figcaption>" +
          "</figure>" +
        "</section>"
      );
    }).join("");
  }

  /* ----------------------------------------------------------- people --- */
  var GROUP_LABELS = {
    faculty: "Faculty",
    postdoc: "Postdoctoral researchers",
    phd: "Ph.D. students",
    masters: "Masters students",
    undergrad: "Undergraduate researchers",
    alumni: "Alumni",
  };
  var GROUP_ORDER = ["faculty", "postdoc", "phd", "masters", "undergrad", "alumni"];

  var LINK_LABELS = { email: "Email", github: "GitHub", scholar: "Scholar", linkedin: "LinkedIn", website: "Website" };

  function personLinks(links) {
    if (!links) return "";
    var out = Object.keys(LINK_LABELS)
      .filter(function (key) { return links[key]; })
      .map(function (key) {
        var href = key === "email" ? "mailto:" + links.email : links[key];
        var external = key === "email" ? "" : ' target="_blank" rel="noopener"';
        return '<a href="' + esc(href) + '"' + external + ">" + LINK_LABELS[key] + "</a>";
      });
    return out.length ? '<div class="person-links">' + out.join("") + "</div>" : "";
  }

  function personRow(p) {
    return (
      '<article class="person">' +
        '<div class="person-name">' +
          "<h3>" + esc(p.name) + "</h3>" +
          '<p class="person-role">' + esc(p.role || "") + "</p>" +
        "</div>" +
        '<div class="person-body">' +
          (p.focus ? "<p>" + esc(p.focus) + "</p>" : "") +
          personLinks(p.links) +
        "</div>" +
      "</article>"
    );
  }

  function renderPeople() {
    var host = $("#people-list");
    if (!host || host.children.length) return;

    var people = typeof PEOPLE !== "undefined" ? PEOPLE : [];
    var open = typeof OPEN_ROLES !== "undefined" ? OPEN_ROLES : [];

    if (!people.length && !open.length) {
      host.innerHTML = '<div class="empty"><strong>Roster coming soon</strong><p>Our founding members join for the 2026&ndash;27 academic year.</p></div>';
      return;
    }

    var html = "";

    GROUP_ORDER.forEach(function (group) {
      var members = people.filter(function (p) { return (p.group || "faculty") === group; });
      if (!members.length) return;
      html +=
        '<section class="people-group">' +
          '<div class="people-group-head">' +
            "<h2>" + esc(GROUP_LABELS[group] || group) + "</h2>" +
            "<span>" + members.length + " " + (members.length === 1 ? "person" : "people") + "</span>" +
          "</div>" +
          members.map(personRow).join("") +
        "</section>";
    });

    if (open.length) {
      html +=
        '<section class="people-group">' +
          '<div class="people-group-head">' +
            "<h2>Open positions</h2>" +
            '<span><a class="text-link" href="openings.html">View openings</a></span>' +
          "</div>" +
          open.map(function (o) {
            return (
              '<article class="person">' +
                '<div class="person-name"><h3>' + esc(o.role) + "</h3></div>" +
                '<div class="person-body">' +
                  "<p>" + esc(o.note) + "</p>" +
                  '<div class="person-links"><a href="apply.html">Apply</a></div>' +
                "</div>" +
              "</article>"
            );
          }).join("") +
        "</section>";
    }

    host.innerHTML = html;
  }

  /* ------------------------------------------------------------- news --- */
  function renderNews() {
    var host = $("#news-list");
    if (!host || host.children.length || typeof NEWS === "undefined") return;
    if (!NEWS.length) {
      host.innerHTML = '<div class="empty"><strong>No announcements yet</strong><p>Check back soon.</p></div>';
      return;
    }
    host.innerHTML = NEWS.map(function (n) {
      return (
        '<article class="news-item">' +
          '<p class="news-date">' + esc(n.date) + "</p>" +
          "<div><h3>" + esc(n.title) + "</h3>" +
            (n.body ? "<p>" + esc(n.body) + "</p>" : "") +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ----------------------------------------------------- publications --- */
  var LINK_ORDER = ["pdf", "arxiv", "code", "project", "video", "slides"];
  var LINK_LABELS_PUB = { pdf: "PDF", arxiv: "arXiv", code: "Code", project: "Project", video: "Video", slides: "Slides" };

  function pubHtml(p, index) {
    var authors = (p.authors || []).map(function (a) {
      return a.charAt(0) === "*" ? '<span class="me">' + esc(a.slice(1)) + "</span>" : esc(a);
    }).join(", ");
    var links = p.links || {};
    var linkHtml = LINK_ORDER
      .filter(function (k) { return links[k]; })
      .map(function (k) {
        return '<a href="' + esc(links[k]) + '" target="_blank" rel="noopener">' + LINK_LABELS_PUB[k] + "</a>";
      }).join("");
    var bib = p.bibtex
      ? '<button type="button" data-bibtex="' + esc(p.bibtex) + '">BibTeX</button>'
      : "";
    var title = links.pdf || links.arxiv
      ? '<a href="' + esc(links.pdf || links.arxiv) + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>"
      : esc(p.title);

    return (
      '<article class="pub" data-title="' + esc((p.title || "").toLowerCase()) +
        '" data-tags="' + esc((p.tags || []).join("|").toLowerCase()) + '">' +
        "<h3>" + title + "</h3>" +
        '<p class="pub-meta">' + authors +
          (p.venue ? " &middot; <em>" + esc(p.venue) + "</em>" : "") +
          (p.year ? " &middot; " + esc(p.year) : "") +
        "</p>" +
        (linkHtml || bib ? '<div class="pub-links">' + linkHtml + bib + "</div>" : "") +
      "</article>"
    );
  }

  function renderPublications() {
    var host = $("#pub-list");
    if (!host) return;
    var pubs = typeof PUBLICATIONS !== "undefined" ? PUBLICATIONS : [];
    var chipsHost = $("#pub-chips");
    var search = $("#pub-search");
    var countEl = $("#pub-count");

    if (!pubs.length) {
      var toolbar = $("#pub-toolbar");
      if (toolbar) toolbar.hidden = true;
      return;
    }

    var sorted = pubs.slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
    var activeTag = "all";

    function draw() {
      var q = (search && search.value ? search.value : "").trim().toLowerCase();
      var filtered = sorted.filter(function (p) {
        var matchText = !q ||
          (p.title || "").toLowerCase().indexOf(q) !== -1 ||
          (p.authors || []).join(" ").toLowerCase().indexOf(q) !== -1 ||
          (p.venue || "").toLowerCase().indexOf(q) !== -1;
        var matchTag = activeTag === "all" || (p.tags || []).some(function (t) {
          return t.toLowerCase() === activeTag;
        });
        return matchText && matchTag;
      });

      if (!filtered.length) {
        host.innerHTML = '<div class="empty"><strong>No matching papers</strong><p>Try a different search or filter.</p></div>';
      } else {
        var html = "";
        var currentYear = null;
        var perYear = 0;
        filtered.forEach(function (p) {
          if (p.year !== currentYear) {
            currentYear = p.year;
            perYear = filtered.filter(function (x) { return x.year === currentYear; }).length;
            html += '<h2 class="pub-year">' + esc(currentYear || "Unpublished") +
              "</h2>";
          }
          html += pubHtml(p);
        });
        host.innerHTML = html;
      }

      if (countEl) countEl.textContent = filtered.length + (filtered.length === 1 ? " paper" : " papers");
    }

    if (chipsHost && !chipsHost.children.length) {
      var tags = [];
      sorted.forEach(function (p) {
        (p.tags || []).forEach(function (t) {
          if (tags.indexOf(t) === -1) tags.push(t);
        });
      });
      chipsHost.innerHTML =
        '<button class="chip" type="button" aria-pressed="true" data-tag="all">All</button>' +
        tags.map(function (t) {
          return '<button class="chip" type="button" aria-pressed="false" data-tag="' +
            esc(t.toLowerCase()) + '">' + esc(t) + "</button>";
        }).join("");
    }

    if (chipsHost) {
      chipsHost.addEventListener("click", function (e) {
        var btn = e.target.closest(".chip");
        if (!btn) return;
        activeTag = btn.getAttribute("data-tag");
        $$(".chip", chipsHost).forEach(function (c) {
          c.setAttribute("aria-pressed", String(c === btn));
        });
        draw();
      });
    }

    if (search) search.addEventListener("input", draw);
    if (countEl && !countEl.textContent.trim()) draw();
  }

  /* ------------------------------------------------------------- tools --- */
  var KIND_LABELS = { software: "Software", tutorial: "Tutorial", dataset: "Dataset", course: "Course" };

  function renderTools() {
    var host = $("#tools-list");
    if (!host || host.children.length || typeof TOOLS === "undefined") return;
    if (!TOOLS.length) {
      host.innerHTML = '<div class="empty"><strong>Nothing released yet</strong><p>Code, tutorials, and datasets appear here as we publish them.</p></div>';
      return;
    }
    host.innerHTML = TOOLS.map(function (t) {
      var links = t.links || {};
      var linkHtml = ["github", "project", "pdf"]
        .filter(function (k) { return links[k]; })
        .map(function (k) {
          return '<a href="' + esc(links[k]) + '" target="_blank" rel="noopener">' +
            (k === "pdf" ? "PDF" : k.charAt(0).toUpperCase() + k.slice(1)) + "</a>";
        }).join("");
      return (
        '<article class="entry">' +
          '<p class="kind">' + esc(KIND_LABELS[t.kind] || "Resource") + "</p>" +
          "<h3>" + esc(t.title) + "</h3>" +
          "<p>" + esc(t.desc) + "</p>" +
          (linkHtml ? '<div class="entry-links">' + linkHtml + "</div>" : "") +
        "</article>"
      );
    }).join("");
  }

  /* -------------------------------------------------------- facilities --- */
  function renderFacilities() {
    var host = $("#facilities-list");
    if (!host || host.children.length || typeof FACILITIES === "undefined") return;
    host.innerHTML = FACILITIES.map(function (f) {
      return (
        '<article class="row">' +
          "<div><h3 class=\"row-title\">" + esc(f.title) + "</h3>" +
          "<p>" + esc(f.desc) + "</p></div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------------------------------------------------------- teaching --- */
  function renderCourses() {
    var host = $("#courses-list");
    if (!host || host.children.length || typeof COURSES === "undefined") return;
    if (!COURSES.length) {
      host.innerHTML = '<div class="empty"><strong>Courses coming soon</strong><p>Teaching assignments for the group will be listed here.</p></div>';
      return;
    }
    host.innerHTML = COURSES.map(function (c) {
      return (
        '<article class="course">' +
          '<p class="course-code">' + esc(c.code) + (c.term ? "<span>" + esc(c.term) + "</span>" : "") + "</p>" +
          "<div><h3>" + esc(c.title) + "</h3><p>" + esc(c.body) + "</p></div>" +
        "</article>"
      );
    }).join("");
  }

  /* ------------------------------------------------------------- media --- */
  function renderMedia() {
    var host = $("#media-list");
    if (!host || host.children.length || typeof MEDIA === "undefined") return;
    if (!MEDIA.length) {
      host.innerHTML = '<div class="empty"><strong>No coverage yet</strong><p>Press mentions and features will appear here.</p></div>';
      return;
    }
    host.innerHTML = MEDIA.map(function (m) {
      var inner =
        '<p class="kind">' + esc(m.outlet) + (m.date ? " &middot; " + esc(m.date) : "") + "</p>" +
        "<h3>" + esc(m.title) + "</h3>";
      var hasLink = m.url && m.url !== "#";
      if (!hasLink) return '<article class="entry">' + inner + "</article>";
      return '<a class="entry" href="' + esc(m.url) + '" target="_blank" rel="noopener">' + inner + "</a>";
    }).join("");
  }

  /* ---------------------------------------------------------- openings --- */
  function renderOpenings() {
    var host = $("#openings-list");
    if (!host || host.children.length || typeof OPENINGS === "undefined") return;
    if (!OPENINGS.length) {
      host.innerHTML = '<div class="empty"><strong>No open positions</strong><p>Check back soon.</p></div>';
      return;
    }
    host.innerHTML = OPENINGS.map(function (o) {
      return (
        '<article class="entry">' +
          '<p class="kind">' + esc(o.type) + "</p>" +
          "<h3>" + esc(o.title) + "</h3>" +
          "<p>" + esc(o.body) + "</p>" +
          (o.apply ? '<div class="entry-links"><a href="' + esc(o.apply) + '">Apply</a></div>' : "") +
        "</article>"
      );
    }).join("");
  }

  /* ----------------------------------------------------------- seminar --- */
  function renderSeminars() {
    var host = $("#seminar-list");
    if (!host || host.children.length || typeof SEMINARS === "undefined") return;
    if (!SEMINARS.length) {
      host.innerHTML = '<div class="empty"><strong>Schedule coming soon</strong><p>The PRG Seminar will be announced here.</p></div>';
      return;
    }
    host.innerHTML = SEMINARS.map(function (s) {
      var affiliation = s.affiliation && s.affiliation !== "\u2014" ? ", " + esc(s.affiliation) : "";
      return (
        '<article class="sem">' +
          '<p class="sem-date">' + esc(s.date) + "</p>" +
          "<div><h3>" + esc(s.title) + "</h3>" +
            '<p class="speaker">' + esc(s.speaker) + affiliation + "</p>" +
            (s.abstract ? "<p>" + esc(s.abstract) + "</p>" : "") +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ------------------------------------------------------------- toast --- */
  function toast(message) {
    var el = $(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
    }
    el.textContent = message;
    requestAnimationFrame(function () { el.classList.add("is-visible"); });
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove("is-visible"); }, 2600);
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-bibtex]");
    if (!btn) return;
    var text = btn.getAttribute("data-bibtex");
    var done = function () { toast("BibTeX copied"); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { toast("Copy failed"); });
      return;
    }
    var ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (err) { toast("Copy failed"); }
    document.body.removeChild(ta);
  });

  /* -------------------------------------------------------------- form --- */
  function initApplyForm() {
    var form = $("#apply-form");
    if (!form) return;

    var status = $("#apply-status");
    function setStatus(message, isError) {
      if (!status) return;
      status.textContent = message;
      status.classList.add("is-visible");
      status.classList.toggle("is-error", !!isError);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus("Please complete the required fields before submitting.", true);
        return;
      }

      var data = new FormData(form);
      var get = function (k) { return (data.get(k) || "").toString().trim(); };
      var interests = Array.prototype.slice
        .call(form.querySelectorAll('input[name="interest"]:checked'))
        .map(function (i) { return i.value; })
        .join(", ") || "Not specified";

      var lines = [
        "Application — USD Perception & Robotics Group",
        "",
        "Name: " + get("name"),
        "Email: " + get("email"),
        "Affiliation: " + (get("affiliation") || "—"),
        "Department / major: " + (get("department") || "—"),
        "Position sought: " + (get("position") || "—"),
        "Earliest start: " + (get("start") || "—"),
        "Research interests: " + interests,
        "",
        "Links",
        "  Portfolio: " + (get("portfolio") || "—"),
        "  GitHub: " + (get("github") || "—"),
        "  LinkedIn: " + (get("linkedin") || "—") + "\n" +
        "  X: " + (get("x") || "—"),
        "",
        "Background",
        get("background") || "—",
        "",
        "Why this group",
        get("statement") || "—",
      ];

      var email = (typeof SITE !== "undefined" && SITE.email) || "";
      var subject = "PRG application — " + (get("name") || "New applicant") + " — " + (get("position") || "");
      var body = lines.join("\n");
      var mailto = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      var copy = navigator.clipboard && navigator.clipboard.writeText
        ? navigator.clipboard.writeText(body).catch(function () {})
        : Promise.resolve();

      copy.then(function () {
        setStatus("Your application is ready and copied to your clipboard. Your email client should open — send it from there, or write to " + email + " directly.", false);
        window.location.href = mailto;
      });

      var preview = $("#apply-preview");
      var previewBody = $("#apply-preview-body");
      if (preview && previewBody) {
        previewBody.textContent = body;
        preview.hidden = false;
      }
    });

    var params = new URLSearchParams(window.location.search);
    var role = params.get("role");
    var position = form.querySelector("#position");
    if (role && position) {
      Array.prototype.slice.call(position.options).forEach(function (o) {
        if (o.value.toLowerCase().indexOf(role.toLowerCase()) !== -1) position.value = o.value;
      });
    }
  }

  /* ------------------------------------------------------------- boot --- */
  function boot() {
    fillSiteText();
    initNav();
    renderResearchList();
    renderThrusts();
    renderPeople();
    renderNews();
    renderPublications();
    renderTools();
    renderFacilities();
    renderCourses();
    renderMedia();
    renderOpenings();
    renderSeminars();
    initApplyForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
