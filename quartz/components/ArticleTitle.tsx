import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  const eyebrow = (fileData.frontmatter as any)?.eyebrow as string | undefined
  const subtitle = (fileData.frontmatter as any)?.subtitle as string | undefined
  if (!title) return null
  return (
    <div class={classNames(displayClass, "article-title-block")}>
      {eyebrow ? <div class="article-eyebrow">{eyebrow}</div> : null}
      <h1 class="article-title">{title}</h1>
      {subtitle ? <p class="article-subtitle">{subtitle}</p> : null}
    </div>
  )
}

ArticleTitle.css = `
.article-title-block {
  margin: 2rem 0 0 0;
}
.article-title {
  margin: 0;
}
.article-eyebrow {
  display: inline-block;
  font-family: var(--bodyFont);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gp-ink-mute, #6b7060);
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.article-subtitle {
  font-family: var(--headerFont);
  font-style: italic;
  font-weight: 400;
  font-size: 1.35rem;
  color: var(--gp-ink-mute, #6b7060);
  margin: 0.25rem 0 0;
  line-height: 1.3;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
