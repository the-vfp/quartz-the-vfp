---
title: Exporting and importing data
order: 1
description: Save a backup of your plants, waterings, notes, and photos — or restore from one if you ever lose your data.
category: reference
draft: false
tags:
  - plant_tracker
  - help_center
---

Plant Tracker keeps everything on your phone, not in a cloud account. That means your data is private and works offline, but it also means you're the one in charge of backing it up. If you ever clear your browser, switch phones, or just want a safety net, you can export your plants to a single file and import them back later.

> [!TIP] When to export
> Export before clearing your browser's history or cache, before switching phones, after a big update to your collection, or just every once in a while as habit. Backups are cheap to make and worth a lot the day you need one.

## Exporting your data

1. From the home dashboard, tap ⚙️ in the top-right
 ![[plant-tracker-settings.png|320]]
2. Under *Backup & Restore*, tap *Export Data*
3. Your browser will save a file named like `plant-tracker-backup-2026-05-09.json` (with today's date) to wherever your downloads go

That file contains every plant, every logged watering, and every note. It does **not** include photos by default — those make the file much larger, so they're an opt-in. If you want photos in the backup too, tap *Export with Photos* instead. Same file, same flow, just bigger.

> [!NOTE] What's in the file
> A backup is a single `.json` text file. You can rename it, save it to your cloud drive, email it to yourself, or stash it on a USB stick — anywhere a regular file can live, your backup can too. The contents are readable text if you ever want to peek inside, though there's nothing to hand-edit there.

## Importing a backup

> [!WARNING] Import replaces everything
> Importing a backup deletes all your current plants, waterings, notes, and photos before loading the file. There's no merge and no undo. If you have data in the tracker right now that isn't in your backup, export a fresh copy first.

1. From the home dashboard, tap ⚙️ in the top-right
2. Under *Backup & Restore*, tap *Import Data*
3. Pick the backup file (the default name starts with `plant-tracker-backup-...json`)
4. When the prompt asks "This will replace all current data. Continue?", tap *OK*
5. Wait a moment for the "Data restored successfully!" message

Your plants will reappear on the home dashboard exactly as they were when you exported. If the file is missing pieces or got corrupted somewhere along the way, you'll see "Invalid backup file" or "Failed to import" instead — your existing data stays untouched in that case.

## Where your data lives

Plant Tracker doesn't have user accounts or a server. Everything you see in the app — your plants, the watering log, your notes, your photos — is stored in your phone's browser, in a private spot only Plant Tracker can read. That's why the app works without a sign-in and without internet.

A few things follow from that:

- **Different browser, different plants.** Plant Tracker in Safari and Plant Tracker in Chrome are separate spaces. Plants you add in one won't appear in the other.
- **Different phone, different plants.** There's no automatic sync. To move your collection to a new phone, export from the old one and import on the new one.
- **Clearing your browser wipes your data.** "Clear browsing data," "Clear site data," or "Reset Safari" will delete your plants. [[Installing Plant Tracker on your phone|Installing the app to your home screen]] doesn't protect against this — the home-screen icon and the browser share the same storage.
- **Uninstalling the home-screen icon doesn't wipe your data.** If you delete the icon and reopen Plant Tracker in your browser, your plants are still there.

If you ever want a clean slate on purpose — say, to test something or hand the app off — there's a *Clear All Data* button under *Danger Zone* in *Settings*. It deletes everything in one tap, after one confirmation. Pair it with an export beforehand if you want a way back.

<!--
DRAFT ASSUMPTIONS — verify before publishing:

Behavior verified against src/components/Settings.jsx and src/db.js as of this draft:
- Two export buttons: "Export Data" (plants/waterings/notes only) and "Export with Photos" (includes photos as base64-encoded blobs) — Settings.jsx:101-103
- Filename pattern: `plant-tracker-backup-YYYY-MM-DD.json` (today's ISO date) — Settings.jsx:39
- Import is destructive: clears plants, waterings, notes, photos before bulkAdd — Settings.jsx:60-76
- Confirm dialog text: "This will replace all current data. Continue?" — Settings.jsx:58
- Success alert: "Data restored successfully!" — Settings.jsx:78
- Error alerts: "Invalid backup file." (when keys missing), "Failed to import. Check that the file is valid." (parse/other errors) — Settings.jsx:55, 80
- Clear All Data confirm text: "Delete ALL data? This cannot be undone." — Settings.jsx:87
- Storage is Dexie/IndexedDB local to the browser, no server — db.js (whole file, no fetch calls anywhere)
- Settings is reachable via the ⚙️ in the top-right of the home dashboard — Home.jsx:142-148

Images to capture:
- plant-tracker-settings-backup.png — the Settings page with the "Backup & Restore" section visible (showing both Export buttons and the Import button). Crop to that section is fine; doesn't need the Danger Zone in shot.

Style-guide notes:
- No body warmth emoji — this is reference/procedural with a cautionary tone, no natural "yay" beat. Following the install article's precedent.
- The "Where your data lives" H2 is a non-gerund explainer (style-guide-permitted exception, like "How the chart updates" in article 3 — describes a state, not a user action).
- WARNING callout used for Import (loss-bearing action), TIP for "When to export" (recommended-but-not-required guidance), NOTE for "What's in the file" (helpful context). Three callout types in one article is on the high end but each does a different job.
- Casing: title case for multi-word UI labels (Backup & Restore, Export Data, Export with Photos, Import Data, Clear All Data, Danger Zone). Consistent with the convention being established across articles.

Cross-links proposed (please approve before publish per style guide §Cross-linking):
- "Where your data lives" → [[Installing Plant Tracker on your phone]] for the home-screen-icon point. This makes the install↔export wikilink reciprocal, which is good — readers landing here from the install warning have a way back.

Open questions:
- Should the *Clear All Data* button get its own H2 ("Clearing all your data") or stay as a paragraph mention in "Where your data lives"? Argument for its own section: it's a distinct destructive action that deserves a WARNING. Argument against: the article gets longer, and the existing mention plus the in-app confirm dialog already covers the safety beat. Currently kept as a paragraph; flag if you want it promoted.
- Worth a screenshot of the import confirm dialog ("This will replace all current data")? Currently no — the prompt text is quoted in step 4, which seems sufficient. Could add if user feedback suggests it.
- Title case rule for "Export with Photos" — kept "with" lowercase per Chicago-style title case (don't capitalize prepositions under 4 letters). Matches how the source code labels it.
-->
