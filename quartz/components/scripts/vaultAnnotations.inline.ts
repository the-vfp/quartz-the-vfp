// Cold Storage — "Raph's Layer" annotation collapse behavior.
//
// On desktop the numbered notes show as an open column in the right gutter. At
// ≤1080px the gutter drops below the prose and each note body collapses; the
// note's number becomes the tap-to-expand control (brief Override #1). Inline
// ①②③ markers in the prose open + scroll to their matching note on mobile.
//
// Bound on the SPA "nav" event and cleaned up via window.addCleanup, following
// the checkbox.inline.ts pattern.

document.addEventListener("nav", () => {
  const layer = document.querySelector<HTMLElement>(".cs-annot-layer")
  if (!layer) return

  const isCollapsed = () => window.matchMedia("(max-width: 1080px)").matches

  const openNote = (li: HTMLElement) => {
    li.classList.add("is-open")
    li.querySelector(".cs-annot-num")?.setAttribute("aria-expanded", "true")
  }

  // number = tap-to-expand control
  layer.querySelectorAll<HTMLElement>("li.cs-annot").forEach((li) => {
    const btn = li.querySelector<HTMLButtonElement>(".cs-annot-num")
    if (!btn) return
    const onClick = () => {
      if (!isCollapsed()) return
      const open = li.classList.toggle("is-open")
      btn.setAttribute("aria-expanded", String(open))
    }
    btn.addEventListener("click", onClick)
    window.addCleanup(() => btn.removeEventListener("click", onClick))
  })

  // inline markers open + scroll to their note (collapsed layout only)
  document
    .querySelectorAll<HTMLAnchorElement>("sup.cs-annot-ref a, a.data-footnote-ref")
    .forEach((a) => {
      const onClick = (e: Event) => {
        if (!isCollapsed()) return
        const id = a.getAttribute("href")?.replace(/^#/, "")
        if (!id) return
        const li = document.getElementById(id)
        if (!li || !li.classList.contains("cs-annot")) return
        e.preventDefault()
        openNote(li)
        li.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      a.addEventListener("click", onClick)
      window.addCleanup(() => a.removeEventListener("click", onClick))
    })
})
