import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { isZeroDefenseButEnableBurst } from "../../../is-zero-defense-but-enable-burst";
import { zeroDefenseButEnableBurst } from "../../stories/zero-defense-but-enable-burst";

/**
 * 条件を満たした場合、バーストできるのに0防御したストーリーを再生する
 * @param props イベントプロパティ
 * @return ストーリーを再生したらtrueを返す
 */
export async function playZeroDefenseButEnableBurstIfNeeded(
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
    isZeroDefenseButEnableBurst({
      ...batteryDeclaration,
      effect: batteryDeclaration.effect,
    })
  ) {
    await zeroDefenseButEnableBurst(props);
    return true;
  }

  return false;
}
