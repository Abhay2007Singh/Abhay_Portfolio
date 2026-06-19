import { chromium } from "../node_modules/playwright/index.mjs";
import { resolve } from "path";
import { readFileSync } from "fs";

const certs = [
  { pdf: "C:/Users/Abhay/Downloads/certificate-rpcurazv2r3u-1781280730.pdf", out: "./public/certs/anthropic-claude-code.png" },
  { pdf: "C:/Users/Abhay/Downloads/ArtofPossible_GenAI.pdf",                 out: "./public/certs/aws-genai.png" },
  { pdf: "C:/Users/Abhay/Downloads/promptEngineering.pdf",                    out: "./public/certs/aws-prompt.png" },
  { pdf: "C:/Users/Abhay/Downloads/GenAI.pdf",                               out: "./public/certs/aws-planning-genai.png" },
  { pdf: "C:/Users/Abhay/Downloads/BedrockGettingStart.pdf",                 out: "./public/certs/aws-bedrock-getting-started.png" },
  { pdf: "C:/Users/Abhay/Downloads/Bedrock.pdf",                             out: "./public/certs/aws-bedrock-nova.png" },
];

const browser = await chromium.launch();

for (const { pdf, out } of certs) {
  try {
    const pdfBytes = readFileSync(resolve(pdf));
    const base64 = pdfBytes.toString("base64");
    const dataUrl = `data:application/pdf;base64,${base64}`;

    const html = `<!DOCTYPE html><html><head><style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 1200px; height: 900px; overflow: hidden; background: white; }
      embed { width: 1200px; height: 900px; display: block; }
    </style></head><body>
      <embed src="${dataUrl}" type="application/pdf" width="1200" height="900" />
    </body></html>`;

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 900 } });
    await page.close();
    console.log(`✓ ${out}`);
  } catch (e) {
    console.error(`✗ ${out}: ${e.message}`);
  }
}

await browser.close();
console.log("Done.");
