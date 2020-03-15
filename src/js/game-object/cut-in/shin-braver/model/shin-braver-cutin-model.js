// @flow

/**
 * アニメーションタイプ
 */
export type AnimationType = 'BurstCharge' | 'BurstRelease';

/**
 * シンブレイバーバーストのモデル
 */
export type ShinBraverCutInModel = {
  /** 表示位置 */
  position: {
    x: number,
    y: number,
    z: number
  },
  /** アニメーション */
  animation: {
    /** アニメーションタイプ */
    type: AnimationType,
    /** 0〜1で指定するアニメーションフレーム */
    frame: number
  },
};