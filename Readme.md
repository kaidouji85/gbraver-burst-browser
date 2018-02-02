# three.js習作
 
three.jsの練習用に作りました。

## 動かし方
```
npm install
npm start
# ブラウザを起動してlocalhost:8080を開く
```

## 必要となる認証ファイル

### aws-credentials.json

以下コマンドはaws-credentioalsファイルが無いと動きません。

* npm run upload-s3
* npm run deploy

Readme.mdの配下に、以下内容でaws-credentials.jsonを作成してください。

```json
{ 
    "accessKeyId": "PUBLIC_KEY", 
    "secretAccessKey": "SECRET_KEY", 
    "region": "us-west-2" 
}
```

aws-credentials.jsonについて  
https://www.npmjs.com/package/s3-upload#credentials-file

### aws-upload.conf.js

以下コマンドはaws-credentioalsファイルが無いと動きません。

* npm run upload-s3
* npm run deploy

```javascript
module.exports = {
  credentials:"aws-credentials.json",
  bucketName: "アップロード先のS3バケット名",
  patterns:[
    "build/production/**",
    "build/stub/**",
  ]
}
```

aws-upload.conf.jsについて
https://www.npmjs.com/package/s3-upload#deploy-static-sites-to-amazon-s3-using-node

