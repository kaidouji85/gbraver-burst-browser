const im = require('imagemagick');
const glob = require("glob")

/**
 * globパターンでファイル名を検索する
 *
 * @param {string} pattern globパターン
 * @return {Promise<string[]>} 検索結果
 */
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

/**
 * 画像の大きさを変更する
 *
 * @param {string} origin 画像ファイルのパス
 * @param {string} scale 拡大率を50%という形式で指定
 * @return {Promise<string>} imagemagickの標準出力内容
 */
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

/**
 * エントリポイント
 */
(async () => {
  console.log('start scale down mobile images');
  const mobileImagePaths = await globPaths('build/production/resources/**/mobile/**/*.png');
  for(const path of mobileImagePaths) {
    console.log(`start ${path}`);
    await resizeImage(path, '50%');
    console.log(`complete ${path}`);
  }
  console.log('complete scale down mobile images');
})();