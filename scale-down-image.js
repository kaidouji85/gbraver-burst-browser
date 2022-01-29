const glob = require("glob");
const sizeOf = require('image-size');
const sharp = require('sharp');

sharp.cache(false);

/**
 * globをPromise化したもの
 *
 * @param {string} pattern globパターン
 * @param {Object|undefined} option オプション
 * @return {Promise<string[]>} 検索結果
 */
function globPromise(pattern, option) {
  return new Promise((resolve, reject) => {
    glob(pattern, option, (err, paths) => {
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
 * @param {number} scale 拡大率を50%という形式で指定
 * @return {Promise<void>} 大きさ変更が完了したら発火するPromise
 */
async function resizeImage(origin, scale) {
  const size = sizeOf(origin);
  const height = Math.floor(size.height * scale);
  const buffer = await sharp(origin)
    .resize(null, height)
    .toBuffer();
  return sharp(buffer).toFile(origin);
}

/**
 * エントリポイント
 */
(async () => {
  console.log('start scale down mobile images');
  const allImages = 'build/production/resources/**/mobile/**/*.+(png|webp)';
  const modelTextures = 'build/production/resources/**/mobile/**/model/**/*.png';

  console.log('start background texture');
  const modelTexturePaths = await globPromise(modelTextures);
  for(const path of modelTexturePaths) {
    await resizeImage(path, 0.25);
  }

  console.log('start other images');
  const otherImagePaths = await globPromise(allImages, {ignore: [modelTextures]});
  for(const path of otherImagePaths) {
    await resizeImage(path, 0.5);
  }

  console.log('complete scale down mobile images');
})();