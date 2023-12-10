import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { isZeroDefenseButBatteryPositive } from "../../is-zero-defense-but-battery-positive";
import { zeroDefenseButPositiveBattery } from "../stories/zero-defense-but-positive-battery";

/**
 * 条件を満たした場合、バッテリーが残っているのに0防御したストーリーを再生する
 * @param props イベントプロパティ
 * @return ストーリーを再生したらtrueを返す
 */
export async function playZeroDefenseButPositiveBatteryIfNeeded(
  props: Readonly<LastState>,
): Promise<boolean> {
  const hasGameOver = props.update.some(
    (state) =>
      state.effect.name === "GameEnd" &&
      state.effect.result.type === "GameOver",
  );
  if (!hasGameOver) {
    return false;
  }

  const foundBatteryDeclaration = props.update.find(
    (state) => state.effect.name === "BatteryDeclaration",
  );
  if (
    foundBatteryDeclaration === undefined ||
    foundBatteryDeclaration.effect.name !== "BatteryDeclaration"
  ) {
    return false;
  }

  const btteryDeclaration = foundBatteryDeclaration.effect;
  if (
    isZeroDefenseButBatteryPositive({
      ...foundBatteryDeclaration,
      effect: btteryDeclaration,
    })
  ) {
    await zeroDefenseButPositiveBattery(props);
    return true;
  }

  return false;
}
