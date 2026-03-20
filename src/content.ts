import { preprocessMarkdown } from './preprocess'
import { renderMarkdown } from './markdown'
import { processCustomElements } from './custom-elements'
import { initCodeBlocks } from './code-block'
import { isDirectoryPage, buildFolderTree, buildSidebarTree } from './folder'

import './styles/article.css'
import './styles/highlight.css'
import './styles/folder.css'
import './styles/layout.css'

function init(): void {
  // Handle directory pages
  if (isDirectoryPage()) {
    const container = document.body
    buildFolderTree(container)
    document.title = document.title.replace('Index of ', 'DailyTrial: ')
    return
  }

  // Check if this is a .md or .markdown file
  const url = window.location.href
  if (!url.match(/\.(md|markdown)$/i)) return

  // Get raw markdown text
  const rawText = document.body.textContent ?? ''
  if (!rawText.trim()) return

  // Preprocess custom syntax
  const preprocessed = preprocessMarkdown(rawText)

  // Render markdown to HTML
  const html = renderMarkdown(preprocessed)

  // Build page structure
  const layout = document.createElement('div')
  layout.className = 'md-preview-layout'

  // Sidebar
  const sidebar = buildSidebarTree(url)
  layout.appendChild(sidebar)

  // Main content
  const main = document.createElement('main')
  main.className = 'md-preview-main'

  const article = document.createElement('div')
  article.className = 'article-container'
  article.innerHTML = html

  // Process custom elements (titlebox, plainbox, etc.)
  processCustomElements(article)

  // Initialize code block copy buttons
  initCodeBlocks(article)

  main.appendChild(article)
  layout.appendChild(main)

  // Replace body
  document.body.innerHTML = ''
  document.body.appendChild(layout)

  // Set title from first h1 or h2
  const firstHeading = article.querySelector('h1, h2')
  if (firstHeading) {
    document.title = `DailyTrial: ${firstHeading.textContent}`
  }
}

init()
