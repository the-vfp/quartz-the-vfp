---
title: Frequently asked questions
order: 3
description: Quick answers to the questions readers ask most often about Plant Tracker.
category: reference
draft: false
tags:
  - plant_tracker
  - help_center
---

A grab bag of common questions and short answers. Most have longer articles attached if you want the full picture.

## Storage and privacy

**Where is my data stored?** On your phone, inside your browser's local storage. There's no Plant Tracker server, no cloud account, and no Plant Tracker employee or third-party service that can see your plants.

**Can other people see my collection?** No. Your data never leaves your phone unless you choose to [[Exporting and importing data|export a backup]] and share that file yourself.

**Why isn't there an account?** Skipping accounts means no login, no backend to maintain, and no privacy policy to negotiate. The trade-off is that you're responsible for your own backups.

## Devices and sharing

**Does my collection sync between devices?** No. Each phone, tablet, and browser has its own separate storage. Plants you add on one device won't appear on another.

**How do I move my plants to a new phone?** [[Exporting and importing data|Export your data]] on the old phone, then import the file on the new one. Same answer for switching browsers.

**Can I share my plants with someone else?** Send them the backup file. They can import it on their device — though importing replaces whatever's already there, so they should export their own collection first if they want to keep it.

## Notifications and reminders

**Will Plant Tracker notify me when a plant needs care?** No push notifications. The app only shows you what's due when you open it — the *Tend* tab and the [[Home dashboard overview|week-ahead strip]] are the reminders. See [[Troubleshooting]] for more.

**Can I set custom reminders?** Not within Plant Tracker. You'd set those in your phone's calendar or reminder app and reference Plant Tracker when they fire.

## Tending and the graveyard

**Why don't I see fertilizing, rotating, or pest-control reminders?** Those are off until you set them. Only watering is on by default — add an interval for the others in a plant's [[Setting a plant's care schedule|care schedule]] and they'll start appearing in the *Tend* tab when due.

**Where do my resting plants go?** When you [[Putting a plant to rest|lay a plant to rest]], it moves to the graveyard — the *Resting* filter on the *All Plants* tab. Its history is kept, it's left out of the *Tend* tab and your dashboard counts, and you can revive it anytime.

**Why don't I see the filter chips on my care log?** The [[Filtering the care log|emoji filter]] only appears once a log has at least two different kinds of entry. A log that's all waterings has nothing to filter, so the row stays hidden.

## Recovery

**Can I undo a delete?** No. Deleting a plant, watering, note, or photo is permanent — the only "undo" is restoring from an earlier [[Exporting and importing data|backup]].

**My data is gone — can you recover it?** There's no central database to recover from. If you don't have a backup, the data isn't retrievable.

## Photos

**Why does my photo look smaller than the one I took?** Plant Tracker compresses photos on upload (1200 pixels on the longest side) so your collection doesn't fill up your phone's storage. The original photo on your phone isn't changed.

**Are my photos in the backup file?** Only if you used *Export with Photos*. The plain *Export Data* button skips them to keep the file small — see [[Managing photos]] for more.

**Why isn't there a 📸 *See growth* button on my plant?** The [[Watching a plant grow|growth timeline]] needs at least two photos to chart a journey. Add a second photo and the 📸 *See growth* button appears in the plant's photo section.

## Cost and access

**How much does Plant Tracker cost?** Nothing — there's no purchase, subscription, or in-app fee.

**Is there a desktop version?** The same web app works in any browser, including on a laptop — just open [plant-tracker-blue.vercel.app](https://plant-tracker-blue.vercel.app/). Your plants on the desktop are separate from your plants on your phone, since storage is per-browser.

<!--
DRAFT ASSUMPTIONS — verify before publishing:

Style-guide notes:
- Bold-question + paragraph-answer pattern is structural rather than emphasis. Consistent with the bullet-lead-in pattern used in the export article and the troubleshooting article. If this stretches the bold-for-vocabulary rule too far, alternative is one H2 per question (would explode to ~13 H2s) or a definition-list (markdown support varies).
- Filename "Frequently asked questions.md" rather than "FAQ.md" — sentence case matches the new-article filename pattern, and the longer name reads more natural in cross-links. If you'd rather link as [[FAQ]], rename the file.
- No images on this article — questions are short and text-only; cross-linked articles carry the visuals.
- H2 count: 6 themed sections. Each holds 2-3 questions. Could collapse Cost and access into Storage and privacy if it feels thin — left separate because it answers different concerns.

Cross-links: light on this article by design — most questions point to the canonical article for their topic rather than answering deeply in-line.
-->
