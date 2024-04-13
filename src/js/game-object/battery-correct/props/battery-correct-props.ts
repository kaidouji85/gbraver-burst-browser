import { BatteryCorrectModel } from "../model/battery-correct-model";
import { BatteryCorrectView } from "../view/battery-correct-view";

/** バッテリー補正 プロパティ */
export type BatteryCorrectProps = {
  /** モデル */
  model: BatteryCorrectModel;
  /** ビュー */
  view: BatteryCorrectView;
};
