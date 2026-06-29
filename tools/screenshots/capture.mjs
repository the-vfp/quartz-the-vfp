// Plant Tracker Help Center — screenshot pipeline
// -------------------------------------------------
// Headless Chromium -> the live (auto-seeded) Plant Tracker build -> inject a
// color-emoji webfont -> capture 412x915 PNGs straight into content/attachments.
//
// Usage:
//   node capture.mjs                     # re-shoot every recipe
//   node capture.mjs serena-schedule ... # re-shoot only the named recipe(s)
//   node capture.mjs --list              # print all recipe names
//
// Prereqs (once):  npm install   &&   npx playwright install chromium
// See README.md.  Some recipes set up synthetic state (noted inline).

import { chromium } from "playwright"
import path from "node:path"
import fs from "node:fs"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const APP = "https://plant-tracker-blue.vercel.app/"        // auto-seeds ~17 plants for a fresh visitor
const OUT = path.resolve(__dirname, "../../content/attachments")
const VIEWPORT = { width: 412, height: 915 }                // matches the existing phone-shaped shots
const SCALE = 1

// --- the emoji fix: headless Chromium has no color emoji font, so without this
// every emoji renders as a tofu box. Inject Noto Color Emoji (Google, open) and
// append it to each element's existing font stack (preserving the app's fonts).
async function emojiFix(page) {
  await page.addStyleTag({ content: `@import url('https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap');` }).catch(() => {})
  await page.evaluate(async () => {
    try { await document.fonts.load("16px 'Noto Color Emoji'") } catch {}
    try { await document.fonts.ready } catch {}
    document.querySelectorAll("*").forEach((el) => {
      const ff = getComputedStyle(el).fontFamily
      if (ff && !/Noto Color Emoji/i.test(ff)) el.style.fontFamily = ff + ", 'Noto Color Emoji'"
    })
  })
}

// --- navigation + scroll helpers
const top = (p) => p.evaluate(() => window.scrollTo(0, 0))
const gotoApp = async (p) => { await p.goto(APP, { waitUntil: "networkidle" }); await p.waitForTimeout(1300) }
const toSel = (p, sel, off = -16) => p.evaluate(([s, o]) => { const e = document.querySelector(s); if (e) { e.scrollIntoView({ block: "start" }); window.scrollBy(0, o) } return !!e }, [sel, off])
const toText = (p, txt, off = -16) => p.evaluate(([t, o]) => { const e = [...document.querySelectorAll("*")].find(x => x.children.length < 5 && new RegExp(t, "i").test(x.textContent || "")); if (e) { e.scrollIntoView({ block: "start" }); window.scrollBy(0, o) } return !!e }, [txt, off])
const centerSel = (p, sel) => p.evaluate((s) => { const e = [...document.querySelectorAll(s)].find(x => x.getBoundingClientRect().height > 80); if (e) e.scrollIntoView({ block: "center" }); return !!e }, sel)
const openAllPlants = async (p) => { await p.getByRole("button", { name: "All plants" }).click(); await p.waitForTimeout(500) }
const openPlant = async (p, n) => { await openAllPlants(p); await p.getByText(n, { exact: false }).first().click(); await p.waitForTimeout(700) }
const editPlant = async (p, n) => { await openPlant(p, n); await p.getByRole("button", { name: "Edit" }).first().click(); await p.waitForTimeout(600) }

// --- recipes: { name, fn(page), note? }.  fn leaves the page in the final state; the
// runner applies the emoji fix and screenshots afterwards.
const RECIPES = [
  // Tier 1 — changed UI
  { name: "all-plants", fn: async (p) => { await openAllPlants(p); await top(p) } },
  { name: "agnes-page", fn: async (p) => { await openPlant(p, "Agnes"); await top(p) } },
  {
    name: "expanded-dashboard", note: "synthetic: gives Agnes a fertilize task so Tend shows a non-water item",
    fn: async (p) => {
      await editPlant(p, "Agnes"); await p.getByLabel(/fertilize/i).fill("1")
      await p.getByRole("button", { name: /save changes/i }).click(); await p.waitForTimeout(700)
      await gotoApp(p); await p.getByRole("button", { name: "Tend" }).click().catch(() => {}); await top(p)
    }
  },
  // Tier 2 — new feature shots
  { name: "care-schedule", fn: async (p) => { await editPlant(p, "Agnes"); await top(p) } },
  { name: "care-log-filter", fn: async (p) => { await openPlant(p, "Agnes"); await p.locator(".emoji-filter-chip").nth(1).click().catch(() => {}); await p.waitForTimeout(400); await p.evaluate(() => { const c = document.querySelector(".emoji-filter-chip"); if (c) c.scrollIntoView({ block: "start" }); window.scrollBy(0, -90) }) } },
  { name: "growth-timeline", fn: async (p) => { await openPlant(p, "Rae"); await p.getByText(/See growth/i).first().click(); await p.waitForTimeout(900); await top(p) } },
  {
    name: "rae-pinned-note", note: "pins one of Rae's notes so the 📌 Pinned group shows",
    fn: async (p) => {
      await openPlant(p, "Rae")
      let pin = p.locator(".pin-note-btn")
      if (!(await pin.count())) { await p.getByPlaceholder(/add a note/i).fill("New leaf unfurling 🌱"); await p.getByRole("button", { name: "Add" }).click(); await p.waitForTimeout(500); pin = p.locator(".pin-note-btn") }
      await pin.first().click(); await p.waitForTimeout(500)
      await p.evaluate(() => { const e = [...document.querySelectorAll("*")].find(x => /PINNED/.test(x.textContent) && x.children.length < 4); if (e) e.scrollIntoView({ block: "start" }); window.scrollBy(0, -70) })
    }
  },
  // Tier 3 — reskin re-captures
  { name: "agnes-edit", fn: async (p) => { await editPlant(p, "Agnes"); await top(p) } },
  { name: "agnes-expanded-graph", note: "centers the cadence chart", fn: async (p) => { await openPlant(p, "Agnes"); await p.getByText("Watering Cadence", { exact: false }).click(); await p.waitForTimeout(800); await centerSel(p, "svg, canvas, [class*=chart]:not([class*=toggle])") } },
  { name: "new-plant", fn: async (p) => { await openAllPlants(p); await p.getByRole("button", { name: /add plant/i }).click(); await p.waitForTimeout(700); await top(p) } },
  { name: "agnes-care-log2", note: "scrolls to Agnes's photo in the log", fn: async (p) => { await openPlant(p, "Agnes"); await p.evaluate(() => { const i = [...document.querySelectorAll("img")].find(x => /^blob:|^data:/.test(x.src) || x.naturalWidth > 40); if (i) { i.scrollIntoView({ block: "center" }); window.scrollBy(0, -40) } }) } },
  { name: "watering-log", fn: async (p) => { await openPlant(p, "Agnes"); await p.evaluate(() => { const h = document.body.scrollHeight; window.scrollTo(0, Math.min(700, Math.max(0, h - window.innerHeight))) }) } },
  { name: "settings", fn: async (p) => { await p.locator(".ledger-settings").click(); await p.waitForTimeout(700); await top(p) } },
  { name: "rae-add-note-crop", fn: async (p) => { await openPlant(p, "Rae"); await toText(p, "Add a note|repotted", -120) } },
  { name: "rae-edit-note-crop", note: "opens a note's inline edit (Save/Cancel)", fn: async (p) => { await openPlant(p, "Rae"); await p.locator(".edit-note-btn").first().click(); await p.waitForTimeout(500); await p.evaluate(() => { const e = document.querySelector("[class*=edit-input], .note-edit, textarea, .edit-note-btn"); if (e) e.scrollIntoView({ block: "center" }) }) } },
  // Tier 2/3 — care-schedule states
  { name: "serena-schedule", note: "synthetic: gives Serena fertilize/rotate/pest so the schedule is multi-task", fn: async (p) => { await editPlant(p, "Serena"); await p.getByLabel(/fertilize/i).fill("30"); await p.getByLabel(/rotate/i).fill("14"); await p.getByLabel(/pest/i).fill("7"); await p.getByRole("button", { name: /save changes/i }).click(); await p.waitForTimeout(800); await gotoApp(p); await openPlant(p, "Serena"); await top(p) } },
  { name: "see-growth", fn: async (p) => { await openPlant(p, "Rae"); await toText(p, "See growth", -150) } },
  { name: "home-care-log", fn: async (p) => { await p.getByRole("button", { name: "Care log" }).click(); await p.waitForTimeout(600); await top(p) } },
  {
    name: "all-plants-resting", note: "lays a plant to rest first if the graveyard is empty",
    fn: async (p) => {
      await openAllPlants(p); await p.getByRole("button", { name: "RESTING" }).click(); await p.waitForTimeout(500)
      if (await p.evaluate(() => /graveyard is empty/i.test(document.body.innerText))) {
        await openPlant(p, "Donny"); await p.getByRole("button", { name: /Lay to rest/i }).click(); await p.waitForTimeout(900)
        await openAllPlants(p); await p.getByRole("button", { name: "RESTING" }).click(); await p.waitForTimeout(500)
      }
      await top(p)
    }
  },
  // Tier 4 — non-blocking extras
  { name: "home-overview", fn: async (p) => { await p.getByRole("button", { name: "Tend" }).click().catch(() => {}); await top(p) } },
  { name: "water-now", fn: async (p) => { await openPlant(p, "Agnes"); await toSel(p, ".water-btn-large", -120) } },
  { name: "add-photo", fn: async (p) => { await openPlant(p, "Agnes"); await toText(p, "Add Photo", -120) } },
  { name: "settings-backup", fn: async (p) => { await p.locator(".ledger-settings").click(); await p.waitForTimeout(700); await toText(p, "Backup", -16) } },
  { name: "care-log-photo", fn: async (p) => { await openPlant(p, "Rae"); await p.evaluate(() => { const i = [...document.querySelectorAll("img")].find(x => /^blob:|^data:/.test(x.src) || x.naturalWidth > 40); if (i) { i.scrollIntoView({ block: "center" }); window.scrollBy(0, -60) } }) } },
]

async function main() {
  const args = process.argv.slice(2)
  if (args[0] === "--list") { console.log(RECIPES.map(r => r.name + (r.note ? `  (${r.note})` : "")).join("\n")); return }
  const pick = args.filter(a => !a.startsWith("--"))
  const toRun = pick.length ? RECIPES.filter(r => pick.includes(r.name)) : RECIPES
  if (!toRun.length) { console.error("No matching recipes. Use --list to see names."); process.exit(1) }
  fs.mkdirSync(OUT, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const results = []
  for (const r of toRun) {
    const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: SCALE })
    const page = await ctx.newPage()
    page.on("dialog", (d) => d.accept().catch(() => {}))   // auto-accept confirm()/alert()
    try {
      await gotoApp(page)
      await r.fn(page)
      await emojiFix(page)
      await page.waitForTimeout(300)
      const file = path.join(OUT, `plant-tracker-${r.name}.png`)
      await page.screenshot({ path: file })
      results.push(`  ok    plant-tracker-${r.name}.png`)
    } catch (e) {
      results.push(`  FAIL  plant-tracker-${r.name}.png — ${e.message.split("\n")[0]}`)
    }
    await ctx.close()
  }
  await browser.close()
  console.log(`Captured ${toRun.length} recipe(s) -> ${OUT}\n` + results.join("\n"))
  console.log("\nNext: stop the preview server, `npx quartz build`, restart the server.")
}
main().catch((e) => { console.error("FATAL:", e.message); process.exit(1) })
