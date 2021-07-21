// @flow

/** バッテリー補正モデル */
export type BatteryCorrectModel = {
  /** 補正値 */
  correctValue: number,
  /** 0〜1で指定する透明度、0で完全透明 */
  opacity: number,
  /** 拡大率 */
  scale: number,
};