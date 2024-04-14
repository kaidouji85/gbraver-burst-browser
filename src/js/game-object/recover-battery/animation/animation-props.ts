import { SEPlayer } from "../../../se/se-player";
import { RecoverBatteryModel } from "../model/recover-battery-model";
import { RecoverBatterySounds } from "../sounds/recover-battery-sounds";

/** バッテリー回復 アニメーション プロパティ */
export type RecoverBatteryAnimationProps = {
  /** モデル */
  model: RecoverBatteryModel;
  /** サウンド */
  sounds: RecoverBatterySounds;
  /** SE再生オブジェクト */
  se: SEPlayer;
};
