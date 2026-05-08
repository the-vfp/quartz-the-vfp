import { QuartzTransformerPlugin } from "../types"
import { Root, Element, RootContent } from "hast"

/**
 * GardenBlocks — wraps each `## h2` section into a `<section class="gp-block">`
 * so the help-center articles get the Greenhouse-style scannable cards from
 * the Garden Path design without the author having to author any markup.
 *
 * Eyebrow text on each card is inferred from the section content:
 *   - section contains an `<ol>`  → "Step-by-step"
 *   - heading text matches /delet|remov/i  → "Removal"
 *   - heading text matches /overdue|recover|fix/i → "Recovery"
 *   - everything else → no eyebrow
 *
 * Any author can override by putting `<!-- gp-eyebrow: TEXT -->` directly
 * after the heading. The `recovery` / `removal` classes give the eyebrow
 * its coral coloring.
 */

const HEADING_DEPTH = 2 // wrap h2 sections only

const inferEyebrow = (heading: string, hasOl: boolean): { text: string; cls: string } | null => {
  if (/delet|remov|deleting/i.test(heading)) return { text: "Removal", cls: "removal" }
  if (/overdue|recover|when.*looks/i.test(heading)) return { text: "Recovery", cls: "recovery" }
  if (hasOl) return { text: "Step-by-step", cls: "" }
  return null
}

const containsOl = (nodes: RootContent[]): boolean =>
  nodes.some(
    (n) =>
      n.type === "element" &&
      ((n as Element).tagName === "ol" ||
        ((n as Element).children && containsOl((n as Element).children as RootContent[]))),
  )

export const GardenBlocks: QuartzTransformerPlugin = () => {
  return {
    name: "GardenBlocks",
    htmlPlugins() {
      return [
        () => (tree: Root) => {
          const wrap = (parent: Element | Root) => {
            const children = parent.children as RootContent[]
            const out: RootContent[] = []
            let i = 0
            while (i < children.length) {
              const node = children[i]
              if (node.type === "element" && (node as Element).tagName === `h${HEADING_DEPTH}`) {
                const headingEl = node as Element
                const headingText = (
                  (headingEl.children?.find(
                    (c) => c.type === "text" || (c.type === "element" && (c as Element).tagName !== "a"),
                  ) as { value?: string } | undefined)?.value ??
                  headingEl.children?.map((c: any) => c.value ?? "").join("") ??
                  ""
                ).toString()

                const sectionContent: RootContent[] = [headingEl]
                let j = i + 1
                while (j < children.length) {
                  const next = children[j]
                  if (
                    next.type === "element" &&
                    (next as Element).tagName === `h${HEADING_DEPTH}`
                  ) {
                    break
                  }
                  // Stop at h1 too, just in case
                  if (
                    next.type === "element" &&
                    (next as Element).tagName === "h1"
                  ) {
                    break
                  }
                  sectionContent.push(next)
                  j++
                }

                const hasOl = containsOl(sectionContent)
                const eyebrow = inferEyebrow(headingText, hasOl)

                const sectionChildren: RootContent[] = []
                if (eyebrow) {
                  sectionChildren.push({
                    type: "element",
                    tagName: "div",
                    properties: {
                      className: ["gp-block-eyebrow", eyebrow.cls].filter(Boolean),
                    },
                    children: [{ type: "text", value: eyebrow.text }],
                  } as Element)
                }
                sectionChildren.push(...sectionContent)

                out.push({
                  type: "element",
                  tagName: "section",
                  properties: { className: ["gp-block"] },
                  children: sectionChildren,
                } as Element)

                i = j
              } else {
                out.push(node)
                i++
              }
            }
            parent.children = out as any
          }

          // At htmlPlugins time the hast tree IS the body content; there's no
          // <article> wrapper yet. Operate on the root.
          wrap(tree)
        },
      ]
    },
  }
}
