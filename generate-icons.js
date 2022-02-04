const sharp = require('sharp');
const path = require('path');
const toIco = require('to-ico');
const fs = require('fs').promises;

const buildRoot = path.resolve(__dirname, 'build/production');
const originIconPath = path.resolve(buildRoot, `app-icon-512x512.png`);

/**
 * アプリアイコンを新規ファイルでリサイズする
 *
 * @param {string} fileName 保存するファイル名
 * @param {number} width リサイズ後の横幅
 * @param {number} height リサイズ後の縦幅
 * @return {Promise<void>} 大きさ変更が完了したら発火するPromise
 */
async function resizeAppIcon(fileName, width, height) {
  const buffer = await sharp(originIconPath)
    .resize(width, height)
    .toBuffer();
  const filePath = path.resolve(buildRoot, fileName);  
  return sharp(buffer).toFile(filePath);
}

async function toFavicon() {
  const pngBuffer = await sharp(originIconPath)
    .resize(48, 48)
    .toBuffer();
  const icoBuffer = await toIco([pngBuffer]);
  const icoPath = path.resolve(buildRoot, 'favicon.ico');
  await fs.writeFile(icoPath, icoBuffer);
}

/** 512x512のアイコンから様々なサイズのアイコンを自動生成する */
(async () => {
  console.log('start generate icons');
  await Promise.all([
    resizeAppIcon('app-icon-192x192.png', 192, 192),
    resizeAppIcon('app-icon-180x180.png', 180, 180),
    resizeAppIcon('favicon-32x32.png', 32, 32),
    resizeAppIcon('favicon-16x16.png', 16, 16),
    toFavicon()
  ]);
  console.log('end generate icons');
})();