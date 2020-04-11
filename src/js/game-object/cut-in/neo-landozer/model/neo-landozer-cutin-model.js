// @flow

/**
 * アニメーションタイプ
 */
export type AnimationType =
  'CUT_IN_UP' |
  'CUT_IN_DOWN';

/**
 * ネオランドーザカットイン モデル
 */
export type NeoLandozerCutInModel = {
  /** アニメーション */
  animation: {
    /** アニメーションタイプ */
    type: AnimationType
  },

  /** 0〜1で指定する不透明度 */
  opacity: number
};
