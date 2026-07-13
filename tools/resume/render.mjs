// Résumé PDF builder
// ------------------------------------------------------------------
// Renders tools/resume/resume.html → content/resume.pdf (the file the
// home page links to at /resume.pdf) using headless Chromium.
//
// The HTML is the maintainable source of truth for the portfolio résumé;
// edit it and re-run this to regenerate the PDF. Reuses the Playwright /
// Chromium already installed for tools/screenshots.
//
// Usage:  node tools/resume/render.mjs
// Prereqs: the screenshot tool's deps (../screenshots/node_modules).

import { chromium } from "../screenshots/node_modules/playwright/index.mjs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.resolve(__dirname, "resume.html")
const OUT = path.resolve(__dirname, "../../content/resume.pdf")

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newContext().then((c) => c.newPage())

  await page.goto(pathToFileURL(SRC).href, { waitUntil: "networkidle" })
  // Ensure the Google-hosted Playfair / EB Garamond faces are loaded before
  // printing, otherwise the first render falls back to a serif substitute.
  await page.evaluate(async () => {
    await Promise.all([
      document.fonts.load("700 41px 'Playfair Display'"),
      document.fonts.load("italic 700 41px 'Playfair Display'"),
      document.fonts.load("600 21px 'Playfair Display'"),
      document.fonts.load("400 14px 'EB Garamond'"),
      document.fonts.load("italic 400 17px 'EB Garamond'"),
      document.fonts.load("600 14px 'EB Garamond'"),
    ])
    await document.fonts.ready
  })
  await page.waitForTimeout(200)

  await page.pdf({
    path: OUT,
    printBackground: true,
    preferCSSPageSize: true, // honour @page { size: letter; margin: 0 }
  })

  await browser.close()
  console.log(`Rendered résumé → ${OUT}`)
}

main().catch((e) => {
  console.error("FATAL:", e.message)
  process.exit(1)
})
