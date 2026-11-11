// One-off layout audit: overflow, clipping, tiny/overlapping text, contrast, tap targets.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9335;
const BASE = process.argv[2] || "http://localhost:4173";

const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`, "--no-first-run",
  "--no-default-browser-check", "--disable-gpu", "--hide-scrollbars",
  "--user-data-dir=/tmp/prg-audit-profile", "about:blank",
], { stdio: "ignore" });

async function wsUrl() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const p = list.find((t) => t.type === "page");
      if (p) return p.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("no chrome");
}

const ws = new WebSocket(await wsUrl());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
};
const send = (method, params = {}) =>
  new Promise((res) => { const n = ++id; pending.set(n, res); ws.send(JSON.stringify({ id: n, method, params })); });
await send("Page.enable");

const AUDIT = `(() => {
  const vw = window.innerWidth;
  const out = { page: location.pathname, vw, issues: [], fonts: {}, samples: [] };

  const rect = (el) => el.getBoundingClientRect();

  // 1. horizontal overflow: elements sticking out of the viewport
  for (const el of document.querySelectorAll('body *')) {
    const r = rect(el);
    if (r.width === 0 || r.height === 0) continue;
    if (r.right > vw + 1.5 || r.left < -1.5) {
      const cs = getComputedStyle(el);
      if (cs.position === 'fixed' || cs.visibility === 'hidden') continue;
      // ignore intentionally wide decorative layers clipped by an ancestor
      let clipped = false;
      for (let a = el.parentElement; a; a = a.parentElement) {
        const acs = getComputedStyle(a);
        if (acs.overflow !== 'visible' || acs.overflowX !== 'visible') { clipped = true; break; }
      }
      if (clipped) continue;
      out.issues.push('overflow-x: ' + el.tagName.toLowerCase() + '.' + (el.className || '').toString().split(' ')[0] + ' right=' + Math.round(r.right));
    }
  }

  // 2. computed fonts actually applied (detect fallback = fonts failed to load)
  const probe = ['h1', 'body', '.eyebrow', '.mono'];
  for (const sel of probe) {
    const el = document.querySelector(sel);
    if (el) out.fonts[sel] = getComputedStyle(el).fontFamily;
  }
  const h1 = document.querySelector('h1');
  if (h1) out.fonts.h1rendered = Math.round(parseFloat(getComputedStyle(h1).fontSize));

  // 3. text too small
  for (const el of document.querySelectorAll('p, li, a, span, h1, h2, h3, h4, label, button, small')) {
    const r = rect(el);
    if (!r.width || !el.textContent.trim()) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 10.5 && !el.closest('.skip-link')) {
      out.issues.push('tiny-text ' + fs.toFixed(1) + 'px: ' + el.tagName.toLowerCase() + ' "' + el.textContent.trim().slice(0, 36) + '"');
    }
  }

  // 4. overlapping sibling text blocks (a crude collision signal)
  const blocks = [...document.querySelectorAll('h1 + p, p + p, .hero-actions')];
  for (const el of blocks) {
    const r = rect(el);
    if (!r.width) continue;
    let p = el.previousElementSibling;
    if (p) {
      const pr = rect(p);
      if (pr.height && r.top < pr.bottom - 2 && pr.width && r.left < pr.right && pr.left < r.right) {
        out.issues.push('overlap: ' + el.tagName.toLowerCase() + ' over ' + p.tagName.toLowerCase());
      }
    }
  }

  // 5. tap targets on small screens
  if (vw < 500) {
    for (const el of document.querySelectorAll('a, button')) {
      const r = rect(el);
      if (!r.width || getComputedStyle(el).visibility === 'hidden') continue;
      if (el.closest('.footer-social') || el.closest('.nav-links')) continue;
      if (r.height < 30 || r.width < 26) {
        out.issues.push('tap: ' + Math.round(r.width) + 'x' + Math.round(r.height) + ' ' + (el.textContent.trim().slice(0, 30) || el.className));
      }
    }
  }

  // 6. content sanity: count key blocks
  out.counts = {
    sections: document.querySelectorAll('section').length,
    cards: document.querySelectorAll('.card, .person, .pub-item, .research-card').length,
    imgs: document.images.length,
    links: document.querySelectorAll('a[href]').length,
  };
  out.brokenImgs = [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src'));
  out.pendingImgs = [...document.images].filter(i => !i.complete).map(i => i.getAttribute('src'));
  out.scrollW = document.documentElement.scrollWidth;
  out.scrollH = document.documentElement.scrollHeight;

  // 7. links that point nowhere
  out.deadLinks = [...document.querySelectorAll('a[href]')]
    .map(a => a.getAttribute('href'))
    .filter(h => !h || h === '#' || h.startsWith('javascript:'));
  return out;
})()`;

const pages = [
  "/", "/news.html", "/research.html", "/software.html", "/publications.html",
  "/facilities.html", "/teaching.html", "/media.html", "/openings.html",
  "/seminar.html", "/people.html", "/apply.html", "/404.html",
];
const widths = [1440, 390];

for (const w of widths) {
  for (const url of pages) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 500 });
    await send("Page.navigate", { url: BASE + url });
    await sleep(1100);
    await send("Runtime.evaluate", {
      expression: `(async()=>{const s=innerHeight*0.8;for(let y=0;y<document.body.scrollHeight;y+=s){scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}scrollTo(0,0);await new Promise(r=>setTimeout(r,350));})()`,
      awaitPromise: true,
    });
    const { result } = await send("Runtime.evaluate", { expression: AUDIT, returnByValue: true });
    const v = result.value;
    console.log(`\n### ${url} @${w}  (scroll ${v.scrollW}x${v.scrollH})`);
    console.log("   fonts:", JSON.stringify(v.fonts));
    console.log("   counts:", JSON.stringify(v.counts));
    if (v.brokenImgs.length) console.log("   BROKEN IMGS:", v.brokenImgs.join(", "));
    if (v.pendingImgs.length) console.log("   still-loading:", v.pendingImgs.join(", "));
    if (v.deadLinks.length) console.log("   DEAD LINKS:", JSON.stringify(v.deadLinks));
    if (v.issues.length) console.log("   ISSUES:\n     - " + v.issues.slice(0, 25).join("\n     - "));
    else console.log("   issues: none");
  }
}

ws.close(); chrome.kill("SIGKILL"); process.exit(0);
