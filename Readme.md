# Gブレイバーバースト
 
ロボットで対戦するゲームです。

## ローカル環境で動かす

```
npm install
npm start
# ブラウザを起動して<localhost:8080>を開く
```

## Dockerで動かす

```
docker build -t <任意のDockerイメージ名> .
docker run --name <任意のDockerコンテナ名> -p <Dockerホストの任意ポート>:3000 gbraver-burst
# ブラウザを起動して、<dockerホスト:ポート>を開く
```

本プロジェクトでは、ローカル環境とDockerコンテナでソースコードの同期をしていない。
ローカル環境で変更したソースコードをDockerコンテナで動かす場合、都度Dockerビルドする必要がある。

### コマンド例

```
docker build -t gbraver-burst .
docker run --name my-gbraver-burst -p 3000:3000 gbraver-burst
docker-machine ssh default -L 3000:localhost:3000
# ブラウザを起動して、http://localhost:3000を開く
```

上記は実用的なコマンド例である。
本プロジェクトはオフラインキャッシュ実現のために、ServiceWorkerを利用している。
しかし、ServiceWorkerはhttps、localhostでしたインストールできない制約がある。
Dockerコンテナをhttps化することは敷居が高いので、docker-machine sshのオプションでポートフォワードをしている。

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
