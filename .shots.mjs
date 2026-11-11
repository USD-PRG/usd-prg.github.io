// One-off screenshot capture at desktop + mobile widths.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { writeFile, mkdir } from "node:fs/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9334;
const BASE = process.argv[2] || "http://localhost:4173";

await mkdir(".shots", { recursive: true });

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--no-first-run", "--no-default-browser-check", "--disable-gpu",
  "--hide-scrollbars",
  "--user-data-dir=/tmp/prg-shot-profile",
  "about:blank",
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

let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
};
const send = (method, params = {}) =>
  new Promise((res) => { const n = ++id; pending.set(n, res); ws.send(JSON.stringify({ id: n, method, params })); });

await send("Page.enable");

const shots = [
  { url: "/", name: "home-desktop", w: 1440, h: 950 },
  { url: "/", name: "home-mobile", w: 390, h: 844 },
  { url: "/research.html", name: "research", w: 1440, h: 950 },
  { url: "/people.html", name: "people", w: 1440, h: 950 },
  { url: "/publications.html", name: "publications", w: 1440, h: 950 },
  { url: "/apply.html", name: "apply", w: 1440, h: 950 },
];

for (const s of shots) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: s.w, height: s.h, deviceScaleFactor: 1, mobile: s.w < 500,
  });
  await send("Page.navigate", { url: BASE + s.url });
  await sleep(1200);
  await send("Runtime.evaluate", {
    expression: `(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 70));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 500));
    })()`,
    awaitPromise: true,
  });
  const { data } = await send("Page.captureScreenshot", {
    format: "jpeg", quality: 72, captureBeyondViewport: true,
  });
  await writeFile(`.shots/${s.name}.jpg`, Buffer.from(data, "base64"));
  const dims = await send("Runtime.evaluate", {
    expression: "JSON.stringify({h: document.body.scrollHeight, w: document.documentElement.scrollWidth})",
    returnByValue: true,
  });
  console.log("captured", s.name, dims.result.value);
}

ws.close();
chrome.kill("SIGKILL");
process.exit(0);
