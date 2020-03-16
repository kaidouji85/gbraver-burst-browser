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
  /** 0〜1で指定する透明度、0で完全透明 */
  opacity: number,
  /** 拡大率 */
  scale: number,
};