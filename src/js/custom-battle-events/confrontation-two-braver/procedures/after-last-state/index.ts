import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../../invisible-shout-message-window";
import { endGameIfNeeded } from "./end-game-if-needed";
import { playZeroDefenseButEnableBurstIfNeeded } from "./play-zero-defense-but-enable-burst-if-needed";
import { playZeroDefenseButPositiveBatteryIfNeeded } from "./play-zero-defense-but-positive-battery-if-needed";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function afterLastState(
  props: Readonly<LastStateEventProps>,
): Promise<void> {
  invisibleShoutMessageWindowWhenGameEnd(props);
  if (await playZeroDefenseButPositiveBatteryIfNeeded(props)) {
    return;
  }

  if (await playZeroDefenseButEnableBurstIfNeeded(props)) {
    return;
  }

  await endGameIfNeeded(props);
}
