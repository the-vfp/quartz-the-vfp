import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { FullSlug, resolveRelative, simplifySlug } from "../util/path"

// A small "← Portfolio" affordance shown at the top of every page except the
// home page. Inside the Plant Tracker section (and elsewhere) the layout
// switches to the standard Quartz sidebar, so this link gives visitors an
// explicit way back to the portfolio landing page.
const PortfolioBackLink: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  const home = resolveRelative(fileData.slug!, simplifySlug("index" as FullSlug))
  return (
    <a href={home} class={classNames(displayClass, "portfolio-backlink")}>
      ← Portfolio
    </a>
  )
}

export default (() => PortfolioBackLink) satisfies QuartzComponentConstructor
