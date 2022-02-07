const sharp = require('sharp');
const path = require('path');
const toIco = require('to-ico');
const fs = require('fs').promises;

const buildRoot = path.resolve(__dirname, 'build/production');
const originIconPath = path.resolve(buildRoot, `app-icon-512x512.png`);

/**
 * オリジナルのアプリアイコンをコピーした上でリサイズする
 *
 * @param {string} fileName 保存するファイル名
 * @param {number} size ピクセル単位で指定するリサイズ後の大きさ
 * @return {Promise<void>} 大きさ変更が完了したら発火するPromise
 */
async function resizeAppIcon(fileName, size) {
  const buffer = await sharp(originIconPath)
    .resize(size, size)
    .toBuffer();
  const filePath = path.resolve(buildRoot, fileName);  
  return sharp(buffer).toFile(filePath);
}

/**
 * アプリアイコンからfavicon.icoを生成する
 *
 * @return {Promise<void>} 処理が完了したら発火するPromise
 */
async function toFavicon() {
  const pngBuffer = await sharp(originIconPath)
    .resize(48, 48)
    .toBuffer();
  const icoBuffer = await toIco([pngBuffer]);
  const icoPath = path.resolve(buildRoot, 'favicon.ico');
  await fs.writeFile(icoPath, icoBuffer);
}

/** 
 * 512x512のアイコンから様々なサイズのアイコンを自動生成する
 */
(async () => {
  console.log('start generate icons');
  const appIcon = (size) => resizeAppIcon(`app-icon-${size}x${size}.png`, size);
  const pngFavicon = size => resizeAppIcon(`favicon-${size}x${size}.png`, size);
  await Promise.all([
    appIcon(192),
    appIcon(180),
    pngFavicon(32),
    pngFavicon(16),
    toFavicon()
  ]);
  console.log('end generate icons');
})();