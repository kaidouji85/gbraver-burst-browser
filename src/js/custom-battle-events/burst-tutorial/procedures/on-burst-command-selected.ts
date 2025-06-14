import {
  BurstSelectedEventProps,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { focusOutBurstButton, isBurstButtonFocused } from "../../focus";
import { separatePlayersFromLastState } from "../../separate-players";
import { BurstTutorialProps } from "../props";
import { BurstTutorialState } from "../state";
import { burstIsTrumpCard } from "../stories/burst-is-trump-card";

/** イベント終了情報 */
type Ret = {
  /** イベントステート更新結果 */
  eventState: BurstTutorialState;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バーストコマンド選択イベント
 * @param props イベントプロパティ
 * @returns イベント終了情報
 */
export async function onBurstCommandSelected(
  props: Readonly<BurstSelectedEventProps & BurstTutorialProps>,
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

  const player = separatePlayersFromLastState(props)?.player;
  if (player && player.armdozer.battery === player.armdozer.maxBattery) {
    await burstIsTrumpCard(props);
    return {
      eventState: props.eventState,
      cancel: {
        isCommandCanceled: true,
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
