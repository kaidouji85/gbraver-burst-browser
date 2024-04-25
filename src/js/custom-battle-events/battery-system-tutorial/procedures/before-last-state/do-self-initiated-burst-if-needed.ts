import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { BatterySystemTutorialProps } from "../../props";
import { selfInitiatedBurst } from "../../stories/self-initiated-burst";

/**
 * 条件を満たした場合「プレイヤーが自主的にバーストを発動した」を実行する
 * @param props イベントプロパティ
 * @returns 実行した場合はtrue、そうでない場合はfalse
 */
export async function doSelfInitiatedBurstIfNeeded(
  props: Readonly<LastState & BatterySystemTutorialProps>,
): Promise<boolean> {
  const hasBurst = props.update.some(
    (state) => state.effect.name === "BurstEffect",
  );
  if (hasBurst && !props.state.isExplainedBurstAtZeroBurst) {
    await selfInitiatedBurst(props);
    return true;
  }

  return false;
}
