---
title: Troubleshooting
order: 2
description: Common issues with Plant Tracker — what causes them, how to fix them, and what to back up to avoid them next time.
category: reference
draft: false
tags:
  - plant_tracker
  - help_center
---

Most issues with Plant Tracker come down to two things: your data lives in your phone's browser (so anything that wipes browser storage wipes your plants), and the app doesn't push notifications (so reminders only show when you open it). This article walks through the issues that come up most often.

If you're stuck on installing the app to your home screen — especially on iPhone, where it has to be Safari — see [[Installing Plant Tracker on your phone|the install article]] for the exact steps and the browser caveat.

## Recovering missing plants

If your plants disappear without you deleting them, the cause is almost always one of these:

- **You cleared your browser's data, or your phone's browser cleared it for you.** Privacy modes can wipe site storage on a schedule. Plant Tracker's storage is part of the browser, so "clear site data" or "reset Safari" deletes it.
- **You're looking at a different browser or a different device.** Plant Tracker in Safari and Plant Tracker in Chrome are separate spaces; same goes for two phones.

Either way, the only recovery path is an [[Exporting and importing data|imported backup]] from before the loss. If you don't have one, the data is gone — there's no Plant Tracker server holding a copy. To prevent this next time, export a backup regularly.

If a plant vanished but you didn't delete it, check whether it's resting. Laying a plant to rest moves it to the graveyard — it leaves the *Tend* tab and your dashboard counts, but it isn't gone. Open the *All Plants* tab, tap the *Resting* filter, open the plant, and tap 🌱 *Revive*. The [[Putting a plant to rest]] article covers this in full.

If you deleted a single plant by accident: same answer. Deletion is permanent and removes the plant's care log and photos with it. A backup is the only way back. The [[Deleting a plant]] article has more on this.

## Fixing photo issues

A few photo problems and what they mean:

- **A photo won't upload — *Failed to process photo* appears.** Plant Tracker takes any common image — JPEG, PNG, GIF, WebP — and converts each one to a JPEG to keep file sizes down. The error means your browser couldn't read that particular file, usually because it's damaged or in an unusual format. Take a fresh photo with the camera, or convert the file to JPEG and try again.
- **My imported backup is missing photos.** The default *Export Data* button doesn't include photos to keep the backup file small. To get them in the file, use *Export with Photos* next time. Already-exported backups without photos can't be patched.
- **A photo looks lower-resolution than the one I took.** Plant Tracker compresses photos on upload to save phone storage — full size caps at 1200 pixels on the longest side, thumbnails at 200. The originals on your phone aren't touched.

## Reminders and notifications

Plant Tracker doesn't send push notifications. There's no badge on the icon, no sound, no banner — the app only shows you what needs care when you open it.

That's a deliberate design choice (no account, no server, no permission prompts), but it means the dashboard is the reminder. The *Tend* tab and the [[Home dashboard overview|week-ahead strip]] are how you know what's due. A daily glance is enough; if you find yourself forgetting to check, putting the [[Installing Plant Tracker on your phone|app on your home screen]] makes the icon a passive reminder by itself.

<!--
DRAFT ASSUMPTIONS — verify before publishing:

Verified claims:
- "Failed to process photo." alert text — src/components/PlantDetail.jsx:154
- Plant Tracker has no service worker push, no Notification API usage, no badging — verified via grep across src/ (no fetches, no Notification, no registerSW with push)
- Image compression maxes at 1200/200 — src/utils/imageCompression.js:42-46
- All storage is local Dexie/IndexedDB — src/db.js (no remote endpoints)

Style-guide notes:
- No images on this article — troubleshooting reads as text-first reference; screenshots would be redundant since each issue points to other articles that have them. Could add per-section thumbnails later if user feedback wants them.
- Bullet lead-ins use bold for the symptom/question, paragraph for the answer — same pattern the user approved in the export article and is reused in the FAQ.
- Three H2s in gerund form. "Reminders and notifications" is the non-gerund exception (state, not action).

Cross-links proposed (heavy on this article by design):
- Installing Plant Tracker on your phone — install pointer in intro
- Exporting and importing data — recovery pointer
- Deleting a plant — for the accidental-delete answer
- Home dashboard overview — for the week-ahead-strip mention
-->
