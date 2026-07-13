# Portfolio résumé — source + build

The home page links to `/resume.pdf` (served from `content/resume.pdf`). That PDF
is **generated**, not hand-authored — this folder is its source of truth.

- **`resume.html`** — the résumé, styled in the home page's "Romantic Academia"
  look (Playfair Display + EB Garamond, rose `#9e4757` / gold `#b0894c` on warm
  cream). One US-Letter page. Edit this to change résumé content or layout.
- **`render.mjs`** — prints `resume.html` → `content/resume.pdf` via headless
  Chromium. Reuses the Playwright install under `../screenshots/node_modules`.

## Regenerate

```
node tools/resume/render.mjs
```

Then rebuild the site (`npx quartz build`) so the new PDF is copied into
`public/`. On Vercel the build does this automatically from `content/resume.pdf`.

## Notes

- Fonts load from Google Fonts at render time; `render.mjs` waits for
  `document.fonts.ready` before printing so the first pass isn't a fallback serif.
- Keep it to **one page** — after editing, re-render and confirm the PDF is a
  single page (the education section is what spills first).
- Experience entries follow a **Title / Company** structure (bold Playfair title,
  rose italic company beneath) — keep both entries parallel.
