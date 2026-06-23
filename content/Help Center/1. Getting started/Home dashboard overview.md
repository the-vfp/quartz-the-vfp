---
title: Home dashboard overview
description: A tour of the home dashboard — the week-ahead strip, the three tabs, and what shows up on each plant row.
category: getting-started
draft: false
tags:
  - plant_tracker
  - help_center
---

The home dashboard is where your plants live. It's the first screen you see when you open Plant Tracker, and it's where most of your day-to-day care happens — glancing at what's coming up this week, checking who's thirsty, logging a watering with one tap, or browsing your whole collection.

The header at the top tells you the current week and month (`WK 19 · MAY '26`), the title *My Plants*, and a count of how many plants are thirsty out of your total. The ⚙️ in the top-right corner opens *Settings*. Everything else lives in the two areas below: the week-ahead strip, and the three tabs.

![[plant-tracker-expanded-dashboard.png|320]]

## Seeing the week ahead

The week strip across the top shows the next 7 days starting with today. Each day uses a plant's assigned emoji to show if it's due for a watering. If more than two plants are due on the same day, you'll see a `+number of plants` — so a day with Nemo, Darius, and Xaria would show `🐠+2`.

Tap any day to expand it and list the plants that are due for a watering by name. You can tap on the plant's name to open its own page. Tap the same day again to minimize the list again.

A "scheduled" plant is one whose [[Changing a plant's watering schedule|watering schedule]] says it's due to be watered on that day. Days with nothing scheduled show as empty dots. Plants that are already overdue **don't** appear here — the week looks forward, not backward. You'll find overdue plants at the top of the *Thirsty* tab instead.

## Finding thirsty plants

The *Thirsty* tab is what opens by default because most of the time you're checking the dashboard to see who needs water. It lists every plant whose watering is due today or overdue, sorted with the most overdue first — so the plant shouting loudest is at the top.

Each row shows the plant's emoji, its name, and how late the watering is: *Today*, *Tomorrow*, *In 3d*, or *2d overdue* for plants you've missed. A plant you've never logged a watering for shows as *Never watered* until you log the first one. The 💧 button on the right of each plant logs a watering on the spot — no need to open the plant's detail page.

If nothing is due, the tab shows "Nothing thirsty. 🌿" — meaning every plant on a schedule has been watered recently enough that none of them are due yet.

## Reading the care log

The *Care Log* tab is your full history across every plant — waterings, [[Notes Overview|notes]], and photos — in reverse chronological order. Each entry shows an icon, an action label, the plant's name and emoji, and how long ago it happened (*Today · 4:12 PM*, *Yesterday · 9:30 AM*, *MON · 8:15 AM*, or a date for anything older than a week).

The emoji labels match what kind of entry it is:

> [!NOTE] Care log labels
> 💧 *Watered* 
> 🪴 *Repotted*
> ✂️ *Pruned*
> 🧪 *Fertilized*
> 🔄 *Rotated*
> 📦 *Moved*
> 📝 *Note* — a plain note with no special tag
> 📷 *Photographed* — a photo added to a plant

If the entry is a note, its text shows underneath in quotes. The feed loads more entries as you scroll, so you can keep scrolling back as far as your care history reaches. Tap any entry to open the relevant plant's detail page.

## Browsing all your plants

The *All Plants* tab is your full collection. Three sort buttons at the top let you order it by *Date Acquired* (the default — oldest first), *Name* (alphabetical), or *Type* (which groups your Pothos with your Pothos and your prayer plants together).

Each row here shows the plant's emoji, name, type, and how long it's been since the last watering — *Watered today*, *1 day ago*, *3 days ago*, or *Never watered*. The 💧 button on the right logs a watering directly. Tap the row to open the plant's detail page.

The *+* button in the bottom-right corner only appears on this tab, and it's how you [[Adding a plant|add a new plant]] to your collection.

<!--
DRAFT ASSUMPTIONS — verify before publishing:

Behavior verified against src/components/Home.jsx as of this draft:
- Three tabs: Thirsty (default), Care Log, All Plants — confirmed at Home.jsx:204-218
- Week strip is forward-looking 7 days from today; overdue plants don't appear there — confirmed at Home.jsx:89-91 (filter on dueIn === i; overdue is dueIn < 0)
- Plant row anatomy confirmed: emoji, name, primarySub varies by tab, 💧 button — Home.jsx:268-293
- FAB only on All Plants tab — Home.jsx:232-234
- Care log includes waterings, notes (with emoji-keyed labels), and photos — Home.jsx:98-125
- Sort options Date Acquired / Name / Type — Home.jsx:389-393

Images to capture:
- plant-tracker-home-overview.png — full home dashboard, default state with the Thirsty tab open. Should show: header (week label + "My Plants" + count + ⚙️), week-ahead strip with at least one populated day, tab bar, and at least one or two plant rows visible. Mixed state (some thirsty, some not) reads better than the empty state.

Style-guide notes:
- No body warmth emoji — this is a reference/explainer article, no natural "yay" beat. Following the install article's precedent.
- Single article-level hero shot per the article-3 explainer pattern, not per-section shots. The week strip and the default Thirsty tab will both be visible in the hero so two of the four sections are illustrated by it.
- Casing: title case used for all multi-word UI labels (All Plants, Care Log, Date Acquired). This codifies the de facto convention from articles 1–3 and is consistent with the rendered all-caps tab text being a CSS treatment, not a name change.
- Care log labels callout uses the glyph-key pattern from article 1's "Intended emoji meaning" callout — emojis are functional/lookup, not warmth markers, so they don't count toward the per-article emoji budget.

Cross-links proposed (please approve before publish per style guide §Cross-linking):
- Week-ahead section → [[2. Changing a plant's watering schedule]] for "watering schedule"
- Care log section → [[1. Notes Overview]] for "notes"
- All Plants section → [[Adding your first plant]] for "add a new plant"

Open question:
- Whether to add per-tab screenshots (plant-tracker-home-thirsty.png, plant-tracker-home-care-log.png, plant-tracker-home-all-plants.png) for stronger reference value, even though the style guide says single hero for explainer articles. Lean: stick with single hero for now; add per-tab if user feedback says it's needed.
-->
