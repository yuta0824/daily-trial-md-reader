# デイトラ カリキュラム執筆ガイド

## 見出し構造

記事の見出しは以下のルールに従ってください。

:::title[見出しの階層ルール]
- **H1** : 記事タイトル（1記事に1つ）
- **H2** : TIPSタイトル
- **H3〜H6** : 小見出し（TIPSの内容で使用）
:::

### H2の例

```
## Flexboxの基本を学ぼう
```

### H3の例

```
### justify-contentの使い方
```

### H4の例

```
#### 値の一覧
```

---

## 装飾ルール

### 太字

そこそこ大事な文章やキーワードに使います。

```
**太字にしたいテキスト**
```

**表示例**: **太字にしたいテキスト**

---

### 黄色マーカー

[important::大事な文章]に使います。

```
[marker::大事な文章をマーカーで強調]
```

**表示例**: [marker::大事な文章をマーカーで強調]

---

### 赤字（重要キーワード）

大事なキーワードに使います。

```
[important::重要なキーワード]
```

**表示例**: [important::重要なキーワード]

---

### 順序なしリスト（ul）

一覧の紹介などに使います。

```
- HTML
- CSS
- JavaScript
```

**表示例**:

- HTML
- CSS
- JavaScript

---

### 順序ありリスト（ol）

ステップの解説などに使います。

```
1. まずHTMLを書く
2. 次にCSSで装飾する
3. 最後にJavaScriptで動きをつける
```

**表示例**:

1. まずHTMLを書く
2. 次にCSSで装飾する
3. 最後にJavaScriptで動きをつける

---

## ボックス装飾

### タイトルボックス（緑の見出し付き）

重要なポイントやまとめに使います。

```
:::title[ポイント]
ここに重要な内容を書きます。

- リストも使えます
- **太字**も使えます
- `コード`も使えます
:::
```

**表示例**:

:::title[ポイント]
ここに重要な内容を書きます。

- リストも使えます
- **太字**も使えます
- `コード`も使えます
:::

---

### グレーボックス

補足説明や注意点に使います。

```
:::gray
補足の説明文をここに書きます。
メインの解説とは分けたい情報に適しています。
:::
```

**表示例**:

:::gray
補足の説明文をここに書きます。
メインの解説とは分けたい情報に適しています。
:::

---

### グリーンボックス

Tips や豆知識に使います。

```
:::green
知っておくと便利なテクニックや豆知識を書きます。
:::
```

**表示例**:

:::green
知っておくと便利なテクニックや豆知識を書きます。
:::

---

## テーブル

### 通常のテーブル

```
| 項目 | 説明 |
|------|------|
| HTML | 構造を定義 |
| CSS | 見た目を装飾 |
```

**表示例**:

| 項目 | 説明 |
|------|------|
| HTML | 構造を定義 |
| CSS | 見た目を装飾 |

---

### 横スクロール対応テーブル

列数が多いテーブルに使います。スマホでも横スクロールで閲覧可能になります。

```
:::custom-table
| コマンド | 説明 | 用途 | 備考 |
|---------|------|------|------|
| `git add` | ステージング | ファイルをコミット対象に | `.` で全ファイル |
| `git commit` | コミット | 変更を記録 | `-m` でメッセージ指定 |
| `git push` | プッシュ | リモートに反映 | `origin main` が基本 |
:::
```

**表示例**:

:::custom-table
| コマンド | 説明 | 用途 | 備考 |
|---------|------|------|------|
| `git add` | ステージング | ファイルをコミット対象に | `.` で全ファイル |
| `git commit` | コミット | 変更を記録 | `-m` でメッセージ指定 |
| `git push` | プッシュ | リモートに反映 | `origin main` が基本 |
:::

---

## コードブロック

### 言語指定のみ

````
```html
<div class="container">
  <p>テキスト</p>
</div>
```
````

**表示例**:

```html
<div class="container">
  <p>テキスト</p>
</div>
```

---

### 言語 + ファイル名

````
```html:index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>サンプル</title>
</head>
<body>
  <h1>Hello</h1>
</body>
</html>
```
````

**表示例**:

```html:index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>サンプル</title>
</head>
<body>
  <h1>Hello</h1>
</body>
</html>
```

---

### 対応言語の例

```css:style.css
.container {
  display: flex;
  gap: 16px;
}
```

```javascript:script.js
const button = document.querySelector('.button')
button.addEventListener('click', () => {
  console.log('clicked!')
})
```

```bash
npm install
npm run dev
```

```json:package.json
{
  "name": "my-project",
  "version": "1.0.0"
}
```

---

## 動画の埋め込み

動画を埋め込むには `youtube` クラスで `iframe` を囲みます。

```html
<div class="youtube">
  <iframe src="https://player.vimeo.com/video/XXXXXXX?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="1920" height="1080" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" title="動画タイトル"></iframe>
</div>
```

:::gray
`src` のURLはVimeoの動画ページから取得してください。
YouTube動画の場合は `https://www.youtube.com/embed/XXXXXXX` 形式です。
:::

---

## インラインコード

文中にコードを書く場合はバッククォートで囲みます。

```
`display: flex` を指定すると横並びになります。
```

**表示例**: `display: flex` を指定すると横並びになります。

---

## 引用

```
> 引用テキストをここに書きます。
> 複数行も可能です。
```

**表示例**:

> 引用テキストをここに書きます。
> 複数行も可能です。

---

## 組み合わせ例

実際の記事では、以下のように装飾を組み合わせて使います。

### Flexboxで横並びにしよう

要素を横並びにするには `display: flex` を使います。

```css:style.css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

:::title[ポイント]
- [marker::`justify-content`]は主軸方向（横方向）の配置を決めます
- [marker::`align-items`]は交差軸方向（縦方向）の配置を決めます
- この2つのプロパティは[important::セットで覚えましょう]
:::

:::custom-table
| プロパティ | 値 | 効果 |
|-----------|-----|------|
| `justify-content` | `center` | 中央揃え |
| `justify-content` | `space-between` | 両端揃え |
| `align-items` | `center` | 上下中央 |
| `align-items` | `flex-start` | 上揃え |
:::

:::gray
**補足**: Flexboxの詳しい解説は DAY3 のレッスンで扱います。
ここでは基本的な使い方だけ押さえておけばOKです。
:::

---

## 執筆時の注意事項

:::title[記事更新のルール]
- 🔥がカレンダーに付く条件は、TIPSかレッスンを1つでも完了した日です。ボリュームの多いレッスンでは[important::こまめにTIPSを配置]してください
- レッスン概要は受講生以外でも閲覧可能です。解説や課題データは載せないでください
- Tipsにトピックごとに解説を記載してください（購入ユーザーにのみ表示）
- こまめに保存をお願いします
- **コードビューで入力したコードは、ビジュアルモードに戻してから保存してください**
:::

:::green
**動画のテキスト補足について**

動画内の重要なポイントをまとめてテキストで解説してください。
特に[marker::検索キーワードになりそうな言葉]は必ずテキストでも記載してください（キーワード検索にヒットさせるため）。
:::
