import type { BurstCommandSelected, CommandCanceled } from "../../../td-scenes/battle/custom-battle-event";
import { focusOutBurstButton } from "../../focus";
import { extractLastPlayer } from "../../last-player-extractor";
import type { BurstTutorialState, SelectableCommands } from "../state";
import { burstIsTrumpCard } from "../stories/burst-is-trump-card";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: BurstTutorialState;

  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バーストコマンド選択イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return イベント終了情報
 */
export async function onBurstCommandSelected(props: BurstCommandSelected, state: BurstTutorialState): Promise<Ret> {
  const enableBurstCommand: SelectableCommands[] = ["BurstOnly", "All"];

  if (!enableBurstCommand.includes(state.selectableCommands)) {
    return {
      state,
      cancel: {
        isCommandCanceled: true
      }
    };
  }

  if (state.selectableCommands === "BurstOnly") {
    focusOutBurstButton(props);
    return {
      state: { ...state,
        selectableCommands: "All"
      },
      cancel: {
        isCommandCanceled: false
      }
    };
  }

  const lastPlayer = extractLastPlayer(props, state.stateHistory);

  if (lastPlayer && lastPlayer.armdozer.battery === lastPlayer.armdozer.maxBattery) {
    await burstIsTrumpCard(props);
    return {
      state,
      cancel: {
        isCommandCanceled: true
      }
    };
  }

  return {
    state,
    cancel: {
      isCommandCanceled: false
    }
  };
}