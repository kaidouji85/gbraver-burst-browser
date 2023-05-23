import type {
  CommandCanceled,
  PilotSkillCommandSelected,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusOutPilotButton, isPilotButtonFocused } from "../../focus";
import type { ZeroDefenseTutorialState } from "../state";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: ZeroDefenseTutorialState;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * パイロットスキルコマンド選択イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return イベント終了情報
 */
export async function onPilotSkillCommandSelected(
  props: PilotSkillCommandSelected,
  state: ZeroDefenseTutorialState
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
