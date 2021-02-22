// @flow

export const MAX_PIXEL_RATIO = 2;

/**
 * レンダーのピクセルレートを計算する
 *
 * @param devicePixelRatio デバイスのピクセルレート
 * @return レンダーのピクセルレート
 */
export function renderPixelRatio(devicePixelRatio: number): number {
  return Math.min(devicePixelRatio, MAX_PIXEL_RATIO);
}