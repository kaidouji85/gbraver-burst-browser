// @flow

/**
 * アニメーションタイプ
 */
export type AnimationType =
  'STAND' |
  'UPPER_CHARGE' |
  'UPPER_ATTACK';

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