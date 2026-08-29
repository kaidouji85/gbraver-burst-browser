# 開発環境マニュアル

## 前提条件

[バックエンド](https://github.com/kaidouji85/gbraver-burst-network)のテスト環境が一式デプロイされていること。

## Parameter Store

以下の項目をAWS Systems Manager Parameter Storeに設定する。

- `/GbraverBurst/dev/assetlinksJsonURI`
  - String
  - 開発環境用のassetlinks.jsonのS3 URI
- `/GbraverBurst/dev/s3Bucket`
  - String
  - デプロイ対象となるS3バケット名
- `/GbraverBurst/dev/distributionId`
  - String
  - デプロイ対象のCloudFrontのdistribution ID
- `/GbraverBurst/dev/cloudFrontOriginName`
  - String
  - CloudFrontのs3バケットのオリジン名
- `/GbraverBurst/dev/ownRootUrl`
  - String
  - 開発環境を公開しているURL
- `/GbraverBurst/dev/twitterSite`
  - String
  - OGP twitter:site で使うtwitterアカウント
- `/GbraverBurst/dev/howToPlayUrl`
  - String
  - 遊び方スライドのURL
- `/GbraverBurst/dev/characterDescriptionUrl`
  - String
  - ロボ、パイロットの説明スライドのURL
- `/GbraverBurst/dev/termsOfServiceUrl`
  - String
  - 利用規約ページのURL
- `/GbraverBurst/dev/privacyPolicyUrl`
  - String
  - プライバシーポリシーページのURL
- `/GbraverBurst/dev/contactURL`
  - String
  - 問い合わせページのURL
- `/GbraverBurst/dev/cognitoHostedUIDomain`
  - String
  - cognito Hosted UI のドメイン
- `/GbraverBurst/dev/coturnDomainName`
  - String
  - coturnサーバーのドメイン名

## AWS CodeBuild

以下のAWS CodeBuildプロジェクトを作成する。

| 役割              | buildspec                 | 環境                                                                                                             | IAMポリシー                                                      | webhook                                                 |
| ----------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
| デプロイ          | buildspec.yml             | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [デプロイ用IAMポリシー](#デプロイ用iamポリシー)                  | [テスト環境ビルド用Webhook](#テスト環境ビルド用webhook) |
| ステージ切り替え  | buildspec.switchStage.yml | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [ステージ切り替え用IAMポリシー](#ステージ切り替え用iamポリシー)  | 設定なし                                                |
| config.json上書き | buildspec.configJson.yml  | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [config.json上書き用IAMポリシー](#configjson上書き用iamポリシー) | 設定なし                                                |

### デプロイ用IAMポリシー

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

### ステージ切り替え用IAMポリシー

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

### config.json上書き用IAMポリシー

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject"],
      "Resource": "arn:aws:s3:::*/*"
    },
    {
      "Effect": "Allow",
      "Action": "ssm:GetParameters",
      "Resource": "*"
    }
  ]
}
```

### テスト環境ビルド用Webhook

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
      | タイプ   | パターン             |
      | -------- | -------------------- |
      | HEAD_REF | ^refs/heads/develop$ |
    - **これらの条件でビルドを開始しない**
      - なし

## 環境新規作成

1. S3バケットを準備して静的サイトホスティングの設定をする
2. CodeBuildの「デプロイ」を実行
3. CloudFrontを構築し、S3バケットをオリジンとして設定する
   > [!NOTE]
   > S3のルートにはステージ名のフォルダが作成されるので、これをCloudFrontのオリジンパスに設定する。
4. Route53、AWS Certificate Managerを使って、ドメイン名、SSL証明書を設定する

## ブルーグリーンデプロイ

- 0. 事前準備
  - 0.1. 本番環境のバックエンドを一式デプロイする
    > [!NOTE]
    > バックエンドデプロイ時に「旧ステージ」、「新ステージ」が明確になっている
- 1. 新規環境作成
  - 1.1. CodeBuildで「デプロイ」を実行
  - 1.2. CodeBuildで「ステージ切り替え」を環境変数「STAGE」に「新ステージ」を指定して実行
- 2. 旧環境への切り戻し（必要に応じて）
  - 2.1. CodeBuildで「ステージ切り替え」を環境変数「STAGE」に「旧ステージ」を指定して実行
  - 2.2. S3のルートから「新ステージ」の名前のフォルダを削除する
- 3. 旧環境削除
  - 3.1. S3のルートから「旧ステージ」の名前のフォルダを削除する
