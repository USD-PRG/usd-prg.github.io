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
| `news.html` | News rail |
| `research.html` | Five research thrusts plus shared methods |
| `software.html` | Tutorials, software, and datasets |
| `publications.html` | Searchable, filterable publication list |
| `facilities.html` | Lab infrastructure |
| `teaching.html` | Courses taught by the group |
| `media.html` | Press and coverage |
| `openings.html` | Open positions |
| `seminar.html` | PRG Seminar schedule |
| `people.html` | Roster (grouped by role) + open positions + FAQ |
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

### Sections

- `PEOPLE` — roster, grouped by role (`faculty | postdoc | phd | masters | undergrad | alumni`).
- `OPEN_ROLES` — cards shown under "Open Positions".
- `RESEARCH` — each entry generates a homepage card and a full section on `research.html`.
- `TOOLS` — the "Tutorials / Software / Datasets" page (`software | tutorial | dataset | course`).
- `PUBLICATIONS` — searchable publication list (empty = tasteful "coming soon" state).
- `FACILITIES` — lab infrastructure cards.
- `COURSES` — teaching page.
- `MEDIA` — press coverage.
- `OPENINGS` — the open-positions page.
- `SEMINARS` — the PRG Seminar schedule.
- `NEWS` — homepage + news page rail.

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
    links: { pdf: "https://…", arxiv: "https://arxiv.org/abs/…", code: "https://github.com/…" },
    bibtex: "@inproceedings{key, …}",         // adds a "BibTeX" copy button
  },
];
```

## Applying

`apply.html` has no backend. On submit it validates the form, builds a formatted
plain-text application, copies it to the clipboard, opens the visitor's mail client
pre-filled with `SITE.email`, and shows the text on the page as a manual fallback.

## Local development

Any static server works:

```bash
python3 -m http.server 4173
# then open http://localhost:4173
```

## Deploying to GitHub Pages

The repository is named `usd-prg.github.io`, which GitHub serves as a **user site** at
<https://usd-prg.github.io> from the root of the default branch.

```bash
git add .
git commit -m "Message"
git push origin main
```

In **Settings → Pages**: Source → Deploy from a branch → `main` / `/ (root)`.

## Design notes

- **Palette:** matte warm paper (`#faf8f5`) with ink text, a matte rust accent, and
  muted sage / mauve / gold data colours — inspired by academic-lab minimalism
  (e.g. UMD PRG) and matte personal-site restraint.
- **Type:** Newsreader (editorial display), Inter (body), IBM Plex Mono (labels).
- **Motion:** light section reveals on scroll, hover lifts. Disabled under
  `prefers-reduced-motion: reduce`.
- **Accessibility:** skip link, visible focus rings, semantic landmarks, `aria-current`
  navigation state, keyboard-dismissable mobile menu, labelled icon links.

## File layout

```
.
├── index.html            # home
├── news.html
├── research.html
├── software.html
├── publications.html
├── facilities.html
├── teaching.html
├── media.html
├── openings.html
├── seminar.html
├── people.html
├── apply.html
├── 404.html
├── assets/
│   ├── css/style.css     # all styling (design tokens at the top)
│   ├── img/              # logos, favicon, research imagery
│   └── js/
│       ├── data.js       # ← edit this
│       └── site.js       # rendering + interactions
├── robots.txt
├── sitemap.xml
├── .nojekyll
└── README.md
```

## Credits

The research descriptions, news items, and open positions are placeholders written to be
plausible for a newly founded lab. Replace them with real content before promoting the
site. Logos and imagery are generated in-house — swap in official USD marks if you have
permission to use them.

Images can be regenerated with `python3 .gen_images.py` (requires Pillow).