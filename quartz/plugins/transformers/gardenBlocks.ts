import { QuartzTransformerPlugin } from "../types"
import { Root, Element, RootContent } from "hast"

/**
 * GardenBlocks — wraps each `## h2` section into a `<section class="gp-block">`
 * so the help-center articles get the Greenhouse-style scannable cards from
 * the Garden Path design without the author having to author any markup.
 */

const HEADING_DEPTH = 2 // wrap h2 sections only

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
                  if (
                    next.type === "element" &&
                    (next as Element).tagName === "h1"
                  ) {
                    break
                  }
                  sectionContent.push(next)
                  j++
                }

                out.push({
                  type: "element",
                  tagName: "section",
                  properties: { className: ["gp-block"] },
                  children: sectionContent,
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
