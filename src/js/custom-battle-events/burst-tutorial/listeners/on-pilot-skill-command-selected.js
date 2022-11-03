// @flow
import type {
  CommandCanceled,
  PilotSkillCommandSelected,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusOutPilotButton } from "../../focus";
import type { BurstTutorialState, SelectableCommands } from "../state";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: BurstTutorialState,
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled,
};

/**
 * パイロットスキルコマンド選択イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return イベント終了情報
 */
export async function onPilotSkillCommandSelected(
  props: $ReadOnly<PilotSkillCommandSelected>,
  state: BurstTutorialState
): Promise<Ret> {
  const enablePilotSkillCommand: SelectableCommands[] = [
    "PilotSkillOnly",
    "All",
  ];
  if (!enablePilotSkillCommand.includes(state.selectableCommands)) {
    return { state, cancel: { isCommandCanceled: true } };
  }

  if (state.selectableCommands === "PilotSkillOnly") {
    focusOutPilotButton(props);
    return {
      state: { ...state, selectableCommands: "All" },
      cancel: { isCommandCanceled: false },
    };
  }

  return { state, cancel: { isCommandCanceled: false } };
}
