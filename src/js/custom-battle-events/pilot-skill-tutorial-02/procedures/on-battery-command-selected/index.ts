import {
  BatteryCommandSelected,
  CommandCanceled,
} from "../../../../td-scenes/battle/custom-battle-event";
import { PilotSkillTutorial02Props } from "../../props";
import { PilotSkillTutorial02State } from "../../state";
import { executeLessThanAttack3IfNeeded } from "./execute-less-than-attack3-if-needed";
import { executeNoZeroDefenseIfNeeded } from "./execute-no-zero-defense-if-needed";

/** イベント終了情報 */
type Ret = {
  /** イベントステート更新結果 */
  eventState: PilotSkillTutorial02State;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @returns イベント終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected & PilotSkillTutorial02Props>,
): Promise<Ret> {
  const isNoZeroDefenseExecuted = await executeNoZeroDefenseIfNeeded(props);
  if (isNoZeroDefenseExecuted) {
    return {
      eventState: props.eventState,
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  const isLessThanAttack3Executed = await executeLessThanAttack3IfNeeded(props);
  if (isLessThanAttack3Executed) {
    return {
      eventState: props.eventState,
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  return {
    eventState: props.eventState,
    cancel: {
      isCommandCanceled: false,
    },
  };
}
