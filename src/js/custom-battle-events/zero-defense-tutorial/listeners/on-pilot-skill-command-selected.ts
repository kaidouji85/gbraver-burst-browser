import type {
  CommandCanceled,
  PilotSkillCommandSelected,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusOutPilotButton, isPilotButtonFocused } from "../../focus";
import type { ZeroDefenseTutorialState } from "../state";
import {ZeroDefenseTutorialProps} from "../props";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: ZeroDefenseTutorialState;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * パイロットスキルコマンド選択イベント
 * @param props イベントプロパティ
 * @return イベント終了情報
 */
export async function onPilotSkillCommandSelected(
  props: Readonly<PilotSkillCommandSelected & ZeroDefenseTutorialProps>,
): Promise<Ret> {
  if (isPilotButtonFocused(props)) {
    focusOutPilotButton(props);
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  return {
    state: props.state,
    cancel: {
      isCommandCanceled: false,
    },
  };
}
