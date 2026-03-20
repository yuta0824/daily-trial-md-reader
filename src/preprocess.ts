export const escapeHtml = (str: string): string =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')

const CUSTOM_TABLE_REGEX = /:::custom-table[^\S\r\n]*\n([\s\S]*?)\n:::/gi
const PLAIN_BOX_REGEX = /:::([a-z0-9_-]+)[^\S\r\n]*\n([\s\S]*?)\n:::/gi
const TITLE_BOX_REGEX = /:::title\[([^\]]+)\][^\S\r\n]*\n([\s\S]*?)\n:::/gi
const INLINE_SPAN_REGEX = /\[([a-z0-9_-]+)::([^\]]+)\]/gi

const separateOrderedLists = (content: string): string => {
  return content.replace(/(\n\d+\..+)(\n\n+)(1\. )/g, '$1$2<!-- -->\n$3')
}

export const preprocessMarkdown = (content: string): string => {
  const withSeparatedLists = separateOrderedLists(content)

  const withInlineSpans = withSeparatedLists.replace(INLINE_SPAN_REGEX, (_, variant, text) => {
    const safeVariant = escapeHtml(variant.trim().toLowerCase())
    const safeText = escapeHtml(text)
    return `<inlinespan data-variant="${safeVariant}">${safeText}</inlinespan>`
  })

  const withTitleBoxes = withInlineSpans.replace(TITLE_BOX_REGEX, (_, title, inner) => {
    const safeTitle = escapeHtml(title.trim())
    const encodedContent = encodeURIComponent(inner.trim())
    return `<div><titlebox data-title="${safeTitle}" data-content="${encodedContent}"></titlebox></div>`
  })

  const withCustomTableBoxes = withTitleBoxes.replace(CUSTOM_TABLE_REGEX, (_, inner) => {
    const encodedContent = encodeURIComponent(inner.trim())
    return `<div><customtablebox data-content="${encodedContent}"></customtablebox></div>`
  })

  return withCustomTableBoxes.replace(PLAIN_BOX_REGEX, (_, variant, inner) => {
    const safeVariant = escapeHtml(variant.trim().toLowerCase())
    const encodedContent = encodeURIComponent(inner.trim())
    return `<div><plainbox data-variant="${safeVariant}" data-content="${encodedContent}"></plainbox></div>`
  })
}
