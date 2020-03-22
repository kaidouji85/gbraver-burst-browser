// @flow

/**
 * 衝撃波の軌跡
 */
export type ShockWaveLineModel = {
  /** 中心からの移動距離 */
  distance: number,
  /** 不透明度 */
  opacity: number,
  /** 角度 */
  rotate: number
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
  lines: ShockWaveLineModel[],
};