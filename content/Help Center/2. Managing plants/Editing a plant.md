---
title: Editing a plant
description: Update a plant's name, type, emoji, or watering schedule any time.
category: managing-plants
draft: false
tags:
  - plant_tracker
  - help_center
---

Anything you set when you [[Adding a plant|added a plant]] can be changed later — the name, the type, the emoji, the watering schedule. Edits take effect immediately and apply everywhere the plant shows up: home dashboard, week-ahead strip, care log, the works.

## Editing a plant

![[plant-tracker-agnes-page.png|320]]

1. Open the plant's page
2. Tap *Edit*

![[plant-tracker-agnes-edit.png|320]]

3. Update any of the fields — *Name*, *Type*, *Water Every (days)*, or *Icon*
4. Tap *Save Changes*

If you only need to change how often the tracker reminds you to water, [[Changing a plant's watering schedule|the watering-schedule article]] walks through that specific case. Everything else (name, type, icon) is straightforward — type the new value or pick a new emoji from the grid, then save.

> [!TIP] What changes immediately
> The new name and emoji propagate everywhere right away — including in the *Care Log* on the home dashboard, where past entries display with the updated info. The history isn't rewritten, just relabeled.

<!--
DRAFT ASSUMPTIONS — verify before publishing:

Behavior verified against src/components/AddPlant.jsx, src/components/PlantDetail.jsx, src/components/Home.jsx:
- Edit button on plant detail page opens AddPlant component in edit mode — PlantDetail.jsx:188; AddPlant.jsx:16-27
- Edit form pre-fills name, type, icon, wateringInterval from the existing plant record — AddPlant.jsx:17-26
- Save button label changes to "Save Changes" in edit mode (vs "Add Plant" in create mode) — AddPlant.jsx:99
- Care Log entries on the home dashboard render plant info via plantById lookup, so name/icon updates appear immediately — Home.jsx:97, 359-377

Images to capture:
- plant-tracker-edit-plant.png — Edit Plant form with at least one field visible (e.g. for Agnes, with Name="Agnes", Type="Maranta Red Prayer Plant", Water Every=4, Icon=🪴)

Cross-links proposed:
- Adding your first plant — for "added a plant"
- Changing a plant's watering schedule (article 2) — for the schedule-specific case
-->
