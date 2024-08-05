import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { isZeroDefenseButEnableBurstFromLastState } from "../../../is-zero-defense-but-enable-burst";
import { zeroDefenseButEnableBurst } from "../../stories/zero-defense-but-enable-burst";

/**
 * 条件を満たした場合、バーストできるのに0防御したストーリーを再生する
 * @param props イベントプロパティ
 * @returns ストーリーを再生したらtrueを返す
 */
export async function playZeroDefenseButEnableBurstIfNeeded(
  props: Readonly<LastState>,
): Promise<boolean> {
  if (isZeroDefenseButEnableBurstFromLastState(props)) {
    await zeroDefenseButEnableBurst(props);
    return true;
  }

  return false;
}
