// Slack-style single active TOC item: highlight the heading the reader has
// most recently scrolled past (or the first heading if they're at the top).

const ACTIVATION_OFFSET = 96 // px from top of viewport

let headers: HTMLElement[] = []
let rafQueued = false

function updateActiveTocItem() {
  rafQueued = false
  if (headers.length === 0) return

  let active: HTMLElement | null = null
  for (const header of headers) {
    const top = header.getBoundingClientRect().top
    if (top <= ACTIVATION_OFFSET) {
      active = header
    } else {
      break
    }
  }
  // Before the first heading scrolls past the offset, anchor on the first one
  // so the reader always sees a section highlighted.
  if (!active) active = headers[0]

  const activeSlug = active.id
  document.querySelectorAll(".toc a[data-for]").forEach((el) => {
    if (el.getAttribute("data-for") === activeSlug) {
      el.classList.add("in-view")
    } else {
      el.classList.remove("in-view")
    }
  })
}

function onScrollOrResize() {
  if (rafQueued) return
  rafQueued = true
  requestAnimationFrame(updateActiveTocItem)
}

function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
}

function setupToc() {
  for (const toc of document.getElementsByClassName("toc")) {
    const button = toc.querySelector(".toc-header")
    const content = toc.querySelector(".toc-content")
    if (!button || !content) return
    button.addEventListener("click", toggleToc)
    window.addCleanup(() => button.removeEventListener("click", toggleToc))
  }
}

document.addEventListener("nav", () => {
  setupToc()

  headers = Array.from(
    document.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"),
  )

  window.removeEventListener("scroll", onScrollOrResize)
  window.removeEventListener("resize", onScrollOrResize)
  window.addEventListener("scroll", onScrollOrResize, { passive: true })
  window.addEventListener("resize", onScrollOrResize, { passive: true })
  window.addCleanup(() => {
    window.removeEventListener("scroll", onScrollOrResize)
    window.removeEventListener("resize", onScrollOrResize)
  })

  updateActiveTocItem()
})
