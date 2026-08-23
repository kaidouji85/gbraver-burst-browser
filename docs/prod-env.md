# 本番環境マニュアル

## 前提条件

[バックエンド](https://github.com/kaidouji85/gbraver-burst-network)の「通常バックエンド」の本番環境がデプロイされていること。

## Parameter Store

以下の項目をAWS Systems Manager Parameter Storeに設定する。

| 名前                                       | 種類   | 値                                        |
| ------------------------------------------ | ------ | ----------------------------------------- |
| /GbraverBurst/prod/assetlinksJsonURI       | String | 本番環境用のassetlinks.jsonのS3 URI       |
| /GbraverBurst/prod/googleMeasurementID     | String | 本番環境用のGoogle Analytics 測定ID       |
| /GbraverBurst/prod/s3Bucket                | String | デプロイ対象となるS3バケット名            |
| /GbraverBurst/prod/distributionId          | String | デプロイ対象のCloudFrontのdistribution ID |
| /GbraverBurst/prod/cloudFrontOriginName    | String | CloudFrontのs3バケットのオリジン名        |
| /GbraverBurst/prod/ownRootUrl              | String | 本番環境を公開しているURL                 |
| /GbraverBurst/prod/twitterSite             | String | OGP twitter:site で使うtwitterアカウント  |
| /GbraverBurst/prod/howToPlayUrl            | String | 遊び方スライドのURL                       |
| /GbraverBurst/prod/characterDescriptionUrl | String | ロボ、パイロットの説明スライドのURL       |
| /GbraverBurst/prod/termsOfServiceUrl       | String | 利用規約ページのURL                       |
| /GbraverBurst/prod/privacyPolicyUrl        | String | プライバシーポリシーページのURL           |
| /GbraverBurst/prod/contactURL              | String | 問い合わせページのURL                     |
| /GbraverBurst/prod/cognitoHostedUIDomain   | String | cognito Hosted UI のドメイン              |

## AWS CodeBuild

以下のAWS CodeBuildプロジェクトを作成する。

| 役割              | buildspec                      | 環境                                                                                                             | IAMポリシー                                                      | webhook                                             |
| ----------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------- |
| ビルド            | buildspec.prod.yml             | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [ビルド用IAMポリシー](#ビルド用iamポリシー)                      | [本番環境ビルド用Webhook](#本番環境ビルド用webhook) |
| ステージ切り替え  | buildspec.prod.switchStage.yml | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [ステージ切り替え用IAMポリシー](#ステージ切り替え用iamポリシー)  | 設定なし                                            |
| config.json上書き | buildspec.configJson.prod.yml  | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [config.json上書き用IAMポリシー](#configjson上書き用iamポリシー) | 設定なし                                            |

### ビルド用IAMポリシー

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

### 本番環境ビルド用Webhook

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
      | タイプ   | パターン            |
      | -------- | ------------------- |
      | HEAD_REF | ^refs/heads/master$ |
    - **これらの条件でビルドを開始しない**
      - なし
