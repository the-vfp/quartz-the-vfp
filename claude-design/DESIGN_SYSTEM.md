# Anne Elefante — Design System

> **Romantic academia.** Ornament with restraint: the warmth of coquette, the gravity of dark academia, the symmetry of baroque — spent carefully, never piled on. A person with a library card made this, not a generator.

## The three rules that keep it from reading "AI"

1. **Two serifs, nothing else.** Playfair Display (display) + EB Garamond (everything text). No sans, no mono.
2. **Small caps for labels.** Section eyebrows, nav, numbers, dates — EB Garamond small caps, letterspaced. This is the scholarly signal that replaces the usual mono.
3. **Centered hero, left-aligned body.** The hero is the one symmetrical, ornamented moment. Every section below is left-aligned and calm.

## Restraint budget

Personality comes from a few signature moves, used once or twice — not everywhere:
- Italic surname accent (the coquette move)
- One flourish (`~◆~`) as a divider
- Gold-ringed portrait
- Small-caps marginal labels
- Bookplate buttons (ruled, not pills)

Drop cap is **intentionally omitted** — it fights the centered hero. (If a long-form page ever wants one, use a *raised* initial, not a floated one.)

---

## Two themes, one system

**Light academia is the default** — the whole site (portfolio + reading pages) ships light: calm, bookish, low-risk. **Dark academia is the dark-mode theme**, offered as a toggle. Both are first-class and fully specified; light simply leads.

| Theme | Role | Notes |
|-------|------|-------|
| **Light academia** | Default — portfolio shell + reading pages | Calm, bookish, comfortable for long-form. Rose carries the accent load; gold is the quieter trim. |
| **Dark academia** | Dark-mode toggle | Atmosphere and drama for readers who prefer it. Gold does more work here; screenshots need the plate treatment (below). |

**The work-sample rule (dark mode):** in dark mode, bright screenshots glow against the espresso ground. Mount them on a cream "plate" (a `--surface` card with padding + a 1px gold-tinted border) so they read as *framed prints*, not light leaks. In light mode they sit naturally, but the plate is still a tidy default.

---

## Typography

| Typeface | Role | Source |
|----------|------|--------|
| **Playfair Display** | Name, headings, card titles, project titles | Google Fonts |
| **EB Garamond** | Body, taglines, subtitles, all small-caps labels | Google Fonts |

**Weights:** Playfair 500 (and 400 italic for accents); EB Garamond 400 + 400 italic. Never bold for emphasis — use italic or small caps.

### Scale

| Token | Size | Family / style | Use |
|-------|------|----------------|-----|
| `display` | 56px / 500 / −0.02em | Playfair | Hero name |
| `h2` | 28px / 500 | Playfair | Section titles |
| `project` | 26px / 500 | Playfair | Project titles |
| `card-title` | 18px / 500 | Playfair | Card headings |
| `lead` | 21px / 400 | EB Garamond | Hero tagline |
| `body` | 16–17px / 400 | EB Garamond | Paragraphs |
| `subtitle` | 17px / 400 italic | EB Garamond | Project subtitles |
| `eyebrow` | 13px small caps, 0.20em | EB Garamond | Section labels, numbers, dates |

**Casing:** sentence case for all running text and headings; small caps (not uppercase) for labels. Surname accent is *italic*, not a different weight.

---

## Color

### Dark academia (primary)
| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#221A16` | Page (espresso) |
| `--surface` | `#2A2019` | Cards, plates |
| `--hairline` | `#3A2C22` | Rules, borders |
| `--cream` | `#E9DDC7` | Headings, name |
| `--body` | `#C9BCA3` | Body text |
| `--muted` | `#9A876C` | Subtitles, captions |
| `--gold` | `#C2A36B` | **Accent** — labels, flourish, portrait ring, outlines |
| `--rose` | `#CE8C9B` | Surname accent, links |
| `--rose-fill` | `#9E4757` | Primary button fill |
| `--on-rose` | `#F4ECDC` | Text on rose fill |

### Light academia (reading)
| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#F4ECDC` | Page (warm cream) |
| `--surface` | `#FBF6EA` | Cards |
| `--hairline` | `#E2D2B8` | Rules, borders |
| `--ink` | `#2E2620` | Headings, name |
| `--body` | `#5A4A42` | Body text |
| `--muted` | `#A78B66` | Subtitles, captions |
| `--gold` | `#B0894C` | Accent — labels, flourish, ring |
| `--rose` | `#9E4757` | Surname accent, links, primary fill |
| `--on-rose` | `#F4ECDC` | Text on rose fill |

---

## Spacing & shape
- **Scale (px):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64. Section gaps 32–34px.
- **Radius:** cards `10–14px`; buttons `8px` (rounded to match the cards — *not* pills); portrait ring is a full circle with 2px gold border.
- **Flourish:** `flourish.svg` — `~◆~`, uses `currentColor` so it inherits gold. ~160px wide, centered, under the name.

---

## Components

- **Wordmark / nav** — the rose elephant mark locked up with the Playfair wordmark (mark ≈ cap-height, ~12px gap); small-caps links + bookplate Résumé button right; 1px hairline underline.
- **Divider** — *either* a 1px hairline *or* the flourish, never both in the same break. The flourish marks signature transitions (under the name, before the footer); hairlines do quiet structural work (nav underline, ledger row separators).
- **Hero** (centered only) — gold-ringed portrait → small-caps role → Playfair name w/ italic surname → flourish → EB Garamond tagline → two buttons.
- **Section header** — small-caps gold eyebrow + Playfair `h2`, left-aligned.
- **Capability card** — `--surface`, 1px hairline, radius 10; small-caps gold number → Playfair title → EB Garamond body.
- **Project entry** — Playfair title → body → buttons. No number, no subtitle, no card; entries separated by hairlines.
- **Background timeline** — rose marker (filled diamond = work, hollow circle = study) on a gold spine; bold entity + small-caps tag; small-caps gold date range right-aligned. Markers sit centred in the gap between the role line and its description.
- **Buttons** — primary: `--rose-fill`, `--on-rose`, radius 8px, small caps; secondary: transparent, 1px gold border. Trailing `→` (internal) / `↗` (external; pin the arrow to the mono font so serifs don't fall back to the emoji glyph).
- **Work-sample plate** — screenshot inside a `--surface` card, padded, 1px gold-tinted border. Mandatory on dark.
- **Footer** — centered: flourish above a single small-caps muted line (`© 2026 Anne Elefante · Built with Quartz`). No type credits, no extra rule.

---

## Applying it

### Quartz (`quartz.config.ts`)
```ts
typography: { header: "Playfair Display", body: "EB Garamond", code: "EB Garamond" },
// lightMode = light academia (default — portfolio + reading):
lightMode: {
  light: "#F4ECDC", lightgray: "#E2D2B8", gray: "#A78B66",
  darkgray: "#5A4A42", dark: "#2E2620",
  secondary: "#9E4757", tertiary: "#B0894C",
  highlight: "rgba(176,137,76,0.18)", textHighlight: "#B0894C55",
},
// darkMode = dark academia (dark-mode toggle):
darkMode: {
  light: "#221A16", lightgray: "#3A2C22", gray: "#9A876C",
  darkgray: "#C9BCA3", dark: "#E9DDC7",
  secondary: "#CE8C9B", tertiary: "#C2A36B",
  highlight: "rgba(194,163,107,0.16)", textHighlight: "#C2A36B55",
},
```
The centered hero, cards, bookplate buttons, flourish, and small-caps labels live in a custom stylesheet using `tokens.css`.

### Claude Design — steering prompt
> "Romantic academia. Playfair Display for headings, EB Garamond for body and all labels (small caps, letterspaced — never mono or sans). Default to a warm cream ground (#F4ECDC) with ink text (#2E2620) and rose + gold accents; include a dark academia variant (espresso #221A16, cream text) as the dark mode. Centered, symmetrical hero; left-aligned content below. One small `~◆~` flourish under the name. Bookplate buttons (ruled, 2px radius, small caps), gold-ringed portraits. Restrained ornament — two or three moves, never more. In dark mode, mount any screenshots on cream plates with a gold border."

Upload `palette.svg` + this file, paste the prompt, review → remix → publish.
