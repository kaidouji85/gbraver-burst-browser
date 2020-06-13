// @flow

/** アニメーション種別 */
export type AnimationType =
  'STAND' |
  'HM_CHARGE' |
  'HM_ATTACK' |
  'HM_TO_STAND' |
  'KNOCK_BACK' |
  'DOWN' |
  'GUTS_UP' |
  'GUTS_DOWN' |
  'GUTS_TO_STAND' |
  'GUARD' |
  'BACK_STEP' |
  'FRONT_STEP';

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