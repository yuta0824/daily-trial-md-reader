#!/usr/bin/env node
// 指定ディレクトリ配下の .md ファイルを再帰スキャンして tree.json を生成する
// 使い方: node generate-tree.js /path/to/content/root

const fs = require('fs')
const path = require('path')

const targetDir = process.argv[2]
if (!targetDir) {
  console.error('Usage: node generate-tree.js <directory>')
  process.exit(1)
}

const rootDir = path.resolve(targetDir)

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const nodes = []

  // ディレクトリを先に、次に .md ファイル
  const dirs = entries.filter(e => e.isDirectory() && !e.name.startsWith('.'))
  const mds = entries.filter(e => e.isFile() && e.name.endsWith('.md'))

  for (const d of dirs.sort((a, b) => a.name.localeCompare(b.name))) {
    const children = scan(path.join(dir, d.name))
    if (children.length > 0) {
      nodes.push({ name: d.name, children })
    }
  }

  for (const f of mds.sort((a, b) => a.name.localeCompare(b.name))) {
    const relPath = path.relative(rootDir, path.join(dir, f.name))
    nodes.push({ name: f.name, path: relPath })
  }

  return nodes
}

const tree = scan(rootDir)
const outPath = path.join(rootDir, 'tree.json')
fs.writeFileSync(outPath, JSON.stringify(tree, null, 2))
console.log(`Generated: ${outPath}`)
console.log(`${JSON.stringify(tree, null, 2).split('\n').length} lines`)
