import type {
  BurstSelectedEventProps,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusOutBurstButton, isBurstButtonFocused } from "../../focus";
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
 * バーストコマンド選択イベント
 * @param props イベントプロパティ
 * @returns コマンドキャンセル情報
 */
export async function onBurstCommandSelected(
  props: Readonly<BurstSelectedEventProps & BatterySystemTutorialProps>,
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
