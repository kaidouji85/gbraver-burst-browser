// @flow

/**
 * アニメーションタイプ
 */
export type AnimationType =
  'BURST_UP' |
  'BURST_DOWN';

/**
 * ウィングドーザカットイン モデル
 */
export type WingDozerCutInModel = {
  /** アニメーション */
  animation: {
    /** アニメーションタイプ */
    type: AnimationType,
    /** 0〜1で指定するアニメーションフレーム */
    frame: number
  },

  /** トラッキング */
  tracking: {
    x: number,
    y: number,
  },
  /** 0〜1で指定する透明度、0で完全透明 */
  opacity: number,
  /** 拡大率 */
  scale: number,
}