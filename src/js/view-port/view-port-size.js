// @flow

/**
 * ビューポート幅を取得する
 *
 * @return ビューポート幅(ピクセル)
 */
export function getViewPortWidth(): number {
  return window.innerWidth;
}

/**
 * ビューポート高を取得する
 *
 * @return ビューポート高(ピクセル)
 */
export function getViewPortHeight(): number {
  return window.innerHeight;
}