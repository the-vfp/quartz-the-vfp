---
title: My Craft Notes
eyebrow: Documentation philosophy
description: Notes on how I approach designing and writing this help center.
draft: true
---
Getting Claude to make a style guide so that I can experiment with using AI to quickly write guides for the Plant Tracker
- write a few articles myself so that I can establish the "voice"
- how did I choose what articles to write?
- have Claude interrogate the style
- address the points that Claude brought up
	- Claude: **Image placement convention varies** — article 1 puts the screenshot **before** the steps; article 2 **interleaves** steps 1–2 → image → steps 3–4 (relying on `<ol start>` continuation). When does each apply? Without a rule, Claude will guess.
	  Me: For a step-by-step section, it's best to show a screenshot of some sort to ground the steps imo — article 1 follows this. Article 2 has a screenshot for each relevant page (the individual plant page -> edit plant page). Article 3 has a screenshot that grounds the next three sections because those sections aren't step-by-step and don't warrant individual screenshots.

My prompt to Claude Code (the one that works in my Plant Tracker repo):

> [!quote]
> Hey CC, I'm making a help center for the plant tracker app because I want to include both the app and the help center in my professional portfolio. I want to have a help center that shows how I go about building one from the ground up and I would also like to use this as a chance to experiment with how I can use AI to build an HC. So... let's work on that right now? 
>
> I've attached screenshots of what the HC currently looks like. It's published on Quartz. I actually have the repo in my git but I'm not sure if you can access it as well? Anyways, I don't think you need to access that repo. I just wanted to give you context on what the help center is.
>
> Right now I think the best thing to do is to get you to suggest what articles we should include. Some of the ones I'm thinking of:
> - adding a plant
> - deleting a plant 
> - installing the plant tracker as an app on your phone 
> - exporting and importing data
> - add photo 
>
> Aside from quick how-to stuff, the Notes and Watering Cadence Chart Overview cover the bigger workflows.

Claude's response:

> [!quote]
> Solid starting list. A few thoughts on what to add and how to organize it for a portfolio piece, since reviewers will read the _structure_ as much as the articles:
>
> **Getting started** (new-user cluster — make this its own section, not just one article)
>
> - Adding your first plant — onboarding-framed, not just "Adding a plant"
> - Installing the Plant Tracker as an app on your phone (your PWA one)
>
> **Managing plants** (CRUD)
>
> - Adding a plant
> - Editing a plant (name, type, emoji — assuming Edit covers all three)
> - Deleting a plant
>
> **Daily care** (the core loop — what users do most)
>
> - Logging a watering (Water Now — and backdating/undoing if those exist)
> - Adding photos
> - Notes Overview ✓ (move here)
>
> **Tracking & insights** (your conceptual workflows)
>
> - Watering Cadence Chart Overview ✓
> - Changing a plant's watering schedule ✓
>
> **Data**
>
> - Exporting and importing data
> - (worth a short companion article on _where data lives_ / local-first / what export captures — frames the export workflow)
>
> **Reference / FAQ** (optional but portfolio-strong)
>
> - Troubleshooting (notifications not firing, plant won't delete, photo won't upload — whatever the real edge cases are)
> - A short FAQ
>
> A few things to consider:
>
> 1. **Photo workflow may be more than one article.** If there's a photo timeline/gallery view, the "Add Photo" how-to is the entry point but viewing/deleting photos is its own thing. Worth checking.
> 2. **Emoji legend** — currently nested inside Notes Overview as a callout. That works, but if you ever need to reference it from elsewhere, promoting it to its own short reference page is cheap.
> 3. **My Methodology** looks empty in the sidebar — is that meant to be a single page or a section? Affects how it sits next to Help Center.
>
> For the AI-experimentation angle: the most interesting portfolio move would be to document _which articles you drafted with AI vs. wrote yourself_, and what your editorial pass looked like. Your "Craft Notes" page is the natural home for that.
>
> Want me to draft any of these, or sketch the full IA tree first so you can see the shape before we write?

- lol using Claude to write guides means that I have to translate the designer talk — "week strip", "pill", "drawer" — into laymen's terms
- update style guide after I edited a couple articles that it wrote on its own
- I think of my relationship with AI as a collaboration instead of my work being AI-assisted... gonna have to be super careful about this positioning because I don't want to seem like I'm anthropomorphizing the AI
- Style guide refinement paid off and Claude was able to write the rest of the guides with way less editing from me! I just had to take screenshots and make sure they were in the right place.