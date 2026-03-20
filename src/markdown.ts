import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const LANGUAGE_NAME_OVERRIDES: Record<string, string> = {
  html: 'HTML',
  php: 'PHP',
  xml: 'XML',
  css: 'CSS',
  js: 'JavaScript',
  javascript: 'JavaScript',
  ruby: 'Ruby',
  mysql: 'MySQL',
  bash: 'Bash',
  json: 'JSON',
  sass: 'Sass',
  ejs: 'EJS',
  txt: 'TEXT',
  apache: 'Apache',
}

export const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  highlight(str: string, lang: string): string {
    // Parse "language:filename" pattern (e.g. "html:index.html")
    let language = lang
    let fileName = ''
    if (lang.includes(':')) {
      const parts = lang.split(':')
      language = parts[0]
      fileName = parts.slice(1).join(':')
    }

    let highlighted = ''
    if (language && hljs.getLanguage(language)) {
      try {
        highlighted = hljs.highlight(str, { language }).value
      } catch {
        highlighted = md.utils.escapeHtml(str)
      }
    } else {
      highlighted = md.utils.escapeHtml(str)
    }

    const displayName = fileName || LANGUAGE_NAME_OVERRIDES[language] || hljs.getLanguage(language)?.name || language

    // Return code-block structure with copy button
    return `<div class="code-block">` +
      `<div class="code-block__top">` +
      `<p class="code-block__name">${md.utils.escapeHtml(displayName)}</p>` +
      `<button class="code-block__copy" data-code="${md.utils.escapeHtml(str)}">コピー</button>` +
      `</div>` +
      `<pre class="code-block__pre"><code class="hljs ${md.utils.escapeHtml(language)}">${highlighted}</code></pre>` +
      `</div>`
  },
})

// Override fence renderer to return the highlighted result directly (no extra <pre><code> wrapper)
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx]
  const info = token.info ? token.info.trim() : ''
  return md.options.highlight!(token.content, info, '') as string
}

// Enable task lists: [ ] and [x]
md.renderer.rules.list_item_open = (tokens, idx) => {
  const nextToken = tokens[idx + 1]
  if (nextToken && nextToken.content) {
    if (nextToken.content.startsWith('[ ] ') || nextToken.content.startsWith('[x] ') || nextToken.content.startsWith('[X] ')) {
      const checked = nextToken.content.startsWith('[x] ') || nextToken.content.startsWith('[X] ')
      nextToken.content = nextToken.content.slice(4)
      if (nextToken.children && nextToken.children.length > 0) {
        nextToken.children[0].content = nextToken.children[0].content.slice(4)
      }
      const checkedAttr = checked ? ' checked disabled' : ' disabled'
      return `<li class="task-list-item"><input type="checkbox"${checkedAttr}> `
    }
  }
  return '<li>'
}

export function renderMarkdown(content: string): string {
  return md.render(content)
}
