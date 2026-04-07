# DailyTrial MD Preview

DailyTrialの独自Markdown構文を本番同等のデザインでプレビューするChrome拡張機能です。

## インストール

### 1. ダウンロード

`dist` フォルダのみダウンロードしてください。

https://download-directory.github.io/?url=https://github.com/yuta0824/daily-trial-md-reader/tree/main/dist

ローカルPCの削除しない場所に配置してください（デスクトップ等は避けること）。

### 2. Chrome に読み込む

1. `chrome://extensions/` にアクセス
2. 右上の「デベロッパー モード」を ON にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. ダウンロードした `dist` フォルダを選択

### 3. 権限の設定

拡張機能の「詳細」を開き、以下を有効にしてください。

- **ファイルの URL へのアクセスを許可する** → ON

### 4. ツールバーに固定（任意）

拡張機能アイコンからピン留めすると、ツールバーからワンクリックで有効/無効を切り替えられます。

## 使い方

`.md` ファイルをChromeで開くと、自動的にプレビュー表示されます。

ツールバーのアイコンをクリックすると、有効/無効を切り替えられます。

## 対応する独自構文

全構文のサンプルは [tests/sample.md](tests/sample.md) を参照してください。
