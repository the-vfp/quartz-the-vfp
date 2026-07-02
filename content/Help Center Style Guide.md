---
title: Help Center Style Guide
description: Editorial rules for Plant Tracker Help Center articles. Use this as the system prompt + reference when generating new articles with Claude.
draft: true
tags:
  - plant_tracker
  - help_center
  - meta
---

This is the rule sheet for writing Plant Tracker Help Center articles. The three existing articles in this folder (`1. Notes Overview`, `2. Changing a plant's watering schedule`, `3. Watering Cadence Chart Overview`) are the canonical sample — every rule below either reflects what they already do or fixes an inconsistency we found in them. Read them alongside this guide.

When using this with Claude in a different repo, paste this whole file into the system prompt and reference the three articles by content (or paste them too).

## Voice

- **Second person, warm, conversational.** "You can change how often the tracker will remind you to water a plant." Never "we." Never passive bureaucratic prose.
- **Plants are named and gendered.** Agnes is "she." Use the actual plant names from the user's collection when picking examples — don't invent new ones.
- **Exclamation marks are fine in moderation.** One per paragraph max in intros; rare elsewhere.
- **No hedging.** "If you'd like to" / "you might want to" weaken the prose. Just say it: "Tap *Edit*."
- **Translate, don't expose.** Use how the user thinks about something, not how the code calls it. "Your phone's browser storage" not "IndexedDB"; "no account" not "no auth"; "replaces everything" not "destructive bulkAdd". The reader doesn't need to know the architecture to follow the article.

## Frontmatter

Article pages (the numbered ones) use exactly this shape:

```yaml
---
title: <Sentence case, full title>
description: <One sentence explaining what the article covers>
tags:
  - plant_tracker
  - help_center
---
```

Index/landing pages (`0. Help Center`, `My Craft Notes`, etc.) use a different shape:

```yaml
---
title: <Title>
eyebrow: <Section label, e.g. "Knowledge base">
description: <One sentence>
---
```

Don't mix the two.

## Document structure

**No in-body H1.** Quartz renders the frontmatter `title` as the page H1 automatically. A `# Title` line in the body produces a redundant duplicate H1 that pollutes the document outline. Begin the article with the intro paragraph directly after the frontmatter fence.

**Skeleton:**

```
---
frontmatter
---

<intro paragraph(s) — 1 to 3 short paragraphs explaining what this is and why the reader cares>

<optional orienting callout, e.g. [!NOTE] or [!TIP]>

<optional article-level screenshot if multiple non-procedural sections share context>

## <Section heading>

<section content>

## <Section heading>

<section content>
```

Each `## H2` becomes a Greenhouse-style card automatically (the GardenBlocks plugin wraps it). You don't need to add any markup — just write the heading.

## Headings

- **H2 form: gerund by default.** "Adding a note", "Editing a note", "Viewing the chart", "Changing the watering schedule".
- **Deviate from gerund when it's awkward.** "How the chart updates" stays as "How the chart updates" because the section describes automatic behavior, not a user action — "Updating the chart" would be misleading. Rule: *lean gerund, but readability wins.*
- **Sentence case.** "Adding a note", not "Adding A Note".
- **No `### H3` headings inside articles.** If you need sub-structure, split into more `## H2` sections instead — the card layout depends on H2 boundaries.

## Callouts

Use Obsidian-flavored callouts. Three types are in active use:

| Type | When | Color |
|---|---|---|
| `[!NOTE]` | Helpful context, definitions, glyph keys | Sage green |
| `[!TIP]` | Distinctions, recommended-but-not-required guidance | Amber |
| `[!WARNING]` | Loss-bearing actions ("there's no undo for this") | Terracotta |

**Rules:**

- **Type is uppercase.** `[!WARNING]`, never `[!warning]`.
- **Title is sentence case.** "Emojis + notes", not "Emojis + Notes". "Be careful!" not "Be Careful!".
- **Title is short** — under 6 words. The body does the explaining.
- **Body lines start with `>` and a space** (or `>` followed by content directly — match what the surrounding article does, but be consistent within an article).

**Example:**

```markdown
> [!TIP] Number of days setting vs cadence graph
>The number of days you set is your plant's **schedule** — it's what the tracker uses to _look ahead_ and remind you when to water next. The [[3. Watering Cadence Chart Overview|cadence graph]] shows the **cadence** — _looking back_ at how frequently you've actually watered.
```

## Procedural sections (numbered steps)

When a section walks the reader through doing something:

1. **Lead with a screenshot** of the relevant screen.
2. **Use a numbered list** (`1.`, `2.`, …) for the steps.
3. **One action per step.** Don't combine "Tap Edit and then change the number" into one step — split.
4. **If the procedure spans multiple screens, interleave:** `steps 1–2` → second screenshot → `steps 3–4`. The numbering continues across the break automatically (markdown emits `<ol start="3">`, the CSS keeps the counter going).
5. **Italicize UI labels** in step text: *Edit*, *Save Changes*, *Water Every (days)*. Never bold them, never use code formatting.

**Example:**

```markdown
## Changing the watering schedule

![[plant-tracker-agnes-page.png|320]]

1. Navigate to an individual plant's page
2. Tap *Edit*

![[plant-tracker-agnes-edit.png|320]]

3. In the *Water Every (days)*, adjust the number as needed
4. Make sure you *Save Changes* ✅
```

## Non-procedural sections (explainer)

When a section explains something rather than walking through doing it (e.g. "Reading the chart"):

- **No screenshot per section.** Group all related explainers under a single article-level screenshot placed before the first non-procedural H2 (article 3 pattern).
- **Prose only**, no numbered list — the reader isn't following steps.
- **Keep it short** — a paragraph or two per section.

## Images

**Filenames:** descriptive kebab-case, format `plant-tracker-<plant>-<view>.png`. Examples:
- `plant-tracker-agnes-page.png` — Agnes's plant detail page
- `plant-tracker-agnes-edit.png` — Edit Plant form for Agnes
- `plant-tracker-rae-add-note-crop.png` — Rae's plant page cropped to the note input area
- `plant-tracker-agnes-expanded-graph.png` — Agnes's plant page with the cadence graph expanded

Never use Obsidian's `Pasted image YYYYMMDD…` defaults.

**Widths:**

- Inline mobile UI screenshots: **`|320`**. Always.
- Hero/landing-page shots that should fill the column: no width suffix.

**Embed syntax:** `![[filename.png|320]]` — Obsidian wikilink form, since this is a Quartz-from-Obsidian setup.

## Bold

Bold is **reserved for vocabulary/distinction anchors** — bold a key concept on first use when the article teaches the reader a distinction or anchors a vocabulary word the rest of the article will use.

**Yes:**
- Article 2's TIP callout bolds **schedule** and **cadence** because the whole callout is teaching that distinction.
- Article 3's intro bolds **cadence** on first mention because it's the article's vocabulary anchor.

**No:**
- General emphasis ("be sure to **save** your changes") — use italics on the UI label instead, or just don't emphasize.
- Important warnings — use a `[!WARNING]` callout, not bold.
- Step titles — they're already H2s.

If in doubt, don't bold. Italics for UI labels carry the visual emphasis the article needs.

## Italics

- **UI labels:** *Edit*, *Save*, *Save Changes*, *Water Every (days)*, *Watered*, *Watering Cadence*.
- **Multi-word labels are title case** regardless of how the source code or rendered CSS treats them: *All Plants*, *Care Log*, *Date Acquired*, *Backup & Restore*. Lowercase short prepositions and articles per Chicago style: *Export with Photos*, not *Export With Photos*.
- **Soft emphasis on phrases:** *look ahead*, *looking back* (article 2's TIP callout uses this to contrast schedule vs cadence). Use sparingly.

## Code formatting

Inline `code formatting` is reserved for three things — never UI labels (those stay in italics).

- **Literal-rendered shorthand the app produces:** `+3`, `WK 19 · MAY '26`.
- **Format-string placeholders the reader will see filled in:** `plant-tracker-backup-YYYY-MM-DD.json`.
- **Filenames or extensions referenced as files:** `.json`, `Adding a plant.md`.

If you find yourself reaching for code formatting on something else, it probably wants italics or no emphasis at all.

## Inline emoji warmth markers

**At most one emoji in article body, placed at the end of the intro paragraph or the final step, only when there's a genuine "yay" beat.**

Examples that pass:
- ✅ at end of step 4 in article 2 ("Make sure you *Save Changes* ✅") — landing the "you're done" beat.
- 🥂 at end of article 3's intro ("congratulate yourself on a plant well watered 🥂") — celebrating consistent watering.

Examples that fail:
- 💧 in a body sentence about watering — not a celebration, just decoration.
- Multiple emojis per article — picks a fight with the warmth tone.

**Glyph-key tables in callouts are a separate, allowed pattern** — the "Intended emoji meaning" callout in article 1 lists 📝 / 🪴 / ✂ / 🔄 / 🗳 / ⌨ as a lookup, not as warmth markers. That's fine and doesn't count toward the per-article limit.

## Cross-linking

- **Wikilink between articles when one references a concept the other defines.** Article 2 ↔ Article 3 cross-link on schedule vs cadence is the canonical example.
- **Reciprocate where it makes sense.** When article A wikilinks to article B for a concept, consider whether B should link back to A — reciprocal links close the loop for readers and reinforce both articles in the IA. The install ↔ export pair is the canonical example: install warns about cache clearing and points to export; export explains why the home-screen icon doesn't help and points to install.
- **Use the rendered-text alias form:** `[[3. Watering Cadence Chart Overview|cadence graph]]` — the visible text reads natural; the link target is the full filename.
- **Workflow:** Claude proposes backlinks in the body; the human approves before they land.

## Examples in prose

When picking an example to illustrate a behavior:

- **Use real plant names from the user's collection** (Agnes, Rae, etc.). Don't invent generic ones like "Plant A."
- **Match plant to scenario** — Agnes (a Maranta) is the running example for the watering-schedule articles; Rae (an Anthurium) for note-taking. Don't swap arbitrarily.
- **Concrete numbers:** "if Agnes is set to be watered every 4 days, she'll appear as 'Thirsty' in the dashboard 4 days after I last watered her." Concrete > abstract.

## What the rendering does for you (so you don't fight it)

- **`## H2` → card.** The GardenBlocks plugin wraps every H2 section in `<section class="gp-block">`. You get the cream card chrome and the round green numbered-list bullets for free. Don't add markup — just write the H2.
- **Frontmatter `title` → page H1.** Don't write your own.
- **Wikilinks → site links.** `[[1. Notes Overview]]` and `[[1. Notes Overview|notes overview]]` both resolve correctly.
- **Eyebrows are off.** Previously H2s got auto-injected eyebrows ("STEP-BY-STEP", "REMOVAL") based on regex on the heading. Removed because the regex was brittle. Don't write eyebrow markup either — there's nothing to write.

## Pre-publish checklist

Before considering an article done:

- [ ] Frontmatter has `title`, `description`, `tags: [plant_tracker, help_center]`
- [ ] No in-body `# H1`
- [ ] All H2s are gerunds (or a justifiable exception)
- [ ] All callout types are uppercase, all callout titles are sentence case
- [ ] No `Pasted image …` filenames; all images use `plant-tracker-<plant>-<view>.png`
- [ ] All inline UI screenshots are `|320`; hero shots have no width
- [ ] Procedural sections lead with a screenshot, then numbered list
- [ ] UI labels in italics (multi-word in title case), not bold; code formatting reserved for literal shorthand, format strings, or filenames
- [ ] Bold appears at most where a vocabulary anchor or distinction is being taught
- [ ] At most one warmth emoji in the body, in the right beat
- [ ] At least one cross-link to a related article if relevant; user has approved it
