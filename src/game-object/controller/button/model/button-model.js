// @flow

/** ボタン押し込み速度 */
export const SPEED = 32;

/** ボタンのモデル */
export type ButtonModel = {
  /**
   * ボタン押し込みの深さ
   * 0〜1で指定して、1が最大まで押し込んでいる
   */
  depth: number,
  /**
   * ボタン透明度
   * 0〜1で指定して、0で完全透明
   */
  opacity: number,
}