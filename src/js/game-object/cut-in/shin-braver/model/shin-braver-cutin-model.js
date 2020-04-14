// @flow

/**
 * アニメーションタイプ
 */
export type AnimationType =
  'BurstCharge' |   // TODO 削除する
  'BurstRelease' |  // TODO 削除する
  'CUT_IN_UP' |
  'CUT_IN_DOWN';

/**
 * シンブレイバーバーストのモデル
 */
export type ShinBraverCutInModel = {
  // TODO 削除する
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