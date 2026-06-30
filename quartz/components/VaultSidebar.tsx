// @ts-ignore — bundled at build time by Quartz's esbuild inline loader
import annotScript from "./scripts/vaultAnnotations.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { SimpleSlug, resolveRelative } from "../util/path"

// Cold Storage "MARTE.vault" left rail — replaces the generic Quartz
// Search/Explorer on Cold-Storage pages with the sleek curated vault nav from
// the Design handoff: a VAULT section list (live file counts + active state), a
// SEALED group, and an encrypted footer. Rendered only for Cold-Storage pages
// (gated in quartz.layout.ts); styling lives in the scoped block in custom.scss.
//
// It also carries the annotation-collapse client script (afterDOMLoaded) so
// "Raph's Layer" keeps its mobile tap-to-expand behavior now that the old
// VaultChrome (which used to host it) is gone.

type NavItem = {
  label: string
  icon: string
  target: SimpleSlug // section folder slug
}

const VAULT: NavItem[] = [
  { label: "Home", icon: "●", target: "Cold-Storage" as SimpleSlug },
  { label: "Chronicle", icon: "○", target: "Cold-Storage/Chronicle" as SimpleSlug },
  { label: "Coterie", icon: "◇", target: "Cold-Storage/Coterie" as SimpleSlug },
  { label: "Contacts", icon: "□", target: "Cold-Storage/Contacts" as SimpleSlug },
  { label: "Locations", icon: "△", target: "Cold-Storage/Locations" as SimpleSlug },
  { label: "Factions", icon: "▢", target: "Cold-Storage/Factions" as SimpleSlug },
]
const SEALED: NavItem = {
  label: "Sealed",
  icon: "✕",
  target: "Cold-Storage/Sealed" as SimpleSlug,
}

const VaultSidebar: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const cur = fileData.slug!

  const isActive = (target: SimpleSlug) => {
    // section home: the Cold Storage landing (slug "Cold-Storage/index")
    if (target === "Cold-Storage") return cur === "Cold-Storage/index" || cur === "Cold-Storage"
    return cur === `${target}/index` || cur.startsWith(`${target}/`)
  }

  const renderItem = (item: NavItem) => {
    const active = isActive(item.target)
    return (
      <li>
        <a
          href={resolveRelative(cur, item.target)}
          class={active ? "vault-nav-item active" : "vault-nav-item"}
          aria-current={active ? "page" : undefined}
        >
          <span class="vault-nav-icon">{item.icon}</span>
          <span class="vault-nav-text">{item.label}</span>
        </a>
      </li>
    )
  }

  return (
    <nav class={classNames(displayClass, "vault-nav")} aria-label="Vault sections">
      <p class="vault-nav-label">Vault</p>
      <ul>{VAULT.map(renderItem)}</ul>

      <p class="vault-nav-label">Sealed</p>
      <ul>{renderItem(SEALED)}</ul>

      <div class="vault-nav-foot">
        <span class="vault-nav-enc">
          <span class="vault-nav-enc-dot"></span>Encrypted
        </span>
        <span class="vault-nav-foot-line">read-only mirror</span>
        <span class="vault-nav-foot-line">auto-seal at dawn</span>
      </div>
    </nav>
  )
}

VaultSidebar.afterDOMLoaded = annotScript

export default (() => VaultSidebar) satisfies QuartzComponentConstructor
