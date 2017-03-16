const AWS = require('aws-sdk');
AWS.config.loadFromPath('aws-credentials.json');
AWS.config.update({region: 'ap-northeast-1'});

const s3 = new AWS.S3();

/**
 * S3上のオブジェクトを削除する
 * 実態はs3.deleteObjectsをPromise化しただけ
 *
 * @param params s3.deleteObjectsのパラメータ
 */
const deleteObjects = params => new Promise((resolve, reject) => s3.deleteObjects(params, (err, data) =>
  err ? reject(err) : resolve(data)
));

deleteObjects({
  Bucket: 'study-three-js',
  Delete: {
    Objects: [
      {Key: 'bundle.js'}
    ],
    Quiet: true
  }
}).then((data) => {
  console.log('success!!');
  console.log(data);
}).catch(err => {
  console.log(err);
});
