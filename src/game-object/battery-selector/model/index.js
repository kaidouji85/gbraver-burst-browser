// @flow

import type {ButtonLabel} from "./button-label";

/** バッテリー最大値 */
export const MAX_BATTERY = 5;

/** バッテリー最小値 */
export const MIN_BATTERY = 0;

/** バッテリーセレクタモデル */
export type BatterySelectorModel = {
  /** 最後に選択したバッテリーの値 */
  battery: number,
  /** 選択できるバッテリー最大値 */
  enableMaxBattery: number,
  /** メーター針の値、0〜1のパーセント */
  needle: number,
  /** バッテリーボタンラベル */
  label: ButtonLabel,
  /** 透明度 1〜0で指定して1で完全不透明 */
  opacity: number,
  /** 操作不可能フラグ、trueで操作不可能 */
  disabled: boolean,
};
