---
title: Logging a watering
description: Two ways to record that you watered a plant — a one-tap shortcut from the home dashboard, or the bigger button on the plant's own page.
category: daily-care
draft: false
tags:
  - plant_tracker
  - help_center
---

Logging waterings is the heartbeat of Plant Tracker. Every time you record one, the plant's [[Watering Cadence Chart Overview|cadence chart]] gets a new bar, the *Thirsty* tab updates, and the next reminder shifts forward by however many days you've set in its [[Changing a plant's watering schedule|watering schedule]].

There are two ways to log a watering. Use whichever fits the moment — the result is exactly the same.

## Logging from the dashboard

![[plant-tracker-expanded-dashboard.png|320]]

1. Open the home dashboard
2. Find the plant in the *Thirsty* tab or the *All Plants* tab
3. Tap the 💧 button on the right of the plant's row

The watering logs immediately with the current timestamp. The plant moves out of *Thirsty* if it was overdue, and the [[Home dashboard overview|week-ahead strip]] updates the next due day.

## Logging from a plant's page

![[plant-tracker-agnes-page.png|320]]

1. Open the plant's page from the home dashboard
2. Tap 💧 *Water Now*

Same result as the dashboard shortcut — same timestamp, same effects everywhere else. Use this when you're already on the plant's page (after adding a note or photo, say) and don't want to tap back to the dashboard.

## Removing a watering

If you tap 💧 by accident, you can take the watering back off the log from the plant's page.

> [!WARNING] No confirmation, no undo
> Removing a watering happens the moment you tap the ×. There's no "are you sure" prompt and no way to bring it back. Be deliberate.

![[plant-tracker-watering-log.png|320]]

1. Open the plant's page
2. Scroll to the *Care Log* section
3. Find the watering entry — the rows with the 💧 icon — and tap the × on the right

The [[Watering Cadence Chart Overview|cadence chart]] adjusts automatically, and the plant's *Thirsty* status recalculates based on its now-newest watering.

<!--
DRAFT ASSUMPTIONS — verify before publishing:

Behavior verified against src/components/Home.jsx and src/components/PlantDetail.jsx:
- Dashboard 💧 button on each plant row triggers `db.waterings.add({ plantId, date: new Date().toISOString() })` with no confirmation — Home.jsx:93-95, 281-291
- Plant page 💧 Water Now button does the same — PlantDetail.jsx:82-84, 193-195
- Watering removal is via × button on Care Log entry, no confirm — PlantDetail.jsx:132-134, 309-319
- Removing a watering recalculates Thirsty status because all dueIn math reads from db.waterings — Home.jsx:65-83

Images to capture:
- plant-tracker-thirsty-row.png — Thirsty tab open, at least one row visible with the 💧 button on the right
- plant-tracker-water-now.png — plant detail page top, showing the big 💧 Water Now button
- plant-tracker-care-log-watering.png — Care Log section with at least one watering entry visible, × button on the right

Cross-links proposed (please approve):
- Watering schedule (article 2) and cadence chart (article 3) — both reciprocal: log affects schedule and chart
- Home dashboard overview — for the week-ahead-strip mention
-->
