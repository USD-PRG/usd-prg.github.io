import pathlib

PAGES = {
    "index.html": ("Perception &amp; Robotics Group — University of San Diego", "../index.html"),
}

HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#fdfdfc">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<link rel="icon" type="image/png" href="assets/img/favicon-dark.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
"""

HEADER = """
<header class="site-header">
  <div class="container">
    <nav class="nav-bar" aria-label="Primary">
      <a class="brand" href="index.html">
        <b>Perception &amp; Robotics</b>
        <span>University of San Diego</span>
      </a>
      <div class="nav">
        <div class="nav-links">
          <a href="news.html">News</a>
          <div class="nav-item">
            <button type="button" aria-expanded="false">Research
              <svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="dropdown">
              <a href="research.html">Current research</a>
              <a href="software.html">Software &amp; datasets</a>
              <a href="publications.html">Publications</a>
              <a href="facilities.html">Facilities</a>
            </div>
          </div>
          <a href="people.html">People</a>
          <a href="teaching.html">Teaching</a>
          <a href="media.html">Media</a>
          <a href="openings.html">Openings</a>
          <a href="seminar.html">Seminar</a>
        </div>
        <a class="btn nav-cta" href="apply.html">Apply</a>
        <button class="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false"><span></span></button>
      </div>
    </nav>
  </div>
</header>
"""

FOOTER = """
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="index.html">
          <b>Perception &amp; Robotics</b>
          <span>University of San Diego</span>
        </a>
        <p>A research group in the Department of Computer Science studying perception, estimation, and autonomy for robots that leave the lab.</p>
      </div>
      <div class="footer-col">
        <h2>Group</h2>
        <a href="research.html">Research</a>
        <a href="people.html">People</a>
        <a href="publications.html">Publications</a>
        <a href="software.html">Software &amp; datasets</a>
        <a href="seminar.html">Seminar</a>
      </div>
      <div class="footer-col">
        <h2>Study</h2>
        <a href="teaching.html">Teaching</a>
        <a href="openings.html">Openings</a>
        <a href="apply.html">Apply</a>
        <a href="facilities.html">Facilities</a>
      </div>
      <div class="footer-col">
        <h2>Contact</h2>
        <a href="mailto:prg@sandiego.edu" data-email>prg@sandiego.edu</a>
        <a href="https://github.com/USD-PRG" target="_blank" rel="noopener">GitHub</a>
        <a href="https://x.com/USDprg" target="_blank" rel="noopener">X</a>
        <a href="https://www.linkedin.com/company/usd-prg" target="_blank" rel="noopener">LinkedIn</a>
        <address>5998 Alcalá Park<br>San Diego, CA 92110</address>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span id="year">2026</span> Perception &amp; Robotics Group, University of San Diego</span>
      <span><a href="https://github.com/USD-PRG/usd-prg.github.io" target="_blank" rel="noopener">Source</a></span>
    </div>
  </div>
</footer>

<script src="assets/js/data.js"></script>
<script src="assets/js/site.js"></script>
</body>
</html>
"""

# ---------------------------------------------------------------- pages ---
BODIES = {}

BODIES["index.html"] = """
<main id="main">

  <section class="hero">
    <div class="container">
      <h1>Perception and robotics at the University of San Diego</h1>
      <p class="lede">
        We are a research group in the Department of Computer Science. We build perception and
        estimation systems for robots that operate outdoors, then test them on real hardware.
      </p>
      <div class="actions">
        <a class="btn btn--solid" href="research.html">Research</a>
        <a class="text-link" href="openings.html">Open positions</a>
      </div>
      <div class="meta-line">
        <span>Founded <b>2026</b></span>
        <span>Department of <b>Computer Science</b></span>
        <span><b>San Diego</b>, California</span>
      </div>
      <figure class="hero-figure">
        <img src="assets/img/hero-field.jpg" alt="Sparse map and estimated trajectory from a GPS-degraded run" width="1600" height="1000">
        <figcaption>Sparse mapping and estimated trajectory, GPS-degraded field run.</figcaption>
      </figure>
    </div>
  </section>

  <section class="block rule-top" id="about">
    <div class="container">
      <div class="split">
        <div>
          <h2>What we work on</h2>
        </div>
        <div>
          <p class="lede">
            An autonomous system is limited by its estimate of the world. Our projects combine
            sensor fusion, mapping, and learned perception, and each one ends in a field
            deployment rather than a simulation result.
          </p>
          <div class="rows stack-md">
            <div class="row">
              <div><h3 class="row-title">Hardware</h3><p>Every project has a physical platform and a field protocol.</p></div>
            </div>
            <div class="row">
              <div><h3 class="row-title">Open releases</h3><p>Code, datasets, and calibration routines are published where we can.</p></div>
            </div>
            <div class="row">
              <div><h3 class="row-title">Student ownership</h3><p>Undergraduates and graduate researchers own real subsystems.</p></div>
            </div>
          </div>
          <p class="stack-md"><a class="text-link" href="people.html">People in the group</a></p>
        </div>
      </div>
    </div>
  </section>

  <section class="block rule-top" id="research">
    <div class="container">
      <div class="section-head">
        <h2>Research programs</h2>
        <p>Each program has its own platforms, students, and field sites. They share mathematics, code, and lab space.</p>
      </div>
      <div id="research-list"></div>
    </div>
  </section>

  <section class="block rule-top" id="news">
    <div class="container">
      <div class="split">
        <div>
          <h2>Recent news</h2>
          <p class="stack-sm"><a class="text-link" href="news.html">All announcements</a></p>
        </div>
        <div id="news-list"></div>
      </div>
    </div>
  </section>

  <section class="block rule-top" id="join">
    <div class="container">
      <div class="split">
        <div>
          <h2>Open positions</h2>
        </div>
        <div>
          <p class="lede">
            We are recruiting graduate and undergraduate researchers for Spring 2027. We look
            for people who have finished something, can work through the mathematics, and can
            explain what they built.
          </p>
          <div class="actions">
            <a class="btn btn--solid" href="apply.html">Apply to the group</a>
            <a class="text-link" href="openings.html">Open roles</a>
          </div>
        </div>
      </div>
    </div>
  </section>

</main>
"""

BODIES["research.html"] = """
<main id="main">

  <section class="page-header">
    <div class="container">
      <h1>Research programs</h1>
      <p class="lede">
        Five long-horizon programs, each with its own platforms, students, and field sites.
        All of them address the same problem: estimating the state of the world well enough
        to act on it.
      </p>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div id="thrusts"></div>
    </div>
  </section>

  <section class="block rule-top">
    <div class="container">
      <div class="section-head">
        <h2>Methods</h2>
      </div>
      <div class="cols" id="methods-list">
        <div class="row"><div><h3 class="row-title">Probabilistic estimation</h3><p>Factor graphs, Kalman and particle filters, robust cost functions, consistency analysis.</p></div></div>
        <div class="row"><div><h3 class="row-title">3D vision</h3><p>Multi-view geometry, structure from motion, dense depth, learned correspondence.</p></div></div>
        <div class="row"><div><h3 class="row-title">Learning for robots</h3><p>Self-supervised representations, sim-to-real transfer, inference under power and latency budgets.</p></div></div>
        <div class="row"><div><h3 class="row-title">Hardware and fieldcraft</h3><p>Calibration, time synchronization, mechanical integration, and field protocol.</p></div></div>
      </div>
    </div>
  </section>

  <section class="block rule-top">
    <div class="container">
      <div class="split">
        <div>
          <h2>Collaboration</h2>
        </div>
        <div>
          <p class="lede">
            We work with labs, agencies, and companies on problems where the sensor is limited
            and the environment is unstructured. Write to us with a short description of the
            problem and the data you have.
          </p>
          <div class="actions">
            <a class="btn btn--solid" href="mailto:prg@sandiego.edu">Write to us</a>
            <a class="text-link" href="people.html">People</a>
          </div>
        </div>
      </div>
    </div>
  </section>

</main>
"""

BODIES["people.html"] = """
<main id="main">

  <section class="page-header">
    <div class="container">
      <h1>People</h1>
      <p class="lede">
        Faculty, graduate researchers, and undergraduates in the group. Open positions are
        listed below the roster.
      </p>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div id="people-list"></div>
    </div>
  </section>

  <section class="block rule-top">
    <div class="container">
      <div class="split">
        <div>
          <h2>What we look for</h2>
          <div class="rows stack-sm">
            <div class="row"><div><h3 class="row-title">Something you finished</h3><p>A robot, a tool, a dataset, an instrument. Finished beats ambitious.</p></div></div>
            <div class="row"><div><h3 class="row-title">Working mathematics</h3><p>Linear algebra, probability, and calculus you can use, not just recognize.</p></div></div>
            <div class="row"><div><h3 class="row-title">Code you can defend</h3><p>Python or C++ fluency, with version control habits.</p></div></div>
            <div class="row"><div><h3 class="row-title">Straight answers</h3><p>You can say you do not know yet, and then go find out.</p></div></div>
          </div>
          <div class="actions">
            <a class="btn btn--solid" href="apply.html">Apply to the group</a>
          </div>
        </div>
        <div>
          <div class="faq">
            <details>
              <summary>Do I need prior robotics experience?</summary>
              <p>No. About half of our projects start with strong software skills and a willingness to learn the hardware side. New students are paired with someone experienced.</p>
            </details>
            <details>
              <summary>Is this paid?</summary>
              <p>Many undergraduate positions carry a stipend or course credit. Funded graduate positions include tuition remission and a stipend.</p>
            </details>
            <details>
              <summary>Can I work part time during the semester?</summary>
              <p>Yes. Undergraduates typically work 8 to 12 hours per week during term, with the option of full-time summer work.</p>
            </details>
            <details>
              <summary>Do you take students from other departments?</summary>
              <p>Yes. Students in mathematics, physics, and electrical engineering regularly contribute to perception and control projects.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  </section>

</main>
"""

BODIES["news.html"] = """
<main id="main">

  <section class="page-header">
    <div class="container">
      <h1>Announcements</h1>
      <p class="lede">Papers, field campaigns, and open positions, newest first.</p>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div id="news-list"></div>
    </div>
  </section>

</main>
"""

BODIES["publications.html"] = """
<main id="main">

  <section class="page-header">
    <div class="container">
      <h1>Papers and preprints</h1>
      <p class="lede">Newest first. Search by title, author, or venue, or filter by area.</p>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div class="pub-toolbar">
        <label class="search-field">
          <span class="visually-hidden">Search publications</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>
          <input id="pub-search" type="search" placeholder="Search title, author, or venue" autocomplete="off">
        </label>
        <div class="toolbar-right">
          <span class="count" id="pub-count">0 papers</span>
          <div class="chips" id="pub-chips"></div>
        </div>
      </div>
      <div id="pub-list"></div>
    </div>
  </section>

</main>
"""

BODIES["software.html"] = """
<main id="main">

  <section class="page-header">
    <div class="container">
      <h1>Tutorials, code, and data</h1>
      <p class="lede">
        We release code, tutorials, and datasets where we can, and publish calibration
        alongside our field data.
      </p>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div id="tools-list"></div>
    </div>
  </section>

</main>
"""

BODIES["facilities.html"] = """
<main id="main">

  <section class="page-header">
    <div class="container">
      <h1>Facilities</h1>
      <p class="lede">
        The physical and computational infrastructure behind our field work, from instrumented
        indoor arenas to the machines that turn field data into maps.
      </p>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div class="cols" id="facilities-list"></div>
    </div>
  </section>

</main>
"""

BODIES["teaching.html"] = """
<main id="main">

  <section class="page-header">
    <div class="container">
      <h1>Courses</h1>
      <p class="lede">
        Courses taught by the group in the Department of Computer Science. Materials are shared
        with enrolled students.
      </p>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div id="courses-list"></div>
    </div>
  </section>

</main>
"""

BODIES["media.html"] = """
<main id="main">

  <section class="page-header">
    <div class="container">
      <h1>Media coverage</h1>
      <p class="lede">Selected press and features about the group.</p>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div id="media-list"></div>
    </div>
  </section>

</main>
"""

BODIES["openings.html"] = """
<main id="main">

  <section class="page-header">
    <div class="container">
      <h1>Join the group</h1>
      <p class="lede">
        We are building our founding cohort for Spring 2027. Review is rolling, so earlier
        applications receive earlier answers.
      </p>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div id="openings-list"></div>
      <div class="actions stack-lg">
        <a class="btn btn--solid" href="apply.html">Apply to the group</a>
        <a class="text-link" href="people.html">What we look for</a>
      </div>
    </div>
  </section>

</main>
"""

BODIES["seminar.html"] = """
<main id="main">

  <section class="page-header">
    <div class="container">
      <h1>PRG Seminar</h1>
      <p class="lede">
        A regular seminar on perception, estimation, and autonomy. Speakers and schedule appear
        here as the series launches.
      </p>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div id="seminar-list"></div>
    </div>
  </section>

</main>
"""

BODIES["apply.html"] = """
<main id="main">

  <section class="page-header">
    <div class="container">
      <h1>Join the group</h1>
      <p class="lede">
        We are building our founding cohort for Spring 2027. Review is rolling. Completing this
        form prepares an email to the group; nothing is stored on the site.
      </p>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div class="apply-grid">
        <form id="apply-form" novalidate>
          <fieldset>
            <legend>Who you are</legend>
            <div class="field-row">
              <div class="field">
                <label for="name">Full name</label>
                <input id="name" name="name" type="text" autocomplete="name" required>
              </div>
              <div class="field">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" autocomplete="email" required>
              </div>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="affiliation">Current affiliation</label>
                <select id="affiliation" name="affiliation">
                  <option value="">Select</option>
                  <option>USD undergraduate</option>
                  <option>USD graduate student</option>
                  <option>Student at another university</option>
                  <option>Industry or other</option>
                </select>
              </div>
              <div class="field">
                <label for="department">Department or major</label>
                <input id="department" name="department" type="text">
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>What you want to do</legend>
            <div class="field-row">
              <div class="field">
                <label for="position">Position sought</label>
                <select id="position" name="position" required>
                  <option value="">Select a position</option>
                  <option>Ph.D. Researcher</option>
                  <option>M.S. Researcher</option>
                  <option>Undergraduate Research Assistant</option>
                  <option>Visiting Student or Intern</option>
                  <option>Postdoctoral Researcher</option>
                  <option>Collaboration or Industry partnership</option>
                </select>
              </div>
              <div class="field">
                <label for="start">Earliest start</label>
                <select id="start" name="start">
                  <option value="">Select</option>
                  <option>Spring 2027</option>
                  <option>Summer 2027</option>
                  <option>Fall 2027</option>
                  <option>Later or flexible</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label>Research interests <span class="hint">Select any</span></label>
              <div class="check-grid">
                <label class="check"><input type="checkbox" name="interest" value="SLAM &amp; 3D Reconstruction"><span>SLAM and 3D reconstruction</span></label>
                <label class="check"><input type="checkbox" name="interest" value="Aerial Robotics"><span>Aerial robotics</span></label>
                <label class="check"><input type="checkbox" name="interest" value="Legged Locomotion &amp; Manipulation"><span>Legged locomotion</span></label>
                <label class="check"><input type="checkbox" name="interest" value="Robot Perception &amp; Learning"><span>Perception and learning</span></label>
                <label class="check"><input type="checkbox" name="interest" value="Field &amp; Marine Robotics"><span>Field and marine robotics</span></label>
                <label class="check"><input type="checkbox" name="interest" value="Not sure yet"><span>Not sure yet</span></label>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Links</legend>
            <div class="field-row">
              <div class="field">
                <label for="portfolio">Portfolio or CV</label>
                <input id="portfolio" name="portfolio" type="url" placeholder="https://">
              </div>
              <div class="field">
                <label for="github">GitHub</label>
                <input id="github" name="github" type="url" placeholder="https://github.com/">
              </div>
            </div>
            <div class="field">
              <label for="linkedin">LinkedIn</label>
              <input id="linkedin" name="linkedin" type="url" placeholder="https://www.linkedin.com/in/">
            </div>
          </fieldset>

          <fieldset>
            <legend>In your own words</legend>
            <div class="field">
              <label for="background">Relevant background <span class="hint">Courses, projects, hardware, publications</span></label>
              <textarea id="background" name="background" rows="4"></textarea>
            </div>
            <div class="field">
              <label for="statement">Why this group?</label>
              <textarea id="statement" name="statement" rows="6" required></textarea>
            </div>
          </fieldset>

          <div class="form-actions">
            <button class="btn btn--solid" type="submit">Prepare application</button>
            <button class="btn" type="reset">Clear</button>
          </div>
          <p class="form-note">
            Submitting opens your email client with the application and copies the same text to
            your clipboard, so nothing is lost if the client does not open.
          </p>
          <p class="status" id="apply-status" role="status" aria-live="polite"></p>
          <div class="preview-panel" id="apply-preview" hidden>
            <pre id="apply-preview-body"></pre>
          </div>
        </form>

        <aside>
          <div class="side-card">
            <h2>Spring 2027</h2>
            <ul class="role-list">
              <li><strong>Ph.D. and M.S. researchers</strong><span>Funded positions in perception and robot learning.</span></li>
              <li><strong>Undergraduate research assistants</strong><span>Paid semester assistantships.</span></li>
              <li><strong>Postdoctoral researcher</strong><span>Perception, estimation, and field autonomy.</span></li>
            </ul>
          </div>
          <div class="side-card">
            <h2>How it works</h2>
            <ol class="timeline">
              <li><b>Submit</b><span>Reviewed on a rolling basis.</span></li>
              <li><b>Conversation</b><span>A thirty-minute call about interests and fit.</span></li>
              <li><b>Project trial</b><span>A small scoped task, usually one to two weeks.</span></li>
              <li><b>Offer</b><span>Start date and expectations agreed in writing.</span></li>
            </ol>
          </div>
          <div class="side-card side-card--quiet">
            <h2>Questions</h2>
            <p>Write to <a class="text-link" href="mailto:prg@sandiego.edu" data-email>prg@sandiego.edu</a>, or read the FAQ on the <a class="text-link" href="people.html">People</a> page.</p>
          </div>
        </aside>
      </div>
    </div>
  </section>

</main>
"""

BODIES["404.html"] = """
<main id="main">

  <section class="page-header">
    <div class="container">
      <h1>Pose lost</h1>
      <p class="lede">
        This page does not exist, and the estimator has diverged. Try one of the known
        landmarks below.
      </p>
    </div>
  </section>

  <section class="block">
    <div class="container">
      <div class="rows">
        <a class="row" href="index.html">
          <div><h2 class="row-title">Home</h2><p>Who we are, what we work on, and the latest from the lab.</p></div>
          <p class="row-meta">&rarr;</p>
        </a>
        <a class="row" href="research.html">
          <div><h2 class="row-title">Research</h2><p>Five programs, from SLAM to field robotics.</p></div>
          <p class="row-meta">&rarr;</p>
        </a>
        <a class="row" href="people.html">
          <div><h2 class="row-title">People</h2><p>Roster, open positions, and the FAQ.</p></div>
          <p class="row-meta">&rarr;</p>
        </a>
        <a class="row" href="openings.html">
          <div><h2 class="row-title">Openings</h2><p>Join our founding cohort.</p></div>
          <p class="row-meta">&rarr;</p>
        </a>
      </div>
    </div>
  </section>

</main>
"""

META = {
    "index.html": (
        "Perception &amp; Robotics Group — University of San Diego",
        "The Perception and Robotics Group at the University of San Diego studies robot perception, SLAM, aerial autonomy, legged locomotion, and field robotics.",
    ),
    "research.html": (
        "Research — Perception &amp; Robotics Group, USD",
        "Research programs of the USD Perception and Robotics Group: SLAM and 3D reconstruction, aerial robotics, legged locomotion, perception, and field robotics.",
    ),
    "people.html": (
        "People — Perception &amp; Robotics Group, USD",
        "Members and open positions in the Perception and Robotics Group at the University of San Diego.",
    ),
    "news.html": (
        "News — Perception &amp; Robotics Group, USD",
        "Announcements, papers, field campaigns, and open positions from the USD Perception and Robotics Group.",
    ),
    "publications.html": (
        "Publications — Perception &amp; Robotics Group, USD",
        "Papers and preprints from the USD Perception and Robotics Group.",
    ),
    "software.html": (
        "Software &amp; Datasets — Perception &amp; Robotics Group, USD",
        "Code, tutorials, and datasets released by the USD Perception and Robotics Group.",
    ),
    "facilities.html": (
        "Facilities — Perception &amp; Robotics Group, USD",
        "Laboratory and computing facilities of the USD Perception and Robotics Group.",
    ),
    "teaching.html": (
        "Teaching — Perception &amp; Robotics Group, USD",
        "Courses taught by the USD Perception and Robotics Group.",
    ),
    "media.html": (
        "Media — Perception &amp; Robotics Group, USD",
        "Press coverage of the USD Perception and Robotics Group.",
    ),
    "openings.html": (
        "Openings — Perception &amp; Robotics Group, USD",
        "Open graduate, undergraduate, and postdoctoral positions in the USD Perception and Robotics Group.",
    ),
    "seminar.html": (
        "Seminar — Perception &amp; Robotics Group, USD",
        "The PRG Seminar on perception, estimation, and autonomy at the University of San Diego.",
    ),
    "apply.html": (
        "Apply — Perception &amp; Robotics Group, USD",
        "Apply to join the Perception and Robotics Group at the University of San Diego.",
    ),
    "404.html": (
        "Page not found — Perception &amp; Robotics Group, USD",
        "The page you requested does not exist.",
    ),
}

for name, body in BODIES.items():
    title, desc = META[name]
    html = HEAD.format(title=title, desc=desc) + HEADER + body + FOOTER
    pathlib.Path(name).write_text(html)
    print("wrote", name, len(html))

# sitemap
urls = ["", "research.html", "people.html", "news.html", "publications.html",
        "software.html", "facilities.html", "teaching.html", "media.html",
        "openings.html", "seminar.html", "apply.html"]
out = ['<?xml version="1.0" encoding="UTF-8"?>',
       '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u in urls:
    out.append("  <url><loc>https://usd-prg.github.io/%s</loc></url>" % u)
out.append("</urlset>")
pathlib.Path("sitemap.xml").write_text("\n".join(out) + "\n")
print("wrote sitemap.xml")
