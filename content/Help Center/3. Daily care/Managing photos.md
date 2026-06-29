---
title: Managing photos
aliases: [Help Center/3. Daily care/Adding photos]
order: 2
description: Snap or pick a photo of a plant to track its growth — and how to view or remove photos later.
category: daily-care
draft: false
tags:
  - plant_tracker
  - help_center
---

Photos are how you watch a plant change over time. New leaves, color shifts, that one good day after you finally got the watering right — they all live in the plant's *Care Log* and on the home dashboard's *Care Log* tab.

You can add as many photos as you want. Plant Tracker compresses them automatically so they don't eat up your phone's storage. Once a plant has two or more, you can watch them play out as a [[Watching a plant grow|growth timeline]].

> [!NOTE] Photos and backups
> Photos are an opt-in extra when you [[Exporting and importing data|back up your data]]. The default *Export Data* leaves them out to keep the file small; use *Export with Photos* if you want them included.

## Adding a photo

![[plant-tracker-agnes-page.png|320]]

1. Open the plant's page
2. Tap 📷 *Add Photo*
3. Take a new photo with your camera, or pick one from your gallery
4. Wait for ⏳ *Processing…* to finish — usually a second or two

The photo saves to the plant's *Care Log* with the current timestamp, and it shows up on the home dashboard's *Care Log* tab too.

> [!TIP] Photos and notes are separate
> A saved photo logs on its own — there's no caption field. If you want to record what's happening in the shot, add it as a separate [[Managing notes|note]].

## Viewing a photo

Each photo in the *Care Log* shows as a small thumbnail. Tap a thumbnail to open it in a full-screen viewer.

To close the viewer, tap anywhere outside the photo, tap the × in the corner, or press *Escape* on a keyboard.

## Removing a photo

![[plant-tracker-agnes-care-log2.png|320]]

1. Open the plant's page
2. Find the photo in the *Care Log*
3. Tap the × to the right of the thumbnail
4. Confirm "Delete this photo?"

Removing a photo deletes it permanently — there's no trash to restore from. If you want a way back, [[Exporting and importing data|export with photos first]].

<!--
DRAFT ASSUMPTIONS — verify before publishing:

Behavior verified against src/components/PlantDetail.jsx, src/components/Lightbox.jsx, src/utils/imageCompression.js:
- Add Photo button uses <input type="file" accept="image/*" capture="environment"> — prefers rear camera on mobile, falls back to file picker — PlantDetail.jsx:200-206
- Loading state shows "⏳ Processing..." text on the button while compression runs — PlantDetail.jsx:199
- Photos compressed to 1200px max (full) and 200px max (thumbnail), JPEG — imageCompression.js:42-46
- Failure path: alert "Failed to process photo." — PlantDetail.jsx:154
- Lightbox closes on overlay click, × button, or Escape key — Lightbox.jsx:5-7, 13-16
- Photo deletion confirms with "Delete this photo?" — PlantDetail.jsx:162

Images to capture:
- plant-tracker-add-photo.png — plant detail page showing the 📷 Add Photo button (ideally with a Care Log already populated underneath for context)
- plant-tracker-care-log-photo.png — Care Log section with at least one photo thumbnail and the × button visible

Cross-links proposed:
- Exporting and importing data — both ways (NOTE callout up top, closing line in Removing a photo)
-->
