// @flow

/** アニメーション種別 */
export type AnimationType =
  'STAND' |
  'HM_CHARGE' |
  'HM_ATTACK' |
  'HM_TO_STAND';

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