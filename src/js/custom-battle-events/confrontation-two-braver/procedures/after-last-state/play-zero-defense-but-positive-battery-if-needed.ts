import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { isZeroDefenseButBatteryPositive } from "../../../is-zero-defense-but-battery-positive";
import { zeroDefenseButPositiveBattery } from "../../stories/zero-defense-but-positive-battery";

/**
 * 条件を満たした場合、バッテリーが残っているのに0防御したストーリーを再生する
 * @param props イベントプロパティ
 * @return ストーリーを再生したらtrueを返す
 */
export async function playZeroDefenseButPositiveBatteryIfNeeded(
  props: Readonly<LastState>,
): Promise<boolean> {
  const isGameOver = props.update.some(
    (state) =>
      state.effect.name === "GameEnd" &&
      state.effect.result.type === "GameOver",
  );
  const batteryDeclaration = props.update.find(
    (state) => state.effect.name === "BatteryDeclaration",
  );
  if (!isGameOver || batteryDeclaration === undefined) {
    return false;
  }

  if (
    batteryDeclaration.effect.name === "BatteryDeclaration" &&
    isZeroDefenseButBatteryPositive({
      ...batteryDeclaration,
      effect: batteryDeclaration.effect,
    })
  ) {
    await zeroDefenseButPositiveBattery(props);
    return true;
  }

  return false;
}
