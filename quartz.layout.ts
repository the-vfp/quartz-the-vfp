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

// Explorer filter: inside a self-contained section (Help Center or Cold
// Storage) collapse the rail down to just that section's tree, so it reads like
// that section's own nav — no cross-section bleed. Everywhere else the full tree
// shows. Runs client-side (Quartz serializes it with .toString()), so it reads
// the live page's data-slug off <body> rather than receiving the current slug
// as an argument.
const explorerFilterBySection = (node: FileTrieNode) => {
  if (node.slugSegment === "tags") return false
  const slug =
    (typeof document !== "undefined" && document.body?.getAttribute("data-slug")) || ""
  for (const section of ["Help-Center", "Cold-Storage"]) {
    if (slug.startsWith(section)) {
      return node.slug.startsWith(section)
    }
  }
  return true
}

const isColdStorage = (page: { fileData: { slug?: string } }) =>
  (page.fileData.slug ?? "").startsWith("Cold-Storage")
const notColdStorage = (page: { fileData: { slug?: string } }) => !isColdStorage(page)

// Section-aware left rail: every section gets the generic Quartz search +
// explorer; Cold Storage swaps those for the sleek curated "MARTE.vault" nav.
// PageTitle (the Anne Elefante portfolio wordmark + home link) stays for all.
const sectionLeftSidebar = [
  Component.PageTitle(),
  Component.MobileOnly(Component.Spacer()),
  Component.ConditionalRender({
    component: Component.Flex({
      components: [{ Component: Component.Search(), grow: true }],
    }),
    condition: notColdStorage,
  }),
  Component.ConditionalRender({
    component: Component.Explorer({
      sortFn: explorerSortByFilename,
      filterFn: explorerFilterBySection,
    }),
    condition: notColdStorage,
  }),
  // Cold Storage gets its own discreet search above the vault nav. It's the
  // same Search component (so it inherits the section-scoping in
  // search.inline.ts → returns only Cold-Storage results); the MARTE.vault
  // restyle of the collapsed button lives in custom.scss.
  Component.ConditionalRender({
    component: Component.Search(),
    condition: isColdStorage,
  }),
  Component.ConditionalRender({
    component: Component.VaultSidebar(),
    condition: isColdStorage,
  }),
]

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
  left: sectionLeftSidebar,
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
  left: sectionLeftSidebar,
  right: [],
}
