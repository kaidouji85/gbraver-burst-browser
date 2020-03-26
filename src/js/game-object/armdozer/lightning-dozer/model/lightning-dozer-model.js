// @flow

/** アニメーション種別 */
export type AnimationType =
  'STAND' |
  'TACKLE';

/** ライトニングドーザのモデル */
export type LightningDozerModel = {
  /** 座標 */
  position: {
    x: number,
    y: number,
    z: number
  },

  /** アニメーション */
  animation: {
    /** 種別 */
    type: AnimationType,
    /** 0〜1で指定するフレーム */
    frame: number
  },
}