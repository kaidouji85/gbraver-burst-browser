import type {
  BurstCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusOutBurstButton, isBurstButtonFocused } from "../../focus";
import { ZeroDefenseTutorialProps } from "../props";
import type { ZeroDefenseTutorialState } from "../state";

/** イベント終了情報 */
type Ret = {
  /** イベントステート更新結果 */
  eventState: ZeroDefenseTutorialState;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バーストコマンド選択イベント
 * @param props イベントプロパティ
 * @returns コマンドキャンセル情報
 */
export async function onBurstCommandSelected(
  props: Readonly<BurstCommandSelected & ZeroDefenseTutorialProps>,
): Promise<Ret> {
  if (isBurstButtonFocused(props)) {
    focusOutBurstButton(props);
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
