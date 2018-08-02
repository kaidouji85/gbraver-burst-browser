// @flow

/** バッテリースライダーのモデル */
export type BatterySliderModel = {
  /** バッテリー最大値 */
  maxBattery: number,
  /** 現在のバッテリー値 */
  battery: number,
  /** 透明度、0〜1で指定して1で完全不透明 */
  opacity: number,
};