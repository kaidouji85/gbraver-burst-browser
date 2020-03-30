// @flow

/**
 * 電撃バリアモデル
 */
export type LightningBarrierModel = {
  /** 座標 */
  position: {
    x: number,
    y: number,
    z: number
  },
  /** 0〜1で指定する不透明度 */
  opacity: number,
};