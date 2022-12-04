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
./deploy.bash <アップロードするS3バケット名> <CloudFrontのdistributionId> <assetlinks.jsonのS3 URI>
```

## CodeBuild設定
### 開発環境設定

* [GブレイバーバーストAPIサーバ](https://github.com/kaidouji85/gbraver-burst-network)の開発環境をデプロイする
* 以下の[Parameter Store](https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/systems-manager-parameter-store.html)を作成する
    | 名前 | 種類 | 値 |
    | ---- | ---- | -- |
    | /GbraverBurst/dev/assetlinksJsonURI | String | 開発環境用のassetlinks.jsonのS3 URI |
    | /GbraverBurst/dev/googleMeasurementID | String | 開発環境用のGoogle Analytics 測定ID |
    | /GbraverBurst/dev/s3Bucket | String | デプロイ対象となるS3バケット名 |
    | /GbraverBurst/dev/distributionId | String | デプロイ対象のCloudFrontのdistrubution ID |
    | /GbraverBurst/dev/ownRootUrl | String | 開発環境を公開しているURL |
    | /GbraverBurst/dev/twitterSite | String | OGP twitter:site で使うtwitterアカウント |
    | /GbraverBurst/dev/howToPlayUrl | String | 遊び方動画のyoutubeのiframe埋め込みのURL |
    | /GbraverBurst/dev/termsOfServiceUrl | String | 利用規約ページのURL |
    | /GbraverBurst/dev/privacyPolicyUrl | String | プライバシーポリシーページのURL |
    | /GbraverBurst/dev/contactURL | String | 問い合わせページのURL |
    | /GbraverBurst/dev/isPerformanceStatsVisible | String | FPSを表示するか否かのフラグ、```true```でFPSを表示 |
    | /GbraverBurst/dev/isAPIServerEnable | String | APIサーバが利用できるか否かのフラグ、```true```で利用可能 |
    | /GbraverBurst/dev/auth0ClientId | SecureString | auth0 application client ID |
    
* CodeBuildを以下設定で構築する
  * Buildspecには```buildspec.yml```を指定する

### 本番環境設定
* [GブレイバーバーストAPIサーバ](https://github.com/kaidouji85/gbraver-burst-network)の本番環境をデプロイする
* 以下の[Parameter Store](https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/systems-manager-parameter-store.html)を作成する
    | 名前 | 種類 | 値 |
    | ---- | ---- | -- |
    | /GbraverBurst/prod/assetlinksJsonURI | String | 本番環境用のassetlinks.jsonのS3 URI |
    | /GbraverBurst/prod/googleMeasurementID | String | 本番環境用のGoogle Analytics 測定ID |
    | /GbraverBurst/prod/s3Bucket | String | デプロイ対象となるS3バケット名 |
    | /GbraverBurst/prod/distributionId | String | デプロイ対象のCloudFrontのdistrubution ID |
    | /GbraverBurst/prod/ownRootUrl | String | 本番環境を公開しているURL |
    | /GbraverBurst/prod/twitterSite | String | OGP twitter:site で使うtwitterアカウント |
    | /GbraverBurst/prod/howToPlayUrl | String | 遊び方動画のyoutubeのiframe埋め込みのURL |
    | /GbraverBurst/prod/termsOfServiceUrl | String | 利用規約ページのURL |
    | /GbraverBurst/prod/privacyPolicyUrl | String | プライバシーポリシーページのURL |
    | /GbraverBurst/prod/contactURL | String | 問い合わせページのURL |
    | /GbraverBurst/prod/isPerformanceStatsVisible | String | FPSを表示するか否かのフラグ、```true```でFPSを表示 |
    | /GbraverBurst/prod/isAPIServerEnable | String | APIサーバが利用できるか否かのフラグ、```true```で利用可能 |
    | /GbraverBurst/prod/auth0ClientId | SecureString | auth0 application client ID |

* CodeBuildを以下設定で構築する
  * Buildspecには```prod.buildspec.yml```を指定する

## storybookを動かす

```shell script
cd <本リポジトリをcloneした場所>
npm run start:storybook
# ブラウザからlocalhost:6006を開く
```

## その他コード解析
本プロジェクトは、以下ツールでコード解析が可能です。
以下ツールはpackage.jsonには含まれていないので、何らかの方法で作業端末にインストールしてください。

* [madge](https://github.com/pahen/madge)

### madge
```shell
# コードの循環参照がないかを確認する
madge -c src
madge -c test
madge -c stories
```

## スペシャルサンクス
### メカザイン
本ゲームのキャラクターは [DOGAL3](http://doga.jp/2010/programs/dogal/dogal3/index.html) で作成しました。
絵心がなくてもカッコいいメカが作れる、とても素晴らしいツールです。

[![doga-banner](dogabn00.gif)](http://doga.jp/2010/index.html)

### 楽曲提供
本作は[魔王魂](https://maou.audio)様の楽曲を利用させて頂いております。