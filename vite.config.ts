import { defineConfig } from 'vite'
import { resolve } from 'path'
import { copyFileSync, mkdirSync } from 'fs'

function copyManifestPlugin() {
  return {
    name: 'copy-manifest',
    closeBundle() {
      copyFileSync('manifest.json', 'dist/manifest.json')
      copyFileSync('src/popup.html', 'dist/popup.html')
      mkdirSync('dist/icons', { recursive: true })
      copyFileSync('assets/icon-128.png', 'dist/icons/icon-128.png')
    },
  }
}

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content.ts'),
        popup: resolve(__dirname, 'src/popup.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
    cssCodeSplit: false,
  },
  plugins: [copyManifestPlugin()],
})
