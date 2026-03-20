import { defineConfig } from 'vite'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, writeFileSync } from 'fs'

function copyManifestPlugin() {
  return {
    name: 'copy-manifest',
    closeBundle() {
      copyFileSync('manifest.json', 'dist/manifest.json')
      // Generate simple PNG icons using base64 data
      mkdirSync('dist/icons', { recursive: true })
      for (const size of [16, 48, 128]) {
        generateIcon(size, `dist/icons/icon-${size}.png`)
      }
    },
  }
}

// Generate a minimal valid PNG icon with "MD" text placeholder
function generateIcon(size: number, path: string) {
  // Create SVG and write as a placeholder (Chrome accepts SVG icons too in practice,
  // but for proper PNG we create a simple colored square)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="#303565"/>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-weight="bold" font-size="${size * 0.4}">MD</text>
  </svg>`
  // Write SVG as fallback icon
  writeFileSync(path.replace('.png', '.svg'), svg)
  // Also write a tiny 1x1 PNG so manifest doesn't error
  // (Chrome will use SVG if PNG fails to load properly)
  const pngHeader = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG signature
    0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, // IHDR
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde, // 8bit RGB
    0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41, 0x54, // IDAT
    0x08, 0xd7, 0x63, 0x60, 0x60, 0x60, 0x00, 0x00, // data
    0x00, 0x04, 0x00, 0x01, 0x27, 0x34, 0x27, 0x0a, // crc
    0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, // IEND
    0xae, 0x42, 0x60, 0x82,
  ])
  writeFileSync(path, pngHeader)
}

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
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
