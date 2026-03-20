interface FileEntry {
  name: string
  path: string
  isDir: boolean
  children?: FileEntry[]
}

export function isDirectoryPage(): boolean {
  // Chrome shows directory listings with a title like "Index of /path/"
  return document.title.startsWith('Index of ')
}

export function buildFolderTree(container: HTMLElement): void {
  const links = Array.from(document.querySelectorAll('a')) as HTMLAnchorElement[]
  const entries: FileEntry[] = []

  for (const link of links) {
    const name = link.textContent?.trim() ?? ''
    const href = link.href

    // Skip parent directory link
    if (name === '..') continue
    if (!name) continue

    const isDir = name.endsWith('/') || href.endsWith('/')
    entries.push({ name: name.replace(/\/$/, ''), path: href, isDir })
  }

  // Sort: directories first, then files, alphabetically
  entries.sort((a, b) => {
    if (a.isDir !== b.isDir) return a.isDir ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  renderFolderView(container, entries)
}

function renderFolderView(container: HTMLElement, entries: FileEntry[]): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'folder-view'

  const title = document.createElement('h1')
  title.className = 'folder-title'
  title.textContent = decodeURIComponent(document.title.replace('Index of ', ''))
  wrapper.appendChild(title)

  const tree = document.createElement('ul')
  tree.className = 'folder-tree'

  for (const entry of entries) {
    const li = document.createElement('li')
    li.className = entry.isDir ? 'folder-item is-dir' : 'folder-item is-file'

    const link = document.createElement('a')
    link.href = entry.path
    link.className = 'folder-link'

    const icon = document.createElement('span')
    icon.className = entry.isDir ? 'folder-icon folder-icon--dir' : 'folder-icon folder-icon--file'
    icon.textContent = entry.isDir ? '📁' : '📄'

    const name = document.createElement('span')
    name.className = 'folder-name'
    name.textContent = entry.name

    link.appendChild(icon)
    link.appendChild(name)
    li.appendChild(link)
    tree.appendChild(li)
  }

  wrapper.appendChild(tree)
  container.appendChild(wrapper)
}

export function buildSidebarTree(currentPath: string): HTMLElement {
  const sidebar = document.createElement('nav')
  sidebar.className = 'sidebar'

  const title = document.createElement('div')
  title.className = 'sidebar__title'
  title.textContent = 'DailyTrial MD Preview'
  sidebar.appendChild(title)

  // Show current file path
  const pathDisplay = document.createElement('div')
  pathDisplay.className = 'sidebar__path'

  const filePath = decodeURIComponent(currentPath.replace('file://', ''))
  const parts = filePath.split('/').filter(Boolean)
  const fileName = parts.pop() ?? ''

  // Build breadcrumb
  let accumulated = 'file:///'
  for (const part of parts) {
    accumulated += part + '/'
    const crumb = document.createElement('a')
    crumb.href = accumulated
    crumb.className = 'sidebar__crumb'
    crumb.textContent = part + '/'
    pathDisplay.appendChild(crumb)
  }

  const current = document.createElement('span')
  current.className = 'sidebar__current'
  current.textContent = fileName
  pathDisplay.appendChild(current)

  sidebar.appendChild(pathDisplay)

  return sidebar
}
