import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { endGameIfNeeded } from "./end-game-if-needed";
import { playZeroDefenseButPositiveBatteryIfNeeded } from "./play-zero-defense-but-positive-battery-if-needed";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function afterLastState(
  props: Readonly<LastState>,
): Promise<void> {
  if (await playZeroDefenseButPositiveBatteryIfNeeded(props)) {
    return;
  }

  await endGameIfNeeded(props);
}
