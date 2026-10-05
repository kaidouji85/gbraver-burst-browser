import { ButtonLabel } from "./model/button-label";

/** バッテリーセレクタオープンパラメータ */
export type BatterySelectorOpenParam = {
  /** 初期値 */
  initialValue: number;
  /** バッテリー最大値 */
  maxBattery: number;
  /** 選択可能な最大値 */
  enableMaxBattery: number;
  /** ボタンのラベル */
  label: ButtonLabel;
};
