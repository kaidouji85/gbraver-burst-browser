// @flow

/**
 * 衝撃波 軌跡 モデル
 */
export type ShockWaveLineModel = {
  /** 中心からの移動距離 */
  distance: number,
  /** 不透明度 */
  opacity: number,
  /** 角度 */
  rotate: number,
  /** 現在の拡大率 */
  scale: number,
  /**
   * アニメーションの最終フレームで設定させる拡大率
   * インスタンスごとにランダム値を割り振る想定
   */
  toScale: number,
};

/**
 * 衝撃波 リング モデル
 */
export type ShockWaveRingModel = {
  /** 不透明度 */
  opacity: number,
  /** 拡大率 */
  scale: number,
};

/**
 * 衝撃波のモデル
 */
export type ShockWaveModel = {
  /** 位置 */
  position: {
    x: number,
    y: number,
    z: number
  },
  /** リング */
  ring: ShockWaveRingModel,
  /** 軌跡 */
  lines: ShockWaveLineModel[],
};