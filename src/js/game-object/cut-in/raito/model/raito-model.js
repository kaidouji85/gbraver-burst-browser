// @flow

/**
 * ライト モデル
 */
export type RaitoModel = {
  /** 0〜1で指定する透明度、1で完全不透明 */
  opacity: number,

  /** 拡大率 */
  scale: number,

  /** 位置 */
  position: {
    x: number
  }
};