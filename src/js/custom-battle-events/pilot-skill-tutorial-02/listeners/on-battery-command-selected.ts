import {PilotSkillTutorial02State} from "../state";
import {BatteryCommandSelected, CommandCanceled} from "../../../td-scenes/battle/custom-battle-event";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: PilotSkillTutorial02State;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @param state イベントステート
 * @return イベント終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected>,
  state: Readonly<PilotSkillTutorial02State>
) {
  return {
    state,
    cancel: {
      isCommandCanceled: false,
    }
  };
}