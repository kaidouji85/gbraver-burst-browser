import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { ZeroDefenseTutorialProps } from "../../props";
import { ZeroDefenseTutorialState } from "../../state";
import { selfInitiatedBurst } from "../../stories/self-initiated-burst";

/**
 * 条件を満たした場合、「自発的にバースト発動」を再生する
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function executeSelfInitiatedBurstIfNeeded(
  props: Readonly<LastState & ZeroDefenseTutorialProps>,
): Promise<ZeroDefenseTutorialState> {
  const hasBurst = props.update.some(
    (state) => state.effect.name === "BurstEffect",
  );
  if (hasBurst && !props.state.isExplainedBurstAtZeroBattery) {
    await selfInitiatedBurst(props);
    return props.state;
  }

  return props.state;
}
