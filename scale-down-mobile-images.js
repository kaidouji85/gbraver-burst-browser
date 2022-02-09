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
      err ? reject(err) :  resolve(paths);
    });
  });
}

/**
 * png画像の大きさを変更する
 *
 * @param {string} origin 画像ファイルのパス
 * @param {number} scale 拡大率
 * @return {Promise<void>} 大きさ変更が完了したら発火するPromise
 */
async function resizePng(origin, scale) {
  const size = sizeOf(origin);
  const height = Math.floor(size.height * scale);
  const buffer = await sharp(origin)
    .resize(null, height)
    .png()
    .toBuffer();
  return sharp(buffer).toFile(origin);
}

/**
 * webp画像の大きさを変更する
 *
 * @param {string} origin 画像ファイルのパス
 * @param {number} scale 拡大率
 * @return {Promise<void>} 大きさ変更が完了したら発火するPromise
 */
async function resizeWebp(origin, scale) {
  const size = sizeOf(origin);
  const height = Math.floor(size.height * scale);
  const buffer = await sharp(origin)
    .resize(null, height)
    .webp({lossless: true})
    .toBuffer();
  return sharp(buffer).toFile(origin);
}

/**
 * モバイル用画像をスケールダウンする
 */
(async () => {
  console.log('start scale down mobile images');

  const webpImages = 'build/production/resources/**/mobile/**/*.webp';
  const ignoreWebpImages = [
    'build/production/resources/**/mobile/armdozer/shin-braver/cutin-down.webp',
    'build/production/resources/**/mobile/armdozer/shin-braver/cutin-up.webp',
    'build/production/resources/**/mobile/armdozer/neo-landozer/cutin-down.webp',
    'build/production/resources/**/mobile/armdozer/neo-landozer/cutin-up.webp',
    'build/production/resources/**/mobile/armdozer/lightning-dozer/cutin-down.webp',
    'build/production/resources/**/mobile/armdozer/lightning-dozer/cutin-up.webp',
    'build/production/resources/**/mobile/armdozer/wing-dozer/burst-down.webp',
    'build/production/resources/**/mobile/armdozer/wing-dozer/burst-up.webp',
  ];
  const pngModelTextures = 'build/production/resources/**/mobile/**/model/**/*.png';

  const [webpImagePaths, pngModelTexturePaths] = await Promise.all([
    globPromise(webpImages, {ignore: ignoreWebpImages}),
    globPromise(pngModelTextures),
  ]);
  await Promise.all([
    ...webpImagePaths.map(v => resizeWebp(v, 0.5)),
    ...pngModelTexturePaths.map(v => resizePng(v, 0.25)),
  ]);

  console.log('complete scale down mobile images');
})();