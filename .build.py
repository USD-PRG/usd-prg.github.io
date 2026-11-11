#!/usr/bin/env python3
"""
Build the site.

  1. .gen.py writes all HTML from the templates + sitemap.
  2. serve the directory, then run headless Chrome to render the JS lists
  3. inject that rendered markup into the HTML so the site has real content
     without JavaScript (crawlers, no-JS readers, print). The browser-side
     renderers then hydrate rather than rebuild.

Usage:  python3 .build.py
"""
import json, pathlib, re, shutil, subprocess, sys, time

ROOT = pathlib.Path(__file__).parent.resolve()
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT = 4173

HOSTS = {
    "index.html": ["research-list", "news-list"],
    "research.html": ["thrusts", "methods-list"],
    "people.html": ["people-list"],
    "news.html": ["news-list"],
    "publications.html": ["pub-list", "pub-chips"],
    "software.html": ["tools-list"],
    "facilities.html": ["facilities-list"],
    "teaching.html": ["courses-list"],
    "media.html": ["media-list"],
    "openings.html": ["openings-list"],
    "seminar.html": ["seminar-list"],
}

def step(msg): print(f"  {msg}", flush=True)

def run(cmd, **kw):
    return subprocess.run(cmd, cwd=ROOT, **kw)

step("generating HTML")
run([sys.executable, ".gen.py"], stdout=subprocess.DEVNULL, check=True)

step("starting preview server")
server = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT)],
                          cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1.2)

try:
    step("rendering lists in headless Chrome")
    tmp = ROOT / ".build-render.mjs"
    tmp.write_text(f"""
import {{ spawn }} from "node:child_process";
import {{ setTimeout as sleep }} from "node:timers/promises";
import {{ writeFileSync }} from "node:fs";
const CHROME={json.dumps(CHROME)}, PORT=9352, BASE="http://localhost:{PORT}";
const HOSTS={json.dumps(HOSTS)};
const chrome=spawn(CHROME,["--headless=new",`--remote-debugging-port=${{PORT}}`,"--no-first-run","--no-default-browser-check","--disable-gpu","--hide-scrollbars","--user-data-dir=/tmp/prg-build","about:blank"],{{stdio:"ignore"}});
async function wsUrl(){{for(let i=0;i<100;i++){{try{{const l=await(await fetch(`http://127.0.0.1:${{PORT}}/json/list`)).json();const p=l.find(t=>t.type==="page");if(p)return p.webSocketDebuggerUrl;}}catch{{}}await sleep(200);}}throw new Error("chrome did not start");}}
const ws=new WebSocket(await wsUrl());
await new Promise((r,j)=>{{ws.onopen=r;ws.onerror=j;}});
let id=0;const pend=new Map();
ws.onmessage=e=>{{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){{pend.get(m.id)(m);pend.delete(m.id);}}}};
const send=(me,p={{}})=>new Promise(res=>{{const i=++id;pend.set(i,res);ws.send(JSON.stringify({{id:i,method:me,params:p}}));}});
await send("Page.enable");await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride",{{width:1440,height:1000,deviceScaleFactor:1,mobile:false}});
const out={{}};
for(const [page,hosts] of Object.entries(HOSTS)){{
  await send("Page.navigate",{{url:`${{BASE}}/${{page}}`}});await sleep(700);
  const r=await send("Runtime.evaluate",{{expression:`(()=>{{const o={{}}; ${{JSON.stringify(hosts)}}.forEach(h=>{{const e=document.getElementById(h);o[h]=e?e.innerHTML.trim():null;}});return o;}})()`,returnByValue:true}});
  out[page]=r.result?.result?.value;
}}
writeFileSync("/tmp/prg-build.json",JSON.stringify(out));
ws.close();chrome.kill();process.exit(0);
""")
    run(["node", str(tmp)], check=True)
    tmp.unlink()

    rendered = json.loads(pathlib.Path("/tmp/prg-build.json").read_text())
    step("injecting rendered markup into HTML")

    def indent_block(html, pad):
        return "\n".join(pad + l if l.strip() else l for l in html.split("\n"))

    for page, hosts in rendered.items():
        path = ROOT / page
        src = path.read_text()
        for host_id, html in (hosts or {}).items():
            if not html:
                continue
            # match <div ... id="host" ...> ... </div> with balanced-ish non-greedy body
            pattern = re.compile(
                r'([ \t]*)<div([^>]*\bid="' + re.escape(host_id) + r'"[^>]*)>([\s\S]*?)</div>')
            m = pattern.search(src)
            if not m:
                print(f"    ! no element #{host_id} in {page}")
                continue
            pad = m.group(1) + "  "
            src = (src[:m.start()]
                   + f"{m.group(1)}<div{m.group(2)}>\n"
                   + indent_block(html, pad)
                   + f"\n{m.group(1)}</div>"
                   + src[m.end():])
        path.write_text(src)

    step("prerender complete")
finally:
    server.terminate()
    server.wait()
    shutil.rmtree("/tmp/prg-build", ignore_errors=True)
