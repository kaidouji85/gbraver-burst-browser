import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ZeroDefenseTutorialProps } from "../../props";
import { ZeroDefenseTutorialState } from "../../state";
import { selfInitiatedBurst } from "../../stories/self-initiated-burst";

/**
 * 条件を満たした場合、「自発的にバースト発動」を再生する
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function executeSelfInitiatedBurstIfNeeded(
  props: Readonly<LastStateEventProps & ZeroDefenseTutorialProps>,
): Promise<ZeroDefenseTutorialState> {
  const hasBurst = props.update.some(
    (state) => state.effect.name === "BurstEffect",
  );
  if (hasBurst && !props.eventState.isExplainedBurstAtZeroBattery) {
    await selfInitiatedBurst(props);
    return props.eventState;
  }

  return props.eventState;
}
