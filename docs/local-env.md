# ローカル環境マニュアル

## セットアップ

```shell script
# 環境に応じた値を.envに記載する
# .env.templateに各環境変数の詳細が記載されている
cp .env.template .env

npm ci
```

## ローカル環境での動作確認

```shell script
# ブラウザを起動して<localhost:8080>を開く
npm start
```

## storybookを動かす

```shell script
npm run start-storybook
# ブラウザからlocalhost:6006を開く
```

## AWS環境へのデプロイ

本プログラムは静的ファイルのみで構成されているので、ビルド生成物をPublicに公開すればデプロイ完了です。
ここでは、S3にアップロードする手順を記載します。

### 事前準備

1. [aws cli](https://aws.amazon.com/jp/cli/)をインストールする
2. `aws configure`を[完了させる](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-quickstart.html)
3. [assetlinks.json](https://developers.google.com/digital-asset-links/v1/getting-started)を作成し、任意のS3バケットに配置する
4. デプロイ対象のS3バケットを用意する

### デプロイ系スクリプト

```shell script
# デプロイ
./deploy.bash <アップロードするS3バケット名> <ステージ名> <assetlinks.jsonのS3 URI>

# ステージ切り替え
# 内部的にはCloudFrontのオリジンパスを切り替えている
./switch-stage.bash <CloudFrontのdistributionId> <CloudFrontのs3バケットのオリジン名> <ステージ名>

# CDNのキャッシュをクリア
# デプロイ、ステージ切り替えなどの一連の操作が終わったら実行する
./clear-cdn.bash <CloudFrontのdistributionId>

# S3にあるconfig.jsonを上書きする
# 本スクリプトの実行には、以下の環境変数が必要
# - S3_BUCKET
# - STAGE
# - IS_BACKEND_SERVER_AVAILABLE（省略可能、デフォルトはtrue）
./overwrite-config-json.bash
```

## その他スクリプト・コマンド

### シェルスクリプトのチェック

```shell
# lint
shellcheck *.bash

# フォーマット
shfmt -l -w *.bash
```

### Windows用バイナリをビルドする

windowsで実行する場合は、管理者権限でターミナルを起動すること

```bat
npm run build:production
npm run generate-icons
npm run scale-down-mobile-images
npm run build:electron

rem build/electronフォルダにWindows用のバイナリが生成される
```
