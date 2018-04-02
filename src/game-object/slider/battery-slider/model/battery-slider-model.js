// @flow

/** バッテリースライダーのモデル */
export type BatterySliderModel = {
  /** バッテリー最大値 */
  maxBattery: number,
  /**
   * 現在のバッテリー値
   * 外にバッテリー値を渡す場合には、本プロパティを参照する
   */
  battery: number,
  /**
   * アニメーション用に時間経過で徐々に変更されるバッテリー値
   */
  animateBattery: number
};