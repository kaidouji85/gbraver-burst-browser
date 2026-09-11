# オフライン環境

## セットアップ

```bash
# オフライン（LAN）用の.envテンプレートをコピーする
# 展示用マシンのローカルIPなど、環境に応じた各種値を.envに記載する
cp .env.offline-lan.template .env

npm ci
```

## 静的コンテンツのビルド

```bash
npm run clean
npm run build:production
npm run generate-icons
npm run scale-down-mobile-images
```

## HTTPサーバーを起動

```bash
npm run serve
```
