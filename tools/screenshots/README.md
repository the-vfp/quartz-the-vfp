# Help Center screenshot pipeline

Regenerates the Plant Tracker app screenshots used in the Help Center articles
(`content/attachments/plant-tracker-*.png`) — automatically, at a consistent
size, with emoji that actually render.

## How it works

- Drives **headless Chromium** (Playwright) against the **live deployed app**
  (`plant-tracker-blue.vercel.app`), which auto-seeds ~17 demo plants for a fresh
  visitor — so no data setup is needed.
- Injects **Noto Color Emoji** at capture time. Headless Chromium (and desktop
  Chrome/Firefox generally) lack color-emoji glyphs for newer emoji, which would
  otherwise render as tofu boxes. Noto is Google-style — intentionally different
  from the Apple-style emoji on a phone screenshot.
- Captures each shot at **412×915** (the phone shape the existing images use) and
  writes straight into `content/attachments/`.

## Setup (once)

```sh
cd tools/screenshots
npm install
npx playwright install chromium
```

## Use

```sh
node capture.mjs                       # re-shoot every recipe
node capture.mjs serena-schedule       # re-shoot just one
node capture.mjs agnes-page all-plants # re-shoot several
node capture.mjs --list                # list all recipe names
```

Then rebuild the site so the new images show up:

```sh
# stop the preview server first (it locks public/), then:
cd ../.. && npx quartz build
```

(Or just ask Claude to re-shoot + rebuild — that's the usual path.)

## Recipes

Each recipe is one named entry in `capture.mjs` → output file
`plant-tracker-<name>.png`. To add or change a shot, edit the `RECIPES` array:
a recipe navigates the app to the desired screen/state, and the runner handles
the emoji fix + screenshot.

A few recipes set up **synthetic state** (the live seed doesn't contain it):

- `expanded-dashboard` — gives Agnes a fertilize task so the *Tend* tab shows a
  non-water item.
- `serena-schedule` — gives Serena fertilize/rotate/pest intervals so the care
  schedule is multi-task.
- `rae-pinned-note` — pins a note so the *📌 Pinned* group appears.
- `all-plants-resting` — lays a plant to rest if the graveyard happens to be empty.

State is never persisted: each recipe runs in a fresh browser context, so the
live app and other recipes are unaffected.

## Notes / limits

- Targets the **deployed** build. If local changes aren't deployed yet, the shots
  won't reflect them — point `APP` in `capture.mjs` at a running build instead.
- Destructive confirmations (e.g. deleting a plant) use native browser dialogs,
  which can't be screenshotted — those shots aren't automated.
