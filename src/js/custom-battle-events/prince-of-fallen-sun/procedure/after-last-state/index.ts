import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../../invisible-shout-message-window";
import { isZeroDefenseButBatteryPositiveFromLastState } from "../../../is-zero-defense-but-battery-positive";
import { isZeroDefenseButEnableBurstFromLastState } from "../../../is-zero-defense-but-enable-burst";
import { PrinceOfFallenSunProps } from "../../props";
import { gaiVictory } from "../../stories/gai-victory";
import { yuuyaVictory } from "../../stories/yuuya-victory";
import { zeroDefenseButEnableBurst } from "../../stories/zero-defense-but-enable-burst";
import { zeroDefenseButPositiveBattery } from "../../stories/zero-defense-but-positive-battery";
import { createConditions } from "./create-conditions";
import { shouldGaiVictory } from "./should-gai-victory";
import { shouldYuuyaVictory } from "./should-yuuya-victory";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 */
export async function afterLastState(
  props: LastStateEventProps & PrinceOfFallenSunProps,
) {
  invisibleShoutMessageWindowWhenGameEnd(props);

  const conditions = createConditions(props);
  if (isZeroDefenseButBatteryPositiveFromLastState(props)) {
    await zeroDefenseButPositiveBattery(props);
  } else if (isZeroDefenseButEnableBurstFromLastState(props)) {
    await zeroDefenseButEnableBurst(props);
  } else if (shouldGaiVictory(conditions)) {
    await gaiVictory(props);
  } else if (shouldYuuyaVictory(conditions)) {
    await yuuyaVictory(props);
  }
}
