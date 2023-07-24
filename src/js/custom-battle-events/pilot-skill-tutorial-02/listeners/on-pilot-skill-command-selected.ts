import {
  CommandCanceled,
  PilotSkillCommandSelected,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusOutPilotButton, isPilotButtonFocused } from "../../focus";
import { PilotSkillTutorial02State } from "../state";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: PilotSkillTutorial02State;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * パイロットスキルコマンド選択イベント
 * @param props イベントプロパティ
 * @param state ステート
 * @return イベント終了情報
 */
export async function onPilotSkillCommandSelected(
  props: Readonly<PilotSkillCommandSelected>,
  state: PilotSkillTutorial02State,
): Promise<Ret> {
  if (isPilotButtonFocused(props)) {
    focusOutPilotButton(props);
    return {
      state,
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  return {
    state,
    cancel: {
      isCommandCanceled: false,
    },
  };
}
