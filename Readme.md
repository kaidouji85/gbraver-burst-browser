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

## デプロイする

本プログラムは静的ファイルのみで構成されているので、
ビルド生成物をPublicに公開すればデプロイ完了です。
ここでは、S3にアップロードする手順を記載します。

### 事前準備

1. [aws cli](https://aws.amazon.com/jp/cli/)をインストールする
2. `aws configure`を[完了させる](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-quickstart.html)
3. [aseetlinks.json](https://developers.google.com/digital-asset-links/v1/getting-started)を作成し、任意のS3バケットに配置する
4. デプロイ対象のS3バケットを用意する

### デプロイコマンド

```shell script
# デプロイ
./deploy.bash <アップロードするS3バケット名> <ステージ名>

# ステージ切り替え
# 内部的にはCloudFrontのオリジンパスを切り替えている
./switch-stage.bash <CloudFrontのdistributionId> <CloudFrontのs3バケットのオリジン名> <ステージ名>

# CDNのキャッシュをクリア
# デプロイ、ステージ切り替えなどの一連の操作が終わったら実行する
./clear-cdn.bash <CloudFrontのdistributionId>
```

## GitHub Actions設定

### Secrets設定

[ここ](https://docs.github.com/ja/actions/security-guides/using-secrets-in-github-actions)を参考にGitHub ActionsのSecretsを設定する。
以下が設定内容である。

**secrets**
| シークレット名 | 値 |
|-------|----|
| CC_TEST_REPORTER_ID | CODE CLIMATEの[test reporter id](https://docs.codeclimate.com/docs/finding-your-test-coverage-token) |

## AWS環境設定

### 開発環境

1. [GブレイバーバーストAPIサーバ](https://github.com/kaidouji85/gbraver-burst-network)の開発環境をデプロイする
2. 「[Parameter Store（テスト環境）](#parameter-storeテスト環境)」を参考にParameter Storeに値を設定する
3. 以下のCode Build（ソースコードは本リポジトリに設定したもの）を構築する

| 役割             | buildspec                 | 環境                                                                                                             | IAMポリシー                                                     | webhook                                                 |
| ---------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------- |
| ビルド           | buildspec.yml             | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [ビルド用IAMポリシー](#ビルド用iamポリシー)                     | [テスト環境ビルド用Webhook](#テスト環境ビルド用webhook) |
| ステージ切り替え | buildspec.switchStage.yml | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [ステージ切り替え用IAMポリシー](#ステージ切り替え用iamポリシー) | 設定なし                                                |

### 本番環境

1. [GブレイバーバーストAPIサーバ](https://github.com/kaidouji85/gbraver-burst-network)の本番環境をデプロイする
2. 「[Parameter Store（本番環境）](#parameter-store本番環境)」を参考にParameter Storeに値を設定する
3. 以下のCode Build（ソースコードは本リポジトリに設定したもの）を構築する

| 役割             | buildspec                      | 環境                                                                                                             | IAMポリシー                                                     | webhook                                             |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------- |
| ビルド           | buildspec.prod.yml             | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [ビルド用IAMポリシー](#ビルド用iamポリシー)                     | [本番環境ビルド用Webhook](#本番環境ビルド用webhook) |
| ステージ切り替え | buildspec.prod.switchStage.yml | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [ステージ切り替え用IAMポリシー](#ステージ切り替え用iamポリシー) | 設定なし                                            |

## storybookを動かす

```shell script
cd <本リポジトリをcloneした場所>
npm run start-storybook
# ブラウザからlocalhost:6006を開く
```

## Windows用バイナリをビルドする
windowsで実行する場合は、管理者権限でターミナルを起動すること

```bat
npm run build:production
npm run generate-icons
npm run scale-down-mobile-images
npm run build:electron

rem build/electronフォルダにWindows用のバイナリが生成される
```

## その他コード解析

本プロジェクトは、以下ツールでコード解析が可能です。
以下ツールはpackage.jsonには含まれていないので、何らかの方法で作業端末にインストールしてください。

- shfmt
- shellcheck
- [fixpack](https://www.npmjs.com/package/fixpack#configuration)

### fixpad

```shell
# package.jsonをフォーマットする
fixpad
```

### npm audit

```shell
# デプロイされるモジュールに脆弱性がないかチェック
npm audit --omit=dev
```

### シェルスクリプトのチェック

```shell
# lint
shellcheck *.bash

# フォーマット
shfmt -l -w *.bash
```

## スペシャルサンクス

### メカザイン

本ゲームのキャラクターは [DOGAL3](http://doga.jp/2010/programs/dogal/dogal3/index.html) で作成しました。
絵心がなくてもカッコいいメカが作れる、とても素晴らしいツールです。

[![doga-banner](dogabn00.gif)](http://doga.jp/2010/index.html)

### 楽曲提供

本作は[魔王魂](https://maou.audio)様の楽曲を利用させて頂いております。

## 付録

### Parameter Store設定内容

本節では環境ごとのAWS Systems Manager Parameter Store設定項目を提示します。

#### Parameter Store（テスト環境）

| 名前                                      | 種類   | 値                                                    |
| ----------------------------------------- | ------ | ----------------------------------------------------- |
| /GbraverBurst/dev/assetlinksJsonURI       | String | 開発環境用のassetlinks.jsonのS3 URI                   |
| /GbraverBurst/dev/googleMeasurementID     | String | 開発環境用のGoogle Analytics 測定ID                   |
| /GbraverBurst/dev/s3Bucket                | String | デプロイ対象となるS3バケット名                        |
| /GbraverBurst/dev/distributionId          | String | デプロイ対象のCloudFrontのdistribution ID             |
| /GbraverBurst/dev/cloudFrontOriginName    | String | CloudFrontのs3バケットのオリジン名                    |
| /GbraverBurst/dev/ownRootUrl              | String | 開発環境を公開しているURL                             |
| /GbraverBurst/dev/twitterSite             | String | OGP twitter:site で使うtwitterアカウント              |
| /GbraverBurst/dev/howToPlayUrl            | String | 遊び方スライドのURL                                   |
| /GbraverBurst/dev/characterDescriptionUrl | String | ロボ、パイロットの説明スライドのURL                   |
| /GbraverBurst/dev/termsOfServiceUrl       | String | 利用規約ページのURL                                   |
| /GbraverBurst/dev/privacyPolicyUrl        | String | プライバシーポリシーページのURL                       |
| /GbraverBurst/dev/contactURL              | String | 問い合わせページのURL                                 |
| /GbraverBurst/dev/isAPIServerEnable       | String | APIサーバが利用できるか否かのフラグ、`true`で利用可能 |
| /GbraverBurst/dev/cognitoHostedUIDomain   | String | cognito Hosted UI のドメイン                          |

#### Parameter Store（本番環境）

| 名前                                       | 種類   | 値                                                    |
| ------------------------------------------ | ------ | ----------------------------------------------------- |
| /GbraverBurst/prod/assetlinksJsonURI       | String | 本番環境用のassetlinks.jsonのS3 URI                   |
| /GbraverBurst/prod/googleMeasurementID     | String | 本番環境用のGoogle Analytics 測定ID                   |
| /GbraverBurst/prod/s3Bucket                | String | デプロイ対象となるS3バケット名                        |
| /GbraverBurst/prod/distributionId          | String | デプロイ対象のCloudFrontのdistribution ID             |
| /GbraverBurst/prod/cloudFrontOriginName    | String | CloudFrontのs3バケットのオリジン名                    |
| /GbraverBurst/prod/ownRootUrl              | String | 本番環境を公開しているURL                             |
| /GbraverBurst/prod/twitterSite             | String | OGP twitter:site で使うtwitterアカウント              |
| /GbraverBurst/prod/howToPlayUrl            | String | 遊び方スライドのURL                                   |
| /GbraverBurst/prod/characterDescriptionUrl | String | ロボ、パイロットの説明スライドのURL                   |
| /GbraverBurst/prod/termsOfServiceUrl       | String | 利用規約ページのURL                                   |
| /GbraverBurst/prod/privacyPolicyUrl        | String | プライバシーポリシーページのURL                       |
| /GbraverBurst/prod/contactURL              | String | 問い合わせページのURL                                 |
| /GbraverBurst/prod/isAPIServerEnable       | String | APIサーバが利用できるか否かのフラグ、`true`で利用可能 |
| /GbraverBurst/prod/cognitoHostedUIDomain   | String | cognito Hosted UI のドメイン                          |

### IAMポリシー

本節では各手順で必要とされるIAMポリシー詳細を記載します。

#### ビルド用IAMポリシー

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["cloudformation:DescribeStacks", "cloudformation:ListStacks"],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "ssm:GetParameters",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket", "s3:GetBucketLocation"],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:DeleteObject"
      ],
      "Resource": "*"
    }
  ]
}
```

#### ステージ切り替え用IAMポリシー

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "ssm:GetParameters",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetDistributionConfig",
        "cloudfront:UpdateDistribution"
      ],
      "Resource": "*"
    }
  ]
}
```

### CodeBuild Webhook設定

本節ではCodeBuildのWebhook設定の詳細を解説します。
設定画面の操作方法は、以下を参照してください。

**GitHub ウェブフックイベントのフィルタリング (コンソール)**  
https://docs.aws.amazon.com/ja_jp/codebuild/latest/userguide/github-webhook-events-console.html

#### テスト環境ビルド用Webhook

developブランチにpushされた時に、CodeBuildが実行されるように設定します。以下に、その設定内容を記載します。

- **コードの変更がこのレポジトリにプッシュされるたびに再構築する**
  - チェックを入れる
- **ビルドタイプ**
  - 単一ビルド
- **ウェブフックイベントフィルタグループ**
  - **フィルタグループ 1**
    - **イベントタイプ**
      - プッシュ
    - **これらの条件でビルドを開始する**
      | タイプ | パターン |
      |--------|---------|
      | HEAD_REF | ^refs/heads/develop$ |
    - **これらの条件でビルドを開始しない**
      - なし

#### 本番環境ビルド用Webhook

masterブランチにpushされた時に、CodeBuildが実行されるように設定します。以下に、その設定内容を記載します。

- **コードの変更がこのレポジトリにプッシュされるたびに再構築する**
  - チェックを入れる
- **ビルドタイプ**
  - 単一ビルド
- **ウェブフックイベントフィルタグループ**
  - **フィルタグループ 1**
    - **イベントタイプ**
      - プッシュ
    - **これらの条件でビルドを開始する**
      | タイプ | パターン |
      |--------|---------|
      | HEAD_REF | ^refs/heads/master$ |
    - **これらの条件でビルドを開始しない**
      - なし

## License

CC BY 4.0
