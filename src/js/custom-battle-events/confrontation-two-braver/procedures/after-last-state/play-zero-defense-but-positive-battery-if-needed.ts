import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { isZeroDefenseButBatteryPositiveFromLastState } from "../../../is-zero-defense-but-battery-positive";
import { zeroDefenseButPositiveBattery } from "../../stories/zero-defense-but-positive-battery";

/**
 * 条件を満たした場合、バッテリーが残っているのに0防御したストーリーを再生する
 * @param props イベントプロパティ
 * @returns ストーリーを再生したらtrueを返す
 */
export async function playZeroDefenseButPositiveBatteryIfNeeded(
  props: Readonly<LastState>,
): Promise<boolean> {
  if (isZeroDefenseButBatteryPositiveFromLastState(props)) {
    await zeroDefenseButPositiveBattery(props);
    return true;
  }

  return false;
}
