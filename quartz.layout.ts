import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { FileTrieNode } from "./quartz/util/fileTrie"

// Sort the explorer by filename (slugSegment) instead of frontmatter
// title, so numeric prefixes like "1. ", "2. " on filenames drive the
// order while frontmatter `title:` keeps the displayed names clean.
// Folders still come before files at every level.
const explorerSortByFilename = (a: FileTrieNode, b: FileTrieNode) => {
  if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
    return a.slugSegment.localeCompare(b.slugSegment, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }
  return a.isFolder ? -1 : 1
}

// Explorer filter: on Help Center pages, collapse the rail down to just the
// Help Center branch so it reads like the app's own docs nav — no Cold Storage,
// no Project Journey, and the "Plant Tracker" parent folder is kept in the tree
// only so Help Center stays reachable (its row is hidden + un-indented in CSS so
// Help Center reads as the top-level item). Everywhere else the full tree shows.
// Runs client-side (Quartz serializes it with .toString()), so it reads the live
// page's data-slug off <body> rather than receiving the current slug as an arg.
const explorerFilterForHelpCenter = (node: FileTrieNode) => {
  if (node.slugSegment === "tags") return false
  const slug =
    (typeof document !== "undefined" && document.body?.getAttribute("data-slug")) || ""
  if (slug.startsWith("Plant-Tracker/Help-Center")) {
    return node.slug === "Plant-Tracker/index" || node.slug.startsWith("Plant-Tracker/Help-Center")
  }
  return true
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {},
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.PortfolioBackLink(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
      ],
    }),
    Component.Explorer({
      sortFn: explorerSortByFilename,
      filterFn: explorerFilterForHelpCenter,
    }),
  ],
  right: [Component.DesktopOnly(Component.TableOfContents())],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.PortfolioBackLink(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
      ],
    }),
    Component.Explorer({
      sortFn: explorerSortByFilename,
      filterFn: explorerFilterForHelpCenter,
    }),
  ],
  right: [],
}
