// @flow
import * as R from 'ramda';

/**
 * キャンバス用画像ファイルのパス定数
 * resourcesフォルダ配下からの早退パスを記入する
 * パスの先頭に/(スラッシュ)をつける必要はない
 */
export const CANVAS_PICTURE_PATH = {
  // HPゲージ系
  HP_GAUGE_LABEL: 'gauge/hp-gauge/hp-gauge-label.png',

  // バッテリーゲージ系
  BATTERY_GAUGE_LABEL: 'gauge/battery-gauge/battery-gauge-label.png',
  BATTERY_BAR_UP: 'gauge/battery-gauge/battery-bar-up.png',
  BATTERY_BAR_DOWN: 'gauge/battery-gauge/battery-bar-down.png',
};

/** キャンバス用画像管理オブジェクト */
export type CanvasPicture = {
  /** キャンバス用画像のパス */
  path: string,
  /** キャンバス用画像 */
  image: Image,
};

/**
 * CANVAS用画像ファイルを読み込む
 *
 * @param basePath ベースとなるパス
 * @param path  読み込むファイルのパス
 * @return 読み込み結果
 */
export function loadCanvasImage(basePath: string, path: string): CanvasPicture {
  const image = new Image();
  image.src = `${basePath}${path}`;
  return new Promise(resolve => image.onload = () => resolve({path, image}));
}

/**
 * 全てのCANVAS用画像ファイルを読み込む
 *
 * @param basePath ベースとなるパス
 * @return 読み込み結果
 */
export async function loadAllCanvasImage(basePath: string): CanvasPicture[] {
  const paths: string[] = R.values(CANVAS_PICTURE_PATH);
  return await Promise.all(paths.map(path => loadCanvasImage(basePath, path)));
}