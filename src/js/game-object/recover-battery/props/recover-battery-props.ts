import { RecoverBatteryModel } from "../model/recover-battery-model";
import { RecoverBatterySounds } from "../sounds/recover-battery-sounds";
import { RecoverBatteryView } from "../view/recover-battery-view";

/** バッテリー回復 プロパティ */
export type RecoverBatteryProps = {
  /** モデル */
  model: RecoverBatteryModel;
  /** ビュー */
  view: RecoverBatteryView;
  /** サウンド */
  sounds: RecoverBatterySounds;
};
