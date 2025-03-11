import { glob } from "glob";
import { imageSizeFromFile } from "image-size/fromFile";
import sharp from "sharp";

sharp.cache(false);

/**
 * png画像の大きさを変更する
 * @param origin 画像ファイルのパス
 * @param scale 拡大率
 * @return 大きさ変更が完了したら発火するPromise
 */
async function resizePng(origin: string, scale: number): Promise<void> {
  const size = await imageSizeFromFile(origin);
  const height = Math.floor((size.height ?? 0) * scale);
  const buffer = await sharp(origin).resize(null, height).png().toBuffer();
  await sharp(buffer).toFile(origin);
}

/**
 * webp画像の大きさを変更する
 * @param origin 画像ファイルのパス
 * @param scale 拡大率
 * @return 大きさ変更が完了したら発火するPromise
 */
async function resizeWebp(origin: string, scale: number): Promise<void> {
  const size = await imageSizeFromFile(origin);
  const height = Math.floor((size.height ?? 0) * scale);
  const buffer = await sharp(origin)
    .resize(null, height)
    .webp({ lossless: true, quality: 100 })
    .toBuffer();
  await sharp(buffer).toFile(origin);
}

/**
 * 25%縮小するグランドーザ画像パスを取得する
 * @return グランドーザの画像パス
 */
const getGranDozerWebpPathsFor25Percent = () =>
  glob("build/production/resources/**/mobile/armdozer/gran-dozer/**/*.webp", {
    ignore: [
      "build/production/resources/**/mobile/armdozer/gran-dozer/bust-shot.webp",
      "build/production/resources/**/mobile/armdozer/gran-dozer/player-select.webp",
    ],
  });

/**
 * 50%縮小するグランドーザの画像パスを取得する
 * @return グランドーザの画像パス
 */
const getGranDozerWebpPathsFor50Percent = () =>
  glob(
    "build/production/resources/**/mobile/armdozer/gran-dozer/**/player-select.webp",
  );

/**
 * pngモデルテクスチャのパスを取得する
 * @return pngモデルテクスチャのパス
 */
const pngPngModelTexturrPaths = () =>
  glob("build/production/resources/**/mobile/**/model/**/*.png");

/**
 * webp画像のパスを取得する
 * @return webp画像のパス
 */
const getWebpPaths = () =>
  glob("build/production/resources/**/mobile/**/*.webp", {
    ignore: [
      "build/production/resources/**/mobile/default-user-icon.webp",
      "build/production/resources/**/mobile/armdozer/shin-braver/cutin-down.webp",
      "build/production/resources/**/mobile/armdozer/shin-braver/cutin-up.webp",
      "build/production/resources/**/mobile/armdozer/neo-landozer/cutin-down.webp",
      "build/production/resources/**/mobile/armdozer/neo-landozer/cutin-up.webp",
      "build/production/resources/**/mobile/armdozer/lightning-dozer/cutin-down.webp",
      "build/production/resources/**/mobile/armdozer/lightning-dozer/cutin-up.webp",
      "build/production/resources/**/mobile/armdozer/wing-dozer/burst-down.webp",
      "build/production/resources/**/mobile/armdozer/wing-dozer/burst-up.webp",
      "build/production/resources/**/mobile/armdozer/genesis-braver/cutin-burst-up.webp",
      "build/production/resources/**/mobile/armdozer/genesis-braver/cutin-burst-up.webp",
      "build/production/resources/**/mobile/armdozer/gran-dozer/**/*.webp",
    ],
  });

/**
 * モバイル用画像をスケールダウンする
 */
(async () => {
  console.log("start scale down mobile images");

  const [
    granDozer25percentWebpPaths,
    granDozer50percentWebpPaths,
    pngModelTexturePaths,
    webpPaths,
  ] = await Promise.all([
    getGranDozerWebpPathsFor25Percent(),
    getGranDozerWebpPathsFor50Percent(),
    pngPngModelTexturrPaths(),
    getWebpPaths(),
  ]);
  await Promise.all([
    ...granDozer25percentWebpPaths.map((p) => resizeWebp(p, 0.25)),
    ...granDozer50percentWebpPaths.map((p) => resizeWebp(p, 0.5)),
    ...pngModelTexturePaths.map((p) => resizePng(p, 0.25)),
    ...webpPaths.map((p) => resizeWebp(p, 0.5)),
  ]);

  console.log("complete scale down mobile images");
})();
