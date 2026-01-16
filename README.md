# tbaba - Profile Site

## プロジェクト概要
- **名前**: tbaba Profile Site
- **目標**: tbabaさんの個人プロフィールサイト
- **機能**: 
  - GitHub、Forkwell、Zennへのリンク表示
  - Top、About、Portfolioの3つのセクション
  - レスポンシブデザイン
  - モダンなUI/UX

## URL
- **GitHub**: https://github.com/tbaba/tbaba-profile
- **開発環境**: https://3000-iu5jsxgqbdssuam49vhad-0e616f0a.sandbox.novita.ai
- **本番環境**: デプロイ後に追加予定

## 完成した機能
- ✅ Topページ（プロフィールと外部リンク）
- ✅ Aboutページ（自己紹介）
- ✅ Portfolioページ（GitHubプロジェクト、Zenn記事、Forkwellへのリンク）
- ✅ レスポンシブナビゲーション
- ✅ アニメーション効果

## 技術スタック
- **フレームワーク**: Hono (v4.11.4)
- **フロントエンド**: React 19 (CDN版)
- **スタイリング**: Tailwind CSS (CDN版)
- **アイコン**: Font Awesome (CDN版)
- **ランタイム**: Cloudflare Workers
- **ビルドツール**: Vite 6.4.1
- **デプロイ**: Cloudflare Pages

## データ構造
- **静的サイト**: データベースは使用せず、全てのコンテンツはReactコンポーネント内に記述
- **外部リンク**:
  - GitHub: https://github.com/tbaba
  - Forkwell: https://forkwell.com/tbaba
  - Zenn: https://zenn.dev/tbaba

## 使い方

### ローカル開発環境
1. 依存関係のインストール（初回のみ）:
   ```bash
   cd /home/user/webapp
   npm install
   ```

2. ビルド:
   ```bash
   npm run build
   ```

3. 開発サーバーの起動:
   ```bash
   pm2 start ecosystem.config.cjs
   ```

4. 動作確認:
   ```bash
   npm run test
   # または
   curl http://localhost:3000
   ```

5. PM2の管理:
   ```bash
   pm2 list                    # サービス一覧
   pm2 logs webapp --nostream  # ログ確認
   pm2 restart webapp          # 再起動
   pm2 delete webapp           # 停止・削除
   ```

### Cloudflare Pagesへのデプロイ
1. ビルド:
   ```bash
   npm run build
   ```

2. デプロイ:
   ```bash
   npm run deploy:prod
   ```

## プロジェクト構造
```
webapp/
├── src/
│   └── index.tsx          # Honoアプリケーション + Reactコンポーネント
├── dist/                  # ビルド出力
│   └── _worker.js         # Cloudflare Workers用バンドル
├── public/
│   └── static/            # 静的ファイル用（現在未使用）
├── ecosystem.config.cjs   # PM2設定
├── vite.config.ts         # Viteビルド設定
├── wrangler.jsonc         # Cloudflare設定
├── package.json           # 依存関係とスクリプト
└── README.md              # このファイル
```

## デプロイ状況
- **プラットフォーム**: Cloudflare Pages
- **GitHub**: https://github.com/tbaba/tbaba-profile
- **ステータス**: ✅ GitHubにプッシュ完了
- **最終更新**: 2026-01-16

## 推奨される次のステップ
1. **Cloudflare Pagesへのデプロイ**: `setup_cloudflare_api_key`を実行後、`npm run deploy:prod`でデプロイ
2. **コンテンツの充実**: About、Portfolioセクションの詳細情報を追加
3. **カスタムドメインの設定**: Cloudflare Pagesで独自ドメインを設定
4. **OGP画像の追加**: SNSシェア用のメタタグとOGP画像を追加
