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
        <svg
          class="page-title-leaf"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          {/* body */}
          <ellipse cx="14.5" cy="12.5" rx="6.8" ry="5.4" fill="#4F6A40" />
          {/* head */}
          <circle cx="8.5" cy="12.2" r="4.6" fill="#4F6A40" />
          {/* ear */}
          <circle cx="9.2" cy="9.6" r="3" fill="#4F6A40" />
          {/* legs */}
          <rect x="7.4" y="15.5" width="2.6" height="4.4" rx="1.2" fill="#4F6A40" />
          <rect x="15.4" y="15.8" width="2.6" height="4.1" rx="1.2" fill="#4F6A40" />
          {/* trunk */}
          <path
            d="M5.6 13c-1.7 1.1-2.4 2.9-2 4.8"
            stroke="#4F6A40"
            stroke-width="2.4"
            stroke-linecap="round"
          />
          {/* eye */}
          <circle cx="7.4" cy="11.2" r="0.8" fill="#F5F0E2" />
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
