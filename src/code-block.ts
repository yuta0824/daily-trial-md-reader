export function initCodeBlocks(container: HTMLElement): void {
  container.querySelectorAll('.code-block__copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const code = btn.getAttribute('data-code') ?? ''
      try {
        await navigator.clipboard.writeText(code)
        btn.textContent = 'コピーできました'
        setTimeout(() => {
          btn.textContent = 'コピー'
        }, 2000)
      } catch (err) {
        console.error('コピーに失敗しました: ', err)
      }
    })
  })
}
