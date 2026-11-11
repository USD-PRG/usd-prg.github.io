/* Layout + a11y audit across pages and viewports. */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9336;
const BASE = process.argv[2] || "http://localhost:4173";
const PAGES = [
  "index.html", "research.html", "people.html", "news.html", "publications.html",
  "software.html", "facilities.html", "teaching.html", "media.html",
  "openings.html", "seminar.html", "apply.html", "404.html",
];
const WIDTHS = [1440, 900, 390];

const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`,
  "--no-first-run", "--no-default-browser-check", "--disable-gpu",
  "--hide-scrollbars", "--user-data-dir=/tmp/prg-audit-profile", "about:blank",
], { stdio: "ignore" });

async function wsUrl() {
  for (let i = 0; i < 80; i++) {
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
let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

await send("Page.enable");
await send("Runtime.enable");

const EXPR = `(() => {
  const out = { overflow: [], tiny: [], images: [], small: [], wide: [] };
  const docW = document.documentElement.clientWidth;
  out.scrollW = document.documentElement.scrollWidth;
  out.docW = docW;

  document.querySelectorAll("body *").forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;

    if (r.right > docW + 1.5 || r.left < -1.5) {
      out.overflow.push(el.tagName + "." + (el.className || "").toString().split(" ")[0] + " L" + Math.round(r.left) + " R" + Math.round(r.right));
    }
    const hasOwnText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (hasOwnText) {
      const fs = parseFloat(cs.fontSize);
      if (fs < 12.5) out.tiny.push((el.className || el.tagName) + " " + fs + "px");
      if (el.scrollWidth > r.width + 2 && cs.overflowX === "visible" && cs.whiteSpace !== "nowrap") {
        out.wide.push((el.className || el.tagName) + " max" + el.scrollWidth + ">" + Math.round(r.width));
      }
    }
    if (el.matches("a, button, input, select, textarea, summary, label.check")) {
      if (r.height < 20 && r.width < 24) out.small.push((el.className || el.tagName) + " " + Math.round(r.width) + "x" + Math.round(r.height));
    }
  });

  document.querySelectorAll("img").forEach((img) => {
    // ignore images that are lazy and still below the fold
    if (img.loading === "lazy" && !img.complete && img.getBoundingClientRect().top > innerHeight) return;
    if (img.complete && img.naturalWidth === 0) out.images.push(img.getAttribute("src"));
  });

  out.h1 = document.querySelectorAll("h1").length;
  out.title = document.title;
  return out;
})()`;

let problems = 0;
for (const w of WIDTHS) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: 1000, deviceScaleFactor: 1, mobile: w < 500 });
  for (const page of PAGES) {
    await send("Page.navigate", { url: `${BASE}/${page}` });
    await sleep(650);
    const r = await send("Runtime.evaluate", { expression: EXPR, returnByValue: true });
    const v = r.result?.result?.value;
    if (!v) { console.log("FAIL", page, w, JSON.stringify(r.result).slice(0, 200)); continue; }
    const issues = [];
    if (v.scrollW > v.docW + 1) issues.push(`h-scroll ${v.scrollW}>${v.docW}`);
    if (v.overflow.length) issues.push("overflow: " + [...new Set(v.overflow)].slice(0, 4).join(" | "));
    if (v.tiny.length) issues.push("tiny: " + [...new Set(v.tiny)].slice(0, 6).join(", "));
    if (v.small.length) issues.push("small targets: " + [...new Set(v.small)].slice(0, 4).join(", "));
    if (v.images.length) issues.push("broken img: " + v.images.join(", "));
    if (v.h1 !== 1) issues.push(`h1 count ${v.h1}`);
    if (issues.length) {
      problems++;
      console.log(`[${w}] ${page}: ${issues.join(" ;; ")}`);
    }
  }
}
console.log(problems ? `\n${problems} page/viewport combos with issues` : "\nclean: no layout problems found");
ws.close();
chrome.kill();
process.exit(0);
