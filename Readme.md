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
3. [aseetlinks.json](https://developers.google.com/digital-asset-links/v1/getting-started)を作成し、任意のS3バケットに配置する
4. デプロイ対象のS3バケットを用意する

### デプロイコマンド

```shell script
./deploy.sh <アップロードするS3バケット名> <CloudFrontのdistributionId> <assetlinks.jsonのS3 URI>
```

## CodeBuild設定
### 開発環境設定

* [GブレイバーバーストAPIサーバ](https://github.com/kaidouji85/gbraver-burst-network)の開発環境をデプロイする
* 以下の[Parameter Store](https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/systems-manager-parameter-store.html)を作成する
    | 名前 | 種類 | 値 |
    | ---- | ---- | -- |
    | /GbraverBurst/dev/assetlinkJsonURI | String | 開発環境用のassetlinks.jsonのS3 URI |
    | /GbraverBurst/dev/googleTrackingID | String | 開発環境用のGoogle Analytics トラッキングID |
* CodeBuildを以下設定で構築する
  * Buildspecには```buildspec.yml```を指定する
  * 以下の環境変数を設定する
    | 名前 | 値 |
    | ---- | -- |
    | S3_BUCKET | デプロイ対象となるS3バケット名 |
    | DISTRIBUTION_ID | デプロイ対象のCloudFrontのdistrubution ID |
    | OWN_ROOT_URL | 開発環境を公開しているURL |
    | TWITTER_SITE | OGP twitter:site で使うtwitterアカウント |
    | HOW_TO_PLAY_URL | 遊び方動画のyoutubeのiframe埋め込みのURL |
    | TERMS_OF_SERVICE_URL | 利用規約ページのURL |
    | PRIVACY_POLICY_URL | プライバシーポリシーページのURL |
    | CONTACT_URL | 問い合わせページのURL |
    | IS_SEARCH_ENGINE_NO_INDEX | 固定値で```true```を指定 |
    | IS_PERFORMANCE_STATS_VISIBLE | 固定値で```true```を指定 |
    | IS_SERVICE_WORKER_USED | 固定値で```true```を指定 |
    | IS_API_SERVER_ENABLE | 固定値で```true```を指定 |
    | AUTH0_DOMAIN | auth0 ドメイン |
    | AUTH0_CLIENT_ID | auth0 application client ID |
    | AUTH0_AUDIENCE | auth0 API audience |

### 本番環境設定
* [GブレイバーバーストAPIサーバ](https://github.com/kaidouji85/gbraver-burst-network)の本番環境をデプロイする
* 以下の[Parameter Store](https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/systems-manager-parameter-store.html)を作成する
    | 名前 | 種類 | 値 |
    | ---- | ---- | -- |
    | /GbraverBurst/prod/assetlinkJsonURI | String | 本番環境用のassetlinks.jsonのS3 URI |
    | /GbraverBurst/prod/googleTrackingID | String | 本番環境用のGoogle Analytics トラッキングID |
* CodeBuildを以下設定で構築する
  * Buildspecには```prod.buildspec.yml```を指定する
  * 以下の環境変数を設定する
    | 名前 | 値 |
    | ---- | -- |
    | S3_BUCKET | デプロイ対象となるS3バケット名 |
    | DISTRIBUTION_ID | デプロイ対象のCloudFrontのdistrubution ID |
    | OWN_ROOT_URL | 本番環境を公開しているURL |
    | TWITTER_SITE | OGP twitter:site で使うtwitterアカウント |
    | HOW_TO_PLAY_URL | 遊び方動画のyoutubeのiframe埋め込みのURL |
    | TERMS_OF_SERVICE_URL | 利用規約ページのURL |
    | PRIVACY_POLICY_URL | プライバシーポリシーページのURL |
    | CONTACT_URL | 問い合わせページのURL |
    | IS_SEARCH_ENGINE_NO_INDEX | 固定値で```false```を指定 |
    | IS_PERFORMANCE_STATS_VISIBLE | 固定値で```false```を指定 |
    | IS_SERVICE_WORKER_USED | 固定値で```true```を指定 |
    | IS_API_SERVER_ENABLE | 固定値で```true```を指定 |
    | AUTH0_DOMAIN | auth0 ドメイン |
    | AUTH0_CLIENT_ID | auth0 application client ID |
    | AUTH0_AUDIENCE | auth0 API audience |

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
