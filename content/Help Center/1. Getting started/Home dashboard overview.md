---
title: Home dashboard overview
order: 3
description: A tour of the home dashboard — the week-ahead strip, the three tabs, and what shows up on each plant row.
category: getting-started
draft: false
tags:
  - plant_tracker
  - help_center
---

The home dashboard is where your plants live. It's the first screen you see when you open Plant Tracker, and it's where most of your day-to-day care happens — glancing at what's coming up this week, seeing what needs tending today, logging care with one tap, or browsing your whole collection.

The header at the top tells you the current week and month (`WK 19 · MAY '26`), the title *My Plants*, and a count of how many plants need tending out of your total. The ⚙️ in the top-right corner opens *Settings*, and the *?* opens this Help Center. Everything else lives in the two areas below: the week-ahead strip, and the three tabs.

![[plant-tracker-expanded-dashboard.png|320]]

## Seeing the week ahead

The week strip across the top shows the next 7 days starting with today, focused on watering. Each day uses a plant's assigned emoji to show if it's due for a watering. If more than two plants are due on the same day, you'll see a `+number of plants` — so a day with Nemo, Darius, and Xaria would show `🐠+2`.

Tap any day to expand it and list the plants due for a watering by name. Tap a plant's name to open its page, and tap the same day again to collapse the list.

A "scheduled" plant is one whose [[Setting a plant's care schedule|watering schedule]] says it's due to be watered that day. Days with nothing scheduled show as empty dots. Plants that are already overdue **don't** appear here — the week looks forward, not backward. You'll find anything overdue waiting at the top of the *Tend* tab instead.

## Tending what's due

The *Tend* tab opens by default — it's the day's to-do list. It gathers every care task that's due or overdue across your plants: waterings, plus any fertilizing, rotating, or pest control you've put on a [[Setting a plant's care schedule|care schedule]]. The most overdue rises to the top, so the task shouting loudest is the first thing you see.

Each row shows the task's icon and how late it is — *today*, *in 2d*, *2d overdue*, or *due now* for something you've never logged. Tap the ✓ to mark that task done on the spot: it logs the care, recalculates the next due date, and drops the task off the list. A plant with several tasks due groups them together under its name.

Resting plants sit this out — once you've [[Putting a plant to rest|laid a plant to rest]], it stops asking for care. When everything's handled, the tab shows "All tended. 🌿". See [[Tending to your plants]] for marking tasks done and the quick ways to log a watering.

## Reading the care log

![[plant-tracker-home-care-log.png|320]]

The *Care Log* tab is your full history across every plant — waterings, [[Managing notes|notes]], and photos — newest first. Each entry shows an icon, an action label, the plant's name and emoji, and how long ago it happened (*Today · 4:12 PM*, *Yesterday · 9:30 AM*, *MON · 8:15 AM*, or a date for anything older than a week).

The emoji labels tell you what kind of entry it is:

> [!NOTE] Care log labels
> 💧 *Watered*
> 🪴 *Repotted*
> ✂️ *Pruned*
> 🧪 *Fertilized*
> 🔄 *Rotated*
> 🐛 *Pest control*
> 🌱 *Propagated*
> 📦 *Moved*
> 📝 *Note* — a plain note with no special tag
> 📷 *Photographed* — a photo added to a plant

If the entry is a note, its text shows underneath in quotes. The feed loads more as you scroll, so you can keep going back as far as your history reaches, and tapping any entry opens that plant's page. When the log spans a few kinds of activity, an [[Filtering the care log|emoji filter]] appears at the top to narrow it down.

## Browsing all your plants

![[plant-tracker-all-plants.png|320]]

The *All Plants* tab is your whole collection, with controls to sort and filter it and the *+* button to [[Adding a plant|add a new plant]]. See [[Browsing all your plants]] for the full rundown of the sort and status options.

<!--
DRAFT NOTES — verify before publishing:

Behavior verified against src/components/Home.jsx for the post-Tend-tab build:
- Three tabs: Tend (default), Care Log, All Plants
- Tend lists all care tasks (water/fert/rotate/pest) with dueIn <= 0, most overdue first; ✓ logs the task and resets its countdown; resting plants excluded; empty state "All tended. 🌿"
- Week strip is watering-only, forward-looking 7 days
- Care Log feed merges waterings, notes, photos; emoji filter appears with 2+ distinct glyphs
- Header subtitle reads "{n} to tend · {n} total"

Images to capture (Cozy Plants style):
- plant-tracker-expanded-dashboard.png (hero) — now should show the Tend tab open with at least one plant that has a non-water task due, so the multi-activity behavior is visible

Cross-links: Setting a plant's care schedule, Putting a plant to rest, Notes Overview, Filtering the care log, Browsing all your plants, Adding a plant.
-->
