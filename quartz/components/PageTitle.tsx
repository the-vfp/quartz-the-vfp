import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        {/* Anne Elefante mark — hand-drawn fine-line elephant head (trunk curled
            up in a spiral at eye level, soft ear, eye dot), based on Ellene's
            tattoo; "Curl" redraw picked July 2026. currentColor-driven so it
            recolors per section: sage on cream, gold on near-black in the
            Cold Storage vault. stroke-width bumped to 2.6 for inline/small size. */}
        <svg
          class="page-title-leaf"
          width="36"
          height="36"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-width="2.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M36 14 C 26 11 17 17 18 27 C 18 33 15 35.5 10.5 35 C 4.5 34 2.5 25.5 8.5 24 C 13 22.8 14.5 27.5 10 29.2" />
            <path d="M36 14 C 39 14 40 15 41 16 C 54 13 58 29 49 37 C 45 39 42 37 41 32 C 39 34 37 38 34 38" />
          </g>
          <circle cx="24" cy="28" r="1.5" fill="currentColor" />
        </svg>
        <span>{title}</span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.65rem;
  margin: 0;
  font-family: var(--titleFont);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
}
.page-title a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--secondary);
}
.page-title-leaf {
  flex-shrink: 0;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
