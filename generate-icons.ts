import icongen from "icon-gen";
import * as path from "path";
import sharp from "sharp";

const buildRoot = path.resolve(__dirname, "build/production");
const originIconPath = path.resolve(buildRoot, `app-icon-512x512.png`);

/**
 * オリジナルのアプリアイコンをコピーした上でリサイズする
 * @param fileName 保存するファイル名
 * @param size ピクセル単位で指定するリサイズ後の大きさ
 * @return 大きさ変更が完了したら発火するPromise
 */
async function resizeAppIcon(fileName: string, size: number): Promise<void> {
  const buffer = await sharp(originIconPath).resize(size, size).toBuffer();
  const filePath = path.resolve(buildRoot, fileName);
  await sharp(buffer).toFile(filePath);
}

/**
 * アプリアイコンからfavicon.icoを生成する
 * @return 処理が完了したら発火するPromise
 */
async function toFavicon(): Promise<void> {
  await icongen(originIconPath, buildRoot, {
    report: true,
    ico: {
      name: "favicon",
      sizes: [48],
    },
  });
}

/**
 * 512x512のアイコンから様々なサイズのアイコンを自動生成する
 */
(async () => {
  console.log("start generate icons");
  const appIcon = (size: number) =>
    resizeAppIcon(`app-icon-${size}x${size}.png`, size);
  const pngFavicon = (size: number) =>
    resizeAppIcon(`favicon-${size}x${size}.png`, size);
  await Promise.all([
    appIcon(192),
    appIcon(180),
    pngFavicon(32),
    pngFavicon(16),
    toFavicon(),
  ]);
  console.log("end generate icons");
})();
