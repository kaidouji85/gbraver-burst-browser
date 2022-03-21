// @flow

/** リザルトインジケータ モデル */
export type ResultIndicatorModel = {
  /** 拡大率 */
  scale: number,
  /** 透明度 */
  opacity: number,
  /** 座標 */
  position: {
    x: number,
    y: number,
  }
};