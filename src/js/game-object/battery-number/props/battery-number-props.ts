import { BatteryNumberModel } from "../model/battery-number-model";
import { BatteryNumberView } from "../view/battery-number-view";

/** バッテリー数字 プロパティ */
export type BatteryNumberProps = {
  /** モデル */
  model: BatteryNumberModel;
  /** ビュー */
  view: BatteryNumberView;
};
