// @flow

/** タイムスケールに設定できる値 */
export const TimeScales = [1, 0.5, 0.25];

/** タイムスケールボタンモデル */
export type TimeScaleButtonModel = {
  /** タイムスケール */
  timeScale: number,
};