# Gブレイバーバースト

本リポジトリはGブレイバーバーストのSPA(Single Page Application)のソースコードです。

## 前提

あらかじめ、[ネットワーク系リポジトリ](https://github.com/kaidouji85/gbraver-burst-network)の開発環境を整え、同リポジトリをAWS環境にデプロイしてください。

## 必須ソフトウェア

- node.js（v24.19.0以上）
- npm（11.17.0以上）
- npx（11.17.0以上）
- aws cli（2.36.25以上）

## 本リポジトリが想定する環境

- ローカル環境
  - 作業用端末での開発環境
  - 検証用途として、ローカル環境からAWSにすべてのデプロイをすることが可能
- 開発環境
  - AWS上に構築された開発環境
  - 静的コンテンツ配信サービス（S3 + CloudFront）を利用
  - 原則としてAWS CodeBuildによるCI/CDで環境構築する
- 本番環境
  - AWS上に構築された本番
  - 静的コンテンツ配信サービス（S3 + CloudFront）を利用
  - 原則としてAWS CodeBuildによるCI/CDで環境構築する
- オフライン環境
  - オフライン用にイントラネットで動かすための環境

## 環境別マニュアル

- [ローカル環境](./docs/local-env.md)
- [開発環境](./docs/dev-env.md)
- [本番環境](./docs/prod-env.md)
- [オフライン環境](./docs/offline-env.md)

## スペシャルサンクス

### メカザイン

本ゲームのキャラクターは [DOGAL3](http://doga.jp/2010/programs/dogal/dogal3/index.html) で作成しました。
絵心がなくてもカッコいいメカが作れる、とても素晴らしいツールです。

[![doga-banner](dogabn00.gif)](http://doga.jp/2010/index.html)

### 楽曲提供

本作は[魔王魂](https://maou.audio)様の楽曲を利用させて頂いております。

## License

CC BY 4.0
