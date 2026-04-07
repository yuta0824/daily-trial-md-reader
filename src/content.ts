import { preprocessMarkdown } from './preprocess'
import { renderMarkdown } from './markdown'
import { processCustomElements } from './custom-elements'
import { initCodeBlocks } from './code-block'

import './styles/layout.css'
import './styles/article.css'
import './styles/highlight.css'

function init(): void {
  const url = window.location.href
  if (!url.match(/\.(md|markdown)$/i)) return

  const rawText = document.body.textContent ?? ''
  if (!rawText.trim()) return

  // 画像の相対パスを解決するための基準URL
  const baseDir = url.substring(0, url.lastIndexOf('/') + 1)

  const preprocessed = preprocessMarkdown(rawText)
  const html = renderMarkdown(preprocessed)

  const article = document.createElement('div')
  article.className = 'article-container'
  article.innerHTML = html

  processCustomElements(article)
  initCodeBlocks(article)
  processH2Headings(article)

  // 画像srcを絶対パスに解決
  article.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src')
    if (src && !src.startsWith('http') && !src.startsWith('file:') && !src.startsWith('data:')) {
      img.src = baseDir + src
    }
  })

  // ページ構築
  const main = document.createElement('main')
  main.className = 'md-preview-main'
  main.appendChild(article)

  document.body.innerHTML = ''
  document.body.appendChild(main)

  const firstHeading = article.querySelector('h1, h2')
  if (firstHeading) {
    document.title = `DailyTrial: ${firstHeading.textContent}`
  }
}

function processH2Headings(container: HTMLElement): void {
  const h2s = container.querySelectorAll('h2')
  let index = 1
  h2s.forEach((h2) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'h2-wrapper'

    const badge = document.createElement('div')
    badge.className = 'h2-tips-badge'
    badge.textContent = 'TIPS'

    const number = document.createElement('span')
    number.className = 'h2-number'
    number.textContent = `${String(index).padStart(2, '0')}. `

    h2.parentNode?.insertBefore(wrapper, h2)
    wrapper.appendChild(badge)
    h2.insertBefore(number, h2.firstChild)
    wrapper.appendChild(h2)

    index++
  })
}

init()
