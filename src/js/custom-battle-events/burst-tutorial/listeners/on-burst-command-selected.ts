import type {
  BurstCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusOutBurstButton, isBurstButtonFocused } from "../../focus";
import { extractLastPlayer } from "../../last-player-extractor";
import { BurstTutorialProps } from "../props";
import type { BurstTutorialState } from "../state";
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
 * @param props イベントプロパティ
 * @return イベント終了情報
 */
export async function onBurstCommandSelected(
  props: Readonly<BurstCommandSelected & BurstTutorialProps>,
): Promise<Ret> {
  if (isBurstButtonFocused(props)) {
    focusOutBurstButton(props);
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  const lastPlayer = extractLastPlayer(props, props.stateHistory);
  if (
    lastPlayer &&
    lastPlayer.armdozer.battery === lastPlayer.armdozer.maxBattery
  ) {
    await burstIsTrumpCard(props);
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: true,
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
