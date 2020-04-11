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
    type: AnimationType,
    /** アニメーションフレーム */
    frame: number
  },

  /**
   * トラッキング
   * 本プロパティは、HUD座標系に変換した値をセットすることを想定している
   */
  tracking: {
    /** x座標 */
    x: number,
    /** y座標 */
    y: number,
  },

  /** 0〜1で指定する不透明度 */
  opacity: number
};
