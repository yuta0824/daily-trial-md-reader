const STORAGE_KEY = 'mdReaderEnabled'

document.addEventListener('DOMContentLoaded', async () => {
  const toggle = document.getElementById('enabled') as HTMLInputElement

  const data = await chrome.storage.local.get(STORAGE_KEY)
  toggle.checked = data[STORAGE_KEY] !== false

  toggle.addEventListener('change', async () => {
    await chrome.storage.local.set({ [STORAGE_KEY]: toggle.checked })
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (tab?.id) chrome.tabs.reload(tab.id)
  })
})
