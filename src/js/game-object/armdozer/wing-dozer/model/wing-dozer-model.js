// @flow

/**
 * アニメーションタイプ
 */
export type AnimationType =
  'STAND' |
  'UPPER_CHARGE' |
  'UPPER_ATTACK' |
  'UPPER_TO_STAND' |
  'DASH_UP' |
  'DASH_DOWN' |
  'DASH_TO_STAND' |
  'KNOCK_BACK' |
  'DOWN' |
  'BACK_STEP' |
  'FRONT_STEP';

/**
 * ウィングドーザ モデル
 */
export type WingDozerModel = {
  /** 座標 */
  position: {
    x: number,
    y: number,
    z: number,
  },
  /** アニメーション */
  animation: {
    /** アニメーションの種類 */
    type: AnimationType,
    /** 0〜1で指定するアニメーションフレーム */
    frame: number,
  }
};