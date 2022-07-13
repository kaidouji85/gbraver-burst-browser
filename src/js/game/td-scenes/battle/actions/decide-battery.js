// @flow

/** バッテリー決定 */
export type DecideBattery = {
  type: 'decideBattery',
  /** 選択したバッテリーの値 */
  battery: number,
  /** イベント */
  event: Event,
};