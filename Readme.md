# Gブレイバーバースト
 
ロボットで対戦するゲームです。

## ローカル環境で動かす
```
npm install
npm start
# ブラウザを起動してlocalhost:8080を開く
```

## デプロイする
本プログラムは静的ファイルのみで構成されています。
ビルドしたものを、S3などでパブリック公開するけでデプロイ完了です。
ここでは、S3にアップロードする手順を記載します。

### 事前準備

```
# aws cliをインストールする
aws configure
# S3へのフル権限を持つアカウントでログインする

cp env-template.sh env.sh
vi env.sh
# 環境変数を設定する
```

### デプロイ

```
source env.sh
./scripts/deploy.sh
```
