---
title: Deleting a plant
order: 5
description: How to remove a plant from your collection — and what gets deleted with it.
category: managing-plants
draft: false
tags:
  - plant_tracker
  - help_center
---

Deleting a plant takes everything with it: the plant itself, every logged watering, every note, and every photo. There's no undo, no trash, and no recovery. If you'd rather keep a plant's history but stop it asking for care, [[Putting a plant to rest|lay it to rest]] instead — that's reversible.

> [!WARNING] Deletion is permanent
> Once you confirm, the plant and all its history are gone for good — no undo, no trash. If there's any chance you'll want it back, [[Exporting and importing data|export a backup]] *before* you delete. Just remember a backup is your **whole** collection, not a single plant: importing it later brings the plant back, but rolls everything else back to that moment too, replacing anything you've changed since.

## Deleting a plant

![[plant-tracker-agnes-page.png|320]]

1. Open the plant's page
2. Tap *Delete* in the header at the top of the page
3. When the prompt asks to confirm — for example, "Delete \"Agnes\"? This removes all its data." — tap *OK*

The home dashboard reopens, with the plant gone from every list and tab. The count in the header (`X to tend · Y total`) drops by one, and any *Care Log* entries the plant contributed to the dashboard's *Care Log* tab disappear too.

<!--
DRAFT ASSUMPTIONS — verify before publishing:

Behavior verified against src/components/PlantDetail.jsx, src/components/Home.jsx:
- Delete button is in the detail-header, styled as btn-danger — PlantDetail.jsx:189
- Confirm dialog text: `Delete "${plant.name}"? This removes all its data.` — PlantDetail.jsx:167
- Deletion cascades: clears waterings, notes, photos for that plantId, then deletes the plant record — PlantDetail.jsx:168-171
- After deletion, navigates back to home via onBack — PlantDetail.jsx:172

Images to capture:
- plant-tracker-delete-plant.png — plant detail page header showing the Delete button (Agnes is the canonical example for the watering-schedule articles, so using her here for continuity)

Cross-links proposed:
- Exporting and importing data — for backup-first guidance (in the WARNING callout)
-->
