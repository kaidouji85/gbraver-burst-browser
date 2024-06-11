import type {
  BurstCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusOutBurstButton, isBurstButtonFocused } from "../../focus";
import { BatterySystemTutorialProps } from "../props";
import type { BatterySystemTutorialState } from "../state";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: BatterySystemTutorialState;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バーストコマンド選択イベント
 * @param props イベントプロパティ
 * @returns コマンドキャンセル情報
 */
export async function onBurstCommandSelected(
  props: Readonly<BurstCommandSelected & BatterySystemTutorialProps>,
): Promise<Ret> {
  if (isBurstButtonFocused(props)) {
    focusOutBurstButton(props);
    return {
      state: props.eventState,
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  return {
    state: props.eventState,
    cancel: {
      isCommandCanceled: false,
    },
  };
}
