# Gブレイバーバースト
 
ロボットで対戦するゲームです。
[ここ](https://gbraver-burst.com)でサービスを公開しています。

## ローカル環境で動かす
### 初回
```shell script
cd <本リポジトリをcloneした場所>
cp .env.tepmpate .env
# 環境に応じた値を.envに記載する
# .env.templateに各環境変数の詳細が記載されている

npm install
npm ci
npm start
# ブラウザを起動して<localhost:8080>を開く
```

### 2回目以降
```shell script
cd <本リポジトリをcloneした場所>
npm start

# ブラウザを起動して<localhost:8080>を開く
```

## Dockerで動かす
### 初回

```shell script
touch .env
# 環境に応じた値を.envに記載する
# .envの記載内容は本リポジトリの.env.templateを参照

docker run --env-file <.envのパス> -p <任意ポート>:3000 kaidouji85/gbraver-burst
# ブラウザでhttp://localhost:<CLIで指定したポート>/を開く
```

### 2回目以降

```shell script
docker run --env-file <.envのパス> -p <Dockerホストの任意ポート>:3000 kaidouji85/gbraver-burst
# ブラウザでhttp://localhost:<CLIで指定したポート>/を開く
```

## Dockerイメージをビルドする

```shell script
docker build ./
```

## デプロイする
本プログラムは静的ファイルのみで構成されています。
ビルドしたものを、S3などでパブリック公開するけでデプロイ完了です。
ここでは、S3にアップロードする手順を記載します。

### 事前準備

```shell script
# aws cliをインストールする
aws configure
# S3へのフル権限を持つアカウントでログインする
```

### 開発環境にデプロイ

```shell script
./scripts/deploy.sh <アップロードするS3バケット名>
```

### 本番環境にデプロイ

```shell script
./scripts/deploy-production.sh <アップロードするS3バケット名> <CloudFrontのdistributionId>
```

## storybookを動かす

```shell script
cd <本リポジトリをcloneした場所>
npm run start:storybook
# ブラウザからlocalhost:6006を開く
```

## メカデザイン協力

本ゲームのキャラクターは [DOGAL3](http://doga.jp/2010/programs/dogal/dogal3/index.html) で作成しました。
絵心がなくてもカッコいいメカが作れる、とても素晴らしいツールです。

[![doga-banner](dogabn00.gif)](http://doga.jp/2010/index.html)
