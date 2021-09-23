const im = require('imagemagick');
const glob = require("glob")

function globPaths(pattern) {
  return new Promise((resolve, reject) => {
    glob(pattern, (err, paths) => {
      if (err) {
        reject(err);
      } else {
        resolve(paths);
      }
    });
  });
}

function resizeImage(origin, scale) {
  return new Promise((resolve, reject) => {
    im.convert([origin, '-resize', scale, origin], (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
}

(async () => {
  console.log('start scale down mobile images');
  const mobileImagePaths = await globPaths('build/production/resources/**/mobile/**/*.png');
  await Promise.all(mobileImagePaths.map(v => resizeImage(v, '50%')));
  console.log('complete scale down mobile images');
})();