import { defineConfig } from 'vite'
import { resolve } from 'path'
import { copyFileSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'

function copyManifestPlugin() {
  return {
    name: 'copy-manifest',
    closeBundle() {
      copyFileSync('manifest.json', 'dist/manifest.json')
      mkdirSync('dist/icons', { recursive: true })
      // favicon.ico → 128px PNG（macOS sips で変換）
      execSync(
        'sips -s format png -z 128 128 assets/favicon.ico --out dist/icons/icon-128.png',
        { stdio: 'ignore' }
      )
    },
  }
}

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 300000,
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content.ts'),
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
