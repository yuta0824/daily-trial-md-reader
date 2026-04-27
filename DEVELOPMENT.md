# 開発者向けドキュメント

DailyTrial MD Preview の開発・ビルド手順をまとめます。

## 前提

- Node.js 18 以上（Vite 5 の要件）
- npm 9 以上（Node.js 18 以降に同梱）

パッケージマネージャは npm を使用しています（`package-lock.json` あり）。

## セットアップ

```bash
npm install
```

## ビルド

```bash
npm run build       # src/ から dist/ を生成
npm run dev         # ファイル変更を監視して自動ビルド
```

ビルド成果物は `dist/` に出力されます。Chrome に読み込むのは常に `dist/` です。

## ディレクトリ構成

```
daily-trial-md-reader/
├── src/                # TypeScript / HTML / CSS のソース
├── assets/             # アイコンなどの静的ファイル
├── examples/           # 独自Markdown構文のサンプル
├── dist/               # ビルド成果物（Chrome が読み込む先）
├── manifest.json       # 拡張機能のマニフェスト（編集対象）
├── package.json        # 依存パッケージとスクリプト定義
├── tsconfig.json       # TypeScript 設定
└── vite.config.ts      # Vite 設定（manifest と静的ファイルを dist/ にコピー）
```

## src/ のファイル構成

```
src/
├── content.ts           # コンテンツスクリプトのエントリポイント（.md ページを検出して描画パイプラインを実行）
├── preprocess.ts        # 独自構文（:::title[...]、:::custom-table、:::variant、[variant::text]）を独自タグへ変換
├── markdown.ts          # markdown-it 設定（構文ハイライト・コードブロックのファイル名/コピーボタン・タスクリスト）
├── custom-elements.ts   # preprocess で挿入した独自タグを最終的な DOM 要素へ展開
├── code-block.ts        # コードブロックのコピーボタンのクリックハンドラ
├── popup.ts             # ポップアップUI（有効/無効トグル）のロジック
├── popup.html           # ポップアップUIのマークアップ
└── styles/
    ├── layout.css       # ページ全体のレイアウト
    ├── article.css      # 記事本文・独自要素（title-box / plain-box / custom-table 等）
    └── highlight.css    # コードブロックの構文ハイライト用テーマ
```

## ビルド忘れに注意

`manifest.json` や `src/` 配下を編集した場合、**`npm run build` を実行して `dist/` に反映してからコミット**してください。`dist/` は Git 管理下にあり、ユーザーは `dist/` をそのまま読み込むため、ビルドし忘れると変更が反映されません。

`vite.config.ts` の `copyManifestPlugin` がビルド時に以下をコピーします。

- `manifest.json` → `dist/manifest.json`
- `src/popup.html` → `dist/popup.html`
- `assets/icon-128.png` → `dist/icons/icon-128.png`

## 動作確認

1. `npm run build` でビルド
2. `chrome://extensions/` で「パッケージ化されていない拡張機能を読み込む」から `dist/` を選択
3. `examples/sample.md` をブラウザで開いて表示を確認

`src/` を編集しながら確認する場合は `npm run dev` を起動し、Chrome 拡張ページの再読み込みボタンを押してください。
