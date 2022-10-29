// @flow

import type {
  BurstCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusOutBurstButton } from "../../focus";
import { turnCount } from "../../turn-count";
import type { BurstTutorialState, SelectableCommands } from "../state";
import { burstIsTrumpCard } from "../stories/burst-is-trump-card";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: BurstTutorialState,
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled,
};

/**
 * バーストコマンド選択イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return イベント終了情報
 */
export async function onBurstCommandSelected(
  props: BurstCommandSelected,
  state: BurstTutorialState
): Promise<Ret> {
  const enableBurstCommand: SelectableCommands[] = ["BurstOnly", "All"];
  if (!enableBurstCommand.includes(state.selectableCommands)) {
    return { state, cancel: { isCommandCanceled: true } };
  }

  const turn = turnCount(state.stateHistory);
  if (turn === 1) {
    await burstIsTrumpCard(props);
    return { state, cancel: { isCommandCanceled: true } };
  }

  if (state.selectableCommands === "BurstOnly") {
    focusOutBurstButton(props);
    return {
      state: { ...state, selectableCommands: "All" },
      cancel: { isCommandCanceled: false },
    };
  }

  return { state, cancel: { isCommandCanceled: false } };
}
