# 本番環境マニュアル

## AWS CodeBuild

1. [GブレイバーバーストAPIサーバ](https://github.com/kaidouji85/gbraver-burst-network)の本番環境をデプロイする
2. 「[Parameter Store（本番環境）](#parameter-store本番環境)」を参考にParameter Storeに値を設定する
3. 以下のCode Build（ソースコードは本リポジトリに設定したもの）を構築する

| 役割              | buildspec                      | 環境                                                                                                             | IAMポリシー                                                      | webhook                                             |
| ----------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------- |
| ビルド            | buildspec.prod.yml             | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [ビルド用IAMポリシー](#ビルド用iamポリシー)                      | [本番環境ビルド用Webhook](#本番環境ビルド用webhook) |
| ステージ切り替え  | buildspec.prod.switchStage.yml | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [ステージ切り替え用IAMポリシー](#ステージ切り替え用iamポリシー)  | 設定なし                                            |
| config.json上書き | buildspec.configJson.prod.yml  | [aws/codebuild/standard:7.0](https://github.com/aws/aws-codebuild-docker-images/tree/master/ubuntu/standard/7.0) | [config.json上書き用IAMポリシー](#configjson上書き用iamポリシー) | 設定なし                                            |

