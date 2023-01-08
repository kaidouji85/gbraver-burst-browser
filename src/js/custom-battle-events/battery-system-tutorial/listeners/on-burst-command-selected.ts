import type {
  BurstCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusOutBurstButton } from "../../focus";
import type { BatterySystemTutorialState, SelectableCommands } from "../state";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: BatterySystemTutorialState;

  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バーストコマンド選択イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return コマンドキャンセル情報
 */
export async function onBurstCommandSelected(
  props: Readonly<BurstCommandSelected>,
  state: BatterySystemTutorialState
): Promise<Ret> {
  const enableBurstCommand: SelectableCommands[] = ["BurstOnly", "All"];

  if (!enableBurstCommand.includes(state.selectableCommands)) {
    return {
      state,
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  if (state.selectableCommands === "BurstOnly") {
    focusOutBurstButton(props);
    const selectableCommands = state.isBatterySystemDescriptionComplete
      ? "All"
      : "BatteryOnly";
    return {
      state: { ...state, selectableCommands },
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
