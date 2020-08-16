// @flow

/**
 * シンヤ モデル
 */
export type ShinyaModel = {
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