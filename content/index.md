---
title: Plant Tracker
subtitle: a watering app for twenty houseplants
eyebrow: Welcome
description: A personal app I built using Claude to manage watering schedules and keep a care log for twenty houseplants.
---

Plant Tracker is a personal app I built using Claude to manage the watering schedule and keep a care log for all of my houseplants.

You can use the actual app — it works on web and mobile, and I've prepopulated it with demo plants so you can get a feel for how it flows. I've also built a help center to demonstrate how I approach knowledge-base design. *Project Journey* walks through how I built the app and the help center.

<div class="video-embed">
<button type="button" class="video-facade" data-video-id="or_6jfqfYKA" aria-label="Play Plant Tracker welcome video">
<img src="https://img.youtube.com/vi/or_6jfqfYKA/maxresdefault.jpg" alt="" loading="lazy" />
<span class="video-facade-play" aria-hidden="true">
<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
</span>
</button>
</div>

<script>
function bindVideoFacades() {
  document.querySelectorAll('.video-facade:not([data-bound])').forEach(function (el) {
    el.setAttribute('data-bound', '1');
    el.addEventListener('click', function () {
      var id = el.dataset.videoId;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1';
      iframe.title = 'Plant Tracker — welcome video';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      el.replaceWith(iframe);
    });
  });
}
document.addEventListener('DOMContentLoaded', bindVideoFacades);
document.addEventListener('nav', bindVideoFacades);
</script>

<div class="cta-cards">
<a class="cta cta-primary" href="https://plant-tracker-blue.vercel.app">
<div class="cta-eyebrow">Try it</div>
<div class="cta-label">Plant Tracker App<span class="cta-arrow" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 2H2v8h8V8M7 2h3v3M10 2 5.5 6.5"/></svg></span></div>
</a>
<a class="cta" href="Help-Center/index">
<div class="cta-eyebrow">Read</div>
<div class="cta-label">Help Center<span class="cta-arrow" aria-hidden="true">→</span></div>
</a>
<a class="cta" href="Project-Journey/index">
<div class="cta-eyebrow">Read</div>
<div class="cta-label">Project Journey<span class="cta-arrow" aria-hidden="true">→</span></div>
</a>
</div>
