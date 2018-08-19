/** バッテリースライダーの描画パラメータ */
export type BatterySliderParam = {
  /** 現在のバッテリー値 */
  battery: number,
  /** 選択可能なバッテリーの最大値 */
  maxEnableBattery: number,
  /** 最大バッテリー値 */
  maxBattery: number,
  /** 描画位置X */
  dx: number,
  /** 描画位置Y */
  dy: number
};