// One-off smoke test: loads each page in headless Chrome via CDP, reports console errors.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const BASE = process.argv[2] || "http://localhost:4173";

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-gpu",
  "--user-data-dir=/tmp/prg-check-profile",
  "about:blank",
], { stdio: "ignore" });

async function cdp() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await r.json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("chrome did not start");
}

const wsUrl = await cdp();
const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0;
const pending = new Map();
let logs = [];
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result);
    pending.delete(msg.id);
  }
  if (msg.method === "Runtime.consoleAPICalled") {
    const text = msg.params.args.map((a) => a.value ?? a.description ?? "").join(" ");
    logs.push(`[${msg.params.type}] ${text}`);
  }
  if (msg.method === "Runtime.exceptionThrown") {
    logs.push(`[exception] ${msg.params.exceptionDetails.text} ${msg.params.exceptionDetails.exception?.description ?? ""}`);
  }
  if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") {
    logs.push(`[network] ${msg.params.entry.text} ${msg.params.entry.url ?? ""}`);
  }
};

const send = (method, params = {}) =>
  new Promise((res) => {
    const n = ++id;
    pending.set(n, res);
    ws.send(JSON.stringify({ id: n, method, params }));
  });

await send("Runtime.enable");
await send("Log.enable");
await send("Page.enable");

const pages = [
  { url: "/", expect: ["research-grid", "news-list"] },
  { url: "/research.html", expect: ["thrusts"] },
  { url: "/people.html", expect: ["people-list"] },
  { url: "/publications.html", expect: ["pub-list", "pub-count"] },
  { url: "/apply.html", expect: ["apply-form"] },
  { url: "/404.html", expect: [] },
];

const results = [];
for (const p of pages) {
  logs = [];
  await send("Page.navigate", { url: BASE + p.url });
  await sleep(1400);
  const probe = await send("Runtime.evaluate", {
    expression: `(() => {
      const out = { title: document.title };
      out.counts = {};
      for (const id of ${JSON.stringify(p.expect)}) {
        const el = document.getElementById(id);
        out.counts[id] = el ? el.children.length : -1;
      }
      out.h1 = (document.querySelector('h1')||{}).textContent?.trim().slice(0,60) || null;
      out.brokenImgs = [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.getAttribute('src'));
      out.imgs = document.images.length;
      const cs = getComputedStyle(document.body);
      out.bodyBg = cs.backgroundColor;
      const hero = document.querySelector('.hero-art img');
      out.heroArtLoaded = hero ? hero.naturalWidth : null;
      const brand = document.querySelector('.brand img');
      out.brandLoaded = brand ? brand.naturalWidth : null;
      out.navLinks = [...document.querySelectorAll('.nav-links a')].map(a=>a.textContent.trim());
      out.active = document.querySelector('.nav-links a[aria-current]')?.textContent?.trim() || null;
      out.docHeight = document.documentElement.scrollHeight;
      out.overflowX = document.documentElement.scrollWidth > window.innerWidth + 1;
      return out;
    })()`,
    returnByValue: true,
  });
  results.push({ page: p.url, ...probe.result.value, logs: [...logs] });
}

for (const r of results) {
  console.log("\n===", r.page, "===");
  console.log("title:", r.title);
  console.log("h1:", r.h1, "| nav:", r.navLinks.join(","), "| active:", r.active);
  console.log("rendered:", JSON.stringify(r.counts), "| images:", r.imgs, "broken:", JSON.stringify(r.brokenImgs));
  console.log("brand:", r.brandLoaded, "heroArt:", r.heroArtLoaded, "bodyBg:", r.bodyBg);
  console.log("height:", r.docHeight, "hOverflow:", r.overflowX);
  if (r.logs.length) console.log("LOGS:", r.logs.join("\n      "));
  else console.log("logs: clean");
}

ws.close();
chrome.kill("SIGKILL");
process.exit(0);
