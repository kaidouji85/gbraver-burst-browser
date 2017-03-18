const TARGET_BUCKET = 'study-three-js';

const AWS = require('aws-sdk');
AWS.config.loadFromPath('aws-credentials.json');
AWS.config.update({region: 'ap-northeast-1'});

const s3 = new AWS.S3();

const listObjectsV2 = params => new Promise((resolve, reject) => s3.listObjectsV2(params, (err, data) =>
  err ? reject(err) : resolve(data)));

const deleteObjects = params => new Promise((resolve, reject) => s3.deleteObjects(params, (err, data) =>
  err ? reject(err) : resolve(data)));


listObjectsV2({
  Bucket: TARGET_BUCKET
}).then(data => {
  const objects = data.Contents.map(item => ({Key: item.Key}));
  return deleteObjects({
    Bucket: TARGET_BUCKET,
    Delete: {
      Objects: objects,
      Quiet: true
    }
  });
}).then(data => console.log('delete success'))
  .catch(err => console.log(err));