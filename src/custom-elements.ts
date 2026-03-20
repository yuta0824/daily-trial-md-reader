import { renderMarkdown } from './markdown'

export function processCustomElements(container: HTMLElement): void {
  processTitleBoxes(container)
  processPlainBoxes(container)
  processCustomTableBoxes(container)
  processInlineSpans(container)
}

function processTitleBoxes(container: HTMLElement): void {
  container.querySelectorAll('titlebox').forEach((el) => {
    const title = el.getAttribute('data-title') ?? ''
    const encodedContent = el.getAttribute('data-content') ?? ''
    const decodedContent = encodedContent ? decodeURIComponent(encodedContent) : ''

    const box = document.createElement('div')
    box.className = 'title-box'

    const heading = document.createElement('p')
    heading.className = 'title-box__heading'
    heading.textContent = title

    const content = document.createElement('div')
    content.className = 'title-box__content'
    if (decodedContent) {
      content.innerHTML = renderMarkdown(decodedContent)
      // Recursively process nested custom elements
      processCustomElements(content)
    }

    box.appendChild(heading)
    box.appendChild(content)
    el.replaceWith(box)
  })
}

function processPlainBoxes(container: HTMLElement): void {
  container.querySelectorAll('plainbox').forEach((el) => {
    const variant = el.getAttribute('data-variant') ?? ''
    const encodedContent = el.getAttribute('data-content') ?? ''
    const decodedContent = encodedContent ? decodeURIComponent(encodedContent) : ''

    const box = document.createElement('div')
    box.className = 'plain-box'
    if (variant === 'green') {
      box.classList.add('is-green')
    }

    if (decodedContent) {
      box.innerHTML = renderMarkdown(decodedContent)
      processCustomElements(box)
    }

    el.replaceWith(box)
  })
}

function processCustomTableBoxes(container: HTMLElement): void {
  container.querySelectorAll('customtablebox').forEach((el) => {
    const encodedContent = el.getAttribute('data-content') ?? ''
    const decodedContent = encodedContent ? decodeURIComponent(encodedContent) : ''

    const wrapper = document.createElement('div')
    wrapper.className = 'custom-table'

    if (decodedContent) {
      wrapper.innerHTML = renderMarkdown(decodedContent)
      processCustomElements(wrapper)
    }

    el.replaceWith(wrapper)
  })
}

function processInlineSpans(container: HTMLElement): void {
  container.querySelectorAll('inlinespan').forEach((el) => {
    const variant = el.getAttribute('data-variant') ?? ''
    const span = document.createElement('span')

    switch (variant) {
      case 'marker':
        span.className = 'markerYellow'
        break
      case 'important':
        span.className = 'important'
        break
      default:
        span.className = variant
        break
    }

    span.innerHTML = el.innerHTML
    el.replaceWith(span)
  })
}
