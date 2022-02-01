// @flow

/** ピクセルレート最大値 */
export const MAX_PIXEL_RATIO = 2;

/** ピクセルレート最小値 */
export const MIN_PIXEL_RATIO = 1;

/**
 * レンダーのピクセルレートを計算する
 *
 * @param pixelRatio ピクセルレート
 * @return レンダーのピクセルレート
 */
export function renderPixelRatio(pixelRatio: number): number {
  return Math.max(MIN_PIXEL_RATIO, Math.min(pixelRatio, MAX_PIXEL_RATIO));
}