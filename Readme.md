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
本プログラムは静的ファイルのみで構成されているので、
ビルド生成物をPublicに公開すればデプロイ完了です。
ここでは、S3にアップロードする手順を記載します。

### 事前準備
1. [aws cli](https://aws.amazon.com/jp/cli/)をインストールする
2. ```aws confiure```を[完了させる](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-quickstart.html)
3. デプロイ対象のS3バケットを用意する

### デプロイコマンド

```shell script
./deploy.sh <アップロードするS3バケット名> <CloudFrontのdistributionId>
```

## CodeBuild設定
### 事前準備
[GブレイバーバーストAPIサーバ](https://github.com/kaidouji85/gbraver-burst-network)をデプロイしてください。
なお、以下が本プロジェクトが直接参照しているものです。

* [Serverless Framework](https://github.com/serverless/serverless)で生成した[CloudFormationStack](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/stacks.html)
* サービス、ステージを設定した[Parameter Store](https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/systems-manager-parameter-store.html)

### 開発環境設定

| 項目名 | 設定値 |
| ------ | ------ |
| Buildspec | buildspec.yml |
| 環境変数 | ```REST_API_URL```、```WEBSOCKET_API_URL```以外の.env.templateに定義されているもの |

### 本番環境設定

| 項目名 | 設定値 |
| ------ | ------ |
| Buildspec | prod.buildspec.yml |
| 環境変数 | ```REST_API_URL```、```WEBSOCKET_API_URL```以外の.env.templateに定義されているもの |

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
