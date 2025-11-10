# Portfolio Website

エンジニアポートフォリオサイト - モダンなUIデザインを採用したReactアプリケーション

## 特徴

- グラデーション背景とグラスモーフィズムデザイン
- レスポンシブ対応（PC・タブレット・スマートフォン）
- アニメーション効果とホバーエフェクト
- Material-UI / MUI コンポーネント使用

## ローカル開発環境のセットアップ

### 必要な環境

- Node.js (推奨: v14以上)
- npm または yarn

### インストール手順

1. リポジトリをクローン

```bash
git clone <repository-url>
cd folio
```

2. 依存関係をインストール

**重要:** このプロジェクトはMaterial-UI v4とv5が混在しているため、`--legacy-peer-deps`オプションが必要です。

```bash
npm install --legacy-peer-deps
```

または

```bash
yarn install
```

3. 開発サーバーを起動

```bash
npm start
```

または

```bash
yarn start
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリケーションが表示されます。

ファイルを編集すると、自動的にページがリロードされます。

## 本番ビルド

本番用にアプリケーションをビルドするには：

```bash
npm run build
```

または

```bash
yarn build
```

`build`フォルダに最適化されたプロダクションビルドが生成されます。

## デプロイ

GitHub Pagesへのデプロイ：

```bash
npm run deploy
```

または

```bash
yarn deploy
```

## プロジェクト構成

```
folio/
├── public/          # 静的ファイル（画像など）
├── src/
│   ├── component/   # Reactコンポーネント
│   │   ├── Header.js
│   │   ├── Profile.js
│   │   ├── Timeline.js
│   │   ├── Title.js
│   │   ├── OfficialOutput.js
│   │   ├── OutputCell.jsx
│   │   ├── TrainingPrograms.js
│   │   └── Divider.js
│   ├── json/        # データファイル
│   ├── App.jsx      # メインアプリケーション
│   ├── index.css    # グローバルスタイル
│   └── index.js     # エントリーポイント
└── package.json
```

## 技術スタック

- **React** 18.2.0
- **Material-UI** v4 & v5 (MUI)
- **React Router** 6.15.0
- **Emotion** (CSS-in-JS)
- **React GA4** (Google Analytics)

## トラブルシューティング

### 依存関係のインストールエラー

`npm install`でエラーが出る場合：

```bash
npm install --legacy-peer-deps
```

### ESLint警告について

開発サーバー起動時にESLintの警告が表示されますが、これらは未使用変数に関するもので、アプリケーションの動作には影響ありません。

### ブラウザが自動的に開かない場合

手動で [http://localhost:3000](http://localhost:3000) にアクセスしてください。

## デザインの特徴

### カラーパレット
- メインカラー: グラデーション（#667eea → #764ba2）
- 背景: 固定グラデーション背景
- カード: 半透明の白（グラスモーフィズム）

### アニメーション
- `fadeInUp`: コンポーネント表示時のフェードイン
- `float`: プロフィール画像の浮遊アニメーション
- `glow`: グロー効果
- ホバーエフェクト: カード・ボタン・画像のインタラクション

### レスポンシブブレークポイント
- PC: 960px以上
- タブレット: 520px〜959px
- スマートフォン: 519px以下

## ライセンス

このプロジェクトは個人用ポートフォリオサイトです。

## 参考リンク

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Material-UI documentation](https://mui.com/)
