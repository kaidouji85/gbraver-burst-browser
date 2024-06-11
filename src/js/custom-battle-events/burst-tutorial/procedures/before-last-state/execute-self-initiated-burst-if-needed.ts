import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { BurstTutorialProps } from "../../props";
import { selfInitiatedBurst } from "../../stories/self-initiated-burst";

/**
 * 条件を満たした場合、「プレイヤーが自主的にバーストを発動した」を再生する
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function executeSelfInitiatedBurstIfNeeded(
  props: Readonly<LastState & BurstTutorialProps>,
): Promise<void> {
  const hasPlayerBurst = props.update.some(
    (state) =>
      state.effect.name === "BurstEffect" &&
      state.effect.burstPlayer === props.playerId,
  );
  if (hasPlayerBurst && !props.eventState.isLoseIfNoDefense5Complete) {
    await selfInitiatedBurst(props);
  }
}
