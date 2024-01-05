import { CommandCanceled } from "../../../../td-scenes/battle/custom-battle-event";
import { BatterySystemTutorialState } from "../../state";

/** onBatteryCommandSelected 終了情報  */
export type BatteryCommandSelectedEnd = {
  /** ステート更新結果 */
  state: BatterySystemTutorialState;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};
