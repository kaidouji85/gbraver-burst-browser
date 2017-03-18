const fs = require('fs');
const AWS = require('aws-sdk');

const TARGET_BUCKET = 'study-three-js';

AWS.config.loadFromPath('aws-credentials.json');
AWS.config.update({region: 'ap-northeast-1'});

const s3 = new AWS.S3();

const listObjectsV2 = params => new Promise((resolve, reject) => s3.listObjectsV2(params, (err, data) =>
  err ? reject(err) : resolve(data)));

const deleteObjects = params => new Promise((resolve, reject) => s3.deleteObjects(params, (err, data) =>
  err ? reject(err) : resolve(data)));

const upload = params => new Promise((resolve, reject) => s3.upload(params, (err, data) =>
  err ? reject(err) : resolve(data)))


/**
 * アップロード先バケット内をクリアする
 */
function clearBucket() {
  return listObjectsV2({
    Bucket: TARGET_BUCKET
  }).then(data => {
    const objects = data.Contents.map(item => ({Key: item.Key}));
    if (objects.length <= 0) {
      return Promise.resolve();
    }

    return deleteObjects({
      Bucket: TARGET_BUCKET,
      Delete: {
        Objects: objects,
        Quiet: true
      }
    });
  }).then(data => {
    if (!data) {
      console.log(`${TARGET_BUCKET} is empty`);
    }
    console.log('clear success');
  });
}

/**
 * プロダクト環境にファイルをアップロードする
 */
function uploadProduct() {
  return upload({
    Bucket: TARGET_BUCKET,
    Key: 'test/file',
    Body: fs.createReadStream('build/production/index.html')
  });
}

clearBucket();
uploadProduct();