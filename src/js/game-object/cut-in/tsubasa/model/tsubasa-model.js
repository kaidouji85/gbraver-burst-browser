// @flow

/**
 * ツバサ モデル
 */
export type TsubasaModel = {
  /**
   * 0〜1で指定する透明度、1で完全不透明
   */
  opacity: number,

  /**
   * 拡大率
   */
  scale: number,

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