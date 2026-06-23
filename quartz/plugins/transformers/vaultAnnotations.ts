import { QuartzTransformerPlugin } from "../types"
import { Root, Element, ElementContent, Text } from "hast"

/**
 * VaultAnnotations — Cold Storage only.
 *
 * Raph's in-character notes are authored in the source vault as ordinary
 * markdown footnotes (`...the watchers.[^r2]` + `[^r2]: 03:51 — ...`). GFM gives
 * automatic ①②③ numbering and the inline anchor for free. This pass relocates
 * the collected footnotes block into a decoupled "Raph's Layer" gutter
 * (`<aside class="cs-annot-layer">`, floated to the right by the scoped SCSS):
 *
 *   - the footnotes <section> is lifted to the top of the article body so the
 *     float lands in the upper-right gutter beside the prose,
 *   - each note's leading `HH:MM` is split into a timestamp span,
 *   - the GFM back-reference arrow is dropped,
 *   - inline reference markers are tagged so CSS/JS can target them.
 *
 * Numbering is driven by a CSS counter on the relocated list, which matches the
 * inline footnote numbers (both run 1..n in definition order). Mobile collapse
 * (number = tap-to-expand) is handled by vaultAnnotations.inline.ts.
 *
 * Gated on Cold-Storage pages; every other section is left untouched.
 */

const isElement = (n: ElementContent | undefined, tag?: string): n is Element =>
  !!n && n.type === "element" && (!tag || n.tagName === tag)

const hasClass = (el: Element, cls: string): boolean => {
  const c = el.properties?.className
  return Array.isArray(c) && c.includes(cls)
}

// find the first non-blank Text node in a subtree (depth-first), returning it
// for in-place edit. Skips the whitespace-only formatting nodes GFM inserts
// between <li> and its <p>, which would otherwise swallow the HH:MM match.
function firstText(node: ElementContent): Text | undefined {
  if (node.type === "text") return node.value.trim() === "" ? undefined : node
  if (node.type === "element") {
    for (const child of node.children) {
      const t = firstText(child as ElementContent)
      if (t) return t
    }
  }
  return undefined
}

const TIME_RE = /^\s*(\d{1,2}:\d{2})\s*[—–-]\s*/

export const VaultAnnotations: QuartzTransformerPlugin = () => {
  return {
    name: "VaultAnnotations",
    htmlPlugins() {
      return [
        () => (tree: Root, file) => {
          const slug = (file.data.slug as string | undefined) ?? ""
          if (!slug.startsWith("Cold-Storage")) return

          // Locate the GFM footnotes section. GardenBlocks runs before this and
          // sweeps it into the trailing .gp-block wrapper, so search recursively
          // and remember the array it lives in to splice it out cleanly.
          const isFootnotes = (n: ElementContent): boolean =>
            isElement(n, "section") &&
            (hasClass(n, "footnotes") || n.properties?.dataFootnotes !== undefined)

          let host: ElementContent[] | undefined
          let fnIdx = -1
          const locate = (kids: ElementContent[]) => {
            for (let i = 0; i < kids.length && fnIdx === -1; i++) {
              const k = kids[i]
              if (isFootnotes(k)) {
                host = kids
                fnIdx = i
                return
              }
              if (isElement(k)) locate(k.children as ElementContent[])
            }
          }
          locate(tree.children as ElementContent[])
          if (!host || fnIdx === -1) return
          const section = host[fnIdx] as Element

          const ol = section.children.find((c) => isElement(c, "ol")) as Element | undefined
          if (!ol) return

          // reshape each <li> into a numbered, timestamped note
          const notes: Element[] = []
          for (const li of ol.children) {
            if (!isElement(li, "li")) continue

            // drop the back-reference arrow(s)
            const stripBackref = (el: Element) => {
              el.children = el.children.filter(
                (c) => !(isElement(c) && (c.properties?.dataFootnoteBackref !== undefined || hasClass(c, "data-footnote-backref"))),
              ) as ElementContent[]
              for (const c of el.children) if (isElement(c)) stripBackref(c)
            }
            stripBackref(li)

            // split a leading HH:MM into its own timestamp span
            let timeNode: Element | undefined
            const t = firstText(li)
            if (t) {
              const m = t.value.match(TIME_RE)
              if (m) {
                t.value = t.value.slice(m[0].length)
                timeNode = {
                  type: "element",
                  tagName: "span",
                  properties: { className: ["cs-annot-time"] },
                  children: [{ type: "text", value: m[1] }],
                }
              }
            }

            const numBtn: Element = {
              type: "element",
              tagName: "button",
              properties: { type: "button", className: ["cs-annot-num"], "aria-expanded": "true" },
              children: [],
            }
            const body: Element = {
              type: "element",
              tagName: "div",
              properties: { className: ["cs-annot-body"] },
              children: li.children as ElementContent[],
            }

            notes.push({
              type: "element",
              tagName: "li",
              properties: { className: ["cs-annot"], id: li.properties?.id },
              children: [numBtn, ...(timeNode ? [timeNode] : []), body],
            })
          }

          if (notes.length === 0) return

          const aside: Element = {
            type: "element",
            tagName: "aside",
            properties: { className: ["cs-annot-layer"] },
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { className: ["cs-annot-head"] },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["cs-annot-badge"] },
                    children: [{ type: "text", value: "R" }],
                  },
                  { type: "text", value: "RAPH'S LAYER" },
                ],
              },
              {
                type: "element",
                tagName: "ol",
                properties: { className: ["cs-annot-list"] },
                children: notes,
              },
            ],
          }

          // remove the raw footnotes section, float the layer to the article top
          host.splice(fnIdx, 1)
          ;(tree.children as ElementContent[]).unshift(aside)

          // tag inline reference markers (<sup> wrapping an a[data-footnote-ref])
          const tagRefs = (kids: ElementContent[]) => {
            for (const child of kids) {
              if (!isElement(child)) continue
              if (
                child.tagName === "sup" &&
                child.children.some(
                  (g) => isElement(g, "a") && g.properties?.dataFootnoteRef !== undefined,
                )
              ) {
                const cls = (child.properties.className as string[] | undefined) ?? []
                child.properties.className = [...cls, "cs-annot-ref"]
              }
              tagRefs(child.children as ElementContent[])
            }
          }
          tagRefs(tree.children as ElementContent[])
        },
      ]
    },
  }
}
