const sharp = require('sharp');
const path = require('path');

const buildRoot = path.resolve(__dirname, 'build/production');
const iconFilePrefix = 'app-icon';
const originIconPath = path.resolve(buildRoot, `${iconFilePrefix}-512x512.png`);

/**
 * アプリアイコンを新規ファイルでリサイズする
 *
 * @param {number} width リサイズ後の横幅
 * @param {number} height リサイズ後の縦幅
 * @return {Promise<void>} 大きさ変更が完了したら発火するPromise
 */
async function resizeAppIcon(width, height) {
  const buffer = await sharp(originIconPath)
    .resize(width, height)
    .toBuffer();
  const filePath = path.resolve(buildRoot, `${iconFilePrefix}-${width}x${height}.png`);  
  return sharp(buffer).toFile(filePath);
}

/** 512x512のアイコンから様々なサイズのアイコンを自動生成する */
(async () => {
  console.log('start generate app icon');
  await resizeAppIcon(192, 192);
  console.log('end generate app icon');
})();