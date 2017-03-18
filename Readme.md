# three.js習作
 
three.jsの練習用に作りました。

## 動かし方
```
npm install
npm start
# ブラウザを起動してlocalhost:8080を開く
```

## 各種コマンド

| コマンド            | 説明                          |
|--------------------|------------------------------|
| npm install        | 関連ライブラリのインストール     |
| npm start          | プログラムの起動                |
| npm run start-stub | スタブの起動                   |
| npm run build      | プログラムのビルド              |
| npm run build-stub | スタブのビルド                  |
| npm run upload-s3  | ビルド結果をs3にアップロードする   |


### AWS系コマンドを実行する際の注意点
認証情報がないと動きません。
Readme.mdがある階層にaws-credentials.jsonを置いて下さい。
現状では`npm run upload-s3`がaws系コマンドです。

aws-credentials.jsonについて
https://www.npmjs.com/package/s3-upload#credentials-file
