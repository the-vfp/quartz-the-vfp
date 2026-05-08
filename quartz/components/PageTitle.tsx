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
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 21c0-9 7-15 18-15-1 11-7 17-18 15Z"
            fill="#9DBA82"
            stroke="#4F6A40"
            stroke-width="1.4"
            stroke-linejoin="round"
          />
          <path
            d="M3 21c4-3 8-6 12-9"
            stroke="#4F6A40"
            stroke-width="1.4"
            stroke-linecap="round"
          />
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
