import type {
  CommandCanceled,
  PilotSkillCommandSelected,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusOutPilotButton, isPilotButtonFocused } from "../../focus";
import { BatterySystemTutorialProps } from "../props";
import type { BatterySystemTutorialState } from "../state";

/** イベント終了情報 */
type Ret = {
  /** イベントステート更新結果 */
  eventState: BatterySystemTutorialState;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * パイロットスキルコマンド選択イベント
 * @param props イベントプロパティ
 * @returns イベント終了情報
 */
export async function onPilotSkillCommandSelected(
  props: Readonly<PilotSkillCommandSelected & BatterySystemTutorialProps>,
): Promise<Ret> {
  if (isPilotButtonFocused(props)) {
    focusOutPilotButton(props);
    return {
      eventState: props.eventState,
      cancel: {
        isCommandCanceled: false,
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
