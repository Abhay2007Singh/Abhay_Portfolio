import { chromium } from "../node_modules/playwright/index.mjs";

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0A0C0C;font-family:system-ui,-apple-system,sans-serif;overflow:hidden;position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(245,245,245,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,245,245,0.03) 1px,transparent 1px);background-size:60px 60px}
.glow{position:absolute;top:50%;left:35%;transform:translate(-50%,-50%);width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.15) 0%,transparent 70%);pointer-events:none}
.frame{position:absolute;inset:24px;border:1px solid #1E2626;border-radius:16px;pointer-events:none}
.content{position:absolute;top:80px;left:80px;right:80px}
.label{display:flex;align-items:center;gap:10px;font-size:13px;color:#6B7F7F;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:28px;font-family:monospace}
.dot{width:8px;height:8px;border-radius:50%;background:#0D9488;flex-shrink:0}
.name{font-size:76px;font-weight:700;color:#F0F5F5;line-height:1.05;margin-bottom:20px}
.green{color:#0D9488}
.tagline{font-size:20px;color:#6B7F7F;max-width:680px;line-height:1.5;margin-bottom:40px}
.chips{display:flex;gap:10px;flex-wrap:wrap}
.chip{font-size:12px;color:#6B7F7F;border:1px solid #1E2626;border-radius:6px;padding:6px 14px;background:#111414;font-family:monospace}
.github{position:absolute;bottom:48px;right:80px;font-size:13px;color:#6B7F7F;font-family:monospace}
</style>
</head>
<body>
<div class="grid"></div>
<div class="glow"></div>
<div class="frame"></div>
<div class="content">
  <div class="label"><span class="dot"></span>Software Engineer &nbsp;·&nbsp; Open to Opportunities</div>
  <div class="name">Abhay Kumar <span class="green">Singh.</span></div>
  <div class="tagline">Builds concurrency-safe wallets, AI pipelines, and real-time APIs with Python, FastAPI &amp; PostgreSQL.</div>
  <div class="chips">
    <span class="chip">Python</span>
    <span class="chip">FastAPI</span>
    <span class="chip">PostgreSQL</span>
    <span class="chip">Redis</span>
    <span class="chip">Docker</span>
    <span class="chip">Gemini API</span>
    <span class="chip">React</span>
  </div>
</div>
<div class="github">github.com/Abhay2007Singh</div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.screenshot({
  path: "./public/og-image.png",
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});
console.log("OG image saved to public/og-image.png");
await browser.close();
