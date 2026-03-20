# DailyTrial Markdown プレビューテスト

## 基本的なMarkdown

これは **太字** と *イタリック* のテストです。

### 見出し3 - ボーダー付き

#### 見出し4 - 左ボーダー

##### 見出し5 - 下線付き

###### 見出し6

---

## リスト

- リストアイテム1
- リストアイテム2
  - ネストしたアイテム
  - ネストしたアイテム2
- リストアイテム3

1. 番号付きリスト1
2. 番号付きリスト2
3. 番号付きリスト3

## リンクと画像

[デイトラ公式サイト](https://www.daily-trial.com/)

## テーブル

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Next.js | 15.3.0 | フレームワーク |
| React | 19.0.0-rc.1 | UI |
| TypeScript | 5.3.3 | 型安全 |

## コードブロック

```html:index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>テスト</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

```javascript
const greeting = 'Hello DailyTrial!'
console.log(greeting)

function add(a, b) {
  return a + b
}
```

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

インラインコードは `const x = 1` のように表示されます。

## 独自構文テスト

### マーカー

これは[marker::黄色マーカーのテキスト]です。

### 強調

これは[important::重要なテキスト]です。

### タイトルボックス

:::title[ポイント]
- これはタイトルボックス内のリストです
- **太字**も使えます
- `コード`も表示できます
:::

### プレーンボックス（グレー）

:::gray
これはグレーのボックスです。

コードも書けます：
```bash
npm install
npm run dev
```
:::

### プレーンボックス（グリーン）

:::green
これはグリーンのボックスです。

[important::重要な情報]もボックス内に記載できます。
:::

### カスタムテーブル

:::custom-table
| コマンド | 説明 | 備考 |
|---------|------|------|
| `npm install` | 依存関係インストール | 初回のみ |
| `npm run dev` | 開発サーバー起動 | ポート8080 |
| `npm run build` | ビルド | 本番用 |
| `npm run lint` | リント実行 | 自動修正付き |
:::

## 引用

> これは引用ブロックです。
> 複数行にわたる引用も可能です。

## タスクリスト

- [x] プロジェクトセットアップ
- [x] 基本Markdownレンダリング
- [ ] カスタム構文レンダリング
- [ ] コードブロック強化
