import {glob} from "glob";
import {imageSize} from "image-size";
import sharp from "sharp";

sharp.cache(false);

/**
 * png画像の大きさを変更する
 *
 * @param origin 画像ファイルのパス
 * @param scale 拡大率
 * @return 大きさ変更が完了したら発火するPromise
 */
async function resizePng(origin: string, scale: number) {
  const size = imageSize(origin);
  const height = Math.floor(size.height ?? 0 * scale);
  const buffer = await sharp(origin)
    .resize(null, height)
    .png()
    .toBuffer();
  return sharp(buffer).toFile(origin);
}

/**
 * webp画像の大きさを変更する
 *
 * @param origin 画像ファイルのパス
 * @param scale 拡大率
 * @return 大きさ変更が完了したら発火するPromise
 */
async function resizeWebp(origin: string, scale: number) {
  const size = imageSize(origin);
  const height = Math.floor(size.height ?? 0 * scale);
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
    glob(webpImages, {ignore: ignoreWebpImages}),
    glob(pngModelTextures),
  ]);
  await Promise.all([
    ...webpImagePaths.map(v => resizeWebp(v, 0.5)),
    ...pngModelTexturePaths.map(v => resizePng(v, 0.25)),
  ]);

  console.log('complete scale down mobile images');
})();