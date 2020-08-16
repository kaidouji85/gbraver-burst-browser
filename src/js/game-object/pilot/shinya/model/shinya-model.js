// @flow

/**
 * シンヤ モデル
 */
export type ShinyaModel = {
  /**
   * 0〜1で指定する透明度、1で完全不透明
   */
  opacity: number,
  /**
   * トラッキング
   */
  tracking: {
    /** x座標 */
    x: number,
    /** y座標 */
    y: number
  }
};