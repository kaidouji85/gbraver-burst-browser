# Gブレイバーバースト
 
ロボットで対戦するゲームです。

## ローカル環境で動かす

```
npm install
npm start
# ブラウザを起動して<localhost:8080>を開く
```

## dockerで動かす

```
docker build -t gbraver-burst .
docker run --rm -it --name my-gbraver-burst-dev \
  -v $PWD:/usr/src/app \
  -p 8080:8080 \
  -p 3000:3000 \
  gbraver-burst-dev
# ブラウザを起動して、<dockerホスト:3000>を開く
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
```

### デプロイ

```
./scripts/deploy.sh <アップロードするS3バケット名>
```
