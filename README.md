# USD Perception & Robotics Group — website

Static site for the Perception and Robotics Group in the Department of Computer Science
at the University of San Diego. No build step, no dependencies — plain HTML, CSS, and
JavaScript, served directly by GitHub Pages.

**Live URL:** <https://usd-prg.github.io>

---

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, about, research overview, news, join call-to-action |
| `research.html` | Five research thrusts plus shared methods |
| `people.html` | Roster (grouped by role), open positions, FAQ |
| `publications.html` | Searchable, filterable publication list |
| `apply.html` | Application form (opens a pre-filled email + copy fallback) |
| `404.html` | Custom not-found page (GitHub Pages picks this up automatically) |

## Editing content

Almost everything lives in **`assets/js/data.js`** — no HTML editing required.

### Site metadata

```js
const SITE = {
  name: "Perception & Robotics Group",
  university: "University of San Diego",
  email: "prg@sandiego.edu",              // ← applications land here
  linkedin: "https://www.linkedin.com/company/usd-prg",
  github: "https://github.com/USD-PRG",
};
```

### Adding a person

Append an object to `PEOPLE`:

```js
const PEOPLE = [
  {
    name: "Jane Doe",
    role: "Ph.D. Student",
    group: "phd",                 // faculty | postdoc | phd | masters | undergrad | alumni
    focus: "Semantic SLAM for field robots",
    avatar: "assets/img/people/jane.jpg",   // optional; initials are used otherwise
    links: {
      email: "jdoe@sandiego.edu",
      github: "https://github.com/jdoe",
      scholar: "https://scholar.google.com/citations?user=…",
      linkedin: "https://www.linkedin.com/in/jdoe",
      website: "https://jdoe.dev",
    },
  },
];
```

Sections appear automatically once a role group has at least one member.

### Adding a publication

```js
const PUBLICATIONS = [
  {
    title: "Paper title goes here",
    authors: ["A. Author", "*B. Member"],     // prefix a name with * to highlight it
    venue: "Conference on Robot Learning (CoRL)",
    venueShort: "CoRL",
    year: 2027,
    tags: ["SLAM", "Perception"],
    links: {
      pdf: "https://…",
      arxiv: "https://arxiv.org/abs/…",
      code: "https://github.com/…",
      video: "https://…",
      project: "https://…",
    },
    bibtex: "@inproceedings{key, …}",         // adds a "BibTeX" copy button
  },
];
```

While the list is empty the page shows a tasteful "coming soon" state instead of a blank
table — so it is safe to launch before the first paper is out.

### News, research thrusts, open roles

- `NEWS` — anything you want on the homepage news rail.
- `RESEARCH` — each entry generates a homepage card and a full section on `research.html`.
  `image` points at a file in `assets/img/`.
- `OPEN_ROLES` — cards shown under "Open Positions" on `people.html`, and listed in the
  apply page sidebar (keep both in sync, or edit `apply.html` directly).

## Applying

`apply.html` has no backend. On submit it:

1. Validates required fields in the browser.
2. Builds a formatted plain-text application.
3. Copies that text to the clipboard.
4. Opens the visitor's mail client with `SITE.email`, a subject, and the body pre-filled.
5. Shows the full text on the page as a manual fallback.

This keeps the site fully static and avoids collecting personal data on a GitHub Pages
host. If you later want a real backend, swap the submit handler in
`assets/js/site.js` (`initApplyForm`) for a Formspree / Netlify Forms / Google Form post.

> **Note:** macOS Chrome sometimes blocks `mailto:` launches from a script without a user
> gesture. The clipboard copy and the on-page fallback exist for that case — the applicant
> can always mail `prg@sandiego.edu` directly.

## Local development

Any static server works:

```bash
python3 -m http.server 4173
# then open http://localhost:4173
```

Opening `index.html` directly from the filesystem also works, though a server is closer to
production.

## Deploying to GitHub Pages

The repository is already named `usd-prg.github.io`, which GitHub serves as a **user site**
at <https://usd-prg.github.io> from the root of the default branch.

1. Commit and push to `main`:

   ```bash
   git add .
   git commit -m "Build group website"
   git push origin main
   ```

2. In **Settings → Pages**, confirm:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `/ (root)`

3. Wait for the Pages build, then visit <https://usd-prg.github.io>.

`.nojekyll` is present so that files/directories beginning with an underscore are served
as-is.

### Custom domain (optional)

Add a `CNAME` file containing the domain, e.g. `prg.sandiego.edu`, then point a DNS
`CNAME` record at `usd-prg.github.io`.

## File layout

```
.
├── index.html            # home
├── research.html         # research thrusts
├── people.html           # roster, open roles, FAQ
├── publications.html     # searchable publication list
├── apply.html            # application form
├── 404.html              # custom error page
├── assets/
│   ├── css/style.css     # all styling (design tokens at the top)
│   ├── img/              # logo, favicon, research imagery
│   └── js/
│       ├── data.js       # ← edit this
│       └── site.js       # rendering + interactions
├── robots.txt
├── sitemap.xml
├── .nojekyll
└── README.md
```

## Design notes

- **Palette:** deep navy ground, warm sand accent, cool cyan/mint/violet data colours.
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (labels and metadata).
- **Motion:** section reveals on scroll, a research marquee, hover lifts. All motion is
  disabled under `prefers-reduced-motion: reduce`.
- **Accessibility:** skip link, visible focus rings, semantic landmarks, `aria-current`
  navigation state, keyboard-dismissable mobile menu, labelled icon links.

## Credits and content accuracy

The research descriptions, news items, and open positions are placeholders written to be
plausible for a newly founded lab. Replace them with real content before promoting the
site. Logos and imagery are generated in-house — swap in official USD marks if you have
permission to use them.

Images can be regenerated with `python3 .gen_images.py` (requires Pillow).
