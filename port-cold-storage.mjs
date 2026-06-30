// ─────────────────────────────────────────────────────────────────────────
// port-cold-storage.mjs
//
// Re-ports the VtM campaign vault into the public Quartz "Cold Storage" wiki
// and scrubs it for things that shouldn't be public.
//
//   Run:  node port-cold-storage.mjs
//   Then: npx quartz build           (or: npx quartz build --serve)
//
// What it does, in order:
//   1. Copies every .md from the mapped source folders into content/Cold Storage,
//      injecting a clean `title:` into frontmatter.
//   2. Copies the campaign index.md as the section home page.
//   3. Runs generic scrubs (player-name columns, "X's PC" tags, the alias
//      Ellene→Christy, the auto-caption footer, the chronicle name).
//   4. Runs file-specific edits for known vault references and OOC prose.
//   5. Prints a REVIEW report: anything that still looks like a vault/process
//      reference or a player name, plus unresolved links and orphan files.
//
// The source vault is NEVER modified — only the public copy under Quartz.
// New conventions in future sessions may not be auto-caught; that's what the
// REVIEW report at the end is for. Add new rules to the config blocks below.
// ─────────────────────────────────────────────────────────────────────────
import fs from "node:fs"
import path from "node:path"

// ── Config ────────────────────────────────────────────────────────────────
const SRC = "C:\\Users\\thevf\\Documents\\Drive\\Ellene\\3. 🎲 Tabletop Games\\🧛 VtmM\\⚖ Clair Evangelista Marte"
const DST = "C:\\Users\\thevf\\quartz-the-vfp\\content\\Cold Storage"

// source subfolder -> target subfolder. Folders not listed (e.g. "0. Claire",
// the private Full Sheet / Experience Log, and "9. Family (private)") are
// intentionally excluded. Public targets are clean, number-free names; section
// ORDER in the wiki is set by the hardcoded list in VaultSidebar.tsx, not by
// these names, so dropping the numeric prefixes here is safe.
const FOLDER_MAP = {
  "2. Chronicle": "Chronicle",
  "3. Coterie": "Coterie",
  "4. Contacts": "Contacts",
  "5. Locations": "Locations",
  "6. Factions": "Factions",
  "7. Sealed": "Sealed",
}

// nicer display titles where the filename stem isn't ideal
const TITLE_OVERRIDES = {
  "Aicha Rana (Sire)": "Aicha Rana",
}

// player real names → used to strip "Player" columns and "X's PC" tags
const PLAYERS = ["Sam", "Tony", "Alan", "Ron", "Christy"]

// File-specific edits for stable, known references (vault refs + OOC prose).
// Keyed by target-relative path. find must match exactly or it's reported MISS.
const FILE_EDITS = {
  "Factions/Banu Haqim.md": [
    [
      "Full mechanical reference for Banu Haqim (bane, compulsion, clan discipline spread) is on the Claire Full Sheet. Political context in Chicago is still thin — will expand as the campaign touches it.",
      "Political context in Chicago is still thin — will expand as the campaign touches it.",
    ],
  ],
  "Locations/Honored Drinks.md": [
    [
      "Appears in Christy's [[Session 1]] notes as \"Honoured Drink 🍺\" (spelling/singular variant). The [[Session 2]] summary uses \"Honored Drinks.\" Canonical name TBD.",
      "Also appears as \"Honoured Drink\" — a spelling/singular variant.",
    ],
  ],
  "Factions/Camarilla.md": [
    [
      "Runs an education system for new vampires — noted in Christy's [[Session 1]] session notes as \"oh cool, the Prince runs new vampires through an education system.\"",
      "Runs an education system for new vampires.",
    ],
  ],
  "Coterie/Claire Evangelista Marte.md": [
    [
      "\n\nFull mechanical reference lives in `0. Claire/Claire Marte Full Sheet.md`. Foundry is the source of truth for live tracker state.",
      "",
    ],
  ],
  "Contacts/Steve Jensen.md": [
    ["ID number 633CH noted in Christy's [[Session 1]] notes.", "ID number 633CH."],
  ],
  "Contacts/Walter Nash.md": [
    [
      "The footage seems to show him feeding (per Christy's session notes: \"they also have video of Nash feeding\").",
      "The footage seems to show him feeding.",
    ],
  ],
  "Contacts/Carter.md": [
    ["surfaced in [[Session 2]]'s notes.", "surfaced in [[Session 2]]."],
  ],
  // Note: the "X's PC." blockquote tags (Collin/Mitch/Spider/Trip/Claire) are
  // handled generically by pcTagRe in genericScrub(), so no per-file edits here.
  "Chronicle/Session 1.md": [
    ["Tyler informed Ron that [[Collin]]'s investigation", "[[Collin]]'s investigation"],
    ["This was Ron's first exposure to frenzy mechanics:", "This was the group's first exposure to frenzy mechanics:"],
    ["Tony ([[Mitch]]) on the lesson learned:", "[[Mitch]]'s player on the lesson learned:"],
    ["Alan ([[Spider]]) on [[Trip]]'s new dynamic with [[Mitch]]:", "[[Spider]]'s player on [[Trip]]'s new dynamic with [[Mitch]]:"],
    ["[[Trip]]'s player Sam:", "[[Trip]]'s player:"],
    ["Ron noted:", "[[Collin]]'s player noted:"],
  ],
}

// REVIEW report: lines matching these get flagged for a human to eyeball.
// Some may be legitimate in-fiction text — the report is advisory, not deletion.
const REVIEW_PATTERNS = [
  new RegExp(`\\b(${PLAYERS.join("|")})\\b`),
  /Foundry|Full Sheet|source of truth|0\. Claire|auto-caption|summary uses|Canonical name|'s notes\b|session notes|noted in .*notes|\bEllene\b/i,
]

// ── Helpers ─────────────────────────────────────────────────────────────────
const stamp = []
const log = (s) => { console.log(s); stamp.push(s) }

function ensureTitle(content, stem) {
  const title = TITLE_OVERRIDES[stem] ?? stem
  const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (fm) {
    if (/^title:/m.test(fm[1])) return content
    return content.replace(/^---\r?\n/, `---\ntitle: ${JSON.stringify(title)}\n`)
  }
  return `---\ntitle: ${JSON.stringify(title)}\n---\n\n${content}`
}

function removeFirstCell(row) {
  const parts = row.split("|")
  parts.splice(1, 1)
  return parts.join("|")
}
function stripPlayerColumn(content) {
  const lines = content.split(/\r?\n/)
  let inTable = false
  for (let i = 0; i < lines.length; i++) {
    const isRow = /^\s*\|.*\|\s*$/.test(lines[i])
    if (!inTable && isRow && /\|\s*Player\s*\|/i.test(lines[i])) {
      inTable = true
      lines[i] = removeFirstCell(lines[i])
    } else if (inTable) {
      if (isRow) lines[i] = removeFirstCell(lines[i])
      else inTable = false
    }
  }
  return lines.join("\n")
}

// generic scrubs applied to every copied content page
const pcTagRe = new RegExp(`\\s(?:${PLAYERS.join("|")})'s PC\\.`, "g")
function genericScrub(content) {
  let c = content
  c = c.replaceAll("Ellene", "Christy") // table alias safety net
  c = c.replaceAll("Trouble in Chi-Town", "Sunset in Chi-Town") // old chronicle name
  c = c.replace(pcTagRe, "") // "X's PC." blockquote tags
  c = stripPlayerColumn(c) // party-table "Player" column
  c = c.replace(/\s*_[^_\n]*generated from[^_\n]*_/gi, "") // auto-caption footer
  // strip %% private %% … %% /private %% blocks (visible in Obsidian, never public)
  c = c.replace(/\n?[^\S\n]*%%\s*private\s*%%[\s\S]*?%%\s*\/private\s*%%[^\S\n]*/gi, "")
  // Claire's mortal family (Raphael/Holly/Joy) is kept private — their pages live
  // in the un-ported "9. Family (private)" folder and are deliberately NOT on the
  // public wiki ("this is Claire's vault; the family is what she keeps out of it").
  // The source keeps the wikilinks intact for private navigation; here we flatten
  // them to plain text so no broken links surface in the public copy.
  c = c.replace(/\[\[(?:Raphael|Holly|Joy) Marte\|([^\]]*)\]\]/g, "$1")
  c = c.replace(/\[\[(?:Raphael|Raph|Holly|Joy)\|([^\]]*)\]\]/g, "$1")
  c = c.replace(/\[\[Raphael Marte\]\]/g, "Raphael")
  c = c.replace(/\[\[Holly Marte\]\]/g, "Holly")
  c = c.replace(/\[\[Joy Marte\]\]/g, "Joy")
  c = c.replace(/\[\[Raphael\]\]/g, "Raphael")
  c = c.replace(/\[\[Raph\]\]/g, "Raph")
  c = c.replace(/\[\[Holly\]\]/g, "Holly")
  c = c.replace(/\[\[Joy\]\]/g, "Joy")
  // PKJ's Letter is a private handout (8. Handouts isn't ported) — de-link refs in public
  c = c.replace(/\[\[PKJ's Letter(?:\|[^\]]*)?\]\]/g, "the Prince's letter")
  return c
}

// a source note opts out of the public wiki with `draft: true` in frontmatter
function isDraft(raw) {
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return !!(fm && /^draft:\s*true\b/m.test(fm[1]))
}

function applyFileEdits(rel, content) {
  const edits = FILE_EDITS[rel]
  if (!edits) return content
  let c = content
  for (const [find, repl] of edits) {
    if (c.includes(find)) c = c.replace(find, repl)
    else log(`  ⚠ MISS edit in ${rel}: «${find.slice(0, 42)}…» (source text changed?)`)
  }
  return c
}

function walk(dir) {
  const out = []
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (e.name.endsWith(".md")) out.push(p)
  }
  return out
}

// ── 1. Copy + scrub the mapped folders ──────────────────────────────────────
log("PORT — copying source → Cold Storage")
const sourcedRel = new Set() // target-relative paths we wrote (for orphan check)
const drafted = [] // skipped because draft: true
let count = 0
for (const [srcSub, dstSub] of Object.entries(FOLDER_MAP)) {
  const srcDir = path.join(SRC, srcSub)
  const dstDir = path.join(DST, dstSub)
  fs.mkdirSync(dstDir, { recursive: true })
  for (const f of fs.readdirSync(srcDir)) {
    if (!f.endsWith(".md")) continue
    const rel = `${dstSub}/${f}`
    const raw = fs.readFileSync(path.join(srcDir, f), "utf8")
    if (isDraft(raw)) {
      // draft → keep it out of public; remove any stale copy from a prior run
      const tgt = path.join(DST, rel)
      if (fs.existsSync(tgt)) fs.unlinkSync(tgt)
      drafted.push(rel)
      continue
    }
    let c = ensureTitle(raw, f.slice(0, -3))
    c = genericScrub(c)
    c = applyFileEdits(rel, c)
    fs.writeFileSync(path.join(dstDir, f), c)
    sourcedRel.add(rel)
    count++
  }
}
log(`  copied ${count} content pages` + (drafted.length ? `, skipped ${drafted.length} draft` : ""))
for (const d of drafted) log(`    · draft (kept private): ${d}`)

// ── 2. Index home page ───────────────────────────────────────────────────────
// The public landing is a hand-authored "MARTE.vault" card grid (HTML in
// index.md, marked `landing: custom`) — a presentation page, NOT a mirror of the
// source campaign index. If that marker is present we leave it untouched;
// otherwise we fall back to syncing it from the source vault as before.
{
  const dstIndex = path.join(DST, "index.md")
  const isCustomLanding =
    fs.existsSync(dstIndex) && /^\s*landing:\s*custom\b/m.test(fs.readFileSync(dstIndex, "utf8"))
  if (isCustomLanding) {
    sourcedRel.add("index.md")
    log("  index.md is a hand-authored landing (landing: custom) — left untouched")
  } else {
    const srcIndex = path.join(SRC, "index.md")
    if (fs.existsSync(srcIndex)) {
      let c = fs.readFileSync(srcIndex, "utf8")
      c = genericScrub(c)
      // public-only: drop the in-character Journal — Session 0 row from the Case Log
      c = c.replace(/^.*Journal — Session 0.*\r?\n/m, "")
      fs.writeFileSync(dstIndex, c)
      sourcedRel.add("index.md")
      log("  synced index.md (Session 0 row removed from Case Log)")
    } else {
      log("  ⚠ source index.md not found — left existing Cold Storage/index.md as-is")
    }
  }
}

// ── 3. Reports ───────────────────────────────────────────────────────────────
const files = walk(DST)

// orphans: files in Cold Storage that no longer come from source
const orphans = files
  .map((p) => path.relative(DST, p).replace(/\\/g, "/"))
  .filter((rel) => !sourcedRel.has(rel))
log("\nORPHANS — in Cold Storage but not produced by this run:")
if (orphans.length) orphans.forEach((o) => log(`  • ${o}  (delete by hand if stale)`))
else log("  none")

// unresolved wikilinks
const names = new Set()
for (const p of files) {
  names.add(path.basename(p, ".md").toLowerCase())
  const fm = fs.readFileSync(p, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (fm && /aliases:/.test(fm[1]))
    for (const m of fm[1].matchAll(/-\s*["']?([^"'\n]+)["']?/g)) names.add(m[1].trim().toLowerCase())
}
const unresolved = new Map()
for (const p of files)
  for (const m of fs.readFileSync(p, "utf8").matchAll(/\[\[([^\]]+)\]\]/g)) {
    const t = m[1].split("|")[0].split("#")[0].trim()
    if (t && !names.has(t.toLowerCase())) unresolved.set(t, (unresolved.get(t) ?? 0) + 1)
  }
log("\nUNRESOLVED LINKS — point to pages that don't exist:")
if (unresolved.size) [...unresolved].sort((a, b) => b[1] - a[1]).forEach(([t, n]) => log(`  • ${n}×  [[${t}]]`))
else log("  none")

// review residue: anything that still looks like a vault ref or player name
log("\nREVIEW — lines that may still leak a vault ref or player name:")
let flagged = 0
for (const p of files) {
  const rel = path.relative(DST, p).replace(/\\/g, "/")
  const lines = fs.readFileSync(p, "utf8").split(/\r?\n/)
  lines.forEach((line, i) => {
    if (line.trim().startsWith("title:")) return // frontmatter title, ignore
    if (REVIEW_PATTERNS.some((re) => re.test(line))) {
      log(`  ${rel}:${i + 1}  ${line.trim().slice(0, 90)}`)
      flagged++
    }
  })
}
if (!flagged) log("  none — clean")

log(`\nDone. Next: cd "${path.dirname(DST).replace(/\\content$/, "")}" && npx quartz build`)
